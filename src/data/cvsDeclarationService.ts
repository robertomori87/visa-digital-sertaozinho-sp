import {
  DeclaredCnae,
  SelectedCompreensao,
  ConsultaResultado,
  ConclaSubclass,
  VerificationStatus,
} from '../types';
import {
  getCvsCompreensoesByCnaeDigitos,
  getConclaSubclassByDigitos,
  isCnaeInCvs01ByDigitos,
} from './conclaService';
import { getDigitsOnly, checkHasDoc52 } from './cvsLtaService';

/**
 * Cria um DeclaredCnae a partir de um CNAE (dígitos ou formatado).
 * Inicializa com status 'pending' e sem compreensões selecionadas.
 *
 * CNAES DENTRO da CVS 01: começam como 'pending' (exigem seleção de
 *   compreensões sanitárias ou confirmação de "nenhuma se aplica").
 * CNAES FORA da CVS 01: são confirmados automaticamente na inclusão,
 *   sem exigir checkbox adicional de confirmação expressa. A informação
 *   sobre a ausência na tabela (não implica dispensa automática) é exibida
 *   de forma declaratória, sem etapa burocrática extra.
 */
export function createDeclaredCnae(cnaeInput: string): DeclaredCnae | null {
  const cnaeDigitos = getDigitsOnly(cnaeInput);
  if (!cnaeDigitos) return null;

  const subclass = getConclaSubclassByDigitos(cnaeDigitos);
  const naoConstaCvs = !isCnaeInCvs01ByDigitos(cnaeDigitos);
  const compreensoesDisponiveis = getCvsCompreensoesByCnaeDigitos(cnaeDigitos);

  return {
    cnae: subclass?.cnaeFormatado || cnaeInput,
    cnaeDigitos,
    descricaoCnae: subclass?.descricao || `CNAE ${cnaeInput}`,
    descritoresSelecionados: [],
    secaoDescricao: subclass?.secao?.descricao,
    compreensoesDisponiveis,
    compreensoesSelecionadas: [],
    // CNAEs fora da CVS 01 são confirmados automaticamente na inclusão.
    // CNAEs dentro da CVS 01 iniciam como 'pending' (aguardam seleção).
    status: naoConstaCvs ? 'confirmed' : 'pending',
    naoConstaCvs,
  };
}

/**
 * Alterna a seleção de uma compreensão para um CNAE declarado.
 * Se a compreensão já estava selecionada, remove; senão adiciona.
 * Ao selecionar qualquer compreensão, o status passa a 'confirmed'.
 * Retorna null quando todas as compreensões são removidas — sinalizando
 * que o CNAE deve ser excluído da lista de atividades.
 */
export function toggleCompreensao(
  declared: DeclaredCnae,
  compreensao: SelectedCompreensao
): DeclaredCnae | null {
  const matchesComp = (c: SelectedCompreensao) => {
    if (c.cvsRecordId !== undefined && compreensao.cvsRecordId !== undefined) {
      return String(c.cvsRecordId) === String(compreensao.cvsRecordId);
    }
    return c.compreensao.trim() === compreensao.compreensao.trim();
  };

  const isSelected = declared.compreensoesSelecionadas.some(matchesComp);

  let novasSelecionadas: SelectedCompreensao[];

  if (isSelected) {
    novasSelecionadas = declared.compreensoesSelecionadas.filter(
      (c) => !matchesComp(c)
    );
    // Se não há mais nenhuma selecionada, remove o CNAE da lista (retorna null)
    if (novasSelecionadas.length === 0) {
      return null;
    }
  } else {
    novasSelecionadas = [...declared.compreensoesSelecionadas, compreensao];
  }

  return {
    ...declared,
    compreensoesSelecionadas: novasSelecionadas,
    status: 'confirmed',
  };
}

/**
 * Confirma expressamente que nenhuma compreensão se aplica a este CNAE.
 * Limpa as seleções e define status 'none_applies'.
 * Mutuamente exclusivo com a seleção de compreensões.
 */
export function confirmNoneApplies(declared: DeclaredCnae): DeclaredCnae {
  return {
    ...declared,
    compreensoesSelecionadas: [],
    status: 'none_applies',
  };
}

/**
 * Reseta a verificação de um CNAE (volta para pending, sem seleções).
 * Para CNAEs fora da CVS 01, retorna para 'confirmed' (não há seleção
 * de compreensões a fazer — a confirmação é automática).
 */
export function resetVerification(declared: DeclaredCnae): DeclaredCnae {
  return {
    ...declared,
    compreensoesSelecionadas: [],
    status: declared.naoConstaCvs ? 'confirmed' : 'pending',
  };
}

/**
 * FASE 2B: Confirma expressamente que um CNAE não constante na CVS 01
 * teve suas atividades declaradas e verificadas pelo usuário.
 * Após esta confirmação, aplica-se a regra de que não há compreensão
 * sanitária regulamentada na tabela utilizada, mas NÃO significa
 * dispensa automática de licenciamento sanitário.
 */
export function confirmCnaeNotInCvs(declared: DeclaredCnae): DeclaredCnae {
  if (!declared.naoConstaCvs) return declared;
  return {
    ...declared,
    compreensoesSelecionadas: [],
    status: 'confirmed',
  };
}

/**
 * Adiciona um descritor CONCLA selecionado pelo usuário.
 */
export function addDescritor(declared: DeclaredCnae, descritor: string): DeclaredCnae {
  if (declared.descritoresSelecionados.includes(descritor)) return declared;
  return {
    ...declared,
    descritoresSelecionados: [...declared.descritoresSelecionados, descritor],
  };
}

/**
 * Remove um descritor CONCLA selecionado.
 */
export function removeDescritor(declared: DeclaredCnae, descritor: string): DeclaredCnae {
  return {
    ...declared,
    descritoresSelecionados: declared.descritoresSelecionados.filter((d) => d !== descritor),
  };
}

/**
 * Calcula o resultado consolidado da consulta a partir de todos os CNAEs declarados.
 *
 * Regras:
 * - Se qualquer compreensão selecionada exige o documento 52 → exigeLta = true
 * - Se existe algum CNAE com status 'pending' → possuiPendencias = true
 * - CNAEs com status 'none_applies' ou 'naoConstaCvs' não contribuem para LTA
 */
export function computeConsultaResultado(declarados: DeclaredCnae[]): ConsultaResultado {
  const cnaesPendentes: string[] = [];
  const compreensoesComLta: SelectedCompreensao[] = [];
  const compreensoesSemLta: SelectedCompreensao[] = [];

  for (const declared of declarados) {
    if (declared.status === 'pending') {
      cnaesPendentes.push(declared.cnae);
      continue;
    }

    if (declared.status === 'none_applies' || declared.naoConstaCvs) {
      continue;
    }

    for (const comp of declared.compreensoesSelecionadas) {
      if (comp.exigeLta) {
        compreensoesComLta.push(comp);
      } else {
        compreensoesSemLta.push(comp);
      }
    }
  }

  return {
    exigeLta: compreensoesComLta.length > 0,
    possuiPendencias: cnaesPendentes.length > 0,
    cnaesPendentes,
    compreensoesComLta,
    compreensoesSemLta,
  };
}

/**
 * Verifica se todos os CNAEs declarados foram verificados (sem pendências).
 */
export function isConsultaCompleta(declarados: DeclaredCnae[]): boolean {
  return declarados.every((d) => d.status !== 'pending');
}

/**
 * Converte um DeclaredCnae para a lista de SelectedCvsActivity compatível
 * com o sistema existente, considerando apenas as compreensões selecionadas.
 *
 * FASE 2B:
 * - CNAE fora da CVS com status 'pending' → retorna array vazio (não emite)
 * - CNAE fora da CVS com status 'confirmed' → retorna atividade, mas esclarece
 *   que não há compreensão regulamentada na tabela utilizada (não é dispensa
 *   automática de licenciamento sanitário)
 */
export function declaredCnaeToActivities(declared: DeclaredCnae): Array<{
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
  exigeLta?: boolean;
  descritoresSelecionados?: string[];
}> {
  // CNAE não constante na CVS 01
  if (declared.naoConstaCvs) {
    // Enquanto pendente, não emite atividade
    if (declared.status === 'pending') {
      return [];
    }
    // Após confirmação expressa, registra que não há compreensão regulamentada
    // na tabela utilizada. Isso NÃO significa dispensa automática de licenciamento.
    return [
      {
        cnae: declared.cnae,
        cnaeNormalizado: declared.cnae,
        descricaoCnae: declared.descricaoCnae,
        compreensao:
          'CNAE não constante na tabela de compreensões sanitárias da Portaria CVS 01/2024. Não há enquadramento sanitário regulamentado para este CNAE na tabela utilizada. A ausência de registro não implica dispensa automática de LTA.',
        agrupamento: declared.secaoDescricao || 'NÃO CONSTANTE NA TABELA CVS 01',
        risco: 'Não enquadrado na tabela CVS 01',
        documentoPrevio: 'Não aplicável (atividade não constante na tabela CVS 01)',
        documentosInspecao: 'Não aplicável (atividade não constante na tabela CVS 01)',
        naoCompreende: '',
        paginaCvs: 'N/A',
        exigeLta: false,
        descritoresSelecionados: declared.descritoresSelecionados,
      },
    ];
  }

  // Se nenhuma compreensão se aplica
  if (declared.status === 'none_applies') {
    return [
      {
        cnae: declared.cnae,
        cnaeNormalizado: declared.cnae,
        descricaoCnae: declared.descricaoCnae,
        compreensao: 'Nenhuma compreensão sanitária aplicável declarada pelo requerente.',
        agrupamento: declared.secaoDescricao || 'NENHUMA COMPREENSÃO APLICÁVEL',
        risco: 'Sem exigência de LTA',
        documentoPrevio: 'Não aplicável',
        documentosInspecao: 'Não aplicável',
        naoCompreende: '',
        paginaCvs: 'N/A',
        exigeLta: false,
        descritoresSelecionados: declared.descritoresSelecionados,
      },
    ];
  }

  // Compreensões selecionadas
  // FASE 2B: exigeLta é SEMPRE derivado da presença do documento 52 nos
  // documentos de inspeção da base normativa vigente, nunca do campo armazenado.
  return declared.compreensoesSelecionadas.map((comp) => ({
    cnae: declared.cnae,
    cnaeNormalizado: declared.cnae,
    descricaoCnae: declared.descricaoCnae,
    compreensao: comp.compreensao,
    agrupamento: comp.agrupamento,
    risco: comp.risco,
    documentoPrevio: comp.documentoPrevio,
    documentosInspecao: comp.documentosInspecao,
    naoCompreende: comp.naoCompreende,
    paginaCvs: comp.paginaCvs,
    exigeLta: checkHasDoc52(comp.documentosInspecao),
    descritoresSelecionados: declared.descritoresSelecionados,
  }));
}
