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

        <nav className="flex-1 p-4 space-y-2">
          <div className="text-[11px] font-semibold text-slate-400 uppercase px-2 mb-1 tracking-wider">
            Navegação Principal
          </div>

          {/* Botão Único de Triagem no Menu Lateral */}
          <button
            type="button"
            onClick={() => onSelectStep(currentStep)}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 transition-colors cursor-pointer"
            title="Acessar a Triagem Sanitária de LTA"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="material-symbols-outlined text-[20px] shrink-0 text-white">assignment</span>
              <span className="truncate">Triagem Sanitária (LTA)</span>
            </div>
            <span className="text-[10px] bg-indigo-700/80 text-indigo-100 px-2 py-0.5 rounded-md font-mono shrink-0">
              {currentStep === 'identificacao' ? 'Etapa 1/3' : currentStep === 'atividade' ? 'Etapa 2/3' : 'Etapa 3/3'}
            </span>
          </button>

          {/* Indicador Visual Informativo das Etapas (Não clicável para não permitir pular etapas) */}
          <div className="mx-1 mt-2 mb-4 p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-2.5">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Fluxo Sequencial</span>
              <span className="text-indigo-400 font-mono">
                {currentStep === 'identificacao' ? '1 de 3' : currentStep === 'atividade' ? '2 de 3' : '3 de 3'}
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div
                className={`flex items-center gap-2 py-1 px-1.5 rounded transition-colors ${
                  activeStepId === 'identificacao'
                    ? 'text-indigo-300 font-bold bg-indigo-950/40'
                    : 'text-slate-400'
                }`}
              >
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  activeStepId === 'identificacao'
                    ? 'bg-indigo-600 text-white'
                    : activeStepId === 'atividade' || activeStepId === 'conclusao'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-700 text-slate-400'
                }`}>
                  {activeStepId === 'atividade' || activeStepId === 'conclusao' ? '✓' : '1'}
                </span>
                <span className="truncate">1. Identificação</span>
              </div>

              <div
                className={`flex items-center gap-2 py-1 px-1.5 rounded transition-colors ${
                  activeStepId === 'atividade'
                    ? 'text-indigo-300 font-bold bg-indigo-950/40'
                    : 'text-slate-400'
                }`}
              >
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  activeStepId === 'atividade'
                    ? 'bg-indigo-600 text-white'
                    : activeStepId === 'conclusao'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-700 text-slate-400'
                }`}>
                  {activeStepId === 'conclusao' ? '✓' : '2'}
                </span>
                <span className="truncate">2. Atividades (CVS 01)</span>
              </div>

              <div
                className={`flex items-center gap-2 py-1 px-1.5 rounded transition-colors ${
                  activeStepId === 'conclusao'
                    ? 'text-emerald-300 font-bold bg-emerald-950/40'
                    : 'text-slate-400'
                }`}
              >
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  activeStepId === 'conclusao'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-700 text-slate-400'
                }`}>
                  3
                </span>
                <span className="truncate">3. Comprovante de Triagem</span>
              </div>
            </div>
          </div>

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
