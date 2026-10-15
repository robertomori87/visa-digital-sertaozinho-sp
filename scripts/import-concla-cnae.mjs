/**
 * import-concla-cnae.mjs
 * Importador dos descritores oficiais da CONCLA/IBGE (CNAE-Subclasses).
 *
 * Fonte: API oficial IBGE (servicodados.ibge.gov.br/api/v2/cnae/subclasses)
 *         + XLSX de estrutura detalhada CNAE-Subclasses 2.3 (CONCLA) como
 *           referência de versionamento.
 *
 * Saida: src/data/conclaCnaeDatabase.json
 *         src/data/conclaCnae.metadata.json
 *
 * NAO estabelece equivalencia automatica entre descritores CONCLA e
 * compreensoes CVS 01. A vinculacao ocorre apenas pelo cnaeDigitos.
 */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const FONTE_API = 'https://servicodados.ibge.gov.br/api/v2/cnae/subclasses';
const FONTE_XLSX = 'https://concla.ibge.gov.br/images/concla/documentacao/CNAE_Subclasses_2_3_Estrutura_Detalhada.xlsx';
const VERSAO_CNAE = 'CNAE 2.0 - Subclasses 2.3';
const RAW_PATH = path.join(__dirname, 'concla-api-raw.json');
const OUT_JSON = path.join(root, 'src/data/conclaCnaeDatabase.json');
const OUT_META = path.join(root, 'src/data/conclaCnae.metadata.json');

// --- Formatacao do CNAE: 7 digitos -> "XXXX-X/XX" ---
function formatCnae(digits) {
  const d = String(digits).padStart(7, '0');
  return `${d.slice(0, 4)}-${d[4]}/${d.slice(5)}`;
}

// --- Normalizacao de texto ---
function normText(s) {
  return String(s ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[ \t]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .trim();
}

// --- Obter dados: reutiliza raw local se existir, senao baixa da API ---
async function obterDados() {
  if (fs.existsSync(RAW_PATH)) {
    console.log('[import-concla] Reutilizando arquivo local:', RAW_PATH);
    return JSON.parse(fs.readFileSync(RAW_PATH, 'utf8'));
  }
  console.log('[import-concla] Baixando da API oficial:', FONTE_API);
  const res = await fetch(FONTE_API);
  if (!res.ok) throw new Error(`Falha na API IBGE: ${res.status}`);
  const data = await res.json();
  fs.writeFileSync(RAW_PATH, JSON.stringify(data, null, 2), 'utf8');
  console.log('[import-concla] Raw salvo em', RAW_PATH);
  return data;
}

// --- Construir registro normalizado ---
function buildRegistro(item) {
  const cnaeDigitos = String(item.id);
  const classe = item.classe || {};
  const grupo = classe.grupo || {};
  const divisao = grupo.divisao || {};
  const secao = divisao.secao || {};

  return {
    cnaeDigitos,
    cnaeFormatado: formatCnae(cnaeDigitos),
    descricao: normText(item.descricao),
    secao: { id: secao.id ?? null, descricao: normText(secao.descricao) || null },
    divisao: { id: divisao.id ?? null, descricao: normText(divisao.descricao) || null },
    grupo: { id: grupo.id ?? null, descricao: normText(grupo.descricao) || null },
    classe: { id: classe.id ?? null, descricao: normText(classe.descricao) || null },
    atividades: (item.atividades || []).map(a => normText(a)),
    observacoes: (item.observacoes || []).map(o => normText(o)),
  };
}

async function main() {
  const raw = await obterDados();
  console.log('[import-concla] Total de subclasses recebidas:', raw.length);

  const registros = raw.map(buildRegistro).sort((a, b) => a.cnaeDigitos.localeCompare(b.cnaeDigitos));

  // Validacao: todos devem ter 7 digitos
  const invalidos = registros.filter(r => !/^\d{7}$/.test(r.cnaeDigitos));
  if (invalidos.length > 0) {
    console.warn('[import-concla] ATENCAO: ' + invalidos.length + ' registros com CNAE invalido.');
  }

  // Validacao: duplicatas
  const ids = registros.map(r => r.cnaeDigitos);
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dup.length > 0) {
    console.warn('[import-concla] ATENCAO: duplicatas de CNAE:', dup);
  }

  fs.writeFileSync(OUT_JSON, JSON.stringify(registros, null, 2), 'utf8');
  console.log('[import-concla] Base salva:', OUT_JSON, '(' + registros.length + ' registros)');

  // Metadados
  const hash = crypto.createHash('sha256').update(JSON.stringify(registros)).digest('hex');
  const rawHash = fs.existsSync(RAW_PATH)
    ? crypto.createHash('sha256').update(fs.readFileSync(RAW_PATH)).digest('hex')
    : null;

  const metadata = {
    fonte: 'IBGE/CONCLA',
    fonteApi: FONTE_API,
    fonteXlsxReferencia: FONTE_XLSX,
    versaoCnae: VERSAO_CNAE,
    versaoSubclasses: '2.3',
    dataImportacao: new Date().toISOString(),
    totalSubclasses: registros.length,
    hashSha256Base: hash,
    hashSha256RawApi: rawHash,
    campos: ['cnaeDigitos', 'cnaeFormatado', 'descricao', 'secao', 'divisao', 'grupo', 'classe', 'atividades', 'observacoes'],
    observacao: 'Descritores de atividades (atividades[]) e notas explicativas (observacoes[]) obtidos via API oficial IBGE. O XLSX de estrutura detalhada CNAE-Subclasses 2.3 foi utilizado como referencia de versao, mas nao contem os descritores de atividades.',
    vinculacaoCvs: 'A vinculacao com a CVS 01 ocorre exclusivamente pelo cnaeDigitos (7 digitos normalizados). Nenhuma equivalencia automatica entre descritores CONCLA e compreensoes CVS e estabelecida.',
  };

  fs.writeFileSync(OUT_META, JSON.stringify(metadata, null, 2), 'utf8');
  console.log('[import-concla] Metadados salvos:', OUT_META);

  // Validacao final do 7500-1/00
  const vet = registros.find(r => r.cnaeDigitos === '7500100');
  if (vet) {
    console.log('\n=== VALIDACAO 7500-1/00 ===');
    console.log('Descricao:', vet.descricao);
    console.log('Descritores:', vet.atividades.length);
    const procurados = ['CLÍNICA VETERINÁRIA', 'HOSPITAL VETERINÁRIO', 'RAIO-X VETERINÁRIO'];
    procurados.forEach(p => {
      const encontrado = vet.atividades.some(a => a.toUpperCase().includes(p));
      console.log('  ' + p + ': ' + (encontrado ? 'ENCONTRADO' : 'NAO ENCONTRADO'));
    });
  } else {
    console.error('\n[ERRO] 7500-1/00 nao encontrado na base gerada!');
    process.exit(1);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
