import React from 'react';
import { PORTARIA_CVS_LABEL } from '../data/normativeMetadata';

interface ProtocoloGuiaViewProps {
  onStartVerification: () => void;
  onBack?: () => void;
}

export const ProtocoloGuiaView: React.FC<ProtocoloGuiaViewProps> = ({
  onStartVerification,
  onBack,
}) => {
  const aprovaOnlineUrl =
    'https://aprovaonline.sertaozinho.sp.gov.br/alvara_sertaozinho/login.html';

  const [copied, setCopied] = React.useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(aprovaOnlineUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto w-full py-2 space-y-6">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          {onBack && (
            <button
              onClick={onBack}
              className="hover:text-indigo-600 transition-colors flex items-center gap-1 font-medium cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Voltar
            </button>
          )}
          <span>•</span>
          <span className="font-semibold text-slate-700">Guia de Protocolo</span>
          <span>•</span>
          <span>Aprova Online Sertãozinho-SP</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">print</span>
            Imprimir Roteiro
          </button>

          <button
            onClick={onStartVerification}
            className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">fact_check</span>
            Fazer Triagem de LTA
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-sm border border-slate-800 relative overflow-hidden">
        <div className="max-w-3xl relative z-10 space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-block px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 text-[11px] font-semibold rounded-full uppercase tracking-wider border border-indigo-400/30">
              Prefeitura Municipal de Sertãozinho-SP
            </span>
            <span className="inline-block px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold rounded-full uppercase tracking-wider border border-emerald-400/30">
              Vigilância Sanitária
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white leading-tight">
            ORIENTAÇÕES PARA SOLICITAÇÃO DO LAUDO TÉCNICO DE AVALIAÇÃO (LTA)
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            O protocolo de solicitação do Laudo Técnico de Avaliação (LTA) deverá ser realizado{' '}
            <strong className="text-white">exclusivamente por meio do sistema Aprova Online</strong>, da
            Prefeitura Municipal de Sertãozinho, conforme as orientações abaixo.
          </p>

          <div className="pt-2 flex items-center gap-3 flex-wrap">
            <a
              href={aprovaOnlineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Acessar o Aprova Online</span>
              <span className="material-symbols-outlined text-[18px]">open_in_new</span>
            </a>

            <button
              onClick={handleCopyLink}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold rounded-xl transition-all border border-white/20 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copied ? 'check' : 'content_copy'}
              </span>
              <span>{copied ? 'Link Copiado!' : 'Copiar Endereço'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Passo a Passo do Protocolo (1 a 7) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <h2 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
            <span className="material-symbols-outlined text-indigo-700 text-[22px]">list_alt</span>
            Passo a Passo Oficial para Abertura do Processo
          </h2>
          <span className="text-xs font-semibold text-slate-500">7 Etapas</span>
        </div>

        {/* STEP 1 */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3 transition-all hover:border-indigo-300">
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
              1
            </span>
            <div className="flex-1 space-y-2">
              <h3 className="text-sm font-bold text-slate-900">1. Acesso ao sistema</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Acesse o endereço eletrônico oficial do Aprova Online de Sertãozinho-SP:
              </p>
              <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200 max-w-2xl flex-wrap">
                <span className="material-symbols-outlined text-indigo-700 text-[18px]">link</span>
                <a
                  href={aprovaOnlineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-indigo-700 font-bold hover:underline break-all"
                >
                  {aprovaOnlineUrl}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 2 */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3 transition-all hover:border-indigo-300">
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
              2
            </span>
            <div className="flex-1 space-y-2">
              <h3 className="text-sm font-bold text-slate-900">2. Autenticação pelo gov.br</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Clique no botão <strong>“Entrar com gov.br”</strong> e efetue a autenticação utilizando sua conta gov.br.
              </p>
              <div className="bg-amber-50 border border-amber-300 rounded-lg p-3 text-xs text-amber-950 flex items-start gap-2">
                <span className="material-symbols-outlined text-amber-700 text-[18px] shrink-0 mt-0.5">
                  warning
                </span>
                <div>
                  <strong>Atenção:</strong> É necessário possuir conta gov.br de{' '}
                  <strong className="underline decoration-amber-500 font-bold">nível prata ou ouro</strong> para
                  acessar o sistema e utilizar os recursos de assinatura digital.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 3 */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3 transition-all hover:border-indigo-300">
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
              3
            </span>
            <div className="flex-1 space-y-2">
              <h3 className="text-sm font-bold text-slate-900">3. Seleção do perfil</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Após a autenticação, será exibida a janela <strong>“Selecione um Perfil”</strong>. Selecione a opção{' '}
                <span className="inline-block px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded font-bold text-xs">
                  “Público”
                </span>
                .
              </p>
            </div>
          </div>
        </div>

        {/* STEP 4 */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3 transition-all hover:border-indigo-300">
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
              4
            </span>
            <div className="flex-1 space-y-2">
              <h3 className="text-sm font-bold text-slate-900">4. Abertura da solicitação de LTA</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                No menu <strong>“Novo Projeto”</strong>, selecione as seguintes opções:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-xl">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                    Campo no Sistema
                  </span>
                  <div className="text-xs text-slate-700 font-medium">Tipo de Projeto:</div>
                  <div className="text-xs sm:text-sm font-bold text-indigo-900 mt-0.5">
                    Laudo Técnico de Avaliação
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                    Campo no Sistema
                  </span>
                  <div className="text-xs text-slate-700 font-medium">Tipo de Atividade:</div>
                  <div className="text-xs sm:text-sm font-bold text-indigo-900 mt-0.5">
                    Laudo Técnico de Avaliação
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 5 */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3 transition-all hover:border-indigo-300">
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
              5
            </span>
            <div className="flex-1 space-y-2.5">
              <h3 className="text-sm font-bold text-slate-900">5. Preenchimento do formulário</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Preencha os campos do formulário <strong>“Solicitação – Laudo Técnico de Avaliação (LTA)”</strong>, observando com rigor as seguintes orientações:
              </p>

              <div className="space-y-2.5 mt-2">
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs sm:text-sm">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 text-[11px] flex items-center justify-center font-mono">
                      a
                    </span>
                    <span>Objeto da Solicitação:</span>
                  </div>
                  <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                    Selecione a opção <strong>“Construção Nova”</strong> somente quando se tratar de uma edificação nova, a ser implantada em terreno sem construção existente. Para edificações existentes, selecione a opção correspondente à intervenção pretendida (reforma, adequação, ampliação ou regularização).
                  </p>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs sm:text-sm">
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 text-[11px] flex items-center justify-center font-mono">
                      b
                    </span>
                    <span>CNAE:</span>
                  </div>
                  <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                    Informe <strong>exclusivamente os códigos CNAE das atividades que serão efetivamente exercidas</strong> no estabelecimento e que exigem LTA, conforme a {PORTARIA_CVS_LABEL} e suas atualizações.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 6 */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3 transition-all hover:border-indigo-300">
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
              6
            </span>
            <div className="flex-1 space-y-2.5">
              <h3 className="text-sm font-bold text-slate-900">6. Anexação dos documentos</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Após o preenchimento do formulário, será disponibilizada a etapa de anexação dos documentos necessários à análise do LTA. Anexe cada documento no campo correspondente, observando as orientações abaixo:
              </p>

              <div className="space-y-2.5 mt-2">
                <div className="bg-amber-50/60 p-3.5 rounded-lg border border-amber-200 space-y-1.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 font-bold text-amber-950 text-xs sm:text-sm">
                      <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-900 text-[11px] flex items-center justify-center font-mono font-bold">
                        a
                      </span>
                      <span>Certidão de Uso e Ocupação do Solo</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                      Exigência Municipal • Obrigatório
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 pl-6 leading-relaxed">
                    A certidão deverá ser solicitada no próprio sistema Aprova Online, por meio das seguintes opções:
                  </p>
                  <div className="ml-6 p-2.5 bg-white rounded border border-amber-200 text-xs space-y-1">
                    <div>
                      <strong className="text-slate-800">• Novo Projeto:</strong> Emissão de Certidão de Cadastro.
                    </div>
                    <div>
                      <strong className="text-slate-800">• Tipo de Atividade:</strong> Uso e ocupação do solo para empresas.
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs sm:text-sm">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 text-[11px] flex items-center justify-center font-mono">
                        b
                      </span>
                      <span>Projeto aprovado ou em processo de aprovação</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-300">
                      Exigência Municipal • Obrigatório
                    </span>
                  </div>
                  <ul className="text-xs text-slate-700 pl-6 space-y-1.5 list-disc list-inside">
                    <li className="leading-relaxed">
                      <strong>Quando houver projeto aprovado:</strong> Anexar o projeto aprovado pelo órgão municipal competente.
                    </li>
                    <li className="leading-relaxed">
                      <strong>Quando não houver projeto aprovado:</strong> Anexar documento informando o número do protocolo do processo de aprovação de projeto, reforma ou regularização em andamento.
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs sm:text-sm">
                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-800 text-[11px] flex items-center justify-center font-mono">
                        c
                      </span>
                      <span>Demais documentos exigidos</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200">
                      Portaria CVS 10/2017 & {PORTARIA_CVS_LABEL}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 pl-6 leading-relaxed">
                    A relação dos documentos e os requisitos técnicos para solicitação do LTA estão estabelecidos na <strong>Portaria CVS nº 10, de 5 de agosto de 2017</strong>, que dispõe sobre os procedimentos de avaliação físico-funcional de projetos de edificações de interesse à saúde, conjuntamente com a {PORTARIA_CVS_LABEL} (ART/RRT, Memoriais de Fluxos e Arquitetônico, Jogos de Plantas e projetos ambientais/radiações quando aplicáveis).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 7 */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs space-y-3 transition-all hover:border-indigo-300">
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
              7
            </span>
            <div className="flex-1 space-y-2">
              <h3 className="text-sm font-bold text-slate-900">7. Finalização do protocolo</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Após preencher o formulário e anexar os documentos necessários, clique no botão{' '}
                <span className="inline-block px-3 py-1 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded font-bold text-xs sm:text-sm">
                  “Enviar para a Prefeitura”
                </span>{' '}
                para formalizar a solicitação.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BLOCO: ORIENTAÇÕES IMPORTANTES SOBRE ASSINATURAS */}
      <div className="bg-indigo-50/70 border-2 border-indigo-200 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2.5 pb-2 border-b border-indigo-200">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">draw</span>
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-indigo-950 uppercase tracking-wide">
              ORIENTAÇÕES IMPORTANTES SOBRE ASSINATURAS
            </h2>
            <p className="text-[11px] text-indigo-800">
              Validade jurídica e requisitos técnicos para deferimento do LTA
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="bg-white p-4 rounded-xl border border-indigo-100 space-y-1 shadow-2xs">
            <div className="flex items-center gap-2 text-indigo-950 font-bold">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 text-xs flex items-center justify-center font-mono">
                1
              </span>
              <span>Responsáveis pelas assinaturas</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed pt-1">
              Os documentos técnicos deverão conter as assinaturas do <strong>responsável técnico pelo projeto</strong> e do <strong>responsável legal pelo estabelecimento</strong>, conforme a natureza de cada documento e as exigências aplicáveis.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-indigo-100 space-y-1 shadow-2xs">
            <div className="flex items-center gap-2 text-indigo-950 font-bold">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 text-xs flex items-center justify-center font-mono">
                2
              </span>
              <span>Documentos emitidos por órgãos públicos</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed pt-1">
              A cópia do projeto aprovado e a Certidão de Uso e Ocupação do Solo deverão corresponder aos <strong>documentos oficiais emitidos pelos órgãos competentes</strong>, preservando integralmente suas informações e elementos de autenticação.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-indigo-100 space-y-1 shadow-2xs">
            <div className="flex items-center gap-2 text-indigo-950 font-bold">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 text-xs flex items-center justify-center font-mono">
                3
              </span>
              <span>Assinatura digital</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed pt-1">
              Os documentos finais destinados ao <strong>deferimento do LTA</strong> deverão estar <strong>devidamente assinados digitalmente</strong> pelos respectivos responsáveis (utilizando a conta gov.br prata/ouro ou certificado digital ICP-Brasil).
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-indigo-100 space-y-1 shadow-2xs">
            <div className="flex items-center gap-2 text-indigo-950 font-bold">
              <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 text-xs flex items-center justify-center font-mono">
                4
              </span>
              <span>Documentos sem assinatura na solicitação inicial</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed pt-1">
              A ausência de assinatura na documentação inicialmente apresentada <strong>não impedirá, por si só, o início da análise técnica</strong>. Entretanto, a regularização das assinaturas será obrigatória antes do deferimento do LTA.
            </p>
          </div>
        </div>
      </div>

      {/* BLOCO DE ATENÇÃO FINAL */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-4 sm:p-5 flex items-start gap-3 text-amber-950 shadow-2xs">
        <span className="material-symbols-outlined text-amber-700 text-[26px] shrink-0 mt-0.5">
          error
        </span>
        <div className="space-y-1">
          <strong className="text-sm font-bold uppercase tracking-wide block">
            ATENÇÃO:
          </strong>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
            O correto preenchimento das informações e a apresentação da documentação exigida contribuem para evitar exigências complementares e atrasos na análise do processo.
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-sm font-bold text-slate-900">
            Dúvidas sobre o enquadramento de suas atividades?
          </h3>
          <p className="text-xs text-slate-600">
            Utilize nossa ferramenta eletrônica de triagem para gerar seu comprovante antes de protocolar.
          </p>
        </div>
        <button
          onClick={onStartVerification}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">play_arrow</span>
          Iniciar Triagem de LTA
        </button>
      </div>
    </div>
  );
};
