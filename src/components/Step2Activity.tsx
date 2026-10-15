import React, { useState, useMemo, useEffect } from 'react';
import type {
  CvsLtaRecord,
  SelectedCvsActivity,
  CNAEItem,
  DeclaredCnae,
  SelectedCompreensao,
} from '../types';
import {
  checkHasDoc52,
  getDigitsOnly,
} from '../data/cvsLtaService';
import {
  searchIntegrated,
  getCvsCompreensoesByCnaeDigitos,
  formatDescritorForDisplay,
} from '../data/conclaService';
import {
  createDeclaredCnae,
  toggleCompreensao,
  confirmNoneApplies,
  resetVerification,
  isConsultaCompleta,
  computeConsultaResultado,
} from '../data/cvsDeclarationService';
import {
  fetchIbgeCnaeSubclasses,
  cleanCnaeDigits,
} from '../services/ibgeCnaeService';
import type { IbgeCnaeResult } from '../services/ibgeCnaeService';
import { StepHelpModal } from './StepHelpModal';
import { PORTARIA_CVS_LABEL } from '../data/normativeMetadata';

interface Step2ActivityProps {
  selectedActivities: SelectedCvsActivity[];
  onAddActivity: (activity: SelectedCvsActivity, cnaeItem: CNAEItem) => void;
  onRemoveActivity: (index: number) => void;
  onClearActivities: () => void;
  onFinish: () => void;
  onPrev: () => void;
  onDirectConclusionNoActivity?: (details: {
    propertyType: string;
    propertyNotes?: string;
  }) => void;
  onOpenCustomCnaeModal?: () => void;
  // FASE 2: Integração CONCLA × CVS 01
  declaredCnaes: DeclaredCnae[];
  onAddDeclaredCnae: (declared: DeclaredCnae) => void;
  onUpdateDeclaredCnae: (cnaeDigitos: string, updater: (d: DeclaredCnae) => DeclaredCnae | null) => void;
  onRemoveDeclaredCnae: (cnaeDigitos: string) => void;
}

export const Step2Activity: React.FC<Step2ActivityProps> = ({
  selectedActivities,
  onAddActivity,
  onRemoveActivity,
  onClearActivities,
  onFinish,
  onPrev,
  declaredCnaes,
  onAddDeclaredCnae,
  onUpdateDeclaredCnae,
  onRemoveDeclaredCnae,
}) => {
  // Primary Architecture: 2 Options
  // 1. 'consultar' (Há atividade definida no estabelecimento)
  // 2. 'sem_atividade' (Não há atividade definida - Imóvel para locação / venda / vago)
  const [mainMode, setMainMode] = useState<'consultar' | 'sem_atividade'>('consultar');

  // Modal de ajuda
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Property without activity state (Opção 2 - Sem Atividade Definida)
  const [declarationNoActivity, setDeclarationNoActivity] = useState<boolean>(false);
  const [propertyNotes, setPropertyNotes] = useState<string>('');

  // Helper para criar registro oficial de imóvel sem atividade econômica sanitária definida
  const createNoActivityRecord = (notes?: string): { activity: SelectedCvsActivity; cnaeItem: CNAEItem } => {
    const propertyDesc = 'Imóvel sem atividade econômica sanitária definida';
    const cleanNotes = (notes !== undefined ? notes : propertyNotes).trim();
    const notesFormatted = cleanNotes ? ` (Obs: ${cleanNotes})` : '';
    const fullDesc = `${propertyDesc}${notesFormatted}`;

    const activity: SelectedCvsActivity = {
      cnae: 'SEM CNAE',
      cnaeNormalizado: 'SEM CNAE',
      descricaoCnae: fullDesc,
      compreensao:
        'Declaração de imóvel sem atividade econômica sanitária definida ou vinculada nesta consulta. Não há exigência prévia de LTA perante a Vigilância Sanitária para o imóvel neste momento.',
      agrupamento: 'IMÓVEL SEM ATIVIDADE ECONÔMICA DEFINIDA',
      risco: 'Sem Atividade Definida',
      documentoPrevio: 'Não aplicável (Dispensado de LTA)',
      documentosInspecao: 'Não aplicável nesta consulta',
      naoCompreende: '',
      paginaCvs: 'N/A',
    };

    const cnaeItem: CNAEItem = {
      id: 'no-activity-decl',
      code: 'SEM CNAE',
      description: fullDesc,
      compreensao: activity.compreensao,
      riskLevel: 'Baixo',
      category: 'Imóvel sem atividade',
      ltaRequiredDefault: false,
      requiresQuestions: false,
      notes: 'Declaração de imóvel sem atividade econômica vinculada',
      legislationRef: PORTARIA_CVS_LABEL,
      documentoPrevio: 'Não aplicável (Dispensado de LTA)',
      documentosInspecao: activity.documentosInspecao,
      agrupamento: activity.agrupamento,
      paginaCvs: 'N/A',
    };

    return { activity, cnaeItem };
  };

  const hasNoActivityDeclared = useMemo(() => {
    return selectedActivities.some(
      (a) => a.cnae === 'SEM CNAE' || a.agrupamento?.includes('SEM ATIVIDADE')
    );
  }, [selectedActivities]);

  // Sincroniza o estado da declaração caso itens sejam adicionados/removidos
  useEffect(() => {
    const declaredItem = selectedActivities.find(
      (a) => a.cnae === 'SEM CNAE' || a.agrupamento?.includes('SEM ATIVIDADE')
    );
    if (declaredItem) {
      setDeclarationNoActivity(true);
      if (declaredItem.descricaoCnae.includes('(Obs:')) {
        const match = declaredItem.descricaoCnae.match(/\(Obs:\s*([^)]+)\)/);
        if (match && match[1]) {
          setPropertyNotes(match[1].trim());
        }
      }
    } else {
      setDeclarationNoActivity(false);
    }
  }, [selectedActivities]);

  const handleToggleNoActivityDeclaration = (checked: boolean) => {
    setDeclarationNoActivity(checked);
    if (checked) {
      // Se houver atividades anteriores que não são a declaração, limpa antes
      if (selectedActivities.some((a) => a.cnae !== 'SEM CNAE')) {
        onClearActivities();
      }
      const { activity, cnaeItem } = createNoActivityRecord(propertyNotes);
      onAddActivity(activity, cnaeItem);
      setAddedToastMessage(
        'Declaração de imóvel sem atividade definida adicionada ao estabelecimento.'
      );
      setTimeout(() => setAddedToastMessage(null), 4000);
    } else {
      const idx = selectedActivities.findIndex(
        (a) => a.cnae === 'SEM CNAE' || a.agrupamento?.includes('SEM ATIVIDADE')
      );
      if (idx !== -1) {
        onRemoveActivity(idx);
      }
    }
  };

  // Seleciona o modo principal. Ao escolher "sem_atividade", a declaração é
  // registrada automaticamente (sem passo extra de confirmação).
  const handleSelectMainMode = (mode: 'consultar' | 'sem_atividade') => {
    if (mode === mainMode) return;
    setMainMode(mode);
    if (mode === 'sem_atividade') {
      // Limpa atividades anteriores e registra a declaração automaticamente
      if (selectedActivities.some((a) => a.cnae !== 'SEM CNAE')) {
        onClearActivities();
      }
      const { activity, cnaeItem } = createNoActivityRecord(propertyNotes);
      onAddActivity(activity, cnaeItem);
      setDeclarationNoActivity(true);
      setAddedToastMessage(
        'Declaração de imóvel sem atividade definida adicionada ao estabelecimento.'
      );
      setTimeout(() => setAddedToastMessage(null), 4000);
    } else {
      // Voltando para consulta: remove a declaração de sem atividade
      const idx = selectedActivities.findIndex(
        (a) => a.cnae === 'SEM CNAE' || a.agrupamento?.includes('SEM ATIVIDADE')
      );
      if (idx !== -1) {
        onRemoveActivity(idx);
      }
      setDeclarationNoActivity(false);
    }
  };

  const handlePropertyNotesChange = (notes: string) => {
    setPropertyNotes(notes);
    if (declarationNoActivity) {
      const idx = selectedActivities.findIndex(
        (a) => a.cnae === 'SEM CNAE' || a.agrupamento?.includes('SEM ATIVIDADE')
      );
      if (idx !== -1) {
        onRemoveActivity(idx);
      }
      const { activity, cnaeItem } = createNoActivityRecord(notes);
      onAddActivity(activity, cnaeItem);
    }
  };

  // Search mode state
  const [searchTerm, setSearchTerm] = useState('');
  const [addedToastMessage, setAddedToastMessage] = useState<string | null>(null);

  // Estado para controlar quais CNAEs estão expandidos no resumo
  const [expandedSummaryCnaes, setExpandedSummaryCnaes] = useState<Set<string>>(new Set());

  // Estado para expandir o seletor de compreensões antes da inclusão
  const [expandedSelectors, setExpandedSelectors] = useState<Set<string>>(new Set());

  const toggleSummaryExpand = (cnaeDigitos: string) => {
    setExpandedSummaryCnaes((prev) => {
      const next = new Set(prev);
      if (next.has(cnaeDigitos)) {
        next.delete(cnaeDigitos);
      } else {
        next.add(cnaeDigitos);
      }
      return next;
    });
  };

  // Expande/recolhe o seletor de compreensões para um resultado ainda não incluído
  const toggleSelectorExpand = (cnaeDigitos: string) => {
    setExpandedSelectors((prev) => {
      const next = new Set(prev);
      if (next.has(cnaeDigitos)) {
        next.delete(cnaeDigitos);
      } else {
        next.add(cnaeDigitos);
      }
      return next;
    });
  };

  // Expande/recolhe as opções de compreensões de um CNAE já declarado nos resultados de busca
  const [collapsedDeclaredInSearch, setCollapsedDeclaredInSearch] = useState<Set<string>>(new Set());

  const toggleDeclaredInSearch = (cnaeDigitos: string) => {
    setCollapsedDeclaredInSearch((prev) => {
      const next = new Set(prev);
      if (next.has(cnaeDigitos)) {
        next.delete(cnaeDigitos);
      } else {
        next.add(cnaeDigitos);
      }
      return next;
    });
  };

  // Helper: calcula o status de LTA de um CNAE declarado
  const getCnaeLtaStatus = (declared: DeclaredCnae): { label: string; variant: 'exige' | 'nao_exige' | 'fora_cvs' | 'pode_exigir' } => {
    if (declared.naoConstaCvs) {
      return { label: 'Não exige LTA', variant: 'nao_exige' };
    }
    const temCompreensaoComDoc52 = declared.compreensoesDisponiveis.some((c) => checkHasDoc52(c.documentosInspecao));
    if (declared.status === 'confirmed') {
      const selecionadaComDoc52 = declared.compreensoesSelecionadas.some((c) => checkHasDoc52(c.documentosInspecao));
      return { label: selecionadaComDoc52 ? 'Exige LTA' : 'Não exige LTA', variant: selecionadaComDoc52 ? 'exige' : 'nao_exige' };
    }
    if (declared.status === 'none_applies') {
      return { label: 'Não exige LTA', variant: 'nao_exige' };
    }
    // pending: antes da seleção
    return { label: temCompreensaoComDoc52 ? 'Pode exigir LTA' : 'Não exige LTA', variant: temCompreensaoComDoc52 ? 'pode_exigir' : 'nao_exige' };
  };

  // FASE 2: Busca integrada CONCLA + CVS 01 (todas as 1.332 subclasses)
  const integratedResults = useMemo(() => {
    if (searchTerm.trim().length < 3) return [];
    return searchIntegrated(searchTerm, 30);
  }, [searchTerm]);

  // Online IBGE Lookup state
  const [isOnlineIbgeLoading, setIsOnlineIbgeLoading] = useState(false);
  const [onlineIbgeResults, setOnlineIbgeResults] = useState<IbgeCnaeResult[] | null>(null);
  const [onlineIbgeError, setOnlineIbgeError] = useState<string | null>(null);

  // Custom non-listed CNAE state
  const [nonListedCnaeInput, setNonListedCnaeInput] = useState('');
  const [nonListedDescInput, setNonListedDescInput] = useState('');

  // FASE 2: Verifica se todos os CNAEs declarados foram verificados
  const consultaCompleta = useMemo(() => {
    if (declaredCnaes.length === 0) return false;
    return isConsultaCompleta(declaredCnaes);
  }, [declaredCnaes]);

  // FASE 2: Adiciona um CNAE como declarado a partir do resultado integrado
  const handleAddDeclaredFromIntegrated = (result: {
    cnaeDigitos: string;
    cnaeFormatado: string;
    descricao: string;
    secaoDescricao?: string;
  }) => {
    if (declaredCnaes.some((d) => d.cnaeDigitos === result.cnaeDigitos)) return;
    const declared = createDeclaredCnae(result.cnaeFormatado);
    if (!declared) return;
    onAddDeclaredCnae(declared);
    setAddedToastMessage(`CNAE ${result.cnaeFormatado} adicionado para verificação.`);
    setTimeout(() => setAddedToastMessage(null), 3000);
  };

  // Inclui o CNAE já com uma compreensão sanitária específica selecionada
  const handleIncludeWithCompreensao = (
    result: { cnaeDigitos: string; cnaeFormatado: string; descricao: string },
    cvsRecordId: string | number,
  ) => {
    if (declaredCnaes.some((d) => d.cnaeDigitos === result.cnaeDigitos)) return;
    const declared = createDeclaredCnae(result.cnaeFormatado);
    if (!declared) return;

    const selectedComps = declared.compreensoesDisponiveis.filter(
      (c) => String(c.cvsRecordId) === String(cvsRecordId),
    );

    const finalDeclared = {
      ...declared,
      compreensoesSelecionadas: selectedComps,
      status: 'confirmed' as const,
    };

    onAddDeclaredCnae(finalDeclared);
    setExpandedSelectors((prev) => {
      const next = new Set(prev);
      next.delete(result.cnaeDigitos);
      return next;
    });

    setAddedToastMessage(`CNAE ${result.cnaeFormatado} incluído com 1 compreensão.`);
    setTimeout(() => setAddedToastMessage(null), 3500);
  };

  // Inclui o CNAE marcando que nenhuma compreensão sanitária se aplica
  const handleIncludeNoneApplies = (result: {
    cnaeDigitos: string;
    cnaeFormatado: string;
    descricao: string;
  }) => {
    if (declaredCnaes.some((d) => d.cnaeDigitos === result.cnaeDigitos)) return;
    const declared = createDeclaredCnae(result.cnaeFormatado);
    if (!declared) return;

    const finalDeclared = confirmNoneApplies(declared);
    onAddDeclaredCnae(finalDeclared);
    setExpandedSelectors((prev) => {
      const next = new Set(prev);
      next.delete(result.cnaeDigitos);
      return next;
    });

    setAddedToastMessage(`CNAE ${result.cnaeFormatado} incluído (nenhuma compreensão aplicável).`);
    setTimeout(() => setAddedToastMessage(null), 3500);
  };

  // Verifica se uma compreensão já foi selecionada no fluxo declarativo
  const isRecordSelected = (cnae: string, compreensao: string) => {
    const cnaeDigitos = getDigitsOnly(cnae);
    const declared = declaredCnaes.find((d) => d.cnaeDigitos === cnaeDigitos);
    if (!declared) return false;
    return declared.compreensoesSelecionadas.some(
      (c) => c.compreensao.trim() === compreensao.trim()
    );
  };

  // Adiciona uma compreensão CVS 01 ao fluxo declarativo (cria o CNAE se necessário)
  const handleAddRecord = (rec: CvsLtaRecord) => {
    const cnaeDigitos = getDigitsOnly(rec.cnae);
    const exists = declaredCnaes.some((d) => d.cnaeDigitos === cnaeDigitos);
    if (!exists) {
      const declared = createDeclaredCnae(rec.cnae);
      if (declared) onAddDeclaredCnae(declared);
    }

    const isLtaReq = checkHasDoc52(rec.documentosInspecao);
    const comp: SelectedCompreensao = {
      cnae: rec.cnae,
      agrupamento: rec.agrupamento,
      compreensao: rec.compreensao,
      risco: rec.risco,
      documentoPrevio: rec.documentoPrevio,
      documentosInspecao: rec.documentosInspecao,
      naoCompreende: rec.naoCompreende,
      paginaCvs: rec.paginaCvs,
      exigeLta: isLtaReq,
    };

    onUpdateDeclaredCnae(cnaeDigitos, (d) => toggleCompreensao(d, comp));
    setAddedToastMessage(`CNAE ${rec.cnae} atualizado na lista de verificação.`);
    setTimeout(() => {
      setAddedToastMessage(null);
    }, 3500);
  };

  // Consulta Online na API do IBGE caso solicitado
  const handleConsultarIbgeOnline = async (codeOverride?: string) => {
    const target = (codeOverride !== undefined ? codeOverride : searchTerm).trim();
    if (!target) return;
    setIsOnlineIbgeLoading(true);
    setOnlineIbgeError(null);
    setOnlineIbgeResults(null);

    const res = await fetchIbgeCnaeSubclasses(target);
    setIsOnlineIbgeLoading(false);

    if (res.success && res.data && res.data.length > 0) {
      setOnlineIbgeResults(res.data);
    } else {
      setOnlineIbgeError(res.error || `Nenhuma subclasse localizada no IBGE para "${target}".`);
    }
  };

  // Incluir Atividade Oficial do IBGE no fluxo declarativo de verificação
  const handleIncludeIbgeActivity = (item: IbgeCnaeResult) => {
    if (item.isInCvs01) {
      setSearchTerm(item.id.slice(0, 5));
      setMainMode('consultar');
      setAddedToastMessage(
        `O CNAE ${item.cnaeFormatado} consta na ${PORTARIA_CVS_LABEL}. Selecione a compreensão sanitária correspondente na seção da Portaria CVS 01.`
      );
      setTimeout(() => setAddedToastMessage(null), 5000);
      return;
    }

    const declared = createDeclaredCnae(item.cnaeFormatado);
    if (!declared) return;
    if (declaredCnaes.some((d) => d.cnaeDigitos === declared.cnaeDigitos)) {
      setAddedToastMessage(`O CNAE ${item.cnaeFormatado} já está na lista de verificação.`);
      setTimeout(() => setAddedToastMessage(null), 3000);
      return;
    }
    onAddDeclaredCnae(declared);
    setOnlineIbgeResults(null);
    setAddedToastMessage(`CNAE ${item.cnaeFormatado} adicionado para verificação.`);
    setTimeout(() => {
      setAddedToastMessage(null);
    }, 4000);
  };

  // Adicionar CNAE não listado ao fluxo declarativo de verificação
  const handleAddNonListedCnae = (cnaeParam?: string, descParam?: string) => {
    const rawCnae = (cnaeParam !== undefined ? cnaeParam : (nonListedCnaeInput || searchTerm)).trim();
    if (!rawCnae) return;

    const declared = createDeclaredCnae(rawCnae);
    if (!declared) return;
    if (declaredCnaes.some((d) => d.cnaeDigitos === declared.cnaeDigitos)) {
      setAddedToastMessage(`O CNAE ${rawCnae} já está na lista de verificação.`);
      setTimeout(() => setAddedToastMessage(null), 3000);
      return;
    }

    onAddDeclaredCnae(declared);
    setNonListedCnaeInput('');
    setNonListedDescInput('');
    setSearchTerm('');
    setAddedToastMessage(`CNAE ${rawCnae} adicionado para verificação.`);
    setTimeout(() => {
      setAddedToastMessage(null);
    }, 4000);
  };

  // Resumo de verificação a partir dos CNAEs declarados (fluxo declarativo)
  const consultaResultado = useMemo(() => computeConsultaResultado(declaredCnaes), [declaredCnaes]);
  const ltaRequiredCount = consultaResultado.compreensoesComLta.length;
  const ltaExemptCount = consultaResultado.compreensoesSemLta.length;
  const pendingCount = declaredCnaes.filter((d) => d.status === 'pending').length;

  // Direciona o usuário para a primeira pendência de verificação
  const handleGoToPending = () => {
    const firstPending = declaredCnaes.find((d) => d.status === 'pending');
    if (!firstPending) return;
    // Preenche a busca com o CNAE pendente para que os resultados (e as perguntas) apareçam
    setSearchTerm(firstPending.cnaeDigitos);
    // Aguarda o re-render para rolar até o card do CNAE
    setTimeout(() => {
      const el = document.getElementById(`result-${firstPending.cnaeDigitos}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-2', 'ring-amber-400');
        setTimeout(() => el.classList.remove('ring-2', 'ring-amber-400'), 2500);
      }
    }, 100);
  };

  return (
    <div className="max-w-4xl mx-auto w-full pb-10">
      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-200 rounded-full mb-6 overflow-hidden">
        <div className="h-full bg-indigo-600 w-2/3 rounded-full transition-all duration-300"></div>
      </div>

      <div className="mb-3 text-xs font-semibold text-slate-500 uppercase tracking-wider flex justify-between">
        <span>Etapa 2 de 3</span>
        <span className="font-bold text-indigo-600">Seleção de Atividades (Portaria CVS 01)</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Atividades do Estabelecimento
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Adicione as atividades econômicas da empresa para verificar a exigência de LTA.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsHelpOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-200 bg-indigo-50/70 text-indigo-700 text-xs font-bold hover:bg-indigo-100 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">help</span>
          Ajuda nesta etapa
        </button>
      </div>

      <StepHelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        stepNumber={2}
        title="Orientações: Atividades & Enquadramento de LTA"
      >
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="bg-indigo-50/70 p-3 rounded-xl border border-indigo-100">
            <h3 className="font-bold text-indigo-950 mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-indigo-600">verified</span>
              1. O que determina a exigência do LTA?
            </h3>
            <p className="text-slate-600">
              A exigência de <strong>Laudo Técnico de Avaliação (LTA)</strong> é regulamentada pelo Anexo I da Portaria Estadual {PORTARIA_CVS_LABEL}. Se ao menos uma das atividades do estabelecimento estiver listada no rol da portaria, o imóvel precisará de aprovação prévia de projeto físico-funcional perante a Vigilância Sanitária Municipal de Sertãozinho-SP antes da licença.
            </p>
          </div>

          <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-100">
            <h3 className="font-bold text-emerald-950 mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
              2. Atividades do IBGE Concla fora da CVS 01
            </h3>
            <p className="text-slate-600">
              Atividades comerciais comuns, prestadores de serviços, escritórios, lojas de vestuário, consultorias e indústrias não sujeitas a controle sanitário especial. Essas atividades constam no catálogo oficial do IBGE e podem ser adicionadas para verificação.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-slate-600">search</span>
              3. Como realizar a busca rápida?
            </h3>
            <p className="text-slate-600">
              Digite o código CNAE (com ou sem pontuação, ex: <code>2099-1</code> ou <code>1031</code>) ou palavras-chave (ex: <em>panificação</em>, <em>clínica</em>, <em>alimentos</em>, <em>fotografia</em>, <em>farmácia</em>). O sistema pesquisa simultaneamente na lista da CVS 01 e nas 1.332 subclasses do IBGE Concla.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-slate-600">apartment</span>
              4. Imóvel sem atividade econômica definida (Locação ou Venda)
            </h3>
            <p className="text-slate-600">
              Se o imóvel estiver vago, para venda ou locação, sem atividade econômica definida no momento, selecione a <strong>Opção 2 (Sem Atividade Definida)</strong> para emissão da certidão sanitária correspondente.
            </p>
          </div>
        </div>
      </StepHelpModal>

      {/* Toast de feedback (sempre visível quando há mensagem) */}
      {addedToastMessage && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-emerald-600">check_circle</span>
            <span>{addedToastMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setAddedToastMessage(null)}
            className="text-emerald-700 hover:text-emerald-900 p-1"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* ================= FASE 2: DECLARAÇÃO DE COMPREENSÕES SANITÁRIAS ================= */}
      {mainMode === 'consultar' && declaredCnaes.length > 0 && (
        <div className="bg-white rounded-xl border border-indigo-200 p-4 sm:p-5 mb-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-1 border-b border-slate-200">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
                {declaredCnaes.length} {declaredCnaes.length === 1 ? 'atividade' : 'atividades'}
              </span>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Atividades incluídas no estabelecimento
              </h2>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {declaredCnaes.filter((d) => d.status === 'pending').length > 0 && (
                <button
                  type="button"
                  onClick={handleGoToPending}
                  className="text-[11px] font-bold uppercase px-2.5 py-1 rounded-full border bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1.5 hover:bg-amber-100 transition-colors cursor-pointer"
                  title="Ir para a pendência"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  {declaredCnaes.filter((d) => d.status === 'pending').length} pendente(s)
                </button>
              )}
              <button
                type="button"
                onClick={onClearActivities}
                className="text-xs text-slate-400 hover:text-rose-600 transition-colors font-medium ml-1 cursor-pointer"
              >
                Limpar todas
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Resumo das atividades incluídas. Selecione as compreensões sanitárias aplicáveis em cada atividade na área de busca abaixo.
          </p>

          <div className="space-y-2">
            {declaredCnaes.map((declared) => {
              const ltaStatus = getCnaeLtaStatus(declared);
              const isExpanded = expandedSummaryCnaes.has(declared.cnaeDigitos);
              const ltaBadgeClass = {
                exige: 'bg-rose-50 text-rose-700 border-rose-200',
                nao_exige: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                pode_exigir: 'bg-amber-50 text-amber-700 border-amber-200',
                fora_cvs: 'bg-slate-50 text-slate-600 border-slate-200',
              }[ltaStatus.variant];

              return (
                <div
                  key={declared.cnaeDigitos}
                  className={`rounded-xl border transition-all ${
                    declared.status === 'confirmed'
                      ? 'border-emerald-300 bg-emerald-50/30'
                      : declared.status === 'none_applies'
                      ? 'border-slate-300 bg-slate-50'
                      : 'border-amber-300 bg-amber-50/40'
                  }`}
                >
                  {/* Header row */}
                  <div className="flex items-center gap-2 px-3.5 py-2.5 flex-wrap sm:flex-nowrap">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${
                      declared.status === 'confirmed' ? 'bg-emerald-500' :
                      declared.status === 'none_applies' ? 'bg-slate-500' :
                      'bg-amber-500 animate-pulse'
                    }`}></span>
                    <span className="font-mono font-bold text-[11px] text-slate-800 shrink-0">
                      {declared.cnae}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-800 truncate flex-1 min-w-0">
                      {declared.descricaoCnae}
                    </span>
                    {/* Tag LTA */}
                    <span className={`text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded border shrink-0 ${ltaBadgeClass}`}>
                      {ltaStatus.label}
                    </span>
                    {/* Choice Badge */}
                    {declared.naoConstaCvs ? (
                      <span className="text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded shrink-0">
                        Fora da CVS 01
                      </span>
                    ) : declared.status === 'none_applies' ? (
                      <span className="text-[10px] font-bold text-slate-700 bg-slate-200/90 border border-slate-300 px-2 py-0.5 rounded flex items-center gap-1 shrink-0">
                        <span className="material-symbols-outlined text-[13px] text-slate-600">block</span>
                        Nenhuma compreensão se aplica
                      </span>
                    ) : declared.status === 'confirmed' ? (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded flex items-center gap-1 shrink-0">
                        <span className="material-symbols-outlined text-[13px] text-emerald-600">check_circle</span>
                        {declared.compreensoesSelecionadas.length} {declared.compreensoesSelecionadas.length === 1 ? 'compreensão' : 'compreensões'}
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-amber-700 shrink-0">Pendente</span>
                    )}

                    {/* Expand/Collapse details button */}
                    {!declared.naoConstaCvs && (
                      <button
                        type="button"
                        onClick={() => toggleSummaryExpand(declared.cnaeDigitos)}
                        className="text-slate-500 hover:text-indigo-600 px-1.5 py-0.5 rounded border border-slate-200 hover:border-indigo-200 bg-white cursor-pointer shrink-0 flex items-center gap-0.5 text-[10px] font-bold transition-colors"
                        title={isExpanded ? 'Recolher detalhes' : 'Ver detalhes da seleção'}
                      >
                        <span>{isExpanded ? 'Recolher' : 'Detalhes'}</span>
                        <span className="material-symbols-outlined text-[15px]">
                          {isExpanded ? 'expand_less' : 'expand_more'}
                        </span>
                      </button>
                    )}

                    {/* Remove CNAE button */}
                    <button
                      type="button"
                      onClick={() => onRemoveDeclaredCnae(declared.cnaeDigitos)}
                      className="text-slate-400 hover:text-rose-600 p-1 hover:bg-rose-50 rounded cursor-pointer shrink-0 transition-colors"
                      title="Remover atividade"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>

                  {/* Expanded content */}
                  {isExpanded && !declared.naoConstaCvs && (
                    <div className="px-3.5 pb-3 pt-2 border-t border-slate-200/70 space-y-2">
                      {/* Caso 1: Nenhuma compreensão se aplica */}
                      {declared.status === 'none_applies' && (
                        <div className="bg-slate-100/90 border border-slate-300 rounded-lg p-2.5 flex items-start justify-between gap-2.5">
                          <div className="flex items-start gap-2">
                            <span className="material-symbols-outlined text-[18px] text-slate-600 shrink-0 mt-0.5">check_circle</span>
                            <div>
                              <span className="text-xs font-bold text-slate-800 block">
                                Declaração: Nenhuma compreensão da Portaria CVS 01 se aplica
                              </span>
                              <span className="text-[11px] text-slate-600 mt-0.5 block leading-relaxed">
                                O requerente declarou que a atividade exercida não se enquadra nas compreensões sanitárias da Portaria CVS 01/2024. Dispensada de avaliação prévia de projeto (LTA) para este CNAE.
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveDeclaredCnae(declared.cnaeDigitos)}
                            className="text-xs text-rose-600 hover:text-rose-800 font-bold shrink-0 cursor-pointer underline"
                            title="Remover esta atividade"
                          >
                            Remover
                          </button>
                        </div>
                      )}

                      {/* Caso 2: Compreensões confirmadas — EXIBE SOMENTE A(S) COMPREENSÃO(ÕES) ESCOLHIDA(S) */}
                      {declared.status === 'confirmed' && (
                        <div className="space-y-2">
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            Compreensão sanitária selecionada ({declared.compreensoesSelecionadas.length}):
                          </div>
                          {declared.compreensoesSelecionadas.map((comp) => {
                            const hasLta = checkHasDoc52(comp.documentosInspecao);
                            return (
                              <div
                                key={comp.cvsRecordId}
                                className={`p-2.5 rounded-lg border flex items-start justify-between gap-2.5 ${
                                  hasLta
                                    ? 'bg-rose-50/50 border-rose-300'
                                    : 'bg-emerald-50/50 border-emerald-300'
                                }`}
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-1.5 py-0.2 rounded">
                                      <span className="material-symbols-outlined text-[12px]">check</span>
                                      Compreensão Selecionada
                                    </span>
                                    <span
                                      className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded border ml-auto ${
                                        hasLta
                                          ? 'bg-rose-100 text-rose-800 border-rose-200'
                                          : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                      }`}
                                    >
                                      {hasLta ? 'Exige LTA' : 'Não exige LTA'}
                                    </span>
                                  </div>
                                  <p className="text-xs font-semibold text-slate-900 leading-relaxed">
                                    {comp.compreensao}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500 flex-wrap">
                                    <span>Risco: <strong className="text-slate-700">{comp.risco}</strong></span>
                                  </div>
                                  {comp.naoCompreende && (
                                    <details className="mt-1.5">
                                      <summary className="text-[10px] text-slate-400 cursor-pointer hover:text-slate-600 list-none inline-flex items-center gap-0.5">
                                        <span className="material-symbols-outlined text-[12px]">info</span>
                                        Não compreende
                                      </summary>
                                      <p className="text-[10px] text-slate-500 mt-1 leading-relaxed whitespace-pre-line bg-white/70 p-2 rounded border border-slate-200">
                                        {comp.naoCompreende}
                                      </p>
                                    </details>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  onClick={() =>
                                    onUpdateDeclaredCnae(declared.cnaeDigitos, (d) =>
                                      toggleCompreensao(d, comp)
                                    )
                                  }
                                  className="shrink-0 p-1 text-slate-400 hover:text-rose-600 cursor-pointer"
                                  title="Remover esta compreensão"
                                >
                                  <span className="material-symbols-outlined text-[17px]">delete</span>
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= PRIMARY 2-OPTION ARCHITECTURE ================= */}
      <div className="mb-5">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          Adicionar Nova Atividade ao Estabelecimento:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Opção 1 — CONSULTAR ATIVIDADE */}
          <button
            type="button"
            onClick={() => handleSelectMainMode('consultar')}
            className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 cursor-pointer ${
              mainMode === 'consultar'
                ? 'bg-white border-indigo-600 ring-2 ring-indigo-600/20 shadow-xs'
                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                mainMode === 'consultar' ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-700'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">manage_search</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    mainMode === 'consultar'
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  Opção 1
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-900">
                  CONSULTAR ATIVIDADE
                </span>
              </div>
              <p className="text-xs text-slate-700 font-semibold leading-snug mb-1">
                Pesquise uma atividade já definida para verificar se exige LTA.
              </p>
              <p className="text-[11px] text-slate-500 leading-tight">
                Consulte por código CNAE ou nome da atividade (Portaria CVS 01 e IBGE).
              </p>
            </div>
          </button>

          {/* Opção 2 — SEM ATIVIDADE DEFINIDA */}
          <button
            type="button"
            onClick={() => handleSelectMainMode('sem_atividade')}
            className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 cursor-pointer ${
              mainMode === 'sem_atividade'
                ? 'bg-white border-emerald-600 ring-2 ring-emerald-600/20 shadow-xs'
                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                mainMode === 'sem_atividade' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">apartment</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    mainMode === 'sem_atividade'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  Opção 2
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-900">
                  SEM ATIVIDADE DEFINIDA
                </span>
              </div>
              <p className="text-xs text-slate-700 font-semibold leading-snug mb-1">
                Imóvel para locação, venda ou atualmente sem atividade definida.
              </p>
              <p className="text-[11px] text-slate-500 leading-tight">
                Declaração direta de ausência de atividade econômica sanitária vinculada nesta consulta.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* ================= OPTION 1: CONSULTAR ATIVIDADE ================= */}
      {mainMode === 'consultar' && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 mb-6 shadow-xs space-y-4 animate-fadeIn">
              {/* Campo de Busca Principal Direto e Sem Redundâncias */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Buscar Atividade por Código CNAE ou Descrição
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[20px]">
                    search
                  </span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setOnlineIbgeResults(null);
                      setOnlineIbgeError(null);
                    }}
                    placeholder="Digite o código CNAE (ex: 1091, 8610) ou descrição da atividade..."
                    className="w-full text-xs sm:text-sm pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-medium"
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm('');
                        setOnlineIbgeResults(null);
                        setOnlineIbgeError(null);
                      }}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Mensagem quando tem menos de 3 caracteres */}
              {searchTerm.trim().length > 0 && searchTerm.trim().length < 3 && (
                <div className="py-3 px-3 text-center bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Digite ao menos 3 caracteres</span> para pesquisar (ex: 109, clín, farm...).
                </div>
              )}

              {/* Estado Vazio Enxuto */}
              {!searchTerm.trim() && (
                <div className="py-4 px-3 text-center bg-slate-50/60 rounded-xl border border-dashed border-slate-200">
                  <p className="text-xs text-slate-500">
                    Digite ao menos 3 caracteres do código CNAE ou da atividade para pesquisar.
                  </p>
                </div>
              )}

              {/* FASE 2: BUSCA INTEGRADA CONCLA × CVS 01 */}
              {searchTerm.trim().length >= 3 && integratedResults.length > 0 && (
                <div className="pt-3 border-t border-slate-200 space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-600 text-[18px]">dataset</span>
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Base CONCLA/IBGE × CVS 01 ({integratedResults.length} {integratedResults.length === 1 ? 'resultado' : 'resultados'})
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-600 font-medium">
                      Pesquisa em 1.332 subclasses oficiais
                    </span>
                  </div>

                  <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                    {integratedResults.map((result) => {
                      const declared = declaredCnaes.find(
                        (d) => d.cnaeDigitos === result.cnaeDigitos
                      );
                      const alreadyDeclared = !!declared;
                      return (
                        <div
                          key={`integ-${result.cnaeDigitos}`}
                          id={`result-${result.cnaeDigitos}`}
                          className={`border rounded-xl p-3 transition-all scroll-mt-4 ${
                            alreadyDeclared
                              ? 'border-indigo-300 bg-indigo-50/20 ring-1 ring-indigo-100'
                              : 'border-slate-200 bg-white hover:border-emerald-300 hover:shadow-2xs'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span className="font-mono font-bold text-xs bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-slate-800">
                                  {result.cnaeFormatado}
                                </span>
                                {result.isInCvs01 ? (
                                  <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded">
                                    Na CVS 01
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded">
                                    Fora da CVS 01
                                  </span>
                                )}
                                {/* Tag LTA — sempre presente para ajudar o requerente */}
                                {(() => {
                                  // Fora da CVS 01: nunca exige LTA. Na CVS 01: depende da exigência.
                                  const exigeLta = result.isInCvs01 ? result.temExigenciaLta : false;
                                  return (
                                    <span className={`text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded border ${
                                      exigeLta
                                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    }`}>
                                      {exigeLta ? 'Pode exigir LTA' : 'Não exige LTA'}
                                    </span>
                                  );
                                })()}
                              </div>
                              <div className="text-xs font-semibold text-slate-800 mb-0.5 leading-relaxed">
                                {result.descricao}
                              </div>
                              {result.matchedField === 'descritor' && result.matchedText && (
                                <div className="text-[11px] text-emerald-700 mt-1 italic break-words leading-relaxed">
                                  Descrição: "{formatDescritorForDisplay(result.matchedText)}"
                                </div>
                              )}
                              {result.matchedField === 'compreensao' && result.matchedText && (
                                <div className="text-[11px] text-indigo-700 mt-1 italic">
                                  Compreensão CVS: "{result.matchedText}"
                                </div>
                              )}
                            </div>
                            {alreadyDeclared ? (
                              <button
                                type="button"
                                onClick={() => onRemoveDeclaredCnae(result.cnaeDigitos)}
                                className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white border border-rose-300 shadow-xs"
                                title="Remover atividade do estabelecimento"
                              >
                                Remover
                              </button>
                            ) : result.isInCvs01 ? (
                              // CNAE na CVS 01: botão para verificar as compreensões antes de incluir
                              (() => {
                                const isExpanded = expandedSelectors.has(result.cnaeDigitos);
                                if (isExpanded) {
                                  // Quando expandido, oculta o botão superior para não duplicar com o Recolher das compreensões
                                  return null;
                                }
                                return (
                                  <button
                                    type="button"
                                    onClick={() => toggleSelectorExpand(result.cnaeDigitos)}
                                    className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs"
                                    title="Verificar as compreensões sanitárias aplicáveis antes de incluir"
                                  >
                                    <span className="material-symbols-outlined text-[15px]">expand_more</span>
                                    Verificar compreensão
                                  </button>
                                );
                              })()
                            ) : (
                              // CNAE fora da CVS 01: inclusão direta (auto-confirmação)
                              <button
                                type="button"
                                onClick={() => handleAddDeclaredFromIntegrated(result)}
                                className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs"
                                title="Incluir esta atividade"
                              >
                                Incluir
                              </button>
                            )}
                          </div>

                          {/* Seletor de compreensões — cada compreensão tem seu próprio botão "Incluir" */}
                          {!alreadyDeclared && result.isInCvs01 && expandedSelectors.has(result.cnaeDigitos) && (() => {
                            const compreensoes = getCvsCompreensoesByCnaeDigitos(result.cnaeDigitos);
                            return (
                              <div className="mt-3 pt-3 border-t border-slate-200 space-y-2">
                                <div className="flex items-center justify-between gap-2 mb-1.5">
                                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">
                                    Compreensões sanitárias aplicáveis ({compreensoes.length})
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => toggleSelectorExpand(result.cnaeDigitos)}
                                    className="px-2 py-0.5 rounded text-[11px] font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-300 cursor-pointer shrink-0 flex items-center gap-0.5"
                                    title="Recolher compreensões"
                                  >
                                    <span className="material-symbols-outlined text-[14px]">expand_less</span>
                                    Recolher
                                  </button>
                                </div>
                                <p className="text-[10px] text-slate-400 italic mb-1.5">
                                  Clique em "Incluir" na compreensão que corresponde à atividade efetivamente exercida.
                                </p>

                                <div className="space-y-1.5">
                                  {compreensoes.map((comp) => {
                                    const recordKey = String(comp.cvsRecordId);
                                    return (
                                      <div
                                        key={recordKey}
                                        className="border border-slate-200 bg-white rounded-lg p-2.5 transition-all hover:border-slate-300"
                                      >
                                        <div className="flex items-start gap-2">
                                          <div className="flex-1 min-w-0">
                                            <div className="text-xs font-semibold text-slate-800 leading-relaxed">
                                              {comp.compreensao}
                                            </div>
                                            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                              <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                                                Risco: {comp.risco}
                                              </span>
                                              <span className={`text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded border ${
                                                checkHasDoc52(comp.documentosInspecao)
                                                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                                                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                              }`}>
                                                {checkHasDoc52(comp.documentosInspecao) ? 'Exige LTA' : 'Não exige LTA'}
                                              </span>
                                            </div>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() => handleIncludeWithCompreensao(result, comp.cvsRecordId!)}
                                            className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs"
                                            title="Incluir esta atividade"
                                          >
                                            Incluir
                                          </button>
                                        </div>
                                        {comp.naoCompreende && (
                                          <details className="mt-1">
                                            <summary className="text-[10px] text-slate-400 cursor-pointer hover:text-slate-600 list-none inline-flex items-center gap-0.5">
                                              <span className="material-symbols-outlined text-[12px]">info</span>
                                              Não compreende
                                            </summary>
                                            <p className="text-[10px] text-slate-500 mt-1 leading-relaxed whitespace-pre-line">
                                              {comp.naoCompreende}
                                            </p>
                                          </details>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>

                                {/* Opção "Nenhuma compreensão se aplica" com botão de incluir */}
                                <div className="border border-slate-200 bg-white rounded-lg p-2.5">
                                  <div className="flex items-start gap-2">
                                    <div className="flex-1 min-w-0">
                                      <span className="text-xs font-medium text-slate-700 block">
                                        Nenhuma das compreensões acima se aplica à atividade efetivamente exercida
                                      </span>
                                      <span className="text-[10px] text-slate-500 block mt-0.5">
                                        Dispensada de LTA para este CNAE perante a Vigilância Sanitária Municipal.
                                      </span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => handleIncludeNoneApplies(result)}
                                      className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs"
                                      title="Incluir esta atividade"
                                    >
                                      Incluir
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })()}

                          {/* Compreensões sanitárias — exibidas quando o CNAE foi selecionado */}
                          {alreadyDeclared && declared && (() => {
                            const isDeclaredCollapsed = collapsedDeclaredInSearch.has(declared.cnaeDigitos);
                            return (
                              <div className="mt-3 pt-3 border-t border-slate-200 space-y-2.5">
                                {declared.naoConstaCvs ? (
                                  <div className="rounded-lg p-3 text-xs bg-emerald-50 border border-emerald-200">
                                    <p className="mb-1 text-slate-700">
                                      Este CNAE <strong>não consta</strong> no Anexo I da Portaria CVS 01/2024.
                                    </p>
                                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                                      Atividade confirmada (Dispensada de LTA prévio)
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <div className="flex items-center justify-between gap-2">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">
                                          Compreensões sanitárias ({declared.compreensoesDisponiveis.length})
                                        </span>
                                        {declared.status === 'confirmed' && (
                                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-1.5 py-0.2 rounded">
                                            {declared.compreensoesSelecionadas.length} selecionada(s)
                                          </span>
                                        )}
                                        {declared.status === 'none_applies' && (
                                          <span className="text-[10px] font-bold text-slate-700 bg-slate-200 border border-slate-300 px-1.5 py-0.2 rounded">
                                            Nenhuma aplicável
                                          </span>
                                        )}
                                      </div>
                                      {/* Botão de colapsar / expandir o rol de compreensões */}
                                      <button
                                        type="button"
                                        onClick={() => toggleDeclaredInSearch(declared.cnaeDigitos)}
                                        className="px-2 py-0.5 rounded text-[11px] font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 border border-slate-300 cursor-pointer flex items-center gap-0.5"
                                        title={isDeclaredCollapsed ? 'Ver opções de compreensões' : 'Recolher compreensões'}
                                      >
                                        <span className="material-symbols-outlined text-[14px]">
                                          {isDeclaredCollapsed ? 'expand_more' : 'expand_less'}
                                        </span>
                                        {isDeclaredCollapsed ? 'Ver opções' : 'Recolher'}
                                      </button>
                                    </div>

                                    {/* Quando colapsado: exibe apenas o resumo da escolha */}
                                    {isDeclaredCollapsed ? (
                                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                                        {declared.status === 'confirmed' ? (
                                          <div className="space-y-1">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                                              Compreensão Selecionada:
                                            </span>
                                            {declared.compreensoesSelecionadas.map((comp) => (
                                              <div key={comp.cvsRecordId} className="flex items-start justify-between gap-2">
                                                <span className="font-semibold text-slate-800 leading-relaxed flex-1">
                                                  • {comp.compreensao}
                                                </span>
                                                <span className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded border shrink-0 ${
                                                  checkHasDoc52(comp.documentosInspecao)
                                                    ? 'bg-rose-100 text-rose-800 border-rose-200'
                                                    : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                                }`}>
                                                  {checkHasDoc52(comp.documentosInspecao) ? 'Exige LTA' : 'Não exige LTA'}
                                                </span>
                                              </div>
                                            ))}
                                          </div>
                                        ) : declared.status === 'none_applies' ? (
                                          <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                                            <span className="material-symbols-outlined text-[15px] text-slate-500">check_circle</span>
                                            Opção declarada: Nenhuma compreensão da Portaria CVS 01 se aplica
                                          </div>
                                        ) : (
                                          <span className="text-amber-700 font-bold">Pendente de verificação</span>
                                        )}
                                      </div>
                                    ) : (
                                      /* Quando expandido: exibe o rol completo com a escolhida em forte destaque */
                                      <div className="space-y-2">
                                        <div className="space-y-1.5">
                                          {declared.compreensoesDisponiveis.map((comp) => {
                                            const isSelected = declared.compreensoesSelecionadas.some(
                                              (s) =>
                                                (s.cvsRecordId !== undefined && comp.cvsRecordId !== undefined && String(s.cvsRecordId) === String(comp.cvsRecordId)) ||
                                                s.compreensao.trim() === comp.compreensao.trim()
                                            );
                                            const hasLta = checkHasDoc52(comp.documentosInspecao);
                                            return (
                                              <div
                                                key={comp.cvsRecordId}
                                                className={`rounded-lg p-2.5 transition-all ${
                                                  isSelected
                                                    ? 'border-2 border-emerald-500 bg-emerald-50/80 shadow-2xs ring-1 ring-emerald-200'
                                                    : 'border border-slate-200 bg-white hover:border-slate-300'
                                                }`}
                                              >
                                                <div className="flex items-start gap-2">
                                                  <div className="flex-1 min-w-0">
                                                    {isSelected && (
                                                      <div className="mb-1">
                                                        <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-emerald-700 text-white text-[9px] font-bold uppercase tracking-wider">
                                                          <span className="material-symbols-outlined text-[12px]">check</span>
                                                          Compreensão Selecionada
                                                        </span>
                                                      </div>
                                                    )}
                                                    <div className={`text-xs leading-relaxed ${isSelected ? 'font-bold text-slate-900' : 'font-semibold text-slate-800'}`}>
                                                      {comp.compreensao}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                                      <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                                                        Risco: {comp.risco}
                                                      </span>
                                                      <span className={`text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded border ${
                                                        hasLta
                                                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                                                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                      }`}>
                                                        {hasLta ? 'Exige LTA' : 'Não exige LTA'}
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <button
                                                    type="button"
                                                    onClick={() => {
                                                      onUpdateDeclaredCnae(declared.cnaeDigitos, (d) =>
                                                        toggleCompreensao(d, comp)
                                                      );
                                                    }}
                                                    className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs ${
                                                      isSelected
                                                        ? 'bg-rose-600 text-white hover:bg-rose-700'
                                                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                                    }`}
                                                    title={isSelected ? 'Remover esta compreensão' : 'Incluir esta atividade'}
                                                  >
                                                    {isSelected ? 'Remover' : 'Incluir'}
                                                  </button>
                                                </div>
                                                {comp.naoCompreende && (
                                                  <details className="mt-1">
                                                    <summary className="text-[10px] text-slate-400 cursor-pointer hover:text-slate-600 list-none inline-flex items-center gap-0.5">
                                                      <span className="material-symbols-outlined text-[12px]">info</span>
                                                      Não compreende
                                                    </summary>
                                                    <p className="text-[10px] text-slate-500 mt-1 leading-relaxed whitespace-pre-line bg-slate-50/70 p-2 rounded border border-slate-100">
                                                      {comp.naoCompreende}
                                                    </p>
                                                  </details>
                                                )}
                                              </div>
                                            );
                                          })}
                                        </div>

                                        {/* Opção "Nenhuma compreensão se aplica" com destaque visual e remoção limpa */}
                                        <div
                                          className={`flex items-center gap-2 p-2.5 rounded-lg transition-all ${
                                            declared.status === 'none_applies'
                                              ? 'border-2 border-slate-600 bg-slate-100 ring-1 ring-slate-300 shadow-2xs'
                                              : 'border border-slate-200 bg-white hover:bg-slate-50'
                                          }`}
                                        >
                                          <div className="flex-1 min-w-0">
                                            {declared.status === 'none_applies' && (
                                              <div className="mb-1">
                                                <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded bg-slate-700 text-white text-[9px] font-bold uppercase tracking-wider">
                                                  <span className="material-symbols-outlined text-[12px]">check</span>
                                                  Opção Declarada
                                                </span>
                                              </div>
                                            )}
                                            <span className={`text-xs block ${declared.status === 'none_applies' ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>
                                              Nenhuma das compreensões acima se aplica à atividade efetivamente exercida
                                            </span>
                                            <span className="text-[10px] text-slate-500 block mt-0.5">
                                              Dispensada de LTA para este CNAE perante a Vigilância Sanitária Municipal.
                                            </span>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              if (declared.status === 'none_applies') {
                                                onRemoveDeclaredCnae(declared.cnaeDigitos);
                                              } else {
                                                onUpdateDeclaredCnae(declared.cnaeDigitos, (d) =>
                                                  confirmNoneApplies(d)
                                                );
                                              }
                                            }}
                                            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs ${
                                              declared.status === 'none_applies'
                                                ? 'bg-rose-600 text-white hover:bg-rose-700'
                                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                                            }`}
                                            title={declared.status === 'none_applies' ? 'Remover esta atividade' : 'Incluir esta atividade'}
                                          >
                                            {declared.status === 'none_applies' ? 'Remover' : 'Incluir'}
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            );
                          })()}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* NENHUM RESULTADO ENCONTRADO */}
              {searchTerm.trim().length >= 3 && integratedResults.length === 0 && (
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[22px] text-amber-600 shrink-0 mt-0.5">
                      info
                    </span>
                    <div>
                      <p className="font-bold text-slate-900">
                        Nenhuma atividade localizada com o termo ou código &quot;{searchTerm}&quot;.
                      </p>
                      <p className="text-slate-700 mt-1 leading-relaxed">
                        Se este for um código ou atividade comercial comum fora da área sanitária regulada pela {PORTARIA_CVS_LABEL}, ele poderá ser incluído para verificação. Você pode consultar na API online do IBGE ou incluí-lo diretamente:
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-amber-200">
                    <button
                      type="button"
                      onClick={() => handleConsultarIbgeOnline(searchTerm)}
                      disabled={isOnlineIbgeLoading}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-colors shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer text-xs disabled:opacity-50"
                    >
                      <span className="material-symbols-outlined text-[16px]">travel_explore</span>
                      {isOnlineIbgeLoading ? 'Buscando no IBGE...' : `Consultar "${searchTerm}" na API do IBGE`}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAddNonListedCnae(searchTerm)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer text-xs"
                    >
                      <span className="material-symbols-outlined text-[16px]">add_circle</span>
                      + Selecionar atividade
                    </button>
                  </div>

                  {onlineIbgeError && (
                    <div className="p-2 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded">
                      {onlineIbgeError}
                    </div>
                  )}

                  {onlineIbgeResults && onlineIbgeResults.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <p className="font-bold text-slate-800 text-xs">
                        Resultados da API do IBGE:
                      </p>
                      {onlineIbgeResults
                        .filter((item) => {
                          if (item.isInCvs01) return false;
                          const d = cleanCnaeDigits(item.cnaeFormatado || item.id);
                          return !declaredCnaes.some((s) => {
                            return s.cnaeDigitos === d || (s.cnaeDigitos.length >= 5 && d.startsWith(s.cnaeDigitos.slice(0, 5)));
                          });
                        })
                        .map((item) => (
                          <div
                            key={item.id}
                            className="p-2.5 bg-white rounded-lg border border-emerald-200 flex items-center justify-between gap-2 shadow-2xs"
                          >
                            <div className="text-xs text-slate-800">
                              <span className="font-bold font-mono text-xs text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 mr-1.5">
                                {item.cnaeFormatado}
                              </span>
                              {item.descricao}
                            </div>
                            <button
                              type="button"
                              onClick={() => handleIncludeIbgeActivity(item)}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold shrink-0 shadow-2xs transition-colors cursor-pointer"
                            >
                              + Adicionar
                            </button>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}

        </div>
      )}

      {/* ================= OPTION 2: SEM ATIVIDADE DEFINIDA ================= */}
      {mainMode === 'sem_atividade' && (
        <div className="mb-6 space-y-4 animate-fadeIn">
          {/* Explicação verde */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 sm:p-6 shadow-xs">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-emerald-950 mb-1.5">
                  Imóvel sem atividade econômica sanitária definida
                </h3>
                <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed mb-2">
                  Esta opção deve ser utilizada quando, nesta solicitação, ainda não houver atividade econômica sanitária definida ou vinculada ao imóvel.
                </p>
                <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                  A obrigatoriedade de LTA depende do enquadramento da atividade a ser implantada ou exercida, conforme a {PORTARIA_CVS_LABEL}.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
            {/* Declaração automática — sem passo extra de confirmação */}
            <div className="p-4 rounded-xl border bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-400">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-emerald-600 text-[22px] shrink-0 mt-0.5">check_circle</span>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-emerald-950 leading-snug block">
                    Declaração de imóvel sem atividade econômica sanitária definida registrada automaticamente.
                  </span>
                  <span className="text-[11px] text-emerald-800 mt-0.5 block">
                    Esta declaração já foi adicionada à lista de atividades do estabelecimento acima.
                  </span>
                </div>
              </div>
            </div>

            {/* Campo opcional de observação */}
            <div>
              <label htmlFor="property-notes-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Identificação do imóvel / Observações — <span className="text-slate-400 font-normal">opcional</span>
              </label>
              <input
                id="property-notes-input"
                type="text"
                value={propertyNotes}
                onChange={(e) => handlePropertyNotesChange(e.target.value)}
                placeholder="Ex.: Galpão Industrial 02, Sala 104, imóvel vago para futura locação etc."
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-900 placeholder:text-slate-400"
              />
            </div>

            {/* Feedback / Status da declaração */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-[20px] shrink-0">check_circle</span>
              <span>
                Declaração registrada nas atividades do estabelecimento. Clique em <strong>Continuar e Ver Resultado</strong> no rodapé para prosseguir.
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ================= FOOTER NAVIGATION ================= */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200">
        <button
          type="button"
          onClick={onPrev}
          className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 transition-colors text-xs sm:text-sm font-medium flex items-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Voltar para Identificação
        </button>

        {/* FASE 2: Lógica de conclusão considera CNAEs declarados e pendências */}
        {(() => {
          if (mainMode === 'sem_atividade') {
            // Modo sem atividade: usa lógica existente
            if (selectedActivities.length > 0) {
              return (
                <button
                  type="button"
                  onClick={onFinish}
                  className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors text-xs sm:text-sm font-bold shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  Continuar e Ver Resultado
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              );
            }
            return (
              <button
                type="button"
                disabled
                className="px-6 py-2.5 rounded-lg bg-slate-200 text-slate-400 cursor-not-allowed text-xs sm:text-sm font-semibold flex items-center gap-2"
              >
                Marque a declaração acima para continuar
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            );
          }

          // Modo consultar: prioriza CNAEs declarados
          if (declaredCnaes.length > 0) {
            if (consultaCompleta) {
              return (
                <button
                  type="button"
                  onClick={onFinish}
                  className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors text-xs sm:text-sm font-bold shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  Continuar e Ver Resultado
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              );
            }
            return (
              <button
                type="button"
                onClick={handleGoToPending}
                className="px-6 py-2.5 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors text-xs sm:text-sm font-bold flex items-center gap-2 border border-amber-600 cursor-pointer shadow-sm animate-pulse"
                title="Clique para ir até a pendência"
              >
                {pendingCount} {pendingCount === 1 ? 'verificação pendente' : 'verificações pendentes'}
                <span className="material-symbols-outlined text-[16px]">pending_actions</span>
              </button>
            );
          }

          // Fallback: atividades selecionadas diretamente (compatibilidade)
          if (selectedActivities.length > 0) {
            return (
              <button
                type="button"
                onClick={onFinish}
                className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors text-xs sm:text-sm font-bold shadow-sm flex items-center gap-2 cursor-pointer"
              >
                Continuar e Ver Resultado
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            );
          }

          return (
            <button
              type="button"
              disabled
              className="px-6 py-2.5 rounded-lg bg-slate-200 text-slate-400 cursor-not-allowed text-xs sm:text-sm font-semibold flex items-center gap-2"
            >
              Adicione ao menos um CNAE
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          );
        })()}
      </div>
    </div>
  );
};
