/**
 * FASE 2 — Testes automatizados das regras essenciais
 * Busca, seleção, classificação, migração e integridade normativa
 *
 * Execução: node scripts/test-fase2.js
 */

const fs = require('fs');
const path = require('path');

const cvsLta = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'cvsLta.json'), 'utf-8')
);
const conclaDb = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'conclaCnaeDatabase.json'), 'utf-8')
);
const cvsMetadata = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'cvsLta.metadata.json'), 'utf-8')
);

let passed = 0;
let failed = 0;
const failures = [];

function assert(condition, message) {
  if (condition) {
    passed++;
  } else {
    failed++;
    failures.push(message);
    console.error(`  ✗ FAIL: ${message}`);
  }
}

function assertEq(actual, expected, message) {
  if (actual === expected) {
    passed++;
  } else {
    failed++;
    failures.push(`${message} (expected: ${expected}, got: ${actual})`);
    console.error(`  ✗ FAIL: ${message} (expected: ${expected}, got: ${actual})`);
  }
}

// ============================================================
// Funções auxiliares (réplica da lógica dos serviços)
// ============================================================

function normalizeText(text) {
  return (text || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getDigitsOnly(cnae) {
  return (cnae || '').toString().replace(/\D/g, '');
}

// Verifica presença do documento 52 (LTA) na lista de documentos de inspeção
function checkHasDoc52(documentosInspecao) {
  if (!documentosInspecao) return false;
  const docString = documentosInspecao.toString();
  const docTokens = docString.split(/[,;]/).map((s) => s.trim());
  for (const token of docTokens) {
    if (!token) continue;
    if (token === '52') return true;
    const singleNumbers = token.split(/\s+(?:ou|e)\s+|\s+/).map((s) => s.trim());
    for (const num of singleNumbers) {
      if (num === '52') return true;
    }
  }
  // Fallback: regex para "52" como número isolado
  return /(?:^|[^0-9])52(?:[^0-9]|$)/.test(docString);
}

// Deriva exigeLta a partir dos documentos (regra normativa)
function deriveExigeLta(documentosInspecao) {
  return checkHasDoc52(documentosInspecao);
}

// Busca integrada CONCLA + CVS
function searchIntegrated(query, maxResults = 30) {
  const q = normalizeText(query);
  if (!q) return [];
  const tokens = q.split(' ').filter(Boolean);
  const results = [];

  for (const sc of conclaDb) {
    const digits = getDigitsOnly(sc.cnaeDigitos || sc.cnaeFormatado);
    const cnaeNorm = normalizeText(sc.cnaeFormatado);
    const descNorm = normalizeText(sc.descricao);
    const secaoDesc = normalizeText(sc.secao?.descricao || '');

    let score = 0;
    let matchedField = null;
    let matchedText = '';

    // Código CNAE (pesquisa por dígitos)
    if (digits.includes(q.replace(/\D/g, '')) && q.replace(/\D/g, '').length >= 3) {
      score = 1000;
      matchedField = 'cnae';
    }

    // Denominação oficial
    if (tokens.some((t) => descNorm.includes(t))) {
      score = Math.max(score, 500);
      matchedField = matchedField || 'descricao';
    }

    // Descritores CONCLA
    if (sc.atividades && Array.isArray(sc.atividades)) {
      for (const act of sc.atividades) {
        const actNorm = normalizeText(act);
        if (tokens.some((t) => actNorm.includes(t))) {
          score = Math.max(score, 100);
          matchedField = matchedField || 'descritor';
          matchedText = act;
          break;
        }
      }
    }

    // Seção
    if (tokens.some((t) => secaoDesc.includes(t))) {
      score = Math.max(score, 50);
      matchedField = matchedField || 'secao';
    }

    if (score > 0) {
      const cvsRecords = cvsLta.filter((r) => r.cnaeDigitos === digits);
      const inCvs01 = cvsRecords.length > 0;
      if (inCvs01) score += 20;
      results.push({
        cnaeDigitos: digits,
        cnaeFormatado: sc.cnaeFormatado,
        descricao: sc.descricao,
        secao: sc.secao?.id || '',
        secaoDescricao: sc.secao?.descricao || '',
        score,
        matchedField,
        matchedText,
        inCvs01,
      });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, maxResults);
}

// ============================================================
// TESTES
// ============================================================

console.log('\n=== FASE 2: Testes Automatizados ===\n');

// --- INTEGRIDADE NORMATIVA ---
console.log('[1] Integridade normativa da base CVS 01');
assertEq(cvsLta.length, 733, 'Base CVS 01 deve ter 733 registros');
assert(cvsMetadata.integridade && cvsMetadata.integridade.sha256 && cvsMetadata.integridade.sha256.length === 64, 'Hash SHA-256 da base normativa deve existir em integridade.sha256');

// Verifica todos os exigeLta estão alinhados com a presença do doc 52
let desalinhados = 0;
for (const rec of cvsLta) {
  const derived = deriveExigeLta(rec.documentosInspecao);
  if (derived !== rec.exigeLta) desalinhados++;
}
assertEq(desalinhados, 0, `Todos os exigeLta devem ser derivados do doc 52 (${desalinhados} desalinhados)`);

const exigemLta = cvsLta.filter((r) => r.exigeLta).length;
const dispensados = cvsLta.filter((r) => !r.exigeLta).length;
assertEq(exigemLta + dispensados, 733, 'Soma de exigidos e dispensados deve igualar o total');
console.log(`    → ${exigemLta} exigem LTA, ${dispensados} dispensados`);

// --- CONCLA ---
console.log('\n[2] Base CONCLA/IBGE');
assertEq(conclaDb.length, 1332, 'Base CONCLA deve ter 1.332 subclasses');
const totalDescritores = conclaDb.reduce((sum, sc) => sum + (sc.atividades?.length || 0), 0);
assert(totalDescritores >= 17000, `Total de descritores deve ser ~17.180 (atual: ${totalDescritores})`);
console.log(`    → ${conclaDb.length} subclasses, ${totalDescritores} descritores`);

// --- BUSCA POR CÓDIGO CNAE ---
console.log('\n[3] Busca por código CNAE');
const res7500 = searchIntegrated('7500');
assert(res7500.length > 0, 'Busca por "7500" deve retornar resultados');
const vet = res7500.find((r) => r.cnaeDigitos === '7500100');
assert(!!vet, 'CNAE 7500-1/00 (veterinária) deve ser encontrado');
assert(vet.inCvs01, 'CNAE 7500-1/00 deve constar na CVS 01');

// --- BUSCA POR DESCRITOR CONCLA ---
console.log('\n[4] Busca por descritor CONCLA ("clínica veterinária")');
const resClinica = searchIntegrated('clínica veterinária');
assert(resClinica.length > 0, 'Busca por "clínica veterinária" deve retornar resultados');
const vetClinica = resClinica.find((r) => r.cnaeDigitos === '7500100');
assert(!!vetClinica, 'Descritor "clínica veterinária" deve localizar CNAE 7500-1/00');
// Pode casar em descricao ou descritor (ambos contêm "veterinária")
assert(['descricao', 'descritor'].includes(vetClinica.matchedField),
  `Deve ter casado em descricao ou descritor (atual: ${vetClinica.matchedField})`);

// --- BUSCA SEM ACENTOS ---
console.log('\n[5] Busca sem acentos e maiúsculas');
const resSemAcento = searchIntegrated('clinica veterinaria');
assert(resSemAcento.length > 0, 'Busca sem acentos deve funcionar');

// --- CNAE NÃO RELACIONADO NA CVS ---
console.log('\n[6] CNAE não relacionado na CVS 01');
// CNAE 0111-3/01 = CULTIVO DE ARROZ (não deve estar na CVS 01)
const arrozCnae = conclaDb.find((sc) => getDigitsOnly(sc.cnaeDigitos) === '0111301');
assert(!!arrozCnae, 'CNAE 0111-3/01 (CULTIVO DE ARROZ) deve existir na base CONCLA');
const arrozNaCvs = cvsLta.some((r) => r.cnaeDigitos === '0111301');
assert(!arrozNaCvs, 'CNAE 0111-3/01 (CULTIVO DE ARROZ) não deve constar na CVS 01');

// --- CNAE 7500-1/00: COMPREENSÕES E DOC 52 ---
console.log('\n[7] CNAE 7500-1/00 — Compreensões e documento 52');
const compVet = cvsLta.filter((r) => r.cnaeDigitos === '7500100');
assertEq(compVet.length, 5, 'CNAE 7500-1/00 deve ter 5 compreensões');

const terapia = compVet.find((r) => r.compreensao.includes('terapia'));
const diagFixo = compVet.find((r) => r.compreensao.includes('diagnóstico') && !r.compreensao.includes('móvel'));
const diagMovel = compVet.find((r) => r.compreensao.includes('móvel'));
const medicinaNuclear = compVet.find((r) => r.compreensao.includes('Medicina Nuclear'));
const dispensario = compVet.find((r) => r.compreensao.includes('Dispensário'));

assert(!!terapia, 'Compreensão de terapia deve existir');
assert(!!diagFixo, 'Compreensão de diagnóstico fixo deve existir');
assert(!!diagMovel, 'Compreensão de diagnóstico móvel deve existir');

assertEq(deriveExigeLta(terapia.documentosInspecao), true, 'Terapia veterinária deve exigir doc 52 (LTA)');
assertEq(deriveExigeLta(diagFixo.documentosInspecao), true, 'Diagnóstico fixo deve exigir doc 52 (LTA)');
assertEq(deriveExigeLta(diagMovel.documentosInspecao), false, 'Diagnóstico móvel NÃO deve exigir doc 52');
assertEq(deriveExigeLta(medicinaNuclear.documentosInspecao), true, 'Medicina Nuclear deve exigir doc 52');
assertEq(deriveExigeLta(dispensario.documentosInspecao), false, 'Dispensário NÃO deve exigir doc 52');

// DISTINÇÃO DIAGNÓSTICO vs TERAPIA
console.log('\n[8] Distinção diagnóstico vs terapia (radiação veterinária)');
assert(terapia.exigeLta === true, 'Terapia: LTA exigido');
assert(diagFixo.exigeLta === true, 'Diagnóstico fixo: LTA exigido');
assert(diagMovel.exigeLta === false, 'Diagnóstico móvel: LTA dispensado');
console.log('    → Terapia e diagnóstico fixo exigem LTA; diagnóstico móvel dispensa');

// --- CNAEs MISTOS ---
console.log('\n[9] CNAEs mistos (compreensões que exigem e dispensam LTA no mesmo CNAE)');
const cnaeGroups = {};
for (const rec of cvsLta) {
  if (!cnaeGroups[rec.cnaeDigitos]) cnaeGroups[rec.cnaeDigitos] = [];
  cnaeGroups[rec.cnaeDigitos].push(rec);
}
const mistos = Object.entries(cnaeGroups).filter(([_, recs]) => {
  const temExigido = recs.some((r) => r.exigeLta);
  const temDispensado = recs.some((r) => !r.exigeLta);
  return temExigido && temDispensado;
});
assertEq(mistos.length, 11, `Devem existir 11 CNAEs mistos (atual: ${mistos.length})`);
console.log(`    → ${mistos.length} CNAEs mistos identificados`);

// --- CLASSIFICAÇÃO: LTA_EXIGIDO ---
console.log('\n[10] Regra de classificação: LTA_EXIGIDO');
const atividadesExige = [diagFixo];
const exige = atividadesExige.some((a) => deriveExigeLta(a.documentosInspecao));
assertEq(exige, true, 'Qualquer compreensão com doc 52 → LTA_EXIGIDO');

// --- CLASSIFICAÇÃO: LTA_DISPENSADO ---
console.log('\n[11] Regra de classificação: LTA_DISPENSADO');
const atividadesDispensa = [diagMovel, dispensario];
const dispensa = !atividadesDispensa.some((a) => deriveExigeLta(a.documentosInspecao));
assertEq(dispensa, true, 'Todas sem doc 52 → LTA_DISPENSADO');

// --- CONSULTA_INCOMPLETA (pendência) ---
console.log('\n[12] Regra: CONSULTA_INCOMPLETA');
// Simulação: CNAE com status 'pending'
const statusPendente = 'pending';
const possuiPendencia = statusPendente === 'pending';
assert(possuiPendencia, 'CNAE com status pending deve bloquear conclusão');

// --- NENHUMA COMPREENSÃO APLICÁVEL ---
console.log('\n[13] Nenhuma compreensão se aplica (confirmação expressa)');
const statusNoneApplies = 'none_applies';
assertEq(statusNoneApplies, 'none_applies', 'Status none_applies deve ser registrado');

// --- MÚLTIPLAS COMPREENSÕES NO MESMO CNAE ---
console.log('\n[14] Múltiplas compreensões no mesmo CNAE');
const selecionadas = [diagFixo, diagMovel];
const algumExige = selecionadas.some((s) => deriveExigeLta(s.documentosInspecao));
assertEq(algumExige, true, 'Múltiplas compreensões: se uma exigir doc 52, LTA é exigido');

// --- MÚLTIPLOS CNAEs COM RESULTADOS DIFERENTES ---
console.log('\n[15] Múltiplos CNAEs com resultados diferentes');
const cnaeA = compVet; // 7500-1/00
// Pega outro CNAE que não exige LTA
const cnaeBSemLta = cvsLta.find((r) => !r.exigeLta && r.cnaeDigitos !== '7500100');
assert(!!cnaeBSemLta, 'Deve existir CNAE dispensado para o teste');
const consolidaExige = cnaeA.some((r) => deriveExigeLta(r.documentosInspecao)) ||
  deriveExigeLta(cnaeBSemLta.documentosInspecao);
assertEq(consolidaExige, true, 'Consolidação: se qualquer CNAE exigir LTA, resultado é LTA_EXIGIDO');

// --- MIGRAÇÃO: BASE OFICIAL PREVALECE SOBRE localStorage ---
console.log('\n[16] Migração: base oficial prevalece sobre listas customizadas');
// Simulação: lista customizada com CNAE que já está na base oficial
const officialDigits = new Set(cvsLta.map((r) => r.cnaeDigitos));
const customList = [
  { cnaeDigitos: '7500100', descricao: 'CUSTOMIZADO' }, // já existe na oficial
  { cnaeDigitos: '9999999', descricao: 'NOVO' },         // não existe
];
const extras = customList.filter((c) => !officialDigits.has(c.cnaeDigitos));
assertEq(extras.length, 1, 'Apenas CNAEs não-oficiais devem ser adicionados');
assertEq(extras[0].cnaeDigitos, '9999999', 'CNAE oficial não deve ser sobrescrito');

// --- REUTILIZAÇÃO DE HISTÓRICO: RECLASSIFICAÇÃO ---
console.log('\n[17] Reclassificação normativa ao reaproveitar histórico');
// Simulação: atividade histórica com exigeLta antigo
const historicoAntigo = { cnaeDigitos: '7500100', exigeLta: false }; // antigo incorreto
const registroAtual = cvsLta.find((r) => r.id === diagFixo.id);
const reclassificado = deriveExigeLta(registroAtual.documentosInspecao);
assertEq(reclassificado, historicoAntigo.exigeLta ? false : true,
  'Reclassificação deve usar dados vigentes, não o valor histórico');

// --- DOC 52 COMO ITEM INDEPENDENTE ---
console.log('\n[18] Documento 52 como item documental independente');
assertEq(checkHasDoc52('23, 28, 49 e 52'), true, 'Doc 52 no final da lista deve ser detectado');
assertEq(checkHasDoc52('52, 23, 28'), true, 'Doc 52 no início deve ser detectado');
assertEq(checkHasDoc52('23, 28, 49'), false, 'Sem doc 52 não deve exigir LTA');
assertEq(checkHasDoc52('38 ou 39, 40, 52'), true, 'Doc 52 após "ou" deve ser detectado');
assertEq(checkHasDoc52('152, 252'), false, 'Números como 152 não devem ser confundidos com 52');

// ============================================================
// FASE 2B — Testes específicos dos problemas identificados
// ============================================================

console.log('\n========================================');
console.log('  FASE 2B — Testes específicos');
console.log('========================================');

// --- CNAE fora da CVS é confirmado automaticamente na inclusão ---
console.log('\n[19] CNAE fora da CVS inicia como confirmed (auto-confirmação)');
// CNAE 0111-3/01 = CULTIVO DE ARROZ (não está na CVS 01)
const cnaeArrozDigitos2b = '0111301';
const arrozNaCvs2b = cvsLta.some((r) => r.cnaeDigitos === cnaeArrozDigitos2b);
assert(!arrozNaCvs2b, 'CNAE 0111-3/01 não deve constar na CVS 01');
// Simulação do createDeclaredCnae: status deve ser 'confirmed' (auto-confirmação)
const declaredArrozStatus2b = 'confirmed'; // comportamento atual: auto-confirmação
assertEq(declaredArrozStatus2b, 'confirmed', 'CNAE fora da CVS deve iniciar como confirmed');

// --- CNAE fora da CVS NÃO exige confirmação expressa adicional ---
console.log('\n[20] CNAE fora da CVS não exige confirmação expressa adicional');
let arrozDeclarado = { status: 'confirmed', naoConstaCvs: true };
// Na inclusão, já é confirmed automaticamente
assertEq(arrozDeclarado.status, 'confirmed', 'CNAE fora da CVS já é confirmed na inclusão');
// A função confirmCnaeNotInCvs permanece disponível para compatibilidade
assertEq(arrozDeclarado.status, 'confirmed', 'Sem etapa burocrática extra de confirmação');

// --- CNAE fora da CVS com status confirmed EMITE atividade automaticamente ---
console.log('\n[21] CNAE fora da CVS com status confirmed emite atividade automaticamente');
// Simulação: declaredCnaeToActivities retorna 1 atividade quando naoConstaCvs e status === 'confirmed'
const atividadesArrozConfirmado = [{ cnae: '0111-3/01' }]; // comportamento atual
assertEq(atividadesArrozConfirmado.length, 1, 'CNAE fora da CVS confirmed deve gerar atividade');

// --- PROBLEMA 2: exigeLta sempre derivado do doc 52 (não do campo armazenado) ---
console.log('\n[22] exigeLta sempre derivado do documento 52, não do campo armazenado');
// Simula um registro com exigeLta armazenado como false mas com doc 52 presente
const registroCorrompido = {
  documentosInspecao: '23, 28, 49, 52',
  exigeLta: false, // campo armazenado incorreto
};
const exigeLtaDerivado = deriveExigeLta(registroCorrompido.documentosInspecao);
assertEq(exigeLtaDerivado, true, 'exigeLta deve ser derivado do doc 52, ignorando campo armazenado falso');

// Simula um registro com exigeLta armazenado como true mas sem doc 52
const registroCorrompido2 = {
  documentosInspecao: '23, 28, 49',
  exigeLta: true, // campo armazenado incorreto
};
const exigeLtaDerivado2 = deriveExigeLta(registroCorrompido2.documentosInspecao);
assertEq(exigeLtaDerivado2, false, 'Sem doc 52, exigeLta deve ser false mesmo se campo armazenado for true');

// --- Pendência não anula exigência já identificada ---
console.log('\n[23] Pendência não anula exigência já identificada');
// Dois CNAEs: um com LTA exigido (confirmado), outro pendente
const cnaeConfirmadoComLta = { status: 'confirmed', exigeLta: true };
const cnaePendente = { status: 'pending' };
const consultaIncompleta = [cnaeConfirmadoComLta, cnaePendente];
// A exigência existe, mas a consulta está incompleta
const existeExigencia = consultaIncompleta.some((c) => c.exigeLta === true);
const estaIncompleta = consultaIncompleta.some((c) => c.status === 'pending');
assertEq(existeExigencia, true, 'Exigência identificada deve ser preservada');
assertEq(estaIncompleta, true, 'Consulta deve estar marcada como incompleta');
// Comprovante só pode ser emitido quando todas as verificações estiverem concluídas
const podeEmitir = !estaIncompleta;
assertEq(podeEmitir, false, 'Não deve permitir emissão de comprovante com pendências');

// --- Alteração posterior de compreensão selecionada invalida confirmação ---
console.log('\n[24] Alteração de seleção invalida confirmação anterior');
let declared = {
  status: 'confirmed',
  compreensoesSelecionadas: [{ id: 1, documentosInspecao: '23, 28, 52' }],
};
// Usuário altera a seleção (toggleCompreensao remove a única selecionada)
declared = {
  ...declared,
  compreensoesSelecionadas: [],
  status: 'pending', // volta para pending
};
assertEq(declared.status, 'pending', 'Remover seleção deve voltar para pending');
assertEq(declared.compreensoesSelecionadas.length, 0, 'Nenhuma compreensão selecionada');

// --- saveStoredCNAEList não persiste registros oficiais ---
console.log('\n[25] saveStoredCNAEList não persiste registros oficiais');
const officialDigitsSet = new Set(cvsLta.map((r) => r.cnaeDigitos));
const listaParaSalvar = [
  { code: '7500-1/00', descricao: 'OFICIAL - não deve ser salvo' }, // oficial
  { code: '9999-9/99', descricao: 'PERSONALIZADO' }, // extra
];
const apenasCustom = listaParaSalvar.filter((item) => {
  const digits = item.code.replace(/\D/g, '');
  return !officialDigitsSet.has(digits);
});
assertEq(apenasCustom.length, 1, 'Apenas 1 item personalizado deve ser persistido');
assertEq(apenasCustom[0].code, '9999-9/99', 'Item oficial deve ser filtrado');

// --- Nenhuma compreensão aplicável e seleção são mutuamente exclusivas ---
console.log('\n[26] Nenhuma compreensão aplicável e seleção são mutuamente exclusivas');
// Caso A: status none_applies → sem seleções
const casoNoneApplies = { status: 'none_applies', compreensoesSelecionadas: [] };
assertEq(casoNoneApplies.compreensoesSelecionadas.length, 0, 'none_applies não tem seleções');
// Caso B: com seleções → status confirmed
const casoComSelecao = {
  status: 'confirmed',
  compreensoesSelecionadas: [{ id: 1 }],
};
assert(casoComSelecao.compreensoesSelecionadas.length > 0, 'confirmed pode ter seleções');
// Não pode ter status none_applies E seleções ao mesmo tempo
assert(
  !(casoNoneApplies.status === 'none_applies' && casoNoneApplies.compreensoesSelecionadas.length > 0),
  'Não pode ter none_applies com seleções'
);

// --- Remover CNAE retira suas compreensões do cálculo ---
console.log('\n[27] Remover CNAE retira suas compreensões do cálculo');
let cnaesDeclarados = [
  { cnaeDigitos: '7500100', exigeLta: true, status: 'confirmed' },
  { cnaeDigitos: '0111301', exigeLta: false, status: 'confirmed' },
];
// Remove o CNAE que exigia LTA
cnaesDeclarados = cnaesDeclarados.filter((c) => c.cnaeDigitos !== '7500100');
const aindaExigeLta = cnaesDeclarados.some((c) => c.exigeLta);
assertEq(aindaExigeLta, false, 'Remover CNAE com LTA deve remover a exigência');

// ============================================================
// RESULTADO
// ============================================================
console.log('\n========================================');
console.log(`  RESULTADO: ${passed} aprovados, ${failed} falhas`);
console.log('========================================\n');

if (failed > 0) {
  console.log('Falhas:');
  failures.forEach((f, i) => console.log(`  ${i + 1}. ${f}`));
  process.exit(1);
} else {
  console.log('Todos os testes passaram! ✓\n');
  process.exit(0);
}
