import React, { useState } from 'react';
import { VerificationResult } from '../types';
import { isActivityLtaRequired, formatNaoCompreendeItems } from '../data/cvsLtaService';
import {
  PORTARIA_CVS_LABEL,
  PORTARIA_CVS_PUBLICACAO,
} from '../data/normativeMetadata';
import { getAllQuadro9ItemsFromActivities } from '../data/quadro9Docs';
import { generateOfficialPdf } from '../utils/generateOfficialPdf';

interface DocumentComprovanteProps {
  result: VerificationResult;
  onBack: () => void;
  onReset: () => void;
  onOpenProtocolo?: () => void;
}

export const DocumentComprovante: React.FC<DocumentComprovanteProps> = ({
  result,
  onBack,
  onReset,
  onOpenProtocolo,
}) => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const [downloadedPdfInfo, setDownloadedPdfInfo] = useState<{ url: string; filename: string } | null>(null);

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
  const [expandedExclusoes, setExpandedExclusoes] = useState<Record<string, boolean>>({});

  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    setPdfError(null);

    try {
      const { blobUrl, filename, doc } = generateOfficialPdf(result);
      setDownloadedPdfInfo({ url: blobUrl, filename });

      // Trigger automatic file download via invisible link
      try {
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        link.rel = 'noopener noreferrer';
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          if (document.body.contains(link)) {
            document.body.removeChild(link);
          }
        }, 1500);
      } catch (clickErr) {
        console.warn('Anchor click download fallback:', clickErr);
        try {
          doc.save(filename);
        } catch (saveErr) {
          console.warn('doc.save fallback error:', saveErr);
        }
      }
    } catch (err) {
      console.error('Erro ao gerar PDF padronizado:', err);
      setPdfError('Não foi possível gerar o PDF direto automaticamente. Você pode usar a opção "Imprimir" como alternativa.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    setIsPrinting(true);
    try {
      const printDoc = document.getElementById('document-canvas');
      if (printDoc) {
        const printWindow = window.open('', '_blank', 'width=900,height=800');
        if (printWindow) {
          printWindow.document.write(`
            <!DOCTYPE html>
            <html lang="pt-BR">
              <head>
                <meta charset="utf-8" />
                <title>Comprovante_Triagem_LTA_Sertaozinho</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
                <script src="https://cdn.tailwindcss.com"></script>
                <style>
                  @page {
                    size: A4 portrait;
                    margin: 12mm 15mm;
                  }
                  body {
                    background: #ffffff !important;
                    color: #0f172a !important;
                    font-family: 'Inter', system-ui, sans-serif;
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                    padding: 0;
                    margin: 0;
                  }
                  .material-symbols-outlined {
                    font-family: 'Material Symbols Outlined';
                    font-weight: normal;
                    font-style: normal;
                    font-size: 20px;
                    line-height: 1;
                    display: inline-block;
                    vertical-align: middle;
                  }
                </style>
              </head>
              <body class="p-4 sm:p-8 bg-white text-slate-900">
                <div class="max-w-[800px] mx-auto">
                  ${printDoc.innerHTML}
                </div>
                <script>
                  window.onload = function() {
                    setTimeout(function() {
                      window.focus();
                      window.print();
                    }, 500);
                  };
                </script>
              </body>
            </html>
          `);
          printWindow.document.close();
          setIsPrinting(false);
          return;
        }
      }
    } catch (e) {
      console.warn('Dedicated print window blocked or failed, fallback to in-page print', e);
    }

    // Direct in-page print fallback
    setTimeout(() => {
      window.focus();
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  return (
    <div className="w-full max-w-[840px] mx-auto flex flex-col gap-4 py-2 sm:py-4">
      {/* Action Bar (Hidden during print) */}
      <div
        id="action-buttons"
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3.5 bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs"
      >
        <div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900">
            Resultado da Triagem de LTA
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Consulta concluída. Baixe o PDF padronizado abaixo para anexar ao Aprova Online.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 md:flex-none px-3.5 py-2 border border-slate-300 rounded-lg text-slate-700 bg-white font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Voltar
          </button>
          <button
            type="button"
            onClick={onReset}
            className="flex-1 md:flex-none px-3.5 py-2 border border-slate-300 rounded-lg text-slate-700 bg-white font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">refresh</span>
            Nova consulta
          </button>
          <button
            type="button"
            onClick={handlePrint}
            disabled={isPrinting || isGeneratingPdf}
            className="flex-1 md:flex-none px-3.5 py-2 border border-slate-300 rounded-lg text-slate-700 bg-white font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            title="Abrir diálogo de impressão do navegador"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            Imprimir
          </button>
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf || isPrinting}
            className="w-full sm:w-auto px-4 py-2 bg-emerald-700 text-white rounded-lg font-bold text-xs sm:text-sm hover:bg-emerald-800 transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isGeneratingPdf ? 'hourglass_top' : 'download'}
            </span>
            {isGeneratingPdf ? 'Gerando PDF Padronizado...' : 'Baixar Comprovante em PDF'}
          </button>
        </div>
      </div>

      {downloadedPdfInfo && (
        <div className="no-print bg-emerald-50 border-2 border-emerald-500 text-emerald-950 p-4 rounded-xl text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[22px] text-emerald-700 mt-0.5">check_circle</span>
            <div>
              <p className="font-bold text-emerald-900">
                Documento Oficial em PDF Gerado com Sucesso!
              </p>
              <p className="text-emerald-800 text-xs mt-0.5">
                Arquivo: <span className="font-mono font-semibold">{downloadedPdfInfo.filename}</span>. O download foi iniciado. Caso não tenha baixado automaticamente, clique no botão ao lado.
              </p>
            </div>
          </div>
          <a
            href={downloadedPdfInfo.url}
            download={downloadedPdfInfo.filename}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-4 py-2 bg-emerald-700 text-white font-bold text-xs rounded-lg hover:bg-emerald-800 transition-colors flex items-center justify-center gap-1.5 shrink-0"
          >
            <span className="material-symbols-outlined text-[16px]">file_download</span>
            Abrir / Baixar PDF
          </a>
        </div>
      )}

      {pdfError && (
        <div className="no-print bg-rose-50 border border-rose-200 text-rose-800 px-4 py-2.5 rounded-lg text-xs flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-rose-600">error</span>
          <span>{pdfError}</span>
        </div>
      )}

      {/* Aviso de Protocolo do PDF no Aprova Online */}
      <div className="no-print bg-amber-50/90 border border-amber-300/80 rounded-xl p-3 sm:px-4 text-xs text-amber-950 flex items-center gap-2.5 shadow-2xs">
        <span className="material-symbols-outlined text-amber-700 text-[20px] shrink-0">info</span>
        <p className="flex-1 leading-snug">
          <strong>Atenção:</strong> Esta triagem é declaratória. Baixe o <strong>comprovante em PDF</strong> acima e anexe-o ao seu processo no sistema <strong>Aprova Online</strong> da Prefeitura Municipal de Sertãozinho-SP.
        </p>
      </div>

      {/* Document Canvas (Paper) */}
      <div
        id="document-canvas"
        className="bg-white shadow-sm border border-slate-300 rounded-none sm:rounded-xl p-6 sm:p-10 relative overflow-hidden text-slate-900"
      >
        {/* Decorative Top Line */}
        <div
          className={`absolute top-0 left-0 w-full h-1.5 ${
            isNoActivity ? 'bg-slate-500' : isLtaRequired ? 'bg-rose-600' : 'bg-emerald-600'
          }`}
        ></div>

        {/* Official Header (Sem brasão para simplificação da etapa) */}
        <div className="flex items-center justify-between border-b border-slate-300 pb-5 mb-6 pt-1">
          <div>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight uppercase">
              Prefeitura Municipal de Sertãozinho-SP
            </h2>
            <p className="text-xs text-slate-700 font-semibold">
              Secretaria Municipal de Saúde • Vigilância Sanitária Municipal
            </p>
            <p className="text-[11px] text-slate-500 font-medium">
              Ferramenta Eletrônica de Triagem de Necessidade de LTA
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">
              Data da Consulta
            </span>
            <span className="text-xs font-semibold text-slate-900 bg-slate-100 px-2.5 py-1 rounded border border-slate-200 inline-block mt-0.5">
              {result.timestamp}
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-5">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
            Comprovante de Triagem de LTA
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Resultado da consulta de enquadramento conforme a {PORTARIA_CVS_LABEL}
          </p>
        </div>

        {/* RESULTADO DA TRIAGEM (Destaque Imediato no Topo do Comprovante) */}
        <div
          className={`p-4 sm:p-5 rounded-xl mb-6 border-2 flex items-start gap-3.5 ${
            isNoActivity
              ? 'bg-slate-50 border-slate-400 text-slate-950'
              : isLtaRequired
              ? 'bg-rose-50/90 border-rose-500 text-rose-950'
              : 'bg-emerald-50/90 border-emerald-500 text-emerald-950'
          }`}
        >
          <span className="text-2xl sm:text-3xl shrink-0 mt-0.5 leading-none select-none">
            {isNoActivity ? '🟢' : isLtaRequired ? '🔴' : '🟢'}
          </span>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider block opacity-75">
              RESULTADO DA TRIAGEM
            </span>
            <h2 className="text-base sm:text-lg font-black tracking-tight uppercase mt-0.5">
              {isNoActivity
                ? 'SEM ATIVIDADE PARA ENQUADRAMENTO'
                : isLtaRequired
                ? 'LTA NECESSÁRIO'
                : 'LTA NÃO NECESSÁRIO PARA A ATIVIDADE INFORMADA'}
            </h2>
            <p className="text-xs sm:text-sm mt-1 leading-relaxed opacity-90">
              {isNoActivity
                ? 'De acordo com a informação declarada pelo requerente, não há atividade econômica sanitária vinculada ao imóvel nesta consulta. Não há exigência de LTA a ser determinada neste momento. A exigência de LTA dependerá da atividade que vier a ser efetivamente implantada.'
                : isLtaRequired
                ? 'De acordo com a informação declarada pelo requerente, a atividade informada exige aprovação de projeto físico-funcional (LTA) perante a Vigilância Sanitária de Sertãozinho-SP (Aprova Online) antes do início de obras e da concessão da licença de funcionamento sanitária.'
                : `De acordo com a informação declarada pelo requerente, a atividade informada está dispensada de aprovação de Laudo Técnico de Avaliação (LTA), conforme a regulamentação da ${PORTARIA_CVS_LABEL}. O licenciamento sanitário segue os trâmites regulares.`}
            </p>
          </div>
        </div>

        {/* BLOCO 1: IDENTIFICAÇÃO */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2 pb-1 border-b border-slate-200">
            <span className="w-5 h-5 rounded bg-indigo-700 text-white font-mono font-bold text-[11px] flex items-center justify-center">
              1
            </span>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Identificação
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div className="md:col-span-2 pb-2 border-b border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">
                Endereço do imóvel (Objeto da Consulta)
              </span>
              <p className="text-sm font-bold text-slate-900 mt-0.5">
                {result.identification.endereco
                  ? `${result.identification.endereco}, ${
                      result.identification.numeroSemNumero && (result.identification.quadra || result.identification.lote)
                        ? `S/N (Quadra ${result.identification.quadra || '-'}, Lote ${result.identification.lote || '-'})`
                        : (result.identification.numero || 'S/N')
                    }${
                      result.identification.complemento ? ` (${result.identification.complemento})` : ''
                    }${result.identification.bairro ? ` - Bairro ${result.identification.bairro}` : ''}, Sertãozinho-SP${
                      result.identification.cep ? ` - CEP ${result.identification.cep}` : ''
                    }`
                  : 'Sertãozinho-SP'}
              </p>
            </div>

            {result.identification.numeroSemNumero && (result.identification.quadra || result.identification.lote) && (
              <div className="md:col-span-2 pb-2 border-b border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">
                  Identificação do Imóvel (S/N)
                </span>
                <p className="text-xs font-semibold text-slate-900 mt-0.5">
                  Quadra: {result.identification.quadra || '-'} | Lote: {result.identification.lote || '-'}
                </p>
              </div>
            )}

            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">
                Interessado / Razão Social
              </span>
              <p className="text-xs font-semibold text-slate-900 mt-0.5">
                {result.identification.razaoSocial || 'Não informado (Consulta prévia de viabilidade de imóvel)'}
              </p>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">
                Data e Hora da Consulta
              </span>
              <p className="text-xs font-semibold text-slate-900 mt-0.5">
                {result.timestamp}
              </p>
            </div>

            {result.identification.cnpjCpf && (
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">
                  CNPJ / CPF
                </span>
                <p className="text-xs font-mono font-semibold text-slate-900 mt-0.5">
                  {result.identification.cnpjCpf}
                </p>
              </div>
            )}

            {result.identification.nomeFantasia && (
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">
                  Nome Fantasia
                </span>
                <p className="text-xs font-semibold text-slate-900 mt-0.5">
                  {result.identification.nomeFantasia}
                </p>
              </div>
            )}

            {result.identification.responsavelTecnico && (
              <div className="md:col-span-2 pt-2 border-t border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">
                  Responsável Técnico Declarado
                </span>
                <p className="text-xs font-semibold text-slate-900 mt-0.5">
                  {result.identification.responsavelTecnico}
                  {result.identification.registroProfissional
                    ? ` — ${result.identification.registroProfissional}`
                    : ''}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* BLOCO 2: DADOS DECLARADOS */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2 pb-1 border-b border-slate-200">
            <span className="w-5 h-5 rounded bg-indigo-700 text-white font-mono font-bold text-[11px] flex items-center justify-center">
              2
            </span>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Dados Declarados
            </h3>
          </div>

          {isNoActivity ? (
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white p-4 text-xs space-y-1.5 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">
                Situação Declarada:
              </span>
              <p className="font-bold text-slate-900 text-sm">
                Imóvel sem atividade econômica sanitária definida
              </p>
              <p className="text-slate-600 leading-relaxed">
                O imóvel foi declarado sem atividade econômica sanitária vinculada nesta consulta. Não há exigência de LTA a ser determinada neste momento. A exigência de LTA dependerá da atividade que vier a ser futuramente implantada.
              </p>
            </div>
          ) : (
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Atividades Econômicas e Compreensões Analisadas ({activities.length})
                </span>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className="text-rose-700 font-bold">{ltaRequiredList.length} com LTA</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-emerald-700 font-bold">{ltaExemptList.length} isenta(s)</span>
                </div>
              </div>

              <div className="p-4 space-y-3.5 text-xs sm:text-sm">
                {/* GROUP 1: Obrigatórias */}
                {ltaRequiredList.length > 0 && (
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-1.5 pb-1 border-b border-rose-200 text-rose-800 font-bold text-xs uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                      Atividades com Aprovação de LTA Obrigatória ({ltaRequiredList.length})
                    </div>

                    {ltaRequiredList.map((act, index) => (
                      <div
                        key={`lta-${index}`}
                        className="p-3.5 rounded-lg border border-rose-300 bg-rose-50/25 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs bg-white border border-rose-200 px-2 py-0.5 rounded text-rose-800">
                              CNAE {act.cnae}
                            </span>
                            <span className="font-bold text-slate-900">{act.descricaoCnae}</span>
                          </div>
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200">
                            PRECISA DE LTA
                          </span>
                        </div>

                        <div className="bg-white p-2.5 rounded border border-rose-100">
                          <span className="text-rose-800 block text-[10px] uppercase font-bold mb-0.5">
                            Compreensão Oficial da Atividade (CVS 01):
                          </span>
                          <p className="text-slate-900 font-medium leading-relaxed">{act.compreensao}</p>
                        </div>

                        {(() => {
                          const excItems = formatNaoCompreendeItems(act.naoCompreende);
                          if (excItems.length === 0) return null;
                          const excKey = `doc-lta-${act.cnae}-${index}`;
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
                                <div className="bg-amber-50/80 p-2 rounded border border-amber-200 text-xs text-amber-900 mt-1 space-y-1">
                                  <span className="font-bold block text-amber-800">
                                    Não compreende (atividades excluídas deste enquadramento):
                                  </span>
                                  <ul className="list-disc list-inside space-y-0.5 text-slate-700 pl-1">
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

                {/* GROUP 2: Isentas */}
                {ltaExemptList.length > 0 && (
                  <div className="space-y-2.5 pt-2">
                    <div className="flex items-center gap-1.5 pb-1 border-b border-emerald-200 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      Atividades Dispensadas de LTA ({ltaExemptList.length})
                    </div>

                    {ltaExemptList.map((act, index) => (
                      <div
                        key={`exempt-${index}`}
                        className="p-3.5 rounded-lg border border-emerald-300 bg-emerald-50/20 space-y-2"
                      >
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs bg-white border border-emerald-200 px-2 py-0.5 rounded text-emerald-800">
                              CNAE {act.cnae}
                            </span>
                            <span className="font-bold text-slate-900">{act.descricaoCnae}</span>
                          </div>
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                            NÃO PRECISA DE LTA
                          </span>
                        </div>

                        <div className="bg-white p-2.5 rounded border border-emerald-100">
                          <span className="text-emerald-800 block text-[10px] uppercase font-bold mb-0.5">
                            Enquadramento Sanitário:
                          </span>
                          <p className="text-slate-900 font-medium leading-relaxed">{act.compreensao}</p>
                        </div>

                        {(() => {
                          const excItems = formatNaoCompreendeItems(act.naoCompreende);
                          if (excItems.length === 0) return null;
                          const excKey = `doc-exempt-${act.cnae}-${index}`;
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
                                <div className="bg-amber-50/80 p-2 rounded border border-amber-200 text-xs text-amber-900 mt-1 space-y-1">
                                  <span className="font-bold block text-amber-800">
                                    Não compreende (atividades excluídas deste enquadramento):
                                  </span>
                                  <ul className="list-disc list-inside space-y-0.5 text-slate-700 pl-1">
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
              </div>
            </div>
          )}
        </div>

        {/* DOCUMENTOS TÉCNICOS PRÉVIOS PARA ANÁLISE DE LTA (somente quando LTA for obrigatório) */}
        {isLtaRequired && quadro9RequiredDocs.length > 0 && (
          <div className="border border-slate-300 rounded-lg p-4 mb-6 bg-white space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 block">
                  Processo Digital • Sistema Aprova Online Sertãozinho-SP
                </span>
                <h3 className="text-xs font-bold text-slate-900 uppercase">
                  Documentos Técnicos para Laudo Técnico de Avaliação (LTA)
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200">
                {quadro9RequiredDocs.length} Documento(s) Exigido(s)
              </span>
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed">
              Relação oficial de documentos técnicos exigidos pela {PORTARIA_CVS_LABEL} e pelo Município de Sertãozinho-SP para análise e emissão de LTA junto à Vigilância Sanitária:
            </p>

            <div className="overflow-x-auto rounded border border-slate-200">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-800 font-bold uppercase text-[10px] tracking-wider">
                    <th className="py-2.5 px-3 w-20 text-center">CÓDIGO</th>
                    <th className="py-2.5 px-3">TIPO</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {quadro9RequiredDocs.map((doc) => (
                    <tr key={String(doc.codigo)} className="hover:bg-slate-50/50">
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
                      <td className="py-2.5 px-3 text-slate-800 text-[11px] leading-relaxed font-medium">
                        <div className="flex items-start justify-between gap-2 flex-wrap">
                          <span>{doc.tipo}</span>
                          {doc.origem === 'MUNICIPAL' && (
                            <span className="shrink-0 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                              Exigido pelo Município
                            </span>
                          )}
                        </div>
                        {Number(doc.codigo) === 2 && (
                          <div className="mt-1.5 p-2 rounded bg-emerald-50 border border-emerald-200 text-[10.5px] text-emerald-950 font-normal leading-relaxed">
                            <strong>Taxa Municipal de LTA (Sertãozinho-SP):</strong> O Município de Sertãozinho-SP <strong>não instituiu taxa para análise de LTA</strong>. Portanto, para o protocolo perante a Vigilância Sanitária Municipal, <strong>não é exigido comprovante de recolhimento de taxa municipal (DARE ou equivalente)</strong>.
                          </div>
                        )}
                        {Number(doc.codigo) === 9 && (
                          <div className="mt-1.5 p-2 rounded bg-indigo-50 border border-indigo-200 text-[10.5px] text-indigo-950 font-normal leading-relaxed">
                            <strong>Formulário Digital:</strong> O formulário de solicitação de LTA será preenchido diretamente no sistema <strong>Aprova Online</strong> durante a abertura do protocolo (não é necessário anexar formulário externo em papel ou PDF).
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-[11px] text-slate-700 bg-indigo-50/50 p-2.5 rounded-lg border border-indigo-200 mt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 leading-relaxed">
              <div className="flex items-start gap-1.5 flex-1">
                <span className="text-indigo-700 font-bold shrink-0 mt-0.5">ℹ️</span>
                <span>
                  <strong>Apresentação no Aprova Online:</strong> Os documentos acima (da Portaria CVS 01/2024 e os exigidos pelo Município) devem ser anexados digitalmente no momento da formalização do processo eletrônico de LTA junto à Vigilância Sanitária de Sertãozinho-SP.
                </span>
              </div>
              {onOpenProtocolo && (
                <button
                  type="button"
                  onClick={onOpenProtocolo}
                  className="px-2.5 py-1 bg-white hover:bg-indigo-50 border border-indigo-300 rounded text-indigo-700 font-bold text-[10px] shrink-0 inline-flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                >
                  <span className="material-symbols-outlined text-[14px]">assignment_turned_in</span>
                  <span>Como Protocolar no Aprova Online</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* BLOCO 3: OBSERVAÇÕES & RESPONSABILIDADE */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2 pb-1 border-b border-slate-200">
            <span className="w-5 h-5 rounded bg-indigo-700 text-white font-mono font-bold text-[11px] flex items-center justify-center">
              3
            </span>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Observações
            </h3>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed shadow-2xs">
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="font-bold text-slate-900 shrink-0">• Responsabilidade:</span>
                <span>O resultado baseia-se exclusivamente nas informações e atividades declaradas pelo requerente.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-slate-900 shrink-0">• Natureza do Documento:</span>
                <span>Este comprovante de triagem eletrônica prévia não substitui o Laudo Técnico de Avaliação (LTA) nem a aprovação de projeto físico-funcional.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-slate-900 shrink-0">• Protocolo no Município:</span>
                <span>Para formalização ou comprovação perante a Vigilância Sanitária Municipal de Sertãozinho-SP, anexe este comprovante (PDF) ao processo eletrônico no sistema Aprova Online.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-slate-900 shrink-0">• Regularidade Sanitária:</span>
                <span>A eventual dispensa de LTA não desobriga o cumprimento integral das Boas Práticas Sanitárias e a obtenção da Licença de Funcionamento Sanitária regular.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Rodapé Institucional do MVP (sem assinatura individual simulada, sem QR code ou validação fictícia) */}
        <div className="pt-4 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-slate-600">
          <div>
            <p className="font-bold text-slate-900">Prefeitura Municipal de Sertãozinho-SP</p>
            <p className="text-[11px] text-slate-700 font-medium">Secretaria Municipal de Saúde — Vigilância Sanitária</p>
            <p className="text-[10px] text-slate-500">Ferramenta eletrônica de triagem de necessidade de LTA</p>
          </div>
          <div className="sm:text-right">
            <span className="text-[11px] text-slate-500 font-mono">Dúvidas técnicas: visastsertaozinho@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};
