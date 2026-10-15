import conclaDataRaw from './conclaCnaeDatabase.json';
import { CVS_LTA_RECORDS, checkHasDoc52, getDigitsOnly } from './cvsLtaService';
import { ConclaSubclass, SelectedCompreensao } from '../types';

const CONCLA_SUBCLASSES: ConclaSubclass[] = conclaDataRaw as ConclaSubclass[];

/**
 * Mapa de CNAE (dígitos) para lista de registros CVS 01.
 * Permite recuperar rapidamente as compreensões sanitárias de qualquer CNAE.
 */
const CVS_BY_CNAE_DIGITOS = new Map<string, typeof CVS_LTA_RECORDS>();
for (const rec of CVS_LTA_RECORDS) {
  const key = rec.cnaeDigitos || getDigitsOnly(rec.cnae);
  if (!CVS_BY_CNAE_DIGITOS.has(key)) {
    CVS_BY_CNAE_DIGITOS.set(key, []);
  }
  CVS_BY_CNAE_DIGITOS.get(key)!.push(rec);
}

/**
 * Normaliza texto para busca: remove acentos, pontuação, múltiplos espaços,
 * converte para minúsculas. Torna a busca insensível a acentos, maiúsculas e pontuação.
 */
export function normalizeText(text: string): string {
  return String(text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Reordena o descritor CONCLA para leitura natural em português.
 *
 * O formato oficial da CONCLA/IBGE é "[ITEM]; [ATIVIDADE] DE", onde a preposição
 * "DE" no final se refere ao item no início. Ex.: "ARROZ; CULTIVO DE".
 * Para exibição, reordenamos para "[ATIVIDADE] DE [ITEM]" → "CULTIVO DE ARROZ",
 * evitando a sensação de texto "cortado".
 *
 * Não modifica o dado original — apenas a apresentação.
 */
export function formatDescritorForDisplay(text: string): string {
  if (!text) return text;
  const idx = text.indexOf(';');
  if (idx === -1) return text;
  const item = text.slice(0, idx).trim();
  const activity = text.slice(idx + 1).trim();
  if (item && activity) {
    return `${activity} ${item}`;
  }
  return text;
}

/**
 * Retorna as compreensões CVS 01 para um CNAE (por dígitos).
 */
export function getCvsCompreensoesByCnaeDigitos(cnaeDigitos: string): SelectedCompreensao[] {
  const records = CVS_BY_CNAE_DIGITOS.get(cnaeDigitos) || [];
  return records.map((rec) => ({
    cvsRecordId: rec.id,
    cnae: rec.cnae,
    agrupamento: rec.agrupamento,
    compreensao: rec.compreensao,
    risco: rec.risco,
    documentoPrevio: rec.documentoPrevio,
    documentosInspecao: rec.documentosInspecao,
    naoCompreende: rec.naoCompreende,
    paginaCvs: rec.paginaCvs,
    exigeLta: rec.exigeLta !== undefined ? rec.exigeLta : checkHasDoc52(rec.documentosInspecao),
  }));
}

/**
 * Verifica se um CNAE (por dígitos) consta no Anexo I da Portaria CVS 01.
 */
export function isCnaeInCvs01ByDigitos(cnaeDigitos: string): boolean {
  return CVS_BY_CNAE_DIGITOS.has(cnaeDigitos);
}

/**
 * Resultado de busca integrada.
 */
export interface IntegratedSearchResult {
  cnaeDigitos: string;
  cnaeFormatado: string;
  descricao: string;
  secao: string;
  secaoDescricao: string;
  isInCvs01: boolean;
  compreensoesCount: number;
  temExigenciaLta: boolean;
  temDispensaLta: boolean;
  /** Campos onde o termo foi encontrado (para relevância) */
  matchFields: string[];
  /** Primeiro campo onde houve casamento (para exibição) */
  matchedField: string;
  /** Texto do descritor/compreensão que casou (para exibição) */
  matchedText: string;
}

/**
 * Busca integrada nas 1.332 subclasses CONCLA.
 * Pesquisa por: código CNAE, denominação oficial, descritores CONCLA e compreensão CVS 01.
 *
 * Não carrega os 17.180 descritores visualmente — apenas retorna as subclasses
 * que contêm o termo, com filtragem progressiva.
 */
export function searchIntegrated(query: string, maxResults: number = 30): IntegratedSearchResult[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const normalizedQuery = normalizeText(trimmed);
  if (normalizedQuery.length < 3) return [];

  const digits = getDigitsOnly(trimmed);
  const isCodeSearch = digits.length >= 3 && normalizedQuery.length === digits.length;

  const results: IntegratedSearchResult[] = [];

  for (const subclass of CONCLA_SUBCLASSES) {
    const matchFields: string[] = [];

    // 1. Busca por código CNAE
    if (digits.length >= 3) {
      if (subclass.cnaeDigitos.startsWith(digits) || subclass.cnaeDigitos.includes(digits)) {
        matchFields.push('cnae');
      }
    }

    // 2. Busca por denominação oficial
    if (!isCodeSearch) {
      const normDesc = normalizeText(subclass.descricao);
      if (normDesc.includes(normalizedQuery)) {
        matchFields.push('descricao');
      }

      // 3. Busca por descritores CONCLA (atividades)
      if (matchFields.length === 0) {
        const hasDescritor = subclass.atividades.some((a) =>
          normalizeText(a).includes(normalizedQuery)
        );
        if (hasDescritor) matchFields.push('descritor');
      }

      // 4. Busca por compreensão CVS 01 (se o CNAE estiver na CVS)
      if (matchFields.length === 0) {
        const cvsRecords = CVS_BY_CNAE_DIGITOS.get(subclass.cnaeDigitos) || [];
        const hasCompreensao = cvsRecords.some((r) =>
          normalizeText(r.compreensao).includes(normalizedQuery)
        );
        if (hasCompreensao) matchFields.push('compreensao');
      }

      // 5. Busca por seção/divisão
      if (matchFields.length === 0) {
        if (normalizeText(subclass.secao?.descricao).includes(normalizedQuery)) {
          matchFields.push('secao');
        }
      }
    }

    if (matchFields.length > 0) {
      const cvsRecords = CVS_BY_CNAE_DIGITOS.get(subclass.cnaeDigitos) || [];
      const temExigenciaLta = cvsRecords.some((r) =>
        r.exigeLta !== undefined ? r.exigeLta : checkHasDoc52(r.documentosInspecao)
      );
      const temDispensaLta = cvsRecords.some((r) =>
        !(r.exigeLta !== undefined ? r.exigeLta : checkHasDoc52(r.documentosInspecao))
      );

      // Determina o primeiro campo de casamento e o texto correspondente
      const matchedField = matchFields[0];
      let matchedText = '';
      if (matchedField === 'descritor') {
        const found = subclass.atividades.find((a) =>
          normalizeText(a).includes(normalizedQuery)
        );
        matchedText = found || '';
      } else if (matchedField === 'compreensao') {
        const found = cvsRecords.find((r) =>
          normalizeText(r.compreensao).includes(normalizedQuery)
        );
        matchedText = found?.compreensao || '';
      }

      results.push({
        cnaeDigitos: subclass.cnaeDigitos,
        cnaeFormatado: subclass.cnaeFormatado,
        descricao: subclass.descricao,
        secao: subclass.secao?.id || '',
        secaoDescricao: subclass.secao?.descricao || '',
        isInCvs01: cvsRecords.length > 0,
        compreensoesCount: cvsRecords.length,
        temExigenciaLta,
        temDispensaLta,
        matchFields,
        matchedField,
        matchedText,
      });

      if (results.length >= maxResults) break;
    }
  }

  // Ordena por relevância
  results.sort((a, b) => {
    const score = (r: IntegratedSearchResult) => {
      let s = 0;
      if (r.matchFields.includes('cnae')) s += 1000;
      if (r.matchFields.includes('descricao')) s += 500;
      if (r.matchFields.includes('compreensao')) s += 300;
      if (r.matchFields.includes('descritor')) s += 100;
      if (r.matchFields.includes('secao')) s += 50;
      // CNAEs na CVS 01 aparecem primeiro
      if (r.isInCvs01) s += 20;
      return s;
    };
    return score(b) - score(a);
  });

  return results;
}

/**
 * Retorna uma subclass CONCLA por seus dígitos.
 */
export function getConclaSubclassByDigitos(cnaeDigitos: string): ConclaSubclass | undefined {
  return CONCLA_SUBCLASSES.find((s) => s.cnaeDigitos === cnaeDigitos);
}

/**
 * Retorna todas as subclasses CONCLA.
 */
export function getAllConclaSubclasses(): ConclaSubclass[] {
  return CONCLA_SUBCLASSES;
}
