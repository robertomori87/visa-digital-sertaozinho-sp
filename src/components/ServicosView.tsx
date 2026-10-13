import React from 'react';
import {
  PORTARIA_CVS_FONTE_DADOS,
  PORTARIA_CVS_LABEL,
  PORTARIA_CVS_PUBLICACAO,
} from '../data/normativeMetadata';

interface ServicosViewProps {
  onStartVerification: () => void;
  onOpenHelp: () => void;
  onOpenProtocolo?: () => void;
}

export const ServicosView: React.FC<ServicosViewProps> = ({
  onStartVerification,
  onOpenHelp,
  onOpenProtocolo,
}) => {
  const services = [
    {
      id: 'triagem-lta',
      title: 'Triagem de Necessidade de LTA',
      description: 'Informe o imóvel e as atividades econômicas (CNAEs) para consultar o enquadramento sanitário e gerar o Comprovante de Triagem de LTA para anexar no Aprova Online.',
      badge: 'Fluxo Principal',
      icon: 'verified_user',
      action: onStartVerification,
      highlight: true,
      buttonText: 'Iniciar Triagem Agora',
    },
    {
      id: 'como-protocolar-lta',
      title: 'Como Protocolar no Aprova Online',
      description: 'Roteiro oficial passo a passo para abertura do processo no sistema municipal Aprova Online, requisitos da conta gov.br (prata/ouro) e regras de assinaturas.',
      badge: 'Passo a Passo',
      icon: 'assignment_turned_in',
      action: onOpenProtocolo || onOpenHelp,
      highlight: false,
      buttonText: 'Ver Roteiro de Protocolo',
    },
    {
      id: 'orientacoes-lta',
      title: 'Orientações & Documentos do LTA',
      description: 'Entenda o que é o Laudo Técnico de Avaliação, confira a relação de documentos estaduais (CVS) e municipais obrigatórios e canais oficiais da Vigilância.',
      badge: 'Informativo',
      icon: 'info',
      action: onOpenHelp,
      highlight: false,
      buttonText: 'Ver Orientações & Documentos',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto w-full py-2 space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-xl p-6 sm:p-8 text-white shadow-sm border border-slate-800 relative overflow-hidden">
        <div className="max-w-xl relative z-10">
          <span className="inline-block px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 text-[11px] font-semibold rounded-full mb-2.5 uppercase tracking-wider border border-indigo-400/30">
            Vigilância Sanitária Municipal de Sertãozinho-SP
          </span>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-1.5 text-white">
            Sistema de Triagem de LTA
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-5">
            Ferramenta eletrônica de triagem de necessidade de LTA para consulta de enquadramento conforme a {PORTARIA_CVS_LABEL} e emissão de Comprovante de Triagem.
          </p>
          <p
            className="text-[11px] text-slate-400 mb-5"
            title={`Base carregada do arquivo ${PORTARIA_CVS_FONTE_DADOS}`}
          >
            Versao normativa: publicacao em {PORTARIA_CVS_PUBLICACAO}
          </p>
          <button
            onClick={onStartVerification}
            className="px-5 py-2.5 bg-indigo-600 text-white font-semibold text-xs rounded-lg hover:bg-indigo-700 transition-all shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
            Iniciar Triagem de LTA
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div>
        <h2 className="text-sm sm:text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-indigo-600 text-[20px]">apps</span>
          Serviços e Consultas Disponíveis
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((s) => (
            <div
              key={s.id}
              className={`bg-white rounded-xl border p-5 flex flex-col justify-between transition-all hover:shadow-xs ${
                s.highlight
                  ? 'border-indigo-300 bg-indigo-50/20'
                  : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">{s.icon}</span>
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    s.highlight ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {s.badge}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {s.description}
                </p>
              </div>

              <button
                onClick={s.action}
                className={`w-full py-2 px-3 font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 border cursor-pointer ${
                  s.highlight
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white border-transparent'
                    : 'bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 border-slate-200'
                }`}
              >
                {s.buttonText}
                <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
