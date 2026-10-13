import { CVS_LTA_RECORDS, isCnaeInCvsList } from '../data/cvsLtaService';
import { IBGE_SUBCLASSES, IbgeSubclassItem } from '../data/ibgeSubclassesData';

export interface IbgeCnaeResult {
  id: string; // 7 dígitos, ex: "4711301"
  cnaeFormatado: string; // "4711-3/01"
  descricao: string;
  classeDescricao?: string;
  grupoDescricao?: string;
  secaoDescricao?: string;
  isInCvs01: boolean;
}

/**
 * Limpa uma string para manter apenas os dígitos numéricos
 */
export function cleanCnaeDigits(raw: string): string {
  return (raw || '').replace(/\D/g, '');
}

/**
 * Formata dígitos numéricos para o padrão de subclasse CNAE: XXXX-X/XX
 */
export function formatCnaeCode(digitsOrRaw: string): string {
  const digits = cleanCnaeDigits(digitsOrRaw);
  if (digits.length === 7) {
    return `${digits.slice(0, 4)}-${digits.slice(4, 5)}/${digits.slice(5, 7)}`;
  }
  if (digits.length === 5) {
    return `${digits.slice(0, 4)}-${digits.slice(4, 5)}`;
  }
  return digitsOrRaw.trim();
}

/**
 * Normaliza texto para busca insensível a acentos
 */
function normalizeSearchText(text: string): string {
  return (text || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Verifica se um código CNAE consta no Anexo I da Portaria CVS 01/2024
 */
export function isCnaeInCvs01(digitsOrCode: string): boolean {
  return isCnaeInCvsList(digitsOrCode);
}

/**
 * Busca rápida local nas 1.332 subclasses oficiais do IBGE Concla
 * Suporta busca por código CNAE (ex: "2099-1", "4781", "2099101") ou por texto ("fotografia", "roupa", "software")
 */
export function searchIbgeSubclasses(query: string, maxResults: number = 25): IbgeCnaeResult[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const digits = cleanCnaeDigits(trimmed);
  const normalizedQuery = normalizeSearchText(trimmed);

  const matched: IbgeCnaeResult[] = [];

  for (const item of IBGE_SUBCLASSES) {
    let isMatch = false;

    // 1. Se informou dígitos numéricos (mínimo 3)
    if (digits.length >= 3) {
      if (item.id.startsWith(digits) || item.id.includes(digits)) {
        isMatch = true;
      }
    }

    // 2. Busca por texto na descrição e seção
    if (!isMatch && normalizedQuery.length >= 3) {
      const itemDesc = normalizeSearchText(item.descricao);
      const itemSecao = normalizeSearchText(item.secao || '');
      if (itemDesc.includes(normalizedQuery) || itemSecao.includes(normalizedQuery)) {
        isMatch = true;
      }
    }

    if (isMatch) {
      const formatted = formatCnaeCode(item.id);
      const inCvs = isCnaeInCvs01(item.id);

      matched.push({
        id: item.id,
        cnaeFormatado: formatted,
        descricao: item.descricao,
        secaoDescricao: item.secao,
        isInCvs01: inCvs,
      });

      if (matched.length >= maxResults) break;
    }
  }

  return matched;
}

/**
 * Consulta a API pública oficial do IBGE para obter lista de subclasses
 * Retorna TODAS as subclasses retornadas pela API (sem limitar a apenas uma)
 */
export async function fetchIbgeCnaeSubclasses(
  codeOrDigits: string
): Promise<{ success: boolean; data?: IbgeCnaeResult[]; error?: string }> {
  const digits = cleanCnaeDigits(codeOrDigits);

  if (digits.length < 4) {
    return {
      success: false,
      error: 'Informe ao menos 4 ou 5 dígitos do código CNAE.',
    };
  }

  // Se tem 7 dígitos consulta subclasse exata; se tem 4 ou 5 dígitos busca subclasses da classe
  const isSubclass = digits.length >= 7;
  const cleanId = isSubclass ? digits.slice(0, 7) : digits.slice(0, 5);
  const url = isSubclass
    ? `https://servicodados.ibge.gov.br/api/v2/cnae/subclasses/${cleanId}`
    : `https://servicodados.ibge.gov.br/api/v2/cnae/classes/${cleanId}/subclasses`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      // Fallback para busca local
      const localMatches = searchIbgeSubclasses(codeOrDigits, 20);
      if (localMatches.length > 0) {
        return { success: true, data: localMatches };
      }
      return {
        success: false,
        error: `Serviço do IBGE retornou código ${response.status}. Verifique o código informado.`,
      };
    }

    const payload = await response.json();

    const items: any[] = Array.isArray(payload) ? payload : payload ? [payload] : [];

    if (items.length === 0) {
      // Tenta busca local como fallback
      const localMatches = searchIbgeSubclasses(codeOrDigits, 20);
      if (localMatches.length > 0) {
        return { success: true, data: localMatches };
      }
      return {
        success: false,
        error: `CNAE "${codeOrDigits}" não localizado na base do IBGE.`,
      };
    }

    const results: IbgeCnaeResult[] = items.map((item) => ({
      id: item.id,
      cnaeFormatado: formatCnaeCode(item.id),
      descricao: item.descricao || '',
      classeDescricao: item.classe?.descricao,
      grupoDescricao: item.classe?.grupo?.descricao,
      secaoDescricao: item.classe?.grupo?.divisao?.secao?.descricao,
      isInCvs01: isCnaeInCvs01(item.id),
    }));

    return {
      success: true,
      data: results,
    };
  } catch (err: any) {
    clearTimeout(timeoutId);
    // Fallback para a base local já embutida!
    const localMatches = searchIbgeSubclasses(codeOrDigits, 20);
    if (localMatches.length > 0) {
      return { success: true, data: localMatches };
    }
    return {
      success: false,
      error: 'Não foi possível consultar a API do IBGE no momento. Verifique sua conexão.',
    };
  }
}

// Mantido para compatibilidade se algo ainda chamar fetchIbgeCnaeSubclass
export async function fetchIbgeCnaeSubclass(
  codeOrDigits: string
): Promise<{ success: boolean; data?: IbgeCnaeResult; error?: string }> {
  const res = await fetchIbgeCnaeSubclasses(codeOrDigits);
  if (res.success && res.data && res.data.length > 0) {
    return { success: true, data: res.data[0] };
  }
  return { success: false, error: res.error || 'CNAE não encontrado.' };
}

