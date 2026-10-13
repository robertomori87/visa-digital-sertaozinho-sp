import React from 'react';
import { TopTab } from '../types';

interface HeaderProps {
  currentTab: TopTab;
  onSelectTab: (tab: TopTab) => void;
  onOpenHelp: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenHelp,
}) => {
  return (
    <header
      id="shell-nav-top"
      className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 sm:px-6 h-16 bg-white border-b border-slate-200 transition-colors shadow-xs"
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => onSelectTab('servicos')}
          className="text-left focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg px-1 cursor-pointer"
        >
          <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight block">
            VISA Digital Sertãozinho-SP
          </span>
          <span className="hidden sm:inline-block text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
            Triagem de LTA • VISA
          </span>
        </button>
      </div>

      <nav className="hidden md:flex gap-6 h-full items-center">
        <button
          onClick={() => onSelectTab('servicos')}
          className={`text-sm font-medium transition-colors h-full flex items-center pt-1 border-b-2 cursor-pointer ${
            currentTab === 'servicos'
              ? 'text-indigo-600 border-indigo-600 font-semibold'
              : 'text-slate-500 border-transparent hover:text-slate-800'
          }`}
        >
          Triagem & Emissão
        </button>
        <button
          onClick={() => onSelectTab('protocolo')}
          className={`text-sm font-medium transition-colors h-full flex items-center pt-1 border-b-2 cursor-pointer ${
            currentTab === 'protocolo'
              ? 'text-indigo-600 border-indigo-600 font-semibold'
              : 'text-slate-500 border-transparent hover:text-slate-800'
          }`}
        >
          Como Protocolar LTA
        </button>
        <button
          onClick={() => onSelectTab('inicio')}
          className={`text-sm font-medium transition-colors h-full flex items-center pt-1 border-b-2 cursor-pointer ${
            currentTab === 'inicio'
              ? 'text-indigo-600 border-indigo-600 font-semibold'
              : 'text-slate-500 border-transparent hover:text-slate-800'
          }`}
        >
          Painel de Serviços
        </button>
      </nav>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={onOpenHelp}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold border border-indigo-200 transition-colors shadow-2xs cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">info</span>
          <span>Orientações LTA</span>
        </button>
      </div>
    </header>
  );
};
