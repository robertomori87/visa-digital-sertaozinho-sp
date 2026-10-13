import React from 'react';
import {
  PORTARIA_CVS_FONTE_DADOS,
  PORTARIA_CVS_LABEL,
  PORTARIA_CVS_PUBLICACAO,
} from '../data/normativeMetadata';

interface FooterProps {
  onOpenHelp: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenHelp }) => {
  return (
    <footer
      id="shell-footer"
      className="w-full bg-white border-t border-slate-200 py-3.5 px-4 sm:px-6 mt-8 text-xs text-slate-500 transition-colors"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 text-center md:text-left text-[11px] sm:text-xs">
          <span className="font-bold text-indigo-700">VISA Digital Sertãozinho-SP</span>
          <span className="text-slate-300">•</span>
          <span>© {new Date().getFullYear()} Prefeitura Municipal de Sertãozinho-SP • Vigilância Sanitária Municipal</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] sm:text-xs font-medium">
          <button
            onClick={onOpenHelp}
            className="hover:text-indigo-600 transition-colors cursor-pointer"
          >
            Orientações sobre o LTA & Documentos
          </button>
          <span className="text-slate-300">•</span>
          <span
            className="text-slate-400"
            title={`Fonte de dados: ${PORTARIA_CVS_FONTE_DADOS}`}
          >
            {PORTARIA_CVS_LABEL} • pub. {PORTARIA_CVS_PUBLICACAO}
          </span>
        </div>
      </div>
    </footer>
  );
};
