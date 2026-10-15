import { CNAEItem } from '../types';
import { CVS_LTA_RECORDS, cvsRecordToCnaeItem } from './cvsLtaService';

// Initialize list with the real CVS records
export const INITIAL_CNAE_LIST: CNAEItem[] = CVS_LTA_RECORDS.slice(0, 50).map((r, idx) =>
  cvsRecordToCnaeItem(r, idx)
);

const LOCAL_STORAGE_KEY = 'sertaozinho_cvs_lta_custom_cnaes_v2';

/**
 * FASE 2: A base oficial CVS 01 (733 registros) sempre prevalece.
 * Listas personalizadas no localStorage apenas ADICIONAM CNAEs extras,
 * nunca substituem a base normativa oficial.
 */
export function getStoredCNAEList(): CNAEItem[] {
  const officialBase: CNAEItem[] = CVS_LTA_RECORDS.map((r, idx) => cvsRecordToCnaeItem(r, idx));

  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Conjunto de dígitos dos CNAEs oficiais para evitar duplicação
        const officialDigits = new Set(
          officialBase.map((c) => c.code.replace(/\D/g, ''))
        );
        // Adiciona apenas CNAEs que NÃO estão na base oficial
        const extras = parsed.filter((item: CNAEItem) => {
          const digits = item.code.replace(/\D/g, '');
          return !officialDigits.has(digits);
        });
        if (extras.length > 0) {
          return [...officialBase, ...extras];
        }
      }
    }
  } catch (err) {
    console.error('Error loading CNAE list from localStorage:', err);
  }
  return officialBase;
}

export const loadCnaeDatabase = getStoredCNAEList;

/**
 * FASE 2B: Salva apenas CNAEs personalizados que NÃO constam na base oficial CVS 01.
 * Registros oficiais nunca são persistidos no localStorage, garantindo que
 * a base normativa não possa ser modificada por dados de armazenamento antigo.
 *
 * Uma lista personalizada pode conter códigos e descrições econômicas do usuário,
 * mas NÃO pode modificar ou acrescentar: compreensões sanitárias, documentos
 * prévios, documentos de inspeção, riscos ou regras de exigência de LTA.
 * Qualquer atividade personalizada passa pela mesma consulta à base CVS vigente.
 */
export function saveStoredCNAEList(items: CNAEItem[]): void {
  try {
    // Dígitos dos CNAEs oficiais para filtrar
    const officialDigits = new Set(
      CVS_LTA_RECORDS.map((r) => (r.cnaeDigitos || r.cnae || '').replace(/\D/g, ''))
    );
    // Persiste apenas CNAEs que não estão na base oficial
    const onlyCustom = items.filter((item) => {
      const digits = (item.code || '').replace(/\D/g, '');
      return !officialDigits.has(digits);
    });
    if (onlyCustom.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(onlyCustom));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  } catch (err) {
    console.error('Error saving CNAE list to localStorage:', err);
  }
}

export const saveCnaeDatabase = saveStoredCNAEList;

export function resetCNAEListToDefault(): CNAEItem[] {
  try {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  } catch (err) {
    console.error('Error resetting CNAE list:', err);
  }
  return CVS_LTA_RECORDS.map((r, idx) => cvsRecordToCnaeItem(r, idx));
}

export const resetCnaeDatabase = resetCNAEListToDefault;
