import React from 'react';
import { PORTARIA_CVS_LABEL, PORTARIA_CVS_PUBLICACAO } from '../data/normativeMetadata';
import { DOCUMENTOS_MUNICIPAIS_LTA, DOCUMENTOS_OFICIAIS_LTA } from '../data/quadro9Docs';

interface SpecializedHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProtocoloGuide?: () => void;
}

export const SpecializedHelpModal: React.FC<SpecializedHelpModalProps> = ({
  isOpen,
  onClose,
  onOpenProtocoloGuide,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden text-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
              <span className="material-symbols-outlined text-[20px]">info</span>
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                Orientações e Esclarecimentos sobre o LTA
              </h2>
              <p className="text-[11px] text-slate-500">
                Vigilância Sanitária Municipal de Sertãozinho-SP • {PORTARIA_CVS_LABEL} (pub. {PORTARIA_CVS_PUBLICACAO})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {/* Section: What is LTA */}
          <div className="bg-indigo-50/60 border border-indigo-200 rounded-xl p-3.5">
            <h3 className="font-bold text-indigo-950 text-xs sm:text-sm mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-indigo-600">verified</span>
              O que é o Laudo Técnico de Avaliação (LTA)?
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              O LTA é o documento formal emitido pela Vigilância Sanitária que avalia previamente a conformidade física e funcional dos projetos de edificações de estabelecimentos de interesse da saúde. Ele comprova que as instalações, divisões físicas, fluxos de pessoas, matérias-primas, produtos e resíduos atendem às normas sanitárias antes da execução de obras, reformas ou concessão da Licença de Funcionamento Sanitária.
            </p>
          </div>

          {/* Banner: Link direto para o Guia de Protocolo no Aprova Online */}
          <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-300 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">assignment_turned_in</span>
                Passo a Passo Oficial
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-white">
                Como solicitar o LTA no sistema Aprova Online?
              </h4>
              <p className="text-[11px] text-slate-300">
                Acesse o roteiro com as 7 etapas oficiais, exigências do gov.br (nível prata/ouro) e orientações sobre assinaturas.
              </p>
            </div>
            {onOpenProtocoloGuide ? (
              <button
                onClick={() => {
                  onClose();
                  onOpenProtocoloGuide();
                }}
                className="px-3.5 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg text-xs font-bold shrink-0 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Ver Roteiro de Protocolo</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            ) : (
              <a
                href="https://aprovaonline.sertaozinho.sp.gov.br/alvara_sertaozinho/login.html"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg text-xs font-bold shrink-0 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Acessar Aprova Online</span>
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </a>
            )}
          </div>

          {/* Section: Documentos Necessários */}
          <div>
            <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-200">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-indigo-700 text-[16px]">folder_special</span>
                Relação Completa de Documentos Exigidos para LTA
              </h4>
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded">
                Aprova Online Sertãozinho
              </span>
            </div>

            <p className="text-xs text-slate-600 mb-3 leading-relaxed">
              Quando a atividade exigir LTA, a documentação é composta pelos <strong>documentos exigidos pelo Município (sempre obrigatórios)</strong> e pelos <strong>documentos técnicos da {PORTARIA_CVS_LABEL}</strong> (estaduais, obrigatórios ou condicionais conforme o ramo de atividade).
            </p>

            {/* GRUPO 1: DOCUMENTOS EXIGIDOS PELO MUNICÍPIO (SEMPRE OBRIGATÓRIOS) */}
            <div className="mb-4 bg-amber-50/50 border border-amber-300 rounded-xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-950">
                    Documentos Exigidos pelo Município (Sempre Obrigatórios)
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                  Prefeitura Municipal de Sertãozinho
                </span>
              </div>

              <div className="space-y-2">
                {DOCUMENTOS_MUNICIPAIS_LTA.map((doc) => (
                  <div
                    key={String(doc.codigo)}
                    className="flex items-start gap-2.5 bg-white p-3 rounded-lg border border-amber-200 shadow-2xs"
                  >
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-950 font-mono font-bold text-[11px] border border-amber-300 shrink-0 mt-0.5">
                      {doc.codigo}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-1 flex-wrap">
                        <strong className="text-slate-900 text-xs">{doc.titulo}</strong>
                        <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                          Sempre Obrigatório
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                        {doc.resumo}
                      </p>
                      <span className="text-[10px] text-amber-900 font-semibold block mt-1">
                        📌 {doc.observacaoSertaozinho}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* GRUPO 2: DOCUMENTOS TÉCNICOS DA PORTARIA CVS 01/2024 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-900">
                    Documentos Técnicos da {PORTARIA_CVS_LABEL} (Códigos 1 a 9)
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200">
                  Base Normativa Estadual
                </span>
              </div>

              {/* Tabela Resumida de Códigos 1 a 9 */}
              <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-2xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                      <th className="py-2.5 px-3 w-16 text-center">CÓDIGO</th>
                      <th className="py-2.5 px-3">TIPO DE DOCUMENTO</th>
                      <th className="py-2.5 px-3 w-28 text-center">EXIGÊNCIA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-[11px]">
                    {DOCUMENTOS_OFICIAIS_LTA.map((doc) => {
                      const isCond = doc.categoria === 'condicional';
                      return (
                        <tr key={String(doc.codigo)} className="hover:bg-slate-50/70">
                          <td className="py-2.5 px-3 font-mono font-bold text-center">
                            <span className="inline-block w-6 h-6 rounded bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-bold leading-6">
                              {doc.codigo}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-800">
                            <strong className="text-slate-900 block font-semibold">{doc.titulo}</strong>
                            <span className="text-slate-500 text-[10px] leading-snug block mt-0.5">
                              {doc.resumo}
                            </span>
                            {doc.condicaoAplicacao && (
                              <span className="text-amber-800 text-[10px] block mt-0.5 font-medium">
                                ⚠️ {doc.condicaoAplicacao}
                              </span>
                            )}
                            {doc.isEmbutidoAprovaOnline && (
                              <span className="text-emerald-700 text-[10px] block mt-0.5 font-medium">
                                ✅ Preenchido diretamente no Aprova Online.
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-3 text-center whitespace-nowrap">
                            <span
                              className={`text-[10px] font-bold px-1.5 py-0.5 rounded border inline-block ${
                                isCond
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : 'bg-indigo-50 text-indigo-800 border-indigo-200'
                              }`}
                            >
                              {isCond ? 'Condicional' : 'Obrigatório'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Aviso sobre Taxa Municipal de LTA */}
            <div className="mt-3.5 bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-start gap-2 text-xs text-emerald-950">
              <span className="material-symbols-outlined text-[18px] text-emerald-700 shrink-0 mt-0.5">
                verified
              </span>
              <div className="leading-relaxed">
                <strong>Taxa Municipal de LTA (Sertãozinho-SP):</strong> O Município de Sertãozinho-SP <strong>não instituiu taxa para análise de LTA</strong>. Portanto, para o protocolo perante a Vigilância Sanitária Municipal, não é exigido comprovante de recolhimento de taxa municipal (DARE ou equivalente).
              </div>
            </div>

            {/* Regra de Omissão para atividades dispensadas */}
            <div className="mt-2.5 bg-slate-50 border border-slate-200 rounded-lg p-2.5 flex items-start gap-2 text-[11px] text-slate-600">
              <span className="material-symbols-outlined text-[16px] text-slate-500 shrink-0 mt-0.5">
                info
              </span>
              <div className="leading-relaxed">
                <strong>Atenção:</strong> Se todas as atividades do estabelecimento forem <em>dispensadas ou isentas de LTA</em>, nenhuma dessa documentação técnica prévia precisa ser apresentada para fins de LTA, podendo o interessado requerer diretamente a Licença de Funcionamento Sanitária.
              </div>
            </div>
          </div>

          {/* Contact Box */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/70">
            <h4 className="font-semibold text-slate-800 text-xs uppercase tracking-wider mb-2.5">
              Canais de Atendimento ao Cidadão • Vigilância Sanitária de Sertãozinho-SP:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-indigo-600 text-[18px]">mail</span>
                <a
                  href="mailto:visastsertaozinho@gmail.com"
                  className="font-medium text-indigo-700 hover:underline"
                >
                  visastsertaozinho@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-indigo-600 text-[18px] shrink-0 mt-0.5">
                  location_on
                </span>
                <span className="font-medium">Rua Sebastião Sampaio, 1685, Sertãozinho-SP</span>
              </div>
              <div className="flex items-start gap-2 sm:col-span-2">
                <span className="material-symbols-outlined text-indigo-600 text-[18px] shrink-0 mt-0.5">
                  schedule
                </span>
                <span className="font-medium">Atendimento: Segunda a Sexta-feira, das 08:30 às 11:30 e das 13:00 às 17:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-2xs cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
