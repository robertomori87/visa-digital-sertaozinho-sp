import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORTARIA_CVS = {
  numero: 'Portaria CVS 01',
  ano: '2026',
  publicacao: '13/05/2026',
  versao: '2026-05-13',
  arquivoOrigem: '26-05-13_LISTA CVS 01.xlsx',
};

// Procurar primeiro a planilha normativa vigente
const candidatePaths = [
  path.resolve(__dirname, `../${PORTARIA_CVS.arquivoOrigem}`),
  path.resolve(`./${PORTARIA_CVS.arquivoOrigem}`),
  path.resolve(__dirname, '../LISTA CVS 01.xlsx'),
  path.resolve('./LISTA CVS 01.xlsx'),
  '/LISTA CVS 01.xlsx',
  path.resolve(__dirname, '../LISTA CVS 01 - COMPLETA - APENAS LTA.xlsx')
];

let excelPath = candidatePaths.find(p => fs.existsSync(p));

if (!excelPath) {
  console.error(`Arquivo Excel não encontrado em nenhum dos locais esperados: ${candidatePaths.join(', ')}`);
  process.exit(1);
}

console.log(`Usando arquivo Excel: ${excelPath}`);
console.log(
  `Base normativa carregada: ${PORTARIA_CVS.numero}/${PORTARIA_CVS.ano} (publicacao ${PORTARIA_CVS.publicacao}, versao ${PORTARIA_CVS.versao})`
);

const workbook = xlsx.readFile(excelPath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

const rawData = xlsx.utils.sheet_to_json(worksheet, { defval: '' });

// Limpeza e normalização de strings preservando quebras de linha limpas
function cleanStr(val) {
  if (val === undefined || val === null) return '';
  return String(val).trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

export function getDigitsOnly(str) {
  return String(str || '').replace(/\D/g, '');
}

function createLookupValueGetter(row) {
  const keys = Object.keys(row);
  return (possibleNames) => {
    for (const name of possibleNames) {
      const foundKey = keys.find((k) => k.trim().toUpperCase() === name.toUpperCase());
      if (foundKey && row[foundKey] !== undefined) {
        return cleanStr(row[foundKey]);
      }
    }
    return '';
  };
}

console.log(`Lidas ${rawData.length} linhas brutas do Excel.`);
if (rawData.length > 0) {
  console.log('Cabeçalhos encontrados:', Object.keys(rawData[0]));
}

/**
 * Regra oficial da Portaria CVS 01/2026:
 * As atividades que exigem aprovação prévia de LTA (Laudo Técnico de Avaliação)
 * são aquelas que contêm o documento nº "52" na coluna "DOCUMENTOS DURANTE INSPEÇÃO".
 */
export function checkExigeLta(documentosInspecao) {
  if (!documentosInspecao) return false;
  return /(?:^|\D)52(?:\D|$)/.test(String(documentosInspecao));
}

const records = [];

for (let i = 0; i < rawData.length; i++) {
  const row = rawData[i];
  const getVal = createLookupValueGetter(row);

  const agrupamento = getVal(['AGRUPAMENTO', 'GRUPO', 'CATEGORIA']);
  const cnaeRaw = getVal(['CNAE', 'CÓDIGO CNAE', 'CODIGO CNAE', 'COD CNAE']);
  const descricaoCnae = getVal(['DESCRIÇAO DO CNAE', 'DESCRIÇÃO DO CNAE', 'DESCRICAO DO CNAE', 'DESCRICAO CNAE', 'DESCRIÇÃO']);
  const compreensao = getVal(['COMPREENSÃO', 'COMPREENSAO', 'ATIVIDADE']);
  const risco = getVal(['RISCO', 'GRAU DE RISCO']);
  const docPrevio = getVal(['DOC. PRÉVIO', 'DOC. PREVIO', 'DOCUMENTO PRÉVIO', 'DOCUMENTO PREVIO']);
  const docInspecao = getVal(['DOCUMENTOS DURANTE INSPEÇÃO', 'DOCUMENTOS DURANTE INSPECAO', 'DOC INSPECAO']);
  const naoCompreende = getVal(['NÃO COMPREENDE', 'NAO COMPREENDE']);
  const paginaCvs = getVal(['PÁG CVS', 'PAG CVS', 'PÁGINA CVS', 'PAGINA CVS', 'PAG']);

  const cnae = cnaeRaw;
  const cnaeNormalizado = cnae;

  // Somente considerar se possuir CNAE ou compreensão ou descrição
  if (cnae || compreensao || descricaoCnae) {
    const exigeLta = checkExigeLta(docInspecao);

    records.push({
      id: i + 1,
      agrupamento,
      cnae,
      cnaeNormalizado,
      cnaeDigitos: getDigitsOnly(cnae),
      descricaoCnae,
      compreensao,
      risco,
      documentoPrevio: docPrevio,
      documentosInspecao: docInspecao,
      naoCompreende,
      paginaCvs,
      exigeLta
    });
  }
}

// Estatísticas
const distinctCnaes = new Set(records.map(r => r.cnaeNormalizado).filter(Boolean));
const distinctAgrupamentos = new Set(records.map(r => r.agrupamento).filter(Boolean));
const ltaReqCount = records.filter(r => r.exigeLta).length;
const ltaDispCount = records.filter(r => !r.exigeLta).length;

console.log('====================================');
console.log(`Total de registros processados: ${records.length}`);
console.log(`Total de CNAEs distintos: ${distinctCnaes.size}`);
console.log(`Total de Agrupamentos distintos: ${distinctAgrupamentos.size}`);
console.log(`Atividades com LTA Obrigatório (doc 52): ${ltaReqCount}`);
console.log(`Atividades com LTA Dispensado (sem doc 52): ${ltaDispCount}`);
console.log('====================================');

// Salvar em src/data/cvsLta.json
const outputPath = path.resolve(__dirname, '../src/data/cvsLta.json');
fs.writeFileSync(outputPath, JSON.stringify(records, null, 2), 'utf-8');
console.log(`Arquivo salvo com sucesso em: ${outputPath}`);

const metadataPath = path.resolve(__dirname, '../src/data/cvsLta.metadata.json');
fs.writeFileSync(
  metadataPath,
  JSON.stringify(
    {
      ...PORTARIA_CVS,
      arquivoUtilizado: path.basename(excelPath),
      totalRegistros: records.length,
      totalCnaesDistintos: distinctCnaes.size,
      totalAgrupamentosDistintos: distinctAgrupamentos.size,
      totalComLta: ltaReqCount,
      totalSemLta: ltaDispCount,
    },
    null,
    2
  ),
  'utf-8'
);
console.log(`Metadados salvos com sucesso em: ${metadataPath}`);
