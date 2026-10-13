import React from 'react';
import { StepId } from '../types';
import {
  PORTARIA_CVS_FONTE_DADOS,
  PORTARIA_CVS_LABEL,
  PORTARIA_CVS_PUBLICACAO,
} from '../data/normativeMetadata';

interface SidebarProps {
  currentStep: StepId;
  hasActiveResult: boolean;
  onSelectStep: (step: StepId) => void;
  onOpenHelp: () => void;
  onOpenProtocolo?: () => void;
  onReset: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentStep,
  hasActiveResult,
  onSelectStep,
  onOpenHelp,
  onOpenProtocolo,
  onReset,
}) => {
  const steps: { id: StepId; label: string; icon: string }[] = [
    { id: 'identificacao', label: '1. Identificação', icon: 'person' },
    { id: 'atividade', label: '2. Atividades (CVS 01)', icon: 'business_center' },
    { id: 'conclusao', label: '3. Resultado e Comprovante', icon: 'verified' },
  ];

  // If we are currently on comprovante view, we consider 'conclusao' active in sidebar
  const activeStepId = currentStep === 'comprovante' ? 'conclusao' : currentStep;

  return (
    <aside
      id="shell-nav-side"
      className="hidden lg:flex flex-col w-64 pt-0 pb-0 h-[calc(100vh-64px)] fixed left-0 top-16 bg-[#1e293b] text-white border-r border-slate-700 z-40 select-none justify-between overflow-hidden"
    >
      <div className="flex flex-col flex-1 overflow-y-auto">
        <div className="p-5 border-b border-slate-700">
          <div>
            <h2 className="text-base font-bold text-white leading-tight tracking-tight">
              Triagem de LTA
            </h2>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mt-0.5">
              Vigilância Sanitária
            </p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5">
          <div className="text-[11px] font-semibold text-slate-400 uppercase px-2 mb-2 tracking-wider">
            Etapas da Triagem
          </div>
          {steps.map((s, idx) => {
            const isActive = activeStepId === s.id;
            const isStep3Locked = s.id === 'conclusao' && !hasActiveResult;
            return (
              <button
                key={s.id}
                onClick={() => {
                  if (isStep3Locked) {
                    onSelectStep('identificacao');
                  } else {
                    onSelectStep(s.id);
                  }
                }}
                title={isStep3Locked ? 'Preencha as etapas 1 e 2 para gerar o parecer' : undefined}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm text-left transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                    : isStep3Locked
                    ? 'text-slate-500 hover:text-slate-400 hover:bg-slate-800/50 opacity-70'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[18px] shrink-0 ${
                    isActive ? 'text-white' : isStep3Locked ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  {isStep3Locked ? 'lock' : s.icon}
                </span>
                <span className="truncate">{s.label}</span>
                <span className="ml-auto text-[10px] font-mono opacity-60">
                  0{idx + 1}
                </span>
              </button>
            );
          })}

          <div className="text-[11px] font-semibold text-slate-400 uppercase px-2 mt-6 mb-2 tracking-wider">
            Orientações & Ações
          </div>

          <button
            onClick={onOpenProtocolo}
            className="w-full flex items-center space-x-3 px-3 py-2 text-indigo-300 hover:bg-slate-800 hover:text-white rounded-lg text-sm transition-colors text-left cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-indigo-400">assignment_turned_in</span>
            <span>Como Protocolar LTA</span>
          </button>

          <button
            onClick={onOpenHelp}
            className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg text-sm transition-colors text-left cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-slate-400">info</span>
            <span>Orientações sobre LTA</span>
          </button>

          <button
            onClick={onReset}
            className="w-full flex items-center space-x-3 px-3 py-2 text-rose-300 hover:bg-rose-900/30 hover:text-rose-200 rounded-lg text-sm transition-colors text-left cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] text-rose-400">refresh</span>
            <span>Nova Consulta</span>
          </button>
        </nav>
      </div>

      {/* Official System Info in Footer */}
      <div className="p-3.5 bg-slate-900 border-t border-slate-800 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-400/30 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[16px]">verified</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-200 truncate">{PORTARIA_CVS_LABEL}</p>
            <p
              className="text-[10px] text-slate-400 truncate"
              title={`Fonte de dados: ${PORTARIA_CVS_FONTE_DADOS}`}
            >
              Publicacao {PORTARIA_CVS_PUBLICACAO} • Base Oficial Estadual SP
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
