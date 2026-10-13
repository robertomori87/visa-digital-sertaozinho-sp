import cvsDataRaw from './cvsLta.json';
import { CvsLtaRecord, CNAEGroupSummary, CNAEItem } from '../types';
import { PORTARIA_CVS_LABEL } from './normativeMetadata';

export const CVS_LTA_RECORDS: CvsLtaRecord[] = cvsDataRaw as CvsLtaRecord[];

/**
 * Remove any non-digits from string
 */
export function getDigitsOnly(str: string): string {
  return String(str || '').replace(/\D/g, '');
}

/**
 * Standardize CNAE search query or format
 */
export function normalizeCnaeInput(input: string): string {
  if (!input) return '';
  return input.trim().toUpperCase();
}

/**
 * Verifica se a string de documentos durante a inspeção contém o documento 52 (LTA)
 * Regra oficial da Portaria CVS 01/2024:
 * Documento 52 = Laudo Técnico de Avaliação aprovado pela Vigilância Sanitária
 */
export function checkHasDoc52(documentosInspecao?: string): boolean {
  if (!documentosInspecao) return false;
  return /(?:^|\D)52(?:\D|$)/.test(documentosInspecao);
}

/**
 * Returns list of distinct Agrupamentos from CVS 01
 */
export function getAgrupamentos(): string[] {
  const groups = new Set<string>();
  for (const item of CVS_LTA_RECORDS) {
    if (item.agrupamento) {
      groups.add(item.agrupamento.trim());
    }
  }
  return Array.from(groups).sort((a, b) => a.localeCompare(b, 'pt-BR'));
}

/**
 * Groups raw records by CNAE code with LTA requirements computed per group and record
 */
function groupRecordsByCnae(records: CvsLtaRecord[]): CNAEGroupSummary[] {
  const map = new Map<string, CNAEGroupSummary>();

  for (const rec of records) {
    const key = rec.cnaeNormalizado || rec.cnae;
    if (!map.has(key)) {
      map.set(key, {
        cnae: rec.cnae,
        cnaeNormalizado: rec.cnaeNormalizado,
        cnaeDigitos: rec.cnaeDigitos || getDigitsOnly(rec.cnae),
        descricaoCnae: rec.descricaoCnae,
        agrupamento: rec.agrupamento,
        registros: [],
        compreensoesCount: 0,
        temExigenciaLta: false,
        temDispensaLta: false,
        registrosComLta: 0,
        registrosSemLta: 0,
      });
    }
    const group = map.get(key)!;
    group.registros.push(rec);
    group.compreensoesCount = group.registros.length;

    const isLta = rec.exigeLta !== undefined ? rec.exigeLta : checkHasDoc52(rec.documentosInspecao);
    if (isLta) {
      group.temExigenciaLta = true;
      group.registrosComLta = (group.registrosComLta || 0) + 1;
    } else {
      group.temDispensaLta = true;
      group.registrosSemLta = (group.registrosSemLta || 0) + 1;
    }
  }

  return Array.from(map.values());
}

/**
 * Returns all distinct CNAE groups across the database
 */
export function getAllDistinctCnaes(): CNAEGroupSummary[] {
  return groupRecordsByCnae(CVS_LTA_RECORDS);
}

/**
 * Returns all CNAEs for a given Agrupamento
 */
export function getAtividadesPorAgrupamento(agrupamento: string): CNAEGroupSummary[] {
  const cleanGroup = agrupamento.trim().toUpperCase();
  const matched = CVS_LTA_RECORDS.filter(
    (r) => r.agrupamento.trim().toUpperCase() === cleanGroup
  );
  return groupRecordsByCnae(matched);
}

/**
 * Returns all compreensões for a specific CNAE
 */
export function getCompreensoesPorCnae(cnae: string): CvsLtaRecord[] {
  const queryDigits = getDigitsOnly(cnae);
  const queryClean = cnae.trim().toUpperCase();

  return CVS_LTA_RECORDS.filter((r) => {
    if (r.cnaeNormalizado && r.cnaeNormalizado.toUpperCase() === queryClean) return true;
    if (queryDigits && r.cnaeDigitos === queryDigits) return true;
    if (r.cnae.toUpperCase() === queryClean) return true;
    return false;
  });
}

/**
 * Retorna o status de exigência de LTA para um código CNAE:
 * - 'EXIGE_LTA_SEMPRE': todas as compreensões deste CNAE exigem LTA (doc 52)
 * - 'DISPENSADO_SEMPRE': todas as compreensões deste CNAE estão dispensadas de LTA (sem doc 52)
 * - 'MISTO': dentro do mesmo CNAE, algumas compreensões exigem LTA e outras estão dispensadas
 * - 'NAO_CONSTA': o CNAE não consta no Anexo I da Portaria CVS 01/2024 (dispensado de LTA)
 */
export function getCnaeLtaStatus(cnae: string): 'EXIGE_LTA_SEMPRE' | 'DISPENSADO_SEMPRE' | 'MISTO' | 'NAO_CONSTA' {
  const compreensões = getCompreensoesPorCnae(cnae);
  if (compreensões.length === 0) return 'NAO_CONSTA';

  let hasLta = false;
  let hasNoLta = false;

  for (const c of compreensões) {
    const isLta = c.exigeLta !== undefined ? c.exigeLta : checkHasDoc52(c.documentosInspecao);
    if (isLta) hasLta = true;
    else hasNoLta = true;
  }

  if (hasLta && hasNoLta) return 'MISTO';
  if (hasLta) return 'EXIGE_LTA_SEMPRE';
  return 'DISPENSADO_SEMPRE';
}

/**
 * Search activities by CNAE code, description, or comprehension
 */
export function searchAtividades(termo: string): CNAEGroupSummary[] {
  if (!termo || !termo.trim()) {
    return [];
  }

  const query = termo.trim().toLowerCase();
  const queryDigits = getDigitsOnly(termo);
  const isCnaeCodeSearch = queryDigits.length >= 4 && !/[a-zA-Z]/.test(termo);

  // CASO 1: Busca por código CNAE completo de 7 dígitos (ex: "3250-7/06" ou "3250706")
  // Retorna única e exclusivamente o CNAE pesquisado, sem trazer outros CNAEs que apenas citam esse código em notas de exclusão
  if (queryDigits.length === 7) {
    const exactRecords = CVS_LTA_RECORDS.filter(
      (r) => r.cnaeDigitos === queryDigits || r.cnaeNormalizado?.replace(/\D/g, '') === queryDigits
    );
    return groupRecordsByCnae(exactRecords);
  }

  // CASO 2: Busca por prefixo numérico de código CNAE (ex: "3250" ou "3250-7")
  // Pesquisa apenas os códigos CNAE que iniciam com esses dígitos
  if (isCnaeCodeSearch) {
    const prefixRecords = CVS_LTA_RECORDS.filter(
      (r) => r.cnaeDigitos.startsWith(queryDigits) || (r.cnae && r.cnae.toLowerCase().includes(query))
    );
    return groupRecordsByCnae(prefixRecords);
  }

  // CASO 3: Busca textual por termos/palavras-chave (ex: "prótese", "padaria", "farmácia")
  // Filtra registros que contenham o termo
  const matchedRecords = CVS_LTA_RECORDS.filter((r) => {
    // Dígitos do CNAE
    if (queryDigits.length >= 3 && r.cnaeDigitos.includes(queryDigits)) {
      return true;
    }
    // Formato CNAE
    if (r.cnae.toLowerCase().includes(query)) {
      return true;
    }
    // Descrição do CNAE
    if (r.descricaoCnae.toLowerCase().includes(query)) {
      return true;
    }
    // Compreensão
    if (r.compreensao.toLowerCase().includes(query)) {
      return true;
    }
    // Agrupamento
    if (r.agrupamento.toLowerCase().includes(query)) {
      return true;
    }
    // Não compreende (apenas para termos de busca textuais)
    if (r.naoCompreende && r.naoCompreende.toLowerCase().includes(query)) {
      return true;
    }
    return false;
  });

  const grouped = groupRecordsByCnae(matchedRecords);

  // Ordena por relevância para que resultados diretos fiquem sempre no topo
  grouped.sort((a, b) => {
    const scoreGroup = (g: CNAEGroupSummary) => {
      let score = 0;
      if (g.cnaeDigitos === queryDigits) score += 1000;
      else if (queryDigits.length >= 3 && g.cnaeDigitos.startsWith(queryDigits)) score += 500;
      else if (g.cnae.toLowerCase().includes(query)) score += 400;

      if (g.descricaoCnae.toLowerCase() === query) score += 300;
      else if (g.descricaoCnae.toLowerCase().includes(query)) score += 200;

      const anyCompMatch = g.registros.some((r) => r.compreensao.toLowerCase().includes(query));
      if (anyCompMatch) score += 100;

      const anyGroupMatch = g.agrupamento.toLowerCase().includes(query);
      if (anyGroupMatch) score += 50;

      return score;
    };

    return scoreGroup(b) - scoreGroup(a);
  });

  return grouped;
}

/**
 * Find exact record by CNAE and Compreensao
 */
export function getRegistroPorCnaeECompreensao(
  cnae: string,
  compreensao: string
): CvsLtaRecord | undefined {
  const queryDigits = getDigitsOnly(cnae);
  const cleanComp = compreensao.trim().toLowerCase();

  return CVS_LTA_RECORDS.find((r) => {
    const cnaeMatch =
      r.cnae.trim() === cnae.trim() ||
      (queryDigits.length >= 5 && r.cnaeDigitos === queryDigits);
    const compMatch = r.compreensao.trim().toLowerCase() === cleanComp;
    return cnaeMatch && compMatch;
  });
}

/**
 * Check if a CNAE exists in the CVS 01 list
 */
export function isCnaeInCvsList(cnae: string): boolean {
  const queryDigits = getDigitsOnly(cnae);
  if (!queryDigits) return false;
  const clean = cnae.trim().toUpperCase();

  return CVS_LTA_RECORDS.some((r) => {
    if (r.cnae.toUpperCase() === clean || (r.cnaeNormalizado && r.cnaeNormalizado.toUpperCase() === clean)) {
      return true;
    }
    const recDigits = r.cnaeDigitos || getDigitsOnly(r.cnae);
    if (!recDigits) return false;
    if (recDigits === queryDigits) return true;
    // Se no CVS 01 a classe termina em /00 (cnaeDigitos termina em 00), engloba subclasses daquela classe
    if (recDigits.endsWith('00') && queryDigits.length === 7 && recDigits.slice(0, 5) === queryDigits.slice(0, 5)) {
      return true;
    }
    return false;
  });
}

/**
 * Convert a CvsLtaRecord into a CNAEItem for backward compatibility
 */
export function cvsRecordToCnaeItem(record: CvsLtaRecord, index?: number): CNAEItem {
  let icon = 'business_center';
  const group = record.agrupamento.toUpperCase();
  if (group.includes('ALIMENTO')) icon = 'restaurant';
  else if (group.includes('SAÚDE') || group.includes('SAUDE') || group.includes('HOSPITAL') || group.includes('MÉDICA')) icon = 'local_hospital';
  else if (group.includes('FARMÁCIA') || group.includes('MEDICAMENTO') || group.includes('FARMACIA')) icon = 'medication';
  else if (group.includes('INDÚSTRIA') || group.includes('INDUSTRIA')) icon = 'factory';
  else if (group.includes('RESÍDUO') || group.includes('RESIDUO')) icon = 'delete_forever';
  else if (group.includes('LABORATÓRIO') || group.includes('LABORATORIO')) icon = 'science';
  else if (group.includes('VETERINÁRIA') || group.includes('VETERINARIA')) icon = 'pets';
  else if (group.includes('TRANSPORTE')) icon = 'local_shipping';
  else if (group.includes('COSMÉTICO') || group.includes('ESTÉTICA')) icon = 'spa';

  const isLtaReq = record.exigeLta !== undefined ? record.exigeLta : checkHasDoc52(record.documentosInspecao);

  return {
    id: `cvs-${record.cnaeNormalizado}-${index ?? record.id ?? 0}`,
    code: record.cnaeNormalizado,
    description: record.descricaoCnae,
    compreensao: record.compreensao,
    riskLevel: record.risco || (isLtaReq ? 'III ALTO' : 'Baixo'),
    category: record.agrupamento,
    ltaRequiredDefault: isLtaReq,
    requiresQuestions: isLtaReq,
    icon,
    documentoPrevio: record.documentoPrevio,
    documentosInspecao: record.documentosInspecao,
    naoCompreende: record.naoCompreende,
    paginaCvs: record.paginaCvs,
    agrupamento: record.agrupamento,
    notes: `Compreensão: ${record.compreensao}`,
    legislationRef: record.paginaCvs
      ? `${PORTARIA_CVS_LABEL} - Pag. ${record.paginaCvs}`
      : PORTARIA_CVS_LABEL
  };
}

/**
 * Verifica se uma atividade selecionada exige Laudo Técnico de Avaliação (LTA).
 * Regra oficial da Portaria CVS 01/2024:
 * Exige LTA quando constar o documento nº 52 na coluna "DOCUMENTOS DURANTE INSPEÇÃO".
 * Quando não constar o documento 52, ou quando a atividade estiver fora da CVS 01, ela está DISPENSADA de LTA.
 */
export function isActivityLtaRequired(act: {
  agrupamento?: string;
  risco?: string;
  documentoPrevio?: string;
  documentosInspecao?: string;
  compreensao?: string;
  cnae?: string;
  cnaeNormalizado?: string;
  cnaeDigitos?: string;
  exigeLta?: boolean;
} | null | undefined): boolean {
  if (!act) return false;

  // 1. Se explicitamente possui a flag exigeLta (calculada diretamente do banco de dados CVS 01)
  if (act.exigeLta !== undefined) {
    return Boolean(act.exigeLta);
  }

  // 2. Sem atividade definida
  if (
    act.cnae === 'SEM CNAE' ||
    act.agrupamento?.includes('SEM ATIVIDADE') ||
    act.compreensao?.toLowerCase().includes('sem atividade')
  ) {
    return false;
  }

  // 3. Verificação direta do documento 52 nos documentos durante inspeção
  if (act.documentosInspecao) {
    return checkHasDoc52(act.documentosInspecao);
  }

  // 4. Verificação no banco de dados da CVS 01 por CNAE e Compreensão
  if (act.cnae && act.compreensao) {
    const matchedRecord = getRegistroPorCnaeECompreensao(act.cnae, act.compreensao);
    if (matchedRecord) {
      if (matchedRecord.exigeLta !== undefined) return matchedRecord.exigeLta;
      return checkHasDoc52(matchedRecord.documentosInspecao);
    }
  }

  // 5. Atividades do IBGE ou não constantes na CVS 01 estão dispensadas
  const agrupamentoUpper = (act.agrupamento || '').toUpperCase();
  if (
    agrupamentoUpper.includes('NÃO CONSTANTE') ||
    agrupamentoUpper.includes('NAO CONSTANTE') ||
    agrupamentoUpper.includes('IBGE') ||
    agrupamentoUpper.includes('ISENTO') ||
    agrupamentoUpper.includes('DISPENSAD')
  ) {
    return false;
  }

  // 6. Verificação no Anexo I da Portaria CVS 01/2024:
  // Se o CNAE sequer consta na Portaria CVS 01, não exige LTA
  const rawCnae = act.cnae || act.cnaeNormalizado || '';
  if (rawCnae && !isCnaeInCvsList(rawCnae)) {
    return false;
  }

  return false;
}

/**
 * Converte o campo 'naoCompreende' em uma lista de itens limpos e formatados,
 * substituindo caracteres defeituosos (como \uf0b7) por bullets universais e removendo cabeçalhos redundantes.
 */
export function formatNaoCompreendeItems(text?: string): string[] {
  if (!text) return [];
  const trimmed = text.trim();
  if (!trimmed || trimmed === 'NÃO SE APLICA' || trimmed === 'NAO SE APLICA') return [];

  // Substitui qualquer caractere residual de fonte Word (0xF0B7) por marcador padrão
  const sanitized = trimmed.replace(/[\uf0b7]/g, '•');

  // Remove cabeçalhos repetitivos tipo "NÃO COMPREENDE:"
  const withoutHeader = sanitized
    .replace(/^NÃO\s+COMPREENDE\s*:?\s*/i, '')
    .replace(/^NAO\s+COMPREENDE\s*:?\s*/i, '');

  return withoutHeader
    .split('\n')
    .map((line) => line.replace(/^[\s•\-\*]+/, '').trim())
    .filter((line) => line.length > 0 && !/^NÃO\s+SE\s+APLICA$/i.test(line));
}
