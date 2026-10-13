export type RiskLevel = 'Alto' | 'Médio' | 'Baixo' | 'Isento' | 'III ALTO' | 'II MÉDIO' | 'I BAIXO';

export interface CvsLtaRecord {
  id?: number | string;
  agrupamento: string;
  cnae: string;
  cnaeNormalizado: string;
  cnaeDigitos: string;
  descricaoCnae: string;
  compreensao: string;
  risco: string;
  documentoPrevio: string;
  documentosInspecao: string;
  naoCompreende: string;
  paginaCvs: string | number;
  exigeLta?: boolean;
}

export interface CNAEGroupSummary {
  cnae: string;
  cnaeNormalizado: string;
  cnaeDigitos: string;
  descricaoCnae: string;
  agrupamento: string;
  registros: CvsLtaRecord[];
  compreensoesCount: number;
  temExigenciaLta?: boolean;
  temDispensaLta?: boolean;
  registrosComLta?: number;
  registrosSemLta?: number;
}

export interface SelectedCvsActivity {
  cnae: string;
  cnaeNormalizado: string;
  descricaoCnae: string;
  compreensao: string;
  agrupamento: string;
  risco: string;
  documentoPrevio: string;
  documentosInspecao: string;
  naoCompreende: string;
  paginaCvs: string | number;
  confirmedExceptionChecked?: boolean;
  exigeLta?: boolean;
}

// Backward-compatible CNAEItem interface
export interface CNAEItem {
  id: string;
  code: string;
  description: string;
  compreensao?: string;
  riskLevel: string;
  category: string;
  ltaRequiredDefault: boolean;
  requiresQuestions?: boolean;
  icon?: string;
  notes?: string;
  legislationRef?: string;
  documentoPrevio?: string;
  documentosInspecao?: string;
  naoCompreende?: string;
  paginaCvs?: string | number;
  agrupamento?: string;
}

export interface CompanyIdentification {
  cnpjCpf: string;
  razaoSocial: string;
  nomeFantasia: string;
  tipoLogradouro?: string;
  nomeLogradouro?: string;
  endereco: string;
  numero: string;
  numeroSemNumero?: boolean;
  numeroLetra?: string;
  quadra?: string;
  lote?: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  uf: string;
  telefone: string;
  email: string;
  responsavelTecnico: string;
  registroProfissional: string;
}

export interface AssessmentQuestion {
  id: string;
  title: string;
  description: string;
  category: string;
  triggersLtaIfYes: boolean;
  helpText?: string;
}

export interface VerificationResult {
  protocol: string;
  timestamp: string;
  identification: CompanyIdentification;
  selectedCnaes: CNAEItem[];
  selectedCvsActivity?: SelectedCvsActivity;
  selectedCvsActivities?: SelectedCvsActivity[];
  answers?: Record<string, boolean>;
  finalResult: 'LTA_EXIGIDO' | 'LTA_DISPENSADO' | 'SEM_ATIVIDADE' | 'LTA_ANALISE_SIMPLIFICADA' | 'LTA_NAO_ENQUADRADO';
  highestRisk: string;
  riskReason: string;
  authCode: string;
  agrupamento?: string;
  documentoPrevio?: string;
  documentosInspecao?: string;
  naoCompreende?: string;
  paginaCvs?: string | number;
}

export type StepId = 'identificacao' | 'atividade' | 'conclusao' | 'comprovante';

export type TopTab = 'inicio' | 'servicos' | 'protocolo';
