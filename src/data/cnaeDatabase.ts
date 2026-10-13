import { CNAEItem } from '../types';
import { CVS_LTA_RECORDS, cvsRecordToCnaeItem } from './cvsLtaService';

// Initialize list with the real CVS records
export const INITIAL_CNAE_LIST: CNAEItem[] = CVS_LTA_RECORDS.slice(0, 50).map((r, idx) =>
  cvsRecordToCnaeItem(r, idx)
);

const LOCAL_STORAGE_KEY = 'sertaozinho_cvs_lta_custom_cnaes_v2';

export function getStoredCNAEList(): CNAEItem[] {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading CNAE list from localStorage:', err);
  }
  return CVS_LTA_RECORDS.map((r, idx) => cvsRecordToCnaeItem(r, idx));
}

export const loadCnaeDatabase = getStoredCNAEList;

export function saveStoredCNAEList(items: CNAEItem[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
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
