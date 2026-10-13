/**
 * DOCUMENTOS EXIGIDOS PARA ANÁLISE DE LAUDO TÉCNICO DE AVALIAÇÃO (LTA)
 * Base normativa estadual: Portaria CVS 01/2024 / Portaria CVS 10/2017
 * Exigências municipais: Prefeitura Municipal de Sertãozinho-SP (Sempre obrigatórias)
 * 
 * Relação oficial com códigos e tipos:
 * CÓDIGO  TIPO
 * 1       AUTORIZAÇÃO DE CONSTRUÇÃO, EMITIDA PELA COMISSÃO NACIONAL DE ENERGIA NUCLEAR (CNEN) - CÓPIA
 * 2       COMPROVANTE DE RECOLHIMENTO (DARE OU EQUIVALENTE MUNICIPAL) DA TAXA DE LAUDO TÉCNICO DE AVALIAÇÃO DE PROJETO DE EDIFICAÇÃO - ORIGINAL
 * 3       COMPROVANTE DE RESPONSABILIDADE TÉCNICA - ART - ANOTAÇÃO DE RESPONSABILIDADE TÉCNICA OU RRT - REGISTRO DE RESPONSABILIDADE TÉCNICA - CÓPIA
 * 4       MEMORIAL DESCRITIVO DE FLUXOS E DE ATIVIDADES - CÓPIA
 * 5       MEMORIAL DESCRITIVO DO PROJETO ARQUITETÔNICO DA EDIFICAÇÃO - CÓPIA
 * 6       PROJETO ARQUITETÔNICO DA EDIFICAÇÃO (JOGOS DE PLANTAS, COMPLETO) - CÓPIA
 * 7       PROJETO DO TRATAMENTO, DESTINAÇÃO FINAL OU AFASTAMENTO DOS EFLUENTES GERADOS PELO EMPREENDIMENTO (RESOLUÇÃO 430/11 - CONAMA) - CÓPIA
 * 8       PROJETO DO TRATAMENTO, DESTINAÇÃO FINAL OU AFASTAMENTO DOS RESÍDUOS GERADOS PELO EMPREENDIMENTO (LEI 12305/2010 - POLÍTICA NACIONAL DE RESÍDUOS SÓLIDOS - PNRS) – CÓPIA
 * 9       FORMULÁRIO DE SOLICITAÇÃO DE AVALIAÇÃO FÍSICO FUNCIONAL DE PROJETO DE EDIFICAÇÃO
 * 
 * Documentos Exigidos pelo Município (Sempre obrigatórios quando LTA for necessário):
 * MUN-1   CERTIDÃO DE DIRETRIZES DE USO DO SOLO, EMITIDA PELA PREFEITURA MUNICIPAL, DENTRO DO PRAZO DE VALIDADE
 * MUN-2   CÓPIA DO PROJETO COMPLETO APROVADO PELA PREFEITURA /OU PROTOCOLO DO PROCESSO - CONSTRUÇÃO NOVA
 * 
 * Regra de exibição:
 * Esta documentação SOMENTE deve aparecer quando o LTA for obrigatório.
 * Para atividades dispensadas/isentas ou sem atividade vinculada, NENHUMA documentação de LTA deve ser exibida.
 */

import { isActivityLtaRequired } from './cvsLtaService';

export interface DocumentoLtaItem {
  codigo: number | string; // 1 a 9 oficial (CVS) ou código municipal (MUN-1, MUN-2)
  numero?: number; // alias numérico para compatibilidade
  tipo: string; // Título/tipo oficial exigido pela legislação
  titulo: string; // Título formatado para visualização
  resumo: string;
  obrigatorio: boolean;
  origem: 'ESTADUAL_CVS' | 'MUNICIPAL';
  categoria: 'obrigatorio' | 'condicional';
  condicaoAplicacao?: string;
  isEmbutidoAprovaOnline?: boolean;
  observacaoSertaozinho?: string;
  icone: string;
}

export const DOCUMENTOS_OFICIAIS_LTA: DocumentoLtaItem[] = [
  {
    codigo: 1,
    numero: 1,
    tipo: 'AUTORIZAÇÃO DE CONSTRUÇÃO, EMITIDA PELA COMISSÃO NACIONAL DE ENERGIA NUCLEAR (CNEN) - CÓPIA',
    titulo: 'Autorização de Construção emitida pela CNEN - Cópia',
    resumo:
      'Autorização prévia de construção emitida pela Comissão Nacional de Energia Nuclear (CNEN), aplicável caso o estabelecimento manipule ou opere fontes de radiação ionizante.',
    obrigatorio: false,
    origem: 'ESTADUAL_CVS',
    categoria: 'condicional',
    condicaoAplicacao:
      'Exigido exclusivamente para estabelecimentos com fontes de radiação ionizante ou instalações radiológicas (ex.: radiodiagnóstico médico/odontológico de grande porte, medicina nuclear, radioterapia).',
    icone: 'warning',
  },
  {
    codigo: 2,
    numero: 2,
    tipo: 'COMPROVANTE DE RECOLHIMENTO (DARE OU EQUIVALENTE MUNICIPAL) DA TAXA DE LAUDO TÉCNICO DE AVALIAÇÃO DE PROJETO DE EDIFICAÇÃO - ORIGINAL',
    titulo: 'Comprovante de Recolhimento da Taxa de LTA - Original',
    resumo:
      'Taxa Municipal de LTA (Sertãozinho-SP): O Município de Sertãozinho-SP não instituiu taxa para análise de LTA. Portanto, para o protocolo perante a Vigilância Sanitária Municipal, não é exigido comprovante de recolhimento de taxa municipal (DARE ou equivalente).',
    obrigatorio: true,
    origem: 'ESTADUAL_CVS',
    categoria: 'obrigatorio',
    observacaoSertaozinho:
      'Taxa Municipal de LTA (Sertãozinho-SP): O Município de Sertãozinho-SP não instituiu taxa para análise de LTA. Portanto, para o protocolo perante a Vigilância Sanitária Municipal, não é exigido comprovante de recolhimento de taxa municipal (DARE ou equivalente).',
    icone: 'receipt_long',
  },
  {
    codigo: 3,
    numero: 3,
    tipo: 'COMPROVANTE DE RESPONSABILIDADE TÉCNICA - ART - ANOTAÇÃO DE RESPONSABILIDADE TÉCNICA OU RRT - REGISTRO DE RESPONSABILIDADE TÉCNICA - CÓPIA',
    titulo: 'Comprovante de Responsabilidade Técnica (ART / RRT) - Cópia',
    resumo:
      'ART (CREA) ou RRT (CAU) do profissional legalmente habilitado responsável pelo projeto arquitetônico da edificação.',
    obrigatorio: true,
    origem: 'ESTADUAL_CVS',
    categoria: 'obrigatorio',
    icone: 'badge',
  },
  {
    codigo: 4,
    numero: 4,
    tipo: 'MEMORIAL DESCRITIVO DE FLUXOS E DE ATIVIDADES - CÓPIA',
    titulo: 'Memorial Descritivo de Fluxos e de Atividades - Cópia',
    resumo:
      'Descrição detalhada dos processos de trabalho, rotinas operacionais, circulação de pessoas, matéria-prima, insumos, produtos e resíduos.',
    obrigatorio: true,
    origem: 'ESTADUAL_CVS',
    categoria: 'obrigatorio',
    icone: 'schema',
  },
  {
    codigo: 5,
    numero: 5,
    tipo: 'MEMORIAL DESCRITIVO DO PROJETO ARQUITETÔNICO DA EDIFICAÇÃO - CÓPIA',
    titulo: 'Memorial Descritivo do Projeto Arquitetônico da Edificação - Cópia',
    resumo:
      'Especificações técnicas dos materiais construtivos e de acabamento (pisos, paredes, forros laváveis e impermeáveis), ventilação, iluminação e instalações prediais.',
    obrigatorio: true,
    origem: 'ESTADUAL_CVS',
    categoria: 'obrigatorio',
    icone: 'article',
  },
  {
    codigo: 6,
    numero: 6,
    tipo: 'PROJETO ARQUITETÔNICO DA EDIFICAÇÃO (JOGOS DE PLANTAS, COMPLETO) - CÓPIA',
    titulo: 'Projeto Arquitetônico da Edificação (Jogos de Plantas, Completo) - Cópia',
    resumo:
      'Plantas baixas completas com layout de equipamentos e destinação funcional de cada compartimento, cortes longitudinais/transversais, fachadas e implantação com cotas.',
    obrigatorio: true,
    origem: 'ESTADUAL_CVS',
    categoria: 'obrigatorio',
    icone: 'architecture',
  },
  {
    codigo: 7,
    numero: 7,
    tipo: 'PROJETO DO TRATAMENTO, DESTINAÇÃO FINAL OU AFASTAMENTO DOS EFLUENTES GERADOS PELO EMPREENDIMENTO (RESOLUÇÃO 430/11 - CONAMA) - CÓPIA',
    titulo: 'Projeto de Tratamento ou Afastamento dos Efluentes Gerados (CONAMA 430/11) - Cópia',
    resumo:
      'Projeto técnico de tratamento, destinação final ou afastamento de efluentes líquidos gerados pelo estabelecimento.',
    obrigatorio: false,
    origem: 'ESTADUAL_CVS',
    categoria: 'condicional',
    condicaoAplicacao:
      'Exigido apenas caso o empreendimento gere efluentes especiais ou industriais que exijam sistema próprio de tratamento ou afastamento prévio, conforme Resolução CONAMA 430/2011.',
    icone: 'water_drop',
  },
  {
    codigo: 8,
    numero: 8,
    tipo: 'PROJETO DO TRATAMENTO, DESTINAÇÃO FINAL OU AFASTAMENTO DOS RESÍDUOS GERADOS PELO EMPREENDIMENTO (LEI 12305/2010 - POLÍTICA NACIONAL DE RESÍDUOS SÓLIDOS - PNRS) – CÓPIA',
    titulo: 'Projeto de Tratamento ou Afastamento dos Resíduos Gerados (PNRS / Lei 12.305/2010) – Cópia',
    resumo:
      'Projeto ou plano de gerenciamento, tratamento e destinação final ambientalmente adequada dos resíduos sólidos gerados (PGRSS / resíduos químicos ou perigosos).',
    obrigatorio: false,
    origem: 'ESTADUAL_CVS',
    categoria: 'condicional',
    condicaoAplicacao:
      'Exigido para estabelecimentos enquadrados na Política Nacional de Resíduos Sólidos (Lei Federal nº 12.305/2010) ou que gerem resíduos de serviços de saúde (RSS), químicos ou perigosos sujeitos a plano de gerenciamento específico.',
    icone: 'delete_sweep',
  },
  {
    codigo: 9,
    numero: 9,
    tipo: 'FORMULÁRIO DE SOLICITAÇÃO DE AVALIAÇÃO FÍSICO FUNCIONAL DE PROJETO DE EDIFICAÇÃO',
    titulo: 'Formulário de Solicitação de Avaliação Físico-Funcional de Projeto de Edificação (LTA)',
    resumo:
      'Formulário oficial preenchido diretamente no sistema Aprova Online (não é necessário anexar formulário em papel).',
    obrigatorio: true,
    origem: 'ESTADUAL_CVS',
    categoria: 'obrigatorio',
    isEmbutidoAprovaOnline: true,
    observacaoSertaozinho:
      'O formulário de solicitação de LTA é preenchido diretamente no sistema Aprova Online durante a abertura do protocolo (dispensado formulário físico/externo).',
    icone: 'dynamic_form',
  },
];

/**
 * Documentos exigidos pelo Município de Sertãozinho-SP.
 * Sempre obrigatórios na lista de documentação de LTA quando este for exigido.
 */
export const DOCUMENTOS_MUNICIPAIS_LTA: DocumentoLtaItem[] = [
  {
    codigo: 'MUN-1',
    numero: 10,
    tipo: 'CERTIDÃO DE DIRETRIZES DE USO DO SOLO, EMITIDA PELA PREFEITURA MUNICIPAL, DENTRO DO PRAZO DE VALIDADE',
    titulo: 'Certidão de Diretrizes de Uso do Solo, emitida pela Prefeitura Municipal, dentro do prazo de validade',
    resumo:
      'Certidão emitida pela Prefeitura Municipal atestando a conformidade do uso e ocupação do solo e viabilidade de localização com o zoneamento urbano municipal, dentro do prazo de validade.',
    obrigatorio: true,
    origem: 'MUNICIPAL',
    categoria: 'obrigatorio',
    observacaoSertaozinho:
      'Documento exigido pelo município (sempre obrigatório no processo de LTA).',
    icone: 'location_city',
  },
  {
    codigo: 'MUN-2',
    numero: 11,
    tipo: 'CÓPIA DO PROJETO COMPLETO APROVADO PELA PREFEITURA /OU PROTOCOLO DO PROCESSO - CONSTRUÇÃO NOVA',
    titulo: 'Cópia do Projeto completo Aprovado pela Prefeitura /ou Protocolo do processo - Construção Nova',
    resumo:
      'Cópia do projeto arquitetônico completo aprovado pelo setor competente da Prefeitura Municipal ou protocolo do processo em andamento para construção nova.',
    obrigatorio: true,
    origem: 'MUNICIPAL',
    categoria: 'obrigatorio',
    observacaoSertaozinho:
      'Documento exigido pelo município (sempre obrigatório no processo de LTA).',
    icone: 'domain_verification',
  },
];

// Alias export para compatibilidade com imports existentes
export const DOCUMENTOS_LTA_SERTAOZINHO = [...DOCUMENTOS_OFICIAIS_LTA, ...DOCUMENTOS_MUNICIPAIS_LTA];
export type Quadro9Item = DocumentoLtaItem;

/**
 * Retorna os códigos numéricos (1 a 9) da Portaria CVS exigidos para uma atividade.
 * Se a atividade não exige LTA, retorna array vazio [].
 */
export function getCodigosDocsForActivity(act: {
  documentoPrevio?: string;
  exigeLta?: boolean;
  documentosInspecao?: string;
  cnae?: string;
  compreensao?: string;
  agrupamento?: string;
}): number[] {
  if (!isActivityLtaRequired(act)) {
    return [];
  }

  const raw = act.documentoPrevio || '';
  const matches = raw.match(/\b([1-9])\b/g);

  if (matches && matches.length > 0) {
    const uniqueNums = Array.from(new Set(matches.map((m) => parseInt(m, 10)))).sort(
      (a, b) => a - b
    );
    return uniqueNums;
  }

  // Se exige LTA mas não tem lista específica no registro, os documentos padrão da CVS são 2, 3, 4, 5, 6 e 9
  return [2, 3, 4, 5, 6, 9];
}

/**
 * Retorna os objetos de documentos para uma atividade específica que exige LTA.
 * Inclui os documentos da Portaria CVS aplicáveis e os documentos obrigatórios do Município.
 * Se a atividade não exige LTA, retorna array vazio [].
 */
export function getDocsForActivity(act: {
  documentoPrevio?: string;
  exigeLta?: boolean;
  documentosInspecao?: string;
  cnae?: string;
  compreensao?: string;
  agrupamento?: string;
}): DocumentoLtaItem[] {
  if (!isActivityLtaRequired(act)) {
    return [];
  }

  const codigos = getCodigosDocsForActivity(act);
  const codigosSet = new Set(codigos);
  const cvsDocs = DOCUMENTOS_OFICIAIS_LTA.filter((d) => typeof d.codigo === 'number' && codigosSet.has(d.codigo));
  return [...cvsDocs, ...DOCUMENTOS_MUNICIPAIS_LTA];
}

/**
 * Retorna a lista unificada de documentos de LTA a partir de um conjunto de atividades.
 * Filtra apenas as atividades que EFETIVAMENTE exigem LTA.
 * Se nenhuma atividade exigir LTA, retorna array vazio [].
 * Quando o LTA for obrigatório, inclui os documentos da CVS aplicáveis E os documentos exigidos pelo Município (sempre obrigatórios).
 */
export function getAllQuadro9ItemsFromActivities(
  activities: {
    documentoPrevio?: string;
    exigeLta?: boolean;
    documentosInspecao?: string;
    cnae?: string;
    compreensao?: string;
    agrupamento?: string;
  }[]
): DocumentoLtaItem[] {
  const ltaRequiredActs = (activities || []).filter(isActivityLtaRequired);
  if (ltaRequiredActs.length === 0) {
    return [];
  }

  const allCodes = new Set<number>();
  for (const act of ltaRequiredActs) {
    const codes = getCodigosDocsForActivity(act);
    codes.forEach((c) => allCodes.add(c));
  }

  if (allCodes.size === 0) {
    [2, 3, 4, 5, 6, 9].forEach((c) => allCodes.add(c));
  }

  const cvsDocs = DOCUMENTOS_OFICIAIS_LTA.filter(
    (d) => typeof d.codigo === 'number' && allCodes.has(d.codigo)
  ).sort((a, b) => Number(a.codigo) - Number(b.codigo));

  // Inclui também os documentos exigidos pelo município (sempre obrigatórios quando LTA for necessário)
  return [...cvsDocs, ...DOCUMENTOS_MUNICIPAIS_LTA];
}

/**
 * Formata os códigos de documentos prévios para texto resumido.
 * Retorna null se não houver exigência de LTA.
 */
export function formatDocumentosPreviosParaSertaozinho(
  rawDocumentoPrevio?: string | null,
  isLta?: boolean
): string | null {
  if (isLta === false) {
    return null;
  }

  if (!rawDocumentoPrevio) {
    return isLta ? 'Documentos Códigos 2, 3, 4, 5, 6, 9 + Exigências Municipais' : null;
  }

  const lower = rawDocumentoPrevio.toLowerCase();
  if (lower.includes('dispensad') || lower.includes('não aplic') || rawDocumentoPrevio === 'N.A.') {
    return null;
  }

  const matches = rawDocumentoPrevio.match(/\b([1-9])\b/g);
  if (!matches || matches.length === 0) {
    return isLta ? 'Documentos Códigos 2, 3, 4, 5, 6, 9 + Exigências Municipais' : null;
  }

  const nums = Array.from(new Set(matches.map((m) => parseInt(m, 10)))).sort((a, b) => a - b);
  return `Documentos Códigos ${nums.join(', ')} + Exigências Municipais`;
}
