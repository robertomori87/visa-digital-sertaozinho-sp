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
  /** FASE 3: Descritores CONCLA selecionados pelo requerente (agrupados por CNAE) */
  descritoresSelecionados?: string[];
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
  /** FASE 2: Versão da base normativa utilizada na consulta (rastreabilidade) */
  normativeVersion?: string;
  /** FASE 2: Hash SHA-256 da base normativa CVS 01 utilizada */
  normativeHash?: string;
}

export type StepId = 'identificacao' | 'atividade' | 'conclusao' | 'comprovante';

export type TopTab = 'inicio' | 'servicos' | 'protocolo';

/**
 * Status de verificação de um CNAE declarado.
 * - pending: o usuário ainda não confirmou quais compreensões se aplicam
 * - confirmed: o usuário selecionou uma ou mais compreensões aplicáveis
 * - none_applies: o usuário confirmou expressamente que nenhuma compreensão se aplica
 */
export type VerificationStatus = 'pending' | 'confirmed' | 'none_applies';

/**
 * Camada A — Atividade econômica CONCLA/IBGE.
 * Identifica o CNAE, sua denominação oficial e os descritores selecionados.
 */
export interface ConclaSubclass {
  cnaeDigitos: string;
  cnaeFormatado: string;
  descricao: string;
  secao: { id: string; descricao: string };
  divisao: { id: string; descricao: string };
  grupo: { id: string; descricao: string };
  classe: { id: string; descricao: string };
  atividades: string[];
  observacoes?: string[];
}

/**
 * Compreensão sanitária CVS 01 selecionada para um CNAE declarado.
 * Camada B — Compreensão sanitária.
 */
export interface SelectedCompreensao {
  cvsRecordId?: number | string;
  cnae: string;
  agrupamento: string;
  compreensao: string;
  risco: string;
  documentoPrevio: string;
  documentosInspecao: string;
  naoCompreende: string;
  paginaCvs: string | number;
  exigeLta: boolean;
}

/**
 * CNAE declarado pelo usuário com sua verificação de compreensões.
 * Une a Camada A (econômica) com a Camada B (sanitária).
 */
export interface DeclaredCnae {
  /** CNAE no formato XXXX-X/XX */
  cnae: string;
  /** CNAE apenas dígitos */
  cnaeDigitos: string;
  /** Denominação oficial CONCLA */
  descricaoCnae: string;
  /** Descritores CONCLA selecionados pelo usuário */
  descritoresSelecionados: string[];
  /** Seção/divisão CONCLA para categorização */
  secaoDescricao?: string;
  /** Compreensões CVS 01 disponíveis para este CNAE */
  compreensoesDisponiveis: SelectedCompreensao[];
  /** Compreensões efetivamente selecionadas como aplicáveis */
  compreensoesSelecionadas: SelectedCompreensao[];
  /** Status da verificação */
  status: VerificationStatus;
  /** Se o CNAE não consta na CVS 01 (dispensado de LTA) */
  naoConstaCvs: boolean;
}

/**
 * Resultado consolidado da verificação documental (Camada C).
 */
export interface ConsultaResultado {
  /** Se qualquer compreensão selecionada exige o documento 52 */
  exigeLta: boolean;
  /** Se existe alguma verificação pendente */
  possuiPendencias: boolean;
  /** Lista de CNAEs com pendências */
  cnaesPendentes: string[];
  /** Compreensões que exigem LTA */
  compreensoesComLta: SelectedCompreensao[];
  /** Compreensões dispensadas de LTA */
  compreensoesSemLta: SelectedCompreensao[];
}

