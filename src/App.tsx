import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Step1Identification } from './components/Step1Identification';
import { Step2Activity } from './components/Step2Activity';
import { DocumentComprovante } from './components/DocumentComprovante';
import { ServicosView } from './components/ServicosView';
import { Footer } from './components/Footer';
import { SpecializedHelpModal } from './components/SpecializedHelpModal';
import { ProtocoloGuiaView } from './components/ProtocoloGuiaView';

import {
  CNAEItem,
  CompanyIdentification,
  DeclaredCnae,
  SelectedCvsActivity,
  StepId,
  TopTab,
  VerificationResult,
} from './types';
import { loadCnaeDatabase, resetCnaeDatabase } from './data/cnaeDatabase';
import { isActivityLtaRequired } from './data/cvsLtaService';
import {
  computeConsultaResultado,
  declaredCnaeToActivities,
  isConsultaCompleta,
} from './data/cvsDeclarationService';
import {
  PORTARIA_CVS_RASTREABILIDADE,
} from './data/normativeMetadata';
import cvsMetadata from './data/cvsLta.metadata.json';

const CVS_INTEGRITY_HASH = cvsMetadata.integridade?.sha256 || '';

const STORAGE_KEY_HISTORY = 'sertaozinho_cvs_lta_history_v2';

const INITIAL_IDENTIFICATION: CompanyIdentification = {
  cnpjCpf: '',
  razaoSocial: '',
  nomeFantasia: '',
  tipoLogradouro: 'Rua',
  nomeLogradouro: '',
  endereco: '',
  numero: '',
  numeroSemNumero: false,
  numeroLetra: '',
  quadra: '',
  lote: '',
  complemento: '',
  bairro: '',
  cep: '',
  cidade: 'Sertãozinho-SP',
  uf: 'SP',
  telefone: '',
  email: '',
  responsavelTecnico: '',
  registroProfissional: '',
};

export function App() {
  // Navigation
  const [topTab, setTopTab] = useState<TopTab>('servicos');
  const [currentStep, setCurrentStep] = useState<StepId>('identificacao');
  const [sessionKey, setSessionKey] = useState<number>(1);

  // CNAE Database
  const [, setCnaeDatabase] = useState<CNAEItem[]>([]);

  // Wizard Data - Blank clean initial form
  const [identification, setIdentification] = useState<CompanyIdentification>({ ...INITIAL_IDENTIFICATION });

  // Selected Activities in the CVS 01 system (Array of activities)
  const [selectedCvsActivities, setSelectedCvsActivities] = useState<SelectedCvsActivity[]>([]);
  const [selectedCnaes, setSelectedCnaes] = useState<CNAEItem[]>([]);

  // FASE 2: CNAEs declarados com verificação de compreensões sanitárias
  const [declaredCnaes, setDeclaredCnaes] = useState<DeclaredCnae[]>([]);

  // History & Active Result
  const [history, setHistory] = useState<VerificationResult[]>([]);
  const [activeResult, setActiveResult] = useState<VerificationResult | null>(null);

  // Modals
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  // Initialize data on mount
  useEffect(() => {
    const loadedCnaes = loadCnaeDatabase();
    setCnaeDatabase(loadedCnaes);

    // Initial clean selections
    setSelectedCvsActivities([]);
    setSelectedCnaes([]);

    // Load History
    try {
      const savedHistory = localStorage.getItem(STORAGE_KEY_HISTORY);
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      } else {
        setHistory([]);
      }
    } catch (e) {
      console.error('Error loading history', e);
    }
  }, []);

  // Identification change
  const handleIdentificationChange = (updated: Partial<CompanyIdentification>) => {
    setIdentification((prev) => ({ ...prev, ...updated }));
  };

  // Add Activity to array (prevent exact duplicate)
  const handleAddActivity = (activity: SelectedCvsActivity, cnaeItem: CNAEItem) => {
    setSelectedCvsActivities((prev) => {
      const exists = prev.some(
        (a) => a.cnae === activity.cnae && a.compreensao.trim() === activity.compreensao.trim()
      );
      if (exists) return prev;
      return [...prev, activity];
    });

    setSelectedCnaes((prev) => {
      const exists = prev.some((c) => c.code === cnaeItem.code && c.compreensao === cnaeItem.compreensao);
      if (exists) return prev;
      return [...prev, cnaeItem];
    });
  };

  // Remove Activity from array
  const handleRemoveActivity = (index: number) => {
    setSelectedCvsActivities((prev) => prev.filter((_, i) => i !== index));
    setSelectedCnaes((prev) => prev.filter((_, i) => i !== index));
  };

  // Clear all activities
  const handleClearActivities = () => {
    setSelectedCvsActivities([]);
    setSelectedCnaes([]);
    setDeclaredCnaes([]);
  };

  // FASE 2: Adicionar um CNAE declarado
  const handleAddDeclaredCnae = (declared: DeclaredCnae) => {
    setDeclaredCnaes((prev) => {
      if (prev.some((d) => d.cnaeDigitos === declared.cnaeDigitos)) return prev;
      return [...prev, declared];
    });
  };

  // FASE 2: Atualizar um CNAE declarado (ex: selecionar compreensão)
  // Se o updater retornar null, o CNAE é removido da lista.
  const handleUpdateDeclaredCnae = (cnaeDigitos: string, updater: (d: DeclaredCnae) => DeclaredCnae | null) => {
    setDeclaredCnaes((prev) =>
      prev
        .map((d) => (d.cnaeDigitos === cnaeDigitos ? updater(d) : d))
        .filter((d): d is DeclaredCnae => d !== null)
    );
  };

  // FASE 2: Remover um CNAE declarado
  const handleRemoveDeclaredCnae = (cnaeDigitos: string) => {
    setDeclaredCnaes((prev) => prev.filter((d) => d.cnaeDigitos !== cnaeDigitos));
  };

  // Compute Verification Result and Navigate directly to Conclusão
  const computeAndFinish = () => {
    // FASE 2: Se há CNAEs declarados, usa-os como fonte da verdade
    let activities = selectedCvsActivities;

    if (declaredCnaes.length > 0) {
      // Verifica se há pendências — não deve chegar aqui, mas proteção dupla
      if (!isConsultaCompleta(declaredCnaes)) {
        return;
      }
      // Converte CNAEs declarados para atividades (reclassificação normativa vigente)
      const converted: SelectedCvsActivity[] = [];
      for (const declared of declaredCnaes) {
        const acts = declaredCnaeToActivities(declared);
        for (const a of acts) {
          converted.push({
            cnae: a.cnae,
            cnaeNormalizado: a.cnaeNormalizado,
            descricaoCnae: a.descricaoCnae,
            compreensao: a.compreensao,
            agrupamento: a.agrupamento,
            risco: a.risco,
            documentoPrevio: a.documentoPrevio,
            documentosInspecao: a.documentosInspecao,
            naoCompreende: a.naoCompreende,
            paginaCvs: a.paginaCvs,
            exigeLta: a.exigeLta,
            descritoresSelecionados: a.descritoresSelecionados,
          });
        }
      }
      activities = converted;
      // Atualiza selectedCvsActivities para compatibilidade
      setSelectedCvsActivities(converted);
    }

    if (activities.length === 0) return;

    // Reclassifica sempre a partir dos documentos normativos vigentes (doc 52)
    const hasLtaExigido = activities.some(isActivityLtaRequired);

    const isAllNoActivity = activities.every(
      (act) =>
        act.cnae === 'SEM CNAE' ||
        act.agrupamento?.includes('SEM ATIVIDADE') ||
        act.descricaoCnae?.toLowerCase().includes('sem atividade')
    );

    let finalResult: VerificationResult['finalResult'] = 'LTA_DISPENSADO';
    let highestRisk = 'LTA Não Necessário';
    let riskReason =
      'Todas as atividades informadas estão dispensadas de avaliação prévia de projeto físico (LTA) pela Portaria CVS 01/2024.';

    if (isAllNoActivity) {
      finalResult = 'SEM_ATIVIDADE';
      highestRisk = 'SEM ATIVIDADE PARA ENQUADRAMENTO';
      riskReason =
        'Nesta consulta não foi informada atividade econômica sanitária vinculada ao imóvel. Dessa forma, não há atividade a ser verificada quanto à obrigatoriedade de apresentação prévia de LTA nos termos da Portaria CVS 01/2024. A obrigatoriedade de LTA depende do enquadramento da atividade a ser implantada ou exercida.';
    } else if (hasLtaExigido) {
      finalResult = 'LTA_EXIGIDO';
      highestRisk = 'LTA Exigido (Portaria CVS 01/2024)';
      riskReason =
        'Estabelecimento possui atividade(s) constante(s) no Anexo I da Portaria CVS 01 com exigência prévia de aprovação de LTA.';
    }

    const ltaRequiredActivity = activities.find(isActivityLtaRequired);
    const primaryActivity = ltaRequiredActivity || activities[0];

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const code = `LTA-2024-${randomSuffix}`;
    const auth = `LTA-2024-${randomSuffix}A`;

    const now = new Date();
    const formattedDate =
      now.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }) + `, às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;

    const newResult: VerificationResult = {
      protocol: code,
      timestamp: formattedDate,
      identification: { ...identification },
      selectedCnaes: [...selectedCnaes],
      selectedCvsActivity: primaryActivity ? { ...primaryActivity } : undefined,
      selectedCvsActivities: [...activities],
      finalResult,
      highestRisk,
      riskReason,
      authCode: auth,
      agrupamento: primaryActivity?.agrupamento,
      documentoPrevio: primaryActivity?.documentoPrevio,
      documentosInspecao: primaryActivity?.documentosInspecao,
      naoCompreende: primaryActivity?.naoCompreende,
      paginaCvs: primaryActivity?.paginaCvs,
      // FASE 2: Rastreabilidade normativa
      normativeVersion: PORTARIA_CVS_RASTREABILIDADE,
      normativeHash: CVS_INTEGRITY_HASH,
    };

    setActiveResult(newResult);
    setCurrentStep('conclusao');

    // Add to history
    const updatedHistory = [newResult, ...history.filter((h) => h.protocol !== code)];
    setHistory(updatedHistory);
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updatedHistory));
    } catch (e) {
      console.error('Error saving history', e);
    }
  };

  // Direct conclusion for property without defined activity (imóvel sem atividade econômica sanitária definida)
  const handleDirectConclusionNoActivity = (details: {
    propertyType: string;
    propertyNotes?: string;
  }) => {
    const propertyDesc = details.propertyType || 'Imóvel sem atividade econômica sanitária definida';
    const notes = details.propertyNotes ? ` (Obs: ${details.propertyNotes})` : '';

    const noActivityCvs: SelectedCvsActivity = {
      cnae: 'SEM CNAE',
      cnaeNormalizado: 'SEM CNAE',
      descricaoCnae: `${propertyDesc}${notes}`,
      compreensao:
        'O imóvel foi declarado, nesta consulta, sem atividade econômica sanitária definida ou vinculada. Não há exigência de LTA a ser determinada nesta consulta. Caso seja posteriormente definida ou implantada atividade econômica sujeita à Vigilância Sanitária, deverá ser realizada nova verificação de enquadramento.',
      agrupamento: 'IMÓVEL SEM ATIVIDADE ECONÔMICA DEFINIDA',
      risco: 'SEM ATIVIDADE PARA ENQUADRAMENTO',
      documentoPrevio: 'Não aplicável (Sem atividade econômica sanitária vinculada)',
      documentosInspecao: 'Não aplicável no momento da consulta',
      naoCompreende: '',
      paginaCvs: 'N/A',
    };

    const cnaeItem: CNAEItem = {
      id: 'sem-atividade-imovel',
      code: 'SEM CNAE',
      description: `${propertyDesc}${notes}`,
      compreensao: noActivityCvs.compreensao,
      riskLevel: 'Baixo',
      category: 'Imóvel sem Atividade',
      ltaRequiredDefault: false,
      requiresQuestions: false,
      notes: 'Consulta realizada sem atividade econômica definida',
      legislationRef: 'Portaria CVS 01/2024',
      documentoPrevio: noActivityCvs.documentoPrevio,
      documentosInspecao: noActivityCvs.documentosInspecao,
      agrupamento: noActivityCvs.agrupamento,
      paginaCvs: 'N/A',
    };

    setSelectedCvsActivities([noActivityCvs]);
    setSelectedCnaes([cnaeItem]);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const code = `LTA-2024-${randomSuffix}`;
    const auth = `LTA-2024-${randomSuffix}A`;

    const now = new Date();
    const formattedDate =
      now.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }) + `, às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;

    const newResult: VerificationResult = {
      protocol: code,
      timestamp: formattedDate,
      identification: { ...identification },
      selectedCnaes: [cnaeItem],
      selectedCvsActivity: noActivityCvs,
      selectedCvsActivities: [noActivityCvs],
      finalResult: 'SEM_ATIVIDADE',
      highestRisk: 'SEM ATIVIDADE PARA ENQUADRAMENTO',
      riskReason:
        'Nesta consulta não foi informada atividade econômica sanitária vinculada ao imóvel. Dessa forma, não há atividade a ser verificada quanto à obrigatoriedade de apresentação prévia de LTA nos termos da Portaria CVS 01/2024. A obrigatoriedade de LTA depende do enquadramento da atividade a ser implantada ou exercida.',
      authCode: auth,
      agrupamento: noActivityCvs.agrupamento,
      documentoPrevio: noActivityCvs.documentoPrevio,
      documentosInspecao: noActivityCvs.documentosInspecao,
      naoCompreende: '',
      paginaCvs: 'N/A',
      // FASE 2: Rastreabilidade normativa
      normativeVersion: PORTARIA_CVS_RASTREABILIDADE,
      normativeHash: CVS_INTEGRITY_HASH,
    };

    setActiveResult(newResult);
    setCurrentStep('conclusao');

    // Add to history
    const updatedHistory = [newResult, ...history.filter((h) => h.protocol !== code)];
    setHistory(updatedHistory);
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updatedHistory));
    } catch (e) {
      console.error('Error saving history', e);
    }
  };

  // Reset verification to fresh start - completely clears previous data for a brand new consultation
  const handleResetVerification = () => {
    setIdentification({ ...INITIAL_IDENTIFICATION });
    setSelectedCvsActivities([]);
    setSelectedCnaes([]);
    setDeclaredCnaes([]);
    setHistory([]);
    setActiveResult(null);

    // Limpa dados persistidos no localStorage
    try {
      localStorage.removeItem(STORAGE_KEY_HISTORY);
    } catch (e) {
      console.error('Error clearing history storage', e);
    }

    // Limpa CNAEs customizados e recarrega a base oficial CVS 01
    try {
      const officialBase = resetCnaeDatabase();
      setCnaeDatabase(officialBase);
    } catch (e) {
      console.error('Error resetting CNAE database', e);
    }

    setSessionKey((prev) => prev + 1);
    setCurrentStep('identificacao');
    setTopTab('servicos');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans flex flex-col antialiased selection:bg-indigo-600 selection:text-white">
      {/* Header */}
      <Header
        currentTab={topTab}
        onSelectTab={(tab) => {
          setTopTab(tab);
          if (tab === 'inicio') {
            setCurrentStep('identificacao');
          }
        }}
        onOpenHelp={() => setIsHelpModalOpen(true)}
      />

      {/* Main Layout Body */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar (shown on large screens when in wizard) */}
        <Sidebar
          currentStep={currentStep}
          hasActiveResult={Boolean(activeResult)}
          onSelectStep={(step) => {
            setTopTab('servicos');
            setCurrentStep(step);
          }}
          onOpenHelp={() => setIsHelpModalOpen(true)}
          onOpenProtocolo={() => setTopTab('protocolo')}
          onReset={handleResetVerification}
        />

        {/* Content Area */}
        <main
          id="main-app-content"
          className="flex-1 w-full lg:ml-64 p-4 sm:p-8 flex flex-col justify-between"
        >
          {topTab === 'inicio' ? (
            <ServicosView
              onStartVerification={() => {
                handleResetVerification();
              }}
              onOpenHelp={() => setIsHelpModalOpen(true)}
              onOpenProtocolo={() => setTopTab('protocolo')}
            />
          ) : topTab === 'protocolo' ? (
            <ProtocoloGuiaView
              onStartVerification={() => {
                handleResetVerification();
              }}
              onBack={() => setTopTab('servicos')}
            />
          ) : (
            /* Wizard Views (3 Simple Steps) */
            <div className="w-full flex-1 flex flex-col justify-start">
              {currentStep === 'identificacao' && (
                <Step1Identification
                  key={sessionKey}
                  data={identification}
                  onChange={handleIdentificationChange}
                  onNext={() => setCurrentStep('atividade')}
                />
              )}

              {currentStep === 'atividade' && (
                <Step2Activity
                  key={sessionKey}
                  selectedActivities={selectedCvsActivities}
                  onAddActivity={handleAddActivity}
                  onRemoveActivity={handleRemoveActivity}
                  onClearActivities={handleClearActivities}
                  onFinish={computeAndFinish}
                  onPrev={() => setCurrentStep('identificacao')}
                  onDirectConclusionNoActivity={handleDirectConclusionNoActivity}
                  declaredCnaes={declaredCnaes}
                  onAddDeclaredCnae={handleAddDeclaredCnae}
                  onUpdateDeclaredCnae={handleUpdateDeclaredCnae}
                  onRemoveDeclaredCnae={handleRemoveDeclaredCnae}
                />
              )}

              {(currentStep === 'conclusao' || currentStep === 'comprovante') && (
                activeResult ? (
                  <DocumentComprovante
                    result={activeResult}
                    onBack={() => setCurrentStep('atividade')}
                    onReset={handleResetVerification}
                    onOpenProtocolo={() => setTopTab('protocolo')}
                  />
                ) : (
                  <div className="max-w-xl mx-auto w-full text-center py-12 px-6 bg-white rounded-2xl border border-slate-200 shadow-xs my-auto">
                    <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3">
                      <span className="material-symbols-outlined text-[26px]">pending_actions</span>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                      Nenhuma consulta realizada ainda
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
                      Para gerar o comprovante de triagem de LTA, informe o endereço do imóvel e defina as atividades sanitárias da empresa.
                    </p>
                    <button
                      onClick={() => setCurrentStep('identificacao')}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                      Iniciar Triagem
                    </button>
                  </div>
                )
              )}
            </div>
          )}

          {/* Footer */}
          <Footer onOpenHelp={() => setIsHelpModalOpen(true)} />
        </main>
      </div>

      {/* Official Help & Guidelines Modal */}
      <SpecializedHelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        onOpenProtocoloGuide={() => setTopTab('protocolo')}
      />
    </div>
  );
}

export default App;
