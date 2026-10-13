import React from 'react';
import { VerificationResult } from '../types';
import { isActivityLtaRequired, formatNaoCompreendeItems } from '../data/cvsLtaService';
import { getAllQuadro9ItemsFromActivities } from '../data/quadro9Docs';

interface Step4ConclusionProps {
  result: VerificationResult;
  onReset: () => void;
  onViewDocument: () => void;
  onOpenHelp: () => void;
  onOpenProtocolo?: () => void;
}

export const Step4Conclusion: React.FC<Step4ConclusionProps> = ({
  result,
  onReset,
  onViewDocument,
  onOpenHelp,
  onOpenProtocolo,
}) => {
  const isNoActivity =
    result.finalResult === 'SEM_ATIVIDADE' ||
    result.finalResult === 'LTA_NAO_ENQUADRADO' ||
    (result.selectedCvsActivities &&
      result.selectedCvsActivities.some(
        (a) =>
          a.cnae === 'SEM CNAE' ||
          a.agrupamento?.includes('SEM ATIVIDADE') ||
          a.descricaoCnae?.toLowerCase().includes('sem atividade')
      ));

  const isLtaRequired = !isNoActivity && result.finalResult === 'LTA_EXIGIDO';
  const activities =
    result.selectedCvsActivities && result.selectedCvsActivities.length > 0
      ? result.selectedCvsActivities
      : result.selectedCvsActivity
      ? [result.selectedCvsActivity]
      : [];

  const ltaRequiredList = activities.filter(isActivityLtaRequired);
  const ltaExemptList = activities.filter((act) => !isActivityLtaRequired(act));
  const quadro9RequiredDocs = isLtaRequired ? getAllQuadro9ItemsFromActivities(ltaRequiredList) : [];
  const [expandedExclusoes, setExpandedExclusoes] = React.useState<Record<string, boolean>>({});

  return (
    <div className="w-full flex flex-col items-center justify-center py-2 sm:py-4">
      <div className="w-full max-w-3xl bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 text-center flex flex-col items-center">
        {/* Cabeçalho Resumido & Botão de Ajuda Unificado */}
        <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-slate-100 flex-wrap gap-2 text-left">
          <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider">
            Etapa 3 de 3 • Parecer Sanitário Oficial
          </span>
          <button
            type="button"
            onClick={onOpenHelp}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-200 bg-indigo-50/80 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">help</span>
            <span>Ajuda nesta etapa</span>
          </button>
        </div>

        {/* Parecer Badge / Icon */}
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-xs ${
            isNoActivity
              ? 'bg-slate-100 border border-slate-300 text-slate-700'
              : isLtaRequired
              ? 'bg-rose-50 border border-rose-200 text-rose-600'
              : 'bg-emerald-50 border border-emerald-200 text-emerald-600'
          }`}
        >
          <span className="material-symbols-outlined text-[34px]">
            {isNoActivity ? 'fact_check' : isLtaRequired ? 'assignment_late' : 'verified'}
          </span>
        </div>

        {/* Parecer Header */}
        <span
          className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2 ${
            isNoActivity
              ? 'bg-slate-100 text-slate-800 border border-slate-300'
              : isLtaRequired
              ? 'bg-rose-100 text-rose-800 border border-rose-200'
              : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
          }`}
        >
          {isNoActivity
            ? 'IMÓVEL SEM ATIVIDADE DEFINIDA'
            : isLtaRequired
            ? 'ENQUADRAMENTO: LTA NECESSÁRIO'
            : 'ENQUADRAMENTO: LTA NÃO NECESSÁRIO'}
        </span>

        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1.5 tracking-tight">
          {isNoActivity
            ? 'Não há exigência de LTA nesta consulta'
            : isLtaRequired
            ? 'Laudo Técnico de Avaliação (LTA) Obrigatório'
            : 'Atividade(s) Dispensada(s) de Apresentação Prévia de LTA'}
        </h1>

        <p className="text-xs sm:text-sm text-slate-500 mb-6 max-w-lg leading-relaxed">
          {isNoActivity
            ? 'O imóvel foi declarado sem atividade econômica sanitária vinculada nesta consulta. A exigência de LTA dependerá da atividade que for futuramente instalada no imóvel.'
            : isLtaRequired
            ? `Com base no enquadramento sanitário na Portaria CVS 01/2024, ${
                ltaRequiredList.length === activities.length
                  ? 'todas as atividades informadas exigem LTA prévio.'
                  : `${ltaRequiredList.length} atividade(s) exige(m) aprovação prévia de projeto físico (LTA), enquanto ${ltaExemptList.length} atividade(s) está(ão) dispensada(s).`
              }`
            : 'As atividades informadas não constam no rol de obrigatoriedade de LTA da Portaria CVS 01/2024 ou estão dispensadas de avaliação física prévia.'}
        </p>

        {/* Official Details Card */}
        <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-5 mb-6 text-left space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Detalhamento do Parecer Sanitário
            </span>
            <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
              Protocolo: {result.protocol}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="sm:col-span-2">
              <span className="text-slate-500 block text-[11px] uppercase font-bold">
                Endereço do imóvel
              </span>
              <span className="font-semibold text-slate-900 text-sm">
                {result.identification.endereco
                  ? `${result.identification.endereco}, ${
                      result.identification.numeroSemNumero && (result.identification.quadra || result.identification.lote)
                        ? `S/N (Quadra: ${result.identification.quadra || '-'}, Lote: ${result.identification.lote || '-'})`
                        : (result.identification.numero || 'S/N')
                    }${
                      result.identification.complemento ? ` (${result.identification.complemento})` : ''
                    }${result.identification.bairro ? ` - Bairro ${result.identification.bairro}` : ''}, Sertãozinho-SP${
                      result.identification.cep ? ` - CEP ${result.identification.cep}` : ''
                    }`
                  : 'Sertãozinho-SP'}
              </span>
            </div>

            {result.identification.numeroSemNumero && (result.identification.quadra || result.identification.lote) && (
              <div className="sm:col-span-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex items-center gap-2 text-xs">
                <span className="material-symbols-outlined text-slate-600 text-[18px] shrink-0">
                  location_on
                </span>
                <span className="text-slate-800 font-medium">
                  <strong>Identificação do Imóvel (S/N):</strong> Quadra {result.identification.quadra || '-'}, Lote {result.identification.lote || '-'}
                </span>
              </div>
            )}

            <div>
              <span className="text-slate-500 block text-[11px] uppercase font-bold">
                Interessado / Razão Social
              </span>
              <span className="font-medium text-slate-800">
                {result.identification.razaoSocial
                  ? result.identification.razaoSocial
                  : 'Não informado (Consulta prévia de imóvel)'}
              </span>
            </div>

            <div>
              <span className="text-slate-500 block text-[11px] uppercase font-bold">
                CNPJ / CPF
              </span>
              <span className="font-mono font-medium text-slate-800">
                {result.identification.cnpjCpf
                  ? result.identification.cnpjCpf
                  : 'Não informado'}
              </span>
            </div>
          </div>

          {/* If without activity: Show Situação Declarada Direta e Enxuta */}
          {isNoActivity ? (
            <div className="pt-2 border-t border-slate-200">
              <div className="bg-white p-3.5 rounded-lg border border-slate-200 text-xs space-y-1.5 shadow-2xs">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  Situação Declarada:
                </span>
                <p className="font-semibold text-slate-900 text-xs sm:text-sm">
                  Imóvel sem atividade econômica sanitária definida
                </p>
                <p className="text-slate-600 leading-relaxed text-xs">
                  Não há exigência de LTA a ser determinada nesta consulta. Caso venha a ser implantada atividade econômica sujeita à Vigilância Sanitária, nova consulta de enquadramento deverá ser realizada.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Breakdown Alert Box for defined activities */}
              <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs space-y-1">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-700 uppercase tracking-wider text-[11px]">
                    Quadro Resumo de Obrigatoriedade de LTA:
                  </span>
                  <span className="text-indigo-700">{activities.length} atividade(s) avaliada(s)</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {ltaRequiredList.length > 0 && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-50 text-rose-800 border border-rose-200 font-bold">
                      <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                      {ltaRequiredList.length} com LTA Obrigatório
                    </span>
                  )}
                  {ltaExemptList.length > 0 && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      {ltaExemptList.length} Isenta(s) / Dispensada(s) de LTA
                    </span>
                  )}
                </div>
              </div>

              {/* GROUP 1: Atividades que PRECISAM de LTA */}
              {ltaRequiredList.length > 0 && (
                <div className="pt-2 border-t border-slate-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
                    <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">
                      Atividades que PRECISAM de LTA ({ltaRequiredList.length}) — Aprovação Prévia Obrigatória
                    </span>
                  </div>

                  {ltaRequiredList.map((act, idx) => (
                    <div
                      key={`lta-${idx}`}
                      className="bg-white p-3.5 rounded-lg border border-rose-200 space-y-2 shadow-2xs"
                    >
                      <div className="flex items-center gap-2 flex-wrap justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs bg-rose-50 border border-rose-200 px-2 py-0.5 rounded text-rose-800">
                            CNAE {act.cnae}
                          </span>
                          <span className="text-xs font-bold text-slate-900">{act.descricaoCnae}</span>
                        </div>

                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px]">assignment_late</span>
                          PRECISA DE LTA
                        </span>
                      </div>

                      <div className="text-xs text-slate-800 bg-rose-50/40 p-2.5 rounded border border-rose-100">
                        <span className="text-[10px] font-bold uppercase text-rose-700 block mb-0.5">
                          Compreensão Oficial da CVS 01:
                        </span>
                        <p className="font-medium leading-relaxed">{act.compreensao}</p>
                      </div>

                      {/* Exclusões (Não compreende): Oculto por padrão */}
                      {(() => {
                        const excItems = formatNaoCompreendeItems(act.naoCompreende);
                        if (excItems.length === 0) return null;
                        const excKey = `lta-${act.cnae}-${idx}`;
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
                              <span>{isShown ? 'Ocultar' : 'Ver'} atividades excluídas ({excItems.length})</span>
                            </button>
                            {isShown && (
                              <div className="text-[11px] text-amber-900 bg-amber-50/80 p-2.5 rounded-lg border border-amber-200 mt-1 space-y-1">
                                <span className="font-bold block text-amber-800">
                                  Não compreende (atividades excluídas deste enquadramento):
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
                    ))}

                  {/* Documentos Técnicos para LTA (somente quando LTA for obrigatório) */}
                  {isLtaRequired && quadro9RequiredDocs.length > 0 && (
                    <div className="bg-slate-50 border border-slate-300 rounded-xl p-4 mt-4 space-y-3 text-left">
                      <div className="flex items-start justify-between gap-2 flex-wrap pb-2 border-b border-slate-200">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 block">
                            Processo Digital • Aprova Online Sertãozinho-SP
                          </span>
                          <h3 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5 mt-0.5">
                            <span className="material-symbols-outlined text-indigo-700 text-[18px]">folder_special</span>
                            Documentos Técnicos para Laudo Técnico de Avaliação (LTA)
                          </h3>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200">
                          {quadro9RequiredDocs.length} Documento(s) Exigido(s)
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        Relação oficial de documentos técnicos exigidos pela Portaria CVS 01/2024 e pelo Município de Sertãozinho-SP para análise e emissão de LTA junto à Vigilância Sanitária:
                      </p>

                      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-2xs">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                              <th className="py-2.5 px-3 w-20 text-center">CÓDIGO</th>
                              <th className="py-2.5 px-3">TIPO</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            {quadro9RequiredDocs.map((doc) => (
                              <tr key={String(doc.codigo)} className="hover:bg-indigo-50/20">
                                <td className="py-2.5 px-3 font-mono font-bold text-center">
                                  <span
                                    className={`inline-block px-1.5 py-0.5 rounded border text-xs font-bold leading-normal ${
                                      doc.origem === 'MUNICIPAL'
                                        ? 'bg-amber-50 border-amber-300 text-amber-900'
                                        : 'bg-indigo-50 border-indigo-200 text-indigo-900'
                                    }`}
                                  >
                                    {doc.codigo}
                                  </span>
                                </td>
                                <td className="py-2.5 px-3 text-slate-800 font-medium leading-relaxed">
                                  <div className="flex items-start justify-between gap-2 flex-wrap">
                                    <span>{doc.tipo}</span>
                                    {doc.origem === 'MUNICIPAL' && (
                                      <span className="shrink-0 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                                        Exigido pelo Município
                                      </span>
                                    )}
                                  </div>
                                  {Number(doc.codigo) === 2 && (
                                    <div className="mt-1.5 p-2 rounded bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-950 font-normal leading-relaxed">
                                      <strong>Taxa Municipal de LTA (Sertãozinho-SP):</strong> O Município de Sertãozinho-SP <strong>não instituiu taxa para análise de LTA</strong>. Portanto, para o protocolo perante a Vigilância Sanitária Municipal, <strong>não é exigido comprovante de recolhimento de taxa municipal (DARE ou equivalente)</strong>.
                                    </div>
                                  )}
                                  {Number(doc.codigo) === 9 && (
                                    <div className="mt-1.5 p-2 rounded bg-indigo-50 border border-indigo-200 text-[11px] text-indigo-950 font-normal leading-relaxed">
                                      <strong>Formulário Digital:</strong> O formulário de solicitação de LTA será preenchido diretamente no sistema <strong>Aprova Online</strong> durante a abertura da solicitação (não é necessário anexar formulário externo em papel ou PDF).
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="text-[11px] text-slate-700 bg-white p-3 rounded-lg border border-slate-200 mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 leading-relaxed shadow-2xs">
                        <div className="flex items-start gap-1.5 flex-1">
                          <span className="material-symbols-outlined text-indigo-700 text-[16px] shrink-0 mt-0.5">info</span>
                          <span>
                            <strong>Apresentação no Aprova Online:</strong> Os documentos técnicos listados acima (da Portaria CVS 01/2024 e os exigidos pelo Município) devem ser anexados digitalmente no momento do protocolo do processo eletrônico de LTA junto à Vigilância Sanitária de Sertãozinho-SP.
                          </span>
                        </div>
                        {onOpenProtocolo && (
                          <button
                            type="button"
                            onClick={onOpenProtocolo}
                            className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg text-indigo-800 font-bold text-[10px] shrink-0 inline-flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                          >
                            <span className="material-symbols-outlined text-[14px]">assignment_turned_in</span>
                            <span>Como Protocolar no Aprova Online</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* GROUP 2: Atividades que NÃO PRECISAM de LTA */}
              {ltaExemptList.length > 0 && (
                <div className="pt-2 border-t border-slate-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                      Atividades que NÃO PRECISAM de LTA ({ltaExemptList.length}) — Dispensadas / Isentas
                    </span>
                  </div>

                  {ltaExemptList.map((act, idx) => (
                    <div
                      key={`exempt-${idx}`}
                      className="bg-white p-3.5 rounded-lg border border-emerald-200 space-y-2 shadow-2xs"
                    >
                      <div className="flex items-center gap-2 flex-wrap justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-emerald-800">
                            CNAE {act.cnae}
                          </span>
                          <span className="text-xs font-bold text-slate-900">{act.descricaoCnae}</span>
                        </div>

                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px]">check_circle</span>
                          NÃO PRECISA DE LTA
                        </span>
                      </div>

                      <div className="text-xs text-slate-800 bg-emerald-50/40 p-2.5 rounded border border-emerald-100">
                        <span className="text-[10px] font-bold uppercase text-emerald-700 block mb-0.5">
                          Enquadramento Sanitário:
                        </span>
                        <p className="font-medium leading-relaxed">{act.compreensao}</p>
                      </div>

                      {/* Exclusões (Não compreende): Oculto por padrão */}
                      {(() => {
                        const excItems = formatNaoCompreendeItems(act.naoCompreende);
                        if (excItems.length === 0) return null;
                        const excKey = `exempt-${act.cnae}-${idx}`;
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
                              <span>{isShown ? 'Ocultar' : 'Ver'} atividades excluídas ({excItems.length})</span>
                            </button>
                            {isShown && (
                              <div className="text-[11px] text-amber-900 bg-amber-50/80 p-2.5 rounded-lg border border-amber-200 mt-1 space-y-1">
                                <span className="font-bold block text-amber-800">
                                  Não compreende (atividades excluídas deste enquadramento):
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
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-3 justify-center mb-2">
          <button
            type="button"
            onClick={onReset}
            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 text-xs sm:text-sm font-medium hover:bg-slate-50 transition-colors w-full sm:w-auto cursor-pointer"
          >
            Nova Consulta
          </button>

          <button
            type="button"
            onClick={onViewDocument}
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-indigo-700 transition-colors w-full sm:w-auto shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
            Visualizar e Baixar Comprovante Oficial (PDF)
          </button>
        </div>

        {/* Links */}
        <div className="mt-6 pt-4 border-t border-slate-200 w-full text-center">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Vigilância Sanitária Municipal de Sertãozinho-SP
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6">
            <a
              href="https://www.sertaozinho.sp.gov.br/vigilancia-sanitaria"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:text-indigo-800 text-xs font-medium flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              Orientações de Protocolo de LTA
            </a>
            <button
              onClick={onOpenHelp}
              className="text-indigo-600 hover:text-indigo-800 text-xs font-medium flex items-center justify-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              Tabela Completa Portaria CVS 01
            </button>
          </div>
          <div className="mt-3 text-xs text-slate-500 flex items-center justify-center gap-1.5 flex-wrap">
            <span className="material-symbols-outlined text-[15px] text-slate-400">mail</span>
            <span>Dúvidas ou orientações técnicas:</span>
            <a
              href="mailto:visastsertaozinho@gmail.com"
              className="text-indigo-600 font-semibold hover:underline"
            >
              visastsertaozinho@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

