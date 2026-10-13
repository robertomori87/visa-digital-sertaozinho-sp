import React, { useState, useMemo, useEffect } from 'react';
import type {
  CvsLtaRecord,
  SelectedCvsActivity,
  CNAEItem,
} from '../types';
import {
  getAgrupamentos,
  searchAtividades,
  cvsRecordToCnaeItem,
  isActivityLtaRequired,
  checkHasDoc52,
  formatNaoCompreendeItems,
} from '../data/cvsLtaService';
import {
  searchIbgeSubclasses,
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
}

export const Step2Activity: React.FC<Step2ActivityProps> = ({
  selectedActivities,
  onAddActivity,
  onRemoveActivity,
  onClearActivities,
  onFinish,
  onPrev,
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
  const [selectedCnaeCodeForDetail, setSelectedCnaeCodeForDetail] = useState<string | null>(null);
  const [comprehensionFilter, setComprehensionFilter] = useState('');
  const [expandedCnaeMap, setExpandedCnaeMap] = useState<Record<string, boolean>>({});
  const [expandedExclusoes, setExpandedExclusoes] = useState<Record<string, boolean>>({});

  const toggleCnaeExpanded = (cnae: string) => {
    setExpandedCnaeMap((prev) => ({
      ...prev,
      [cnae]: !prev[cnae],
    }));
  };

  // Online IBGE Lookup state
  const [isOnlineIbgeLoading, setIsOnlineIbgeLoading] = useState(false);
  const [onlineIbgeResults, setOnlineIbgeResults] = useState<IbgeCnaeResult[] | null>(null);
  const [onlineIbgeError, setOnlineIbgeError] = useState<string | null>(null);

  // Custom non-listed CNAE state
  const [nonListedCnaeInput, setNonListedCnaeInput] = useState('');
  const [nonListedDescInput, setNonListedDescInput] = useState('');
  const [addedToastMessage, setAddedToastMessage] = useState<string | null>(null);

  // Agrupamentos list da Portaria CVS 01
  const agrupamentos = useMemo(() => getAgrupamentos(), []);

  // Search results Portaria CVS 01 (busca a partir de 4 caracteres para alta performance)
  const searchResults = useMemo(() => {
    if (searchTerm.trim().length < 4) return [];
    return searchAtividades(searchTerm);
  }, [searchTerm]);

  // Search results IBGE Subclasses (busca a partir de 4 caracteres)
  // Filtra atividades que já aparecem na Portaria CVS 01 acima, evitando qualquer redundância nos resultados
  const ibgeMatches = useMemo(() => {
    if (searchTerm.trim().length < 4) return [];
    const rawMatches = searchIbgeSubclasses(searchTerm, 40);

    // Conjunto de dígitos dos CNAEs já encontrados nos resultados da Portaria CVS 01 na parte superior
    const upperCnaePrefixes = new Set<string>();
    searchResults.forEach((r) => {
      const d = cleanCnaeDigits(r.cnae);
      if (d) {
        upperCnaePrefixes.add(d);
        if (d.length >= 5) upperCnaePrefixes.add(d.slice(0, 5));
      }
    });

    return rawMatches.filter((item) => {
      // Se a atividade já consta na Portaria CVS 01 (exibida acima), não repete no bloco do IBGE
      if (item.isInCvs01) return false;
      const itemDigits = cleanCnaeDigits(item.cnaeFormatado || item.id);
      if (upperCnaePrefixes.has(itemDigits)) return false;
      if (itemDigits.length >= 5 && upperCnaePrefixes.has(itemDigits.slice(0, 5))) return false;
      return true;
    });
  }, [searchTerm, searchResults]);

  // Check if a specific record is already in selectedActivities
  const isRecordSelected = (cnae: string, compreensao: string) => {
    return selectedActivities.some(
      (a) => a.cnae === cnae && a.compreensao.trim() === compreensao.trim()
    );
  };

  // Checa se uma subclasse do IBGE já está adicionada no estabelecimento
  const isIbgeActivityAdded = (item: IbgeCnaeResult) => {
    const itemDigits = cleanCnaeDigits(item.cnaeFormatado || item.id);
    return selectedActivities.some((a) => {
      const aDigits = cleanCnaeDigits(a.cnae);
      // Correspondência exata do código de 7 dígitos da subclasse
      return aDigits === itemDigits;
    });
  };

  // Quick Add function
  const handleAddRecord = (rec: CvsLtaRecord) => {
    // Se havia declaração de sem atividade, remove antes de adicionar atividade real
    const noActIdx = selectedActivities.findIndex((a) => a.cnae === 'SEM CNAE' || a.agrupamento?.includes('SEM ATIVIDADE'));
    if (noActIdx !== -1) {
      onRemoveActivity(noActIdx);
    }

    const isLtaReq = rec.exigeLta !== undefined ? rec.exigeLta : checkHasDoc52(rec.documentosInspecao);

    const activity: SelectedCvsActivity = {
      cnae: rec.cnae,
      cnaeNormalizado: rec.cnaeNormalizado,
      descricaoCnae: rec.descricaoCnae,
      compreensao: rec.compreensao,
      agrupamento: rec.agrupamento,
      risco: rec.risco,
      documentoPrevio: rec.documentoPrevio,
      documentosInspecao: rec.documentosInspecao,
      naoCompreende: rec.naoCompreende,
      paginaCvs: rec.paginaCvs,
      exigeLta: isLtaReq,
    };
    const cnaeItem = cvsRecordToCnaeItem(rec);
    onAddActivity(activity, cnaeItem);
    setAddedToastMessage(
      `Atividade CNAE ${rec.cnae} adicionada! (${isLtaReq ? 'LTA Obrigatório' : 'LTA Dispensado'})`
    );
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

  // Incluir Atividade Oficial do IBGE no Estabelecimento (Dispensada de LTA)
  const handleIncludeIbgeActivity = (item: IbgeCnaeResult) => {
    // Se havia declaração de sem atividade, remove antes de adicionar atividade real
    const noActIdx = selectedActivities.findIndex((a) => a.cnae === 'SEM CNAE' || a.agrupamento?.includes('SEM ATIVIDADE'));
    if (noActIdx !== -1) {
      onRemoveActivity(noActIdx);
    }

    if (item.isInCvs01) {
      setSearchTerm(item.id.slice(0, 5));
      setMainMode('consultar');
      setAddedToastMessage(
        `O CNAE ${item.cnaeFormatado} consta na ${PORTARIA_CVS_LABEL}. Selecione a compreensão sanitária correspondente na seção da Portaria CVS 01.`
      );
      setTimeout(() => setAddedToastMessage(null), 5000);
      return;
    }

    const cleanCnae = item.cnaeFormatado;
    const cleanDesc = item.descricao.toUpperCase();

    const customActivity: SelectedCvsActivity = {
      cnae: cleanCnae,
      cnaeNormalizado: cleanCnae,
      descricaoCnae: cleanDesc,
      compreensao:
        `Atividade econômica oficial classificada na CONCLA/IBGE não sujeita à aprovação prévia de LTA pela ${PORTARIA_CVS_LABEL}. O estabelecimento está DISPENSADO de emissão prévia de LTA perante a Vigilância Sanitária para esta atividade.`,
      agrupamento: item.secaoDescricao
        ? `IBGE: ${item.secaoDescricao} (DISPENSADO DE LTA)`
        : 'ATIVIDADE NÃO CONSTANTE NA PORTARIA CVS 01 (ISENTO DE LTA)',
      risco: 'Dispensado de LTA',
      documentoPrevio: 'Não exigido (Dispensado de LTA)',
      documentosInspecao: 'Documentação padrão do município / Conforme legislação sanitária geral',
      naoCompreende: '',
      paginaCvs: 'N/A (Dispensado)',
      exigeLta: false,
    };

    const cnaeItem: CNAEItem = {
      id: `ibge-${item.id}-${Date.now()}`,
      code: cleanCnae,
      description: cleanDesc,
      compreensao: customActivity.compreensao,
      riskLevel: 'Baixo',
      category: 'Dispensado de LTA (IBGE)',
      ltaRequiredDefault: false,
      requiresQuestions: false,
      notes: `Atividade classificada no IBGE Concla - Dispensada de LTA pela ${PORTARIA_CVS_LABEL}`,
      legislationRef: `${PORTARIA_CVS_LABEL} / IBGE Concla`,
      documentoPrevio: 'Não exigido (Dispensado de LTA)',
      documentosInspecao: customActivity.documentosInspecao,
      agrupamento: customActivity.agrupamento,
      paginaCvs: 'N/A',
    };

    onAddActivity(customActivity, cnaeItem);
    setOnlineIbgeResults(null);
    setAddedToastMessage(`Atividade CNAE ${cleanCnae} adicionada ao estabelecimento como DISPENSADA DE LTA!`);
    setTimeout(() => {
      setAddedToastMessage(null);
    }, 4000);
  };

  // Add non-listed CNAE (Isenta de LTA)
  const handleAddNonListedCnae = (cnaeParam?: string, descParam?: string) => {
    // Se havia declaração de sem atividade, remove antes de adicionar atividade real
    const noActIdx = selectedActivities.findIndex((a) => a.cnae === 'SEM CNAE' || a.agrupamento?.includes('SEM ATIVIDADE'));
    if (noActIdx !== -1) {
      onRemoveActivity(noActIdx);
    }

    const rawCnae = (cnaeParam !== undefined ? cnaeParam : (nonListedCnaeInput || searchTerm)).trim();
    if (!rawCnae) return;
    const cleanCnae = rawCnae;
    const cleanDesc =
      (descParam !== undefined ? descParam : nonListedDescInput).trim() ||
      `Atividade CNAE ${cleanCnae} - Não constante no rol de LTA da ${PORTARIA_CVS_LABEL} (Dispensada de LTA)`;

    const customActivity: SelectedCvsActivity = {
      cnae: cleanCnae,
      cnaeNormalizado: cleanCnae,
      descricaoCnae: cleanDesc,
      compreensao:
        `Atividade não relacionada no Anexo I da ${PORTARIA_CVS_LABEL} para fins de obrigatoriedade de LTA. O estabelecimento está DISPENSADO de emissão de LTA perante a Vigilância Sanitária para esta atividade.`,
      agrupamento: 'NÃO CONSTANTE NA PORTARIA CVS 01 (ISENTO DE LTA)',
      risco: 'Dispensado de LTA',
      documentoPrevio: 'Não exigido (Dispensado de LTA)',
      documentosInspecao: 'Documentação padrão do município / Conforme legislação sanitária geral',
      naoCompreende: '',
      paginaCvs: 'N/A (Dispensado)',
      exigeLta: false,
    };

    const cnaeItem: CNAEItem = {
      id: `custom-${cleanCnae}-${Date.now()}`,
      code: cleanCnae,
      description: cleanDesc,
      compreensao: customActivity.compreensao,
      riskLevel: 'Baixo',
      category: 'Não Constante na CVS 01',
      ltaRequiredDefault: false,
      requiresQuestions: false,
      notes: 'Atividade não constante no Anexo I da Portaria CVS 01 - Dispensada de LTA',
      legislationRef: PORTARIA_CVS_LABEL,
      documentoPrevio: customActivity.documentoPrevio,
      documentosInspecao: customActivity.documentosInspecao,
      agrupamento: customActivity.agrupamento,
      paginaCvs: 'N/A',
    };

    onAddActivity(customActivity, cnaeItem);
    setNonListedCnaeInput('');
    setNonListedDescInput('');
    setSearchTerm('');
    setAddedToastMessage(`Atividade ${cleanCnae} incluída no estabelecimento como DISPENSADA DE LTA!`);
    setTimeout(() => {
      setAddedToastMessage(null);
    }, 4000);
  };

  // Check activities breakdown
  const ltaRequiredActivities = useMemo(() => {
    return selectedActivities.filter(isActivityLtaRequired);
  }, [selectedActivities]);

  const ltaExemptActivities = useMemo(() => {
    return selectedActivities.filter((act) => !isActivityLtaRequired(act));
  }, [selectedActivities]);

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
              2. Atividades do IBGE Concla fora da CVS 01 (Dispensadas)
            </h3>
            <p className="text-slate-600">
              Atividades comerciais comuns, prestadores de serviços, escritórios, lojas de vestuário, consultorias e indústrias não sujeitas a controle sanitário especial <strong>não exigem LTA</strong>. Essas atividades constam no catálogo oficial do IBGE e podem ser adicionadas diretamente com enquadramento de dispensa.
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

      {/* ================= ATIVIDADES SELECIONADAS (SUMMARY TRAY) ================= */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 mb-6 shadow-xs">
        {/* Added Toast Notification */}
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

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
              {selectedActivities.length}
            </span>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Atividades Adicionadas ao Estabelecimento
            </h2>
          </div>

          {selectedActivities.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              {hasNoActivityDeclared ? (
                <span className="text-[11px] font-bold uppercase px-2.5 py-1 rounded-full border bg-slate-100 text-slate-800 border-slate-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-600"></span>
                  Sem atividade definida (Dispensado nesta consulta)
                </span>
              ) : (
                <>
                  {ltaRequiredActivities.length > 0 && (
                    <span className="text-[11px] font-bold uppercase px-2.5 py-1 rounded-full border bg-rose-50 text-rose-700 border-rose-200 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                      {ltaRequiredActivities.length} {ltaRequiredActivities.length === 1 ? 'precisa de LTA' : 'precisam de LTA'}
                    </span>
                  )}
                  {ltaExemptActivities.length > 0 && (
                    <span className="text-[11px] font-bold uppercase px-2.5 py-1 rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      {ltaExemptActivities.length} {ltaExemptActivities.length === 1 ? 'não precisa de LTA (Isenta)' : 'não precisam de LTA (Isentas)'}
                    </span>
                  )}
                </>
              )}

              <button
                type="button"
                onClick={onClearActivities}
                className="text-xs text-slate-400 hover:text-rose-600 transition-colors font-medium ml-1 cursor-pointer"
              >
                Limpar todas
              </button>
            </div>
          )}
        </div>

        {selectedActivities.length === 0 ? (
          <div className="py-6 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
            <span className="material-symbols-outlined text-[32px] text-slate-400 mb-1">
              playlist_add
            </span>
            <p className="text-xs sm:text-sm font-semibold text-slate-700">
              Nenhuma atividade adicionada ainda
            </p>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-0.5">
              Escolha uma das opções abaixo para buscar pelo CNAE, navegar por agrupamentos ou declarar imóvel para locação, e clique em <strong>+ Adicionar Atividade</strong>.
            </p>
          </div>
        ) : (
          <div className="space-y-3.5">
            {selectedActivities.map((act, index) => {
              const isNoActivity = act.cnae === 'SEM CNAE' || act.agrupamento?.includes('SEM ATIVIDADE');
              const isLta = !isNoActivity && isActivityLtaRequired(act);

              return (
                <div
                  key={`${act.cnae}-${index}`}
                  className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                    isNoActivity
                      ? 'bg-slate-50/70 border-slate-300 shadow-2xs'
                      : isLta
                      ? 'bg-rose-50/20 border-rose-300 shadow-2xs'
                      : 'bg-emerald-50/25 border-emerald-300 shadow-2xs'
                  }`}
                >
                  {/* Status Banner com tag única destacada */}
                  <div
                    className={`flex items-center justify-between gap-2 pb-2 mb-2 border-b ${
                      isNoActivity
                        ? 'border-slate-200'
                        : isLta
                        ? 'border-rose-100'
                        : 'border-emerald-100'
                    }`}
                  >
                    <span
                      className={`inline-flex items-center gap-1.5 font-bold text-xs px-2.5 py-1 rounded-md border ${
                        isNoActivity
                          ? 'bg-slate-200 text-slate-800 border-slate-300'
                          : isLta
                          ? 'bg-rose-100 text-rose-800 border-rose-200'
                          : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {isNoActivity ? 'fact_check' : isLta ? 'assignment_late' : 'check_circle'}
                      </span>
                      {isNoActivity
                        ? 'IMÓVEL SEM ATIVIDADE DEFINIDA'
                        : isLta
                        ? 'PRECISA DE LTA (OBRIGATÓRIO)'
                        : 'NÃO PRECISA DE LTA (DISPENSADA)'}
                    </span>

                    <button
                      type="button"
                      onClick={() => onRemoveActivity(index)}
                      className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0 cursor-pointer"
                      title="Remover esta atividade do estabelecimento"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-mono font-bold text-xs bg-white border border-slate-200 px-2.5 py-0.5 rounded text-indigo-800 shadow-2xs">
                        {isNoActivity ? 'DECLARAÇÃO' : `CNAE ${act.cnae}`}
                      </span>
                      {act.agrupamento && !isNoActivity && (
                        <span className="text-[10px] uppercase font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded truncate max-w-[280px]">
                          {act.agrupamento}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-slate-900 mb-2">
                      {act.descricaoCnae}
                    </p>

                    {/* Compreensão Sanitária */}
                    <div
                      className={`p-2.5 rounded-lg border text-xs mb-1.5 ${
                        isNoActivity
                          ? 'bg-slate-100/70 border-slate-200 text-slate-800'
                          : isLta
                          ? 'bg-rose-50/50 border-rose-200 text-rose-950'
                          : 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                      }`}
                    >
                      <span
                        className={`block text-[10px] uppercase font-bold mb-0.5 ${
                          isNoActivity
                            ? 'text-slate-700'
                            : isLta
                            ? 'text-rose-700'
                            : 'text-emerald-700'
                        }`}
                      >
                        {isNoActivity ? 'Situação Declarada:' : 'Compreensão Regulamentada:'}
                      </span>
                      <p className="leading-relaxed font-medium">{act.compreensao}</p>
                    </div>

                    {/* Exclusões (Não compreende): Oculto por padrão para layout enxuto */}
                    {(() => {
                      const excItems = formatNaoCompreendeItems(act.naoCompreende);
                      if (excItems.length === 0) return null;
                      const excKey = `${act.cnae}-${index}`;
                      const isShown = !!expandedExclusoes[excKey];

                      return (
                        <div className="mt-1">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedExclusoes((prev) => ({ ...prev, [excKey]: !prev[excKey] }))
                            }
                            className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 inline-flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <span className="material-symbols-outlined text-[14px]">
                              {isShown ? 'expand_less' : 'expand_more'}
                            </span>
                            <span>{isShown ? 'Ocultar' : 'Ver'} atividades excluídas deste código ({excItems.length})</span>
                          </button>
                          {isShown && (
                            <div className="bg-amber-50/90 p-2.5 rounded-lg border border-amber-200 text-[11px] text-amber-900 mt-1 space-y-1">
                              <span className="font-bold block text-amber-800">
                                Não compreende (atividades excluídas deste código):
                              </span>
                              <ul className="list-disc list-inside space-y-0.5 text-slate-700 pl-0.5">
                                {excItems.map((item, i) => (
                                  <li key={i} className="leading-snug">{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              );
            })}

            {/* Resumo de atividades adicionadas (sem botão duplicado) */}
            <div className="pt-2 flex items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-600">
                <span>
                  Total de atividades no estabelecimento:{' '}
                  <strong>{selectedActivities.length}</strong>{' '}
                  {hasNoActivityDeclared
                    ? '(Declaração de imóvel sem atividade vinculada nesta consulta)'
                    : `(${ltaRequiredActivities.length} com LTA exigido, ${ltaExemptActivities.length} isenta${
                        ltaExemptActivities.length === 1 ? '' : 's'
                      })`}
                  .
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= PRIMARY 2-OPTION ARCHITECTURE ================= */}
      <div className="mb-5">
        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          Adicionar Nova Atividade ao Estabelecimento:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Opção 1 — CONSULTAR ATIVIDADE */}
          <button
            type="button"
            onClick={() => setMainMode('consultar')}
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
            onClick={() => setMainMode('sem_atividade')}
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
                      setSelectedCnaeCodeForDetail(null);
                      setComprehensionFilter('');
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
                        setSelectedCnaeCodeForDetail(null);
                        setComprehensionFilter('');
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

              {/* Mensagem quando tem menos de 4 caracteres */}
              {searchTerm.trim().length > 0 && searchTerm.trim().length < 4 && (
                <div className="py-3 px-3 text-center bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Digite ao menos 4 caracteres</span> para pesquisar (ex: 1091, clínica, farmácia...).
                </div>
              )}

              {/* Estado Vazio Enxuto */}
              {!searchTerm.trim() && (
                <div className="py-4 px-3 text-center bg-slate-50/60 rounded-xl border border-dashed border-slate-200">
                  <p className="text-xs text-slate-500">
                    Digite ao menos 4 caracteres do código CNAE ou da atividade para pesquisar.
                  </p>
                </div>
              )}

              {/* SEÇÃO 1: RESULTADOS DA Portaria CVS 01/2024 */}
              {searchResults.length > 0 && (
                <div className="pt-3 border-t border-slate-200 space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-indigo-600 text-[18px]">verified</span>
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                        Atividades Reguladas na Portaria CVS 01 ({searchResults.length} {searchResults.length === 1 ? 'CNAE encontrado' : 'CNAEs encontrados'})
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-600 font-medium">
                      Clique no CNAE para visualizar ou recolher as opções
                    </span>
                  </div>

                  <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                    {searchResults.slice(0, 35).map((summary) => {
                      const isExpanded = !!expandedCnaeMap[summary.cnae];
                      const hasMultiple = summary.registros.length > 1;
                      const rec0 = summary.registros[0];
                      const alreadyAddedSingle = !hasMultiple && isRecordSelected(summary.cnae, rec0.compreensao);
                      const hasExclusions0 = !hasMultiple && formatNaoCompreendeItems(rec0.naoCompreende).length > 0;

                      // Quantas opções deste CNAE já foram adicionadas
                      const selectedCountInThisCnae = summary.registros.filter((r) =>
                        isRecordSelected(summary.cnae, r.compreensao)
                      ).length;

                      const filteredRecords = summary.registros.filter((r) => {
                        if (!comprehensionFilter || selectedCnaeCodeForDetail !== summary.cnae) return true;
                        return (
                          r.compreensao.toLowerCase().includes(comprehensionFilter.toLowerCase()) ||
                          r.naoCompreende.toLowerCase().includes(comprehensionFilter.toLowerCase())
                        );
                      });

                      return (
                        <div
                          key={summary.cnae}
                          className={`border rounded-xl transition-all overflow-hidden ${
                            isExpanded
                              ? 'border-indigo-300 bg-white shadow-xs'
                              : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-2xs'
                          }`}
                        >
                          {/* CNAE Header / Linha compacta colapsável */}
                          <div
                            onClick={() => {
                              toggleCnaeExpanded(summary.cnae);
                            }}
                            className="p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 transition-colors cursor-pointer hover:bg-slate-50/70"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <span className="font-mono font-bold text-xs bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-slate-800">
                                  CNAE {summary.cnae}
                                </span>

                                {/* Status de LTA do CNAE */}
                                {summary.temExigenciaLta && !summary.temDispensaLta ? (
                                  <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                                    Exige LTA
                                  </span>
                                ) : !summary.temExigenciaLta && summary.temDispensaLta ? (
                                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                                    Dispensado de LTA
                                  </span>
                                ) : (
                                  <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-300 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                                    Depende da Atividade ({summary.registros.length} opções)
                                  </span>
                                )}

                                {hasExclusions0 && (
                                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[12px]">info</span>
                                    Possui exceções (Não compreende)
                                  </span>
                                )}

                                {selectedCountInThisCnae > 0 && (
                                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[13px]">check_circle</span>
                                    {selectedCountInThisCnae} selecionada{selectedCountInThisCnae > 1 ? 's' : ''}
                                  </span>
                                )}
                              </div>

                              <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                                {summary.descricaoCnae}
                              </p>
                            </div>

                            {/* Ação direita: Adicionar direto se único, ou Botão de Expandir se múltiplo */}
                            <div
                              className="shrink-0 flex items-center gap-2 self-end sm:self-center"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {!hasMultiple ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => toggleCnaeExpanded(summary.cnae)}
                                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer border ${
                                      isExpanded
                                        ? 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
                                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                    }`}
                                    title="Ver compreensão e atividades excluídas"
                                  >
                                    <span className="material-symbols-outlined text-[16px]">
                                      {isExpanded ? 'expand_less' : 'info'}
                                    </span>
                                    {isExpanded ? 'Ocultar' : hasExclusions0 ? 'Exceções' : 'Detalhes'}
                                  </button>

                                  {alreadyAddedSingle ? (
                                    <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-bold flex items-center gap-1">
                                      <span className="material-symbols-outlined text-[16px]">check</span>
                                      Já Adicionada
                                    </span>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => handleAddRecord(rec0)}
                                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                                    >
                                      <span className="material-symbols-outlined text-[16px]">add</span>
                                      Adicionar Atividade
                                    </button>
                                  )}
                                </>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => toggleCnaeExpanded(summary.cnae)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer border ${
                                    isExpanded
                                      ? 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
                                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                  }`}
                                >
                                  <span className="material-symbols-outlined text-[18px]">
                                    {isExpanded ? 'expand_less' : 'expand_more'}
                                  </span>
                                  {isExpanded ? 'Recolher' : `Ver opções (${summary.registros.length})`}
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Lista de compreensões sanitárias (Exibida somente se expandido) */}
                          {hasMultiple && isExpanded && (
                            <div className="p-3.5 space-y-2.5 bg-slate-50/70 border-t border-slate-200">
                              {summary.temExigenciaLta && summary.temDispensaLta && (
                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 text-xs text-amber-900 flex items-start gap-2">
                                  <span className="material-symbols-outlined text-amber-700 text-[18px] shrink-0 mt-0.5">
                                    alt_route
                                  </span>
                                  <div className="leading-relaxed">
                                    <strong>Enquadramento por modalidade:</strong> Este código CNAE possui atividades que <strong>precisam de LTA</strong> e atividades <strong>dispensadas de LTA</strong>. Selecione abaixo a opção exata do seu estabelecimento:
                                  </div>
                                </div>
                              )}

                              {summary.registros.length > 4 && (
                                <div className="flex items-center gap-2">
                                  <input
                                    type="text"
                                    value={selectedCnaeCodeForDetail === summary.cnae ? comprehensionFilter : ''}
                                    onFocus={() => setSelectedCnaeCodeForDetail(summary.cnae)}
                                    onChange={(e) => {
                                      setSelectedCnaeCodeForDetail(summary.cnae);
                                      setComprehensionFilter(e.target.value);
                                    }}
                                    placeholder="Filtrar nesta lista de opções..."
                                    className="text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-md focus:outline-none focus:border-indigo-400 w-full sm:w-72"
                                  />
                                </div>
                              )}

                              <div className="space-y-2">
                                {filteredRecords.map((rec, rIdx) => {
                                  const alreadyAdded = isRecordSelected(rec.cnae, rec.compreensao);
                                  const isLta = rec.exigeLta !== undefined ? rec.exigeLta : checkHasDoc52(rec.documentosInspecao);

                                  return (
                                    <div
                                      key={rIdx}
                                      className={`p-3 rounded-lg border transition-all ${
                                        alreadyAdded
                                          ? 'bg-emerald-50/50 border-emerald-300'
                                          : 'bg-white border-slate-200 hover:border-indigo-200'
                                      }`}
                                    >
                                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase">
                                              Opção {rIdx + 1} de {summary.registros.length}
                                            </span>
                                            <span
                                              className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border flex items-center gap-1 ${
                                                isLta
                                                  ? 'bg-rose-100 text-rose-800 border-rose-200'
                                                  : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                              }`}
                                            >
                                              <span className="material-symbols-outlined text-[12px]">
                                                {isLta ? 'assignment_late' : 'check_circle'}
                                              </span>
                                              {isLta ? 'Exige LTA' : 'Dispensado de LTA'}
                                            </span>
                                          </div>

                                          <p className="text-xs font-semibold text-slate-800 leading-relaxed mb-1">
                                            {rec.compreensao}
                                          </p>

                                          {(() => {
                                            const excItems = formatNaoCompreendeItems(rec.naoCompreende);
                                            if (excItems.length === 0) return null;
                                            return (
                                              <div className="text-[11px] text-amber-900 bg-amber-50/80 p-2 rounded-lg border border-amber-200 mt-1.5 space-y-1">
                                                <div className="font-bold flex items-center gap-1 text-amber-800">
                                                  <span className="material-symbols-outlined text-[14px]">info</span>
                                                  <span>Não compreende (atividades excluídas):</span>
                                                </div>
                                                <ul className="list-disc list-inside space-y-0.5 text-slate-700 pl-0.5">
                                                  {excItems.map((item, i) => (
                                                    <li key={i} className="leading-snug">{item}</li>
                                                  ))}
                                                </ul>
                                              </div>
                                            );
                                          })()}
                                        </div>

                                        <div className="shrink-0 self-end sm:self-center">
                                          {alreadyAdded ? (
                                            <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-1">
                                              <span className="material-symbols-outlined text-[16px]">
                                                check_circle
                                              </span>
                                              Adicionada
                                            </span>
                                          ) : (
                                            <button
                                              type="button"
                                              onClick={() => handleAddRecord(rec)}
                                              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                                            >
                                              <span className="material-symbols-outlined text-[16px]">
                                                add
                                              </span>
                                              Adicionar
                                            </button>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Detalhes de CNAE de registro único da CVS 01 (Exibido quando expandido) */}
                          {!hasMultiple && isExpanded && (
                            <div className="p-3.5 space-y-2.5 bg-slate-50/70 border-t border-slate-200">
                              <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-2.5 shadow-2xs">
                                <div>
                                  <span className="text-[10px] font-bold uppercase text-slate-500 block mb-0.5">
                                    Compreensão Oficial da Atividade (Portaria CVS 01):
                                  </span>
                                  <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                                    {rec0.compreensao}
                                  </p>
                                </div>

                                {(() => {
                                  const excItems = formatNaoCompreendeItems(rec0.naoCompreende);
                                  if (excItems.length === 0) return null;
                                  return (
                                    <div className="text-[11px] text-amber-900 bg-amber-50/80 p-2.5 rounded-lg border border-amber-200 space-y-1">
                                      <div className="font-bold flex items-center gap-1 text-amber-800">
                                        <span className="material-symbols-outlined text-[14px]">info</span>
                                        <span>Não compreende (atividades excluídas deste código):</span>
                                      </div>
                                      <ul className="list-disc list-inside space-y-0.5 text-slate-700 pl-0.5">
                                        {excItems.map((item, i) => (
                                          <li key={i} className="leading-snug">{item}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  );
                                })()}

                                <div className="pt-2 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
                                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5 flex-wrap">
                                    <span>Grau de Risco: <strong className="text-slate-700">{rec0.risco}</strong></span>
                                    {rec0.agrupamento && (
                                      <>
                                        <span className="text-slate-300">•</span>
                                        <span>Grupo: <strong className="text-slate-700">{rec0.agrupamento}</strong></span>
                                      </>
                                    )}
                                  </div>

                                  {!alreadyAddedSingle && (
                                    <button
                                      type="button"
                                      onClick={() => handleAddRecord(rec0)}
                                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                                    >
                                      <span className="material-symbols-outlined text-[15px]">add</span>
                                      Adicionar Atividade
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SEÇÃO 2: RESULTADOS DO CATÁLOGO OFICIAL IBGE CONCLA (DISPENSADAS DE LTA) */}
              {ibgeMatches.length > 0 && (
                <div className="pt-3 border-t border-slate-200 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-200">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0"></span>
                      <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
                        Catálogo IBGE Concla • Dispensadas de LTA ({ibgeMatches.length} {ibgeMatches.length === 1 ? 'subclasse encontrada' : 'subclasses encontradas'})
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-800 font-medium">
                      Atividades fora da Portaria CVS 01 (dispensadas de aprovação prévia de projeto físico)
                    </span>
                  </div>

                  <div className="space-y-2.5 max-h-[450px] overflow-y-auto pr-1">
                    {ibgeMatches.map((item) => {
                      const alreadyAdded = isIbgeActivityAdded(item);

                      return (
                        <div
                          key={item.id}
                          className={`p-3.5 rounded-xl border transition-all ${
                            alreadyAdded
                              ? 'bg-emerald-50/50 border-emerald-300'
                              : 'bg-white border-slate-200 hover:border-emerald-300 shadow-2xs'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className="font-mono font-bold text-xs bg-slate-100 border border-slate-300 px-2 py-0.5 rounded text-slate-800">
                                  CNAE {item.cnaeFormatado}
                                </span>
                                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                                  Dispensado de LTA
                                </span>
                                {item.secaoDescricao && (
                                  <span className="text-[10px] text-slate-500 truncate max-w-[200px]">
                                    {item.secaoDescricao}
                                  </span>
                                )}
                              </div>

                              <p className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                                {item.descricao}
                              </p>
                            </div>

                            <div className="shrink-0 self-end sm:self-center">
                              {alreadyAdded ? (
                                <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-1">
                                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                  Adicionada
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => handleIncludeIbgeActivity(item)}
                                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                                >
                                  <span className="material-symbols-outlined text-[16px]">add_circle</span>
                                  + Adicionar (Dispensado de LTA)
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* NENHUM RESULTADO ENCONTRADO (NEM NA CVS 01 NEM NO IBGE OFFLINE) */}
              {searchTerm && searchResults.length === 0 && ibgeMatches.length === 0 && (
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
                        Se este for um código ou atividade comercial comum fora da área sanitária regulada pela {PORTARIA_CVS_LABEL}, ele é <strong>isento/dispensado de LTA</strong>. Você pode consultar na API online do IBGE ou incluí-lo diretamente:
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
                      Incluir no estabelecimento como Dispensado de LTA
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
                        Resultados da API do IBGE (Dispensadas de LTA):
                      </p>
                      {onlineIbgeResults
                        .filter((item) => {
                          if (item.isInCvs01) return false;
                          const d = cleanCnaeDigits(item.cnaeFormatado || item.id);
                          return !searchResults.some((s) => {
                            const sd = cleanCnaeDigits(s.cnae);
                            return sd === d || (sd.length >= 5 && d.startsWith(sd.slice(0, 5)));
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
            {/* Confirmação simples com toggle direto */}
            <div
              className={`p-4 rounded-xl border transition-colors cursor-pointer ${
                declarationNoActivity
                  ? 'bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-400'
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
              onClick={() => handleToggleNoActivityDeclaration(!declarationNoActivity)}
            >
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={declarationNoActivity}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleToggleNoActivityDeclaration(e.target.checked);
                  }}
                  className="mt-0.5 w-4 h-4 text-emerald-600 bg-white border-slate-300 rounded focus:ring-emerald-500 focus:ring-2 cursor-pointer"
                />
                <div>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug block">
                    Declaro que, nesta consulta, não há atividade econômica sanitária definida ou vinculada ao imóvel.
                  </span>
                  <span className="text-[11px] text-slate-500 mt-0.5 block">
                    Ao marcar esta opção, a declaração é registrada imediatamente na lista de atividades do estabelecimento acima.
                  </span>
                </div>
              </label>
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
            {declarationNoActivity ? (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-600 text-[20px] shrink-0">check_circle</span>
                <span>
                  Declaração confirmada e registrada nas atividades do estabelecimento (veja no quadro acima). Clique em <strong>Continuar e Ver Resultado</strong> no rodapé para prosseguir.
                </span>
              </div>
            ) : (
              <div className="p-3 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-xs flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-400 text-[20px] shrink-0">info</span>
                <span>
                  Marque a caixa acima para adicionar esta declaração às atividades do estabelecimento e liberar o prosseguimento.
                </span>
              </div>
            )}
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

        {selectedActivities.length > 0 ? (
          <button
            type="button"
            onClick={onFinish}
            className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors text-xs sm:text-sm font-bold shadow-sm flex items-center gap-2 cursor-pointer"
          >
            Continuar e Ver Resultado
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        ) : (
          <button
            type="button"
            disabled
            className="px-6 py-2.5 rounded-lg bg-slate-200 text-slate-400 cursor-not-allowed text-xs sm:text-sm font-semibold flex items-center gap-2"
          >
            {mainMode === 'sem_atividade'
              ? 'Marque a declaração acima para continuar'
              : 'Adicione ao menos uma atividade'}
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        )}
      </div>
    </div>
  );
};
