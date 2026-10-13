import React from 'react';

interface StepHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  stepNumber: number;
  title: string;
  children: React.ReactNode;
}

export const StepHelpModal: React.FC<StepHelpModalProps> = ({
  isOpen,
  onClose,
  stepNumber,
  title,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-xl w-full max-h-[88vh] flex flex-col overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              {stepNumber}
            </span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 block">
                Ajuda e Orientações
              </span>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                {title}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="w-8 h-8 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 transition-colors flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {children}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-lg transition-colors shadow-2xs"
          >
            Entendido, fechar ajuda
          </button>
        </div>
      </div>
    </div>
  );
};
