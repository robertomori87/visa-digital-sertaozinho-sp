import { jsPDF } from 'jspdf';
import { VerificationResult, SelectedCvsActivity } from '../types';
import {
  isActivityLtaRequired,
  formatNaoCompreendeItems,
} from '../data/cvsLtaService';
import {
  PORTARIA_CVS_LABEL,
  PORTARIA_CVS_PUBLICACAO,
} from '../data/normativeMetadata';
import { getAllQuadro9ItemsFromActivities } from '../data/quadro9Docs';

export interface PdfGenerationResult {
  doc: jsPDF;
  blob: Blob;
  blobUrl: string;
  filename: string;
}

export function generateOfficialPdf(result: VerificationResult): PdfGenerationResult {
  // A4 dimensions in mm
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 14;
  const contentWidth = pageWidth - marginX * 2; // 182 mm
  const maxY = 275; // leave space for footer at 288-292 mm

  let y = 14;

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
  const activities: SelectedCvsActivity[] =
    result.selectedCvsActivities && result.selectedCvsActivities.length > 0
      ? result.selectedCvsActivities
      : result.selectedCvsActivity
      ? [result.selectedCvsActivity]
      : [];

  const ltaRequiredList = activities.filter(isActivityLtaRequired);
  const ltaExemptList = activities.filter((act) => !isActivityLtaRequired(act));
  const quadro9RequiredDocs = isLtaRequired ? getAllQuadro9ItemsFromActivities(ltaRequiredList) : [];

  // Helper for page break checks
  const ensureSpace = (neededHeight: number) => {
    if (y + neededHeight > maxY) {
      doc.addPage('a4', 'p');
      y = 16;
      // Mini running header on subsequent pages
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(120, 130, 145);
      doc.text(
        'Prefeitura Municipal de Sertãozinho-SP • Vigilância Sanitária • Comprovante de Triagem LTA',
        marginX,
        y
      );
      doc.setDrawColor(220, 226, 235);
      doc.line(marginX, y + 2, marginX + contentWidth, y + 2);
      y += 8;
    }
  };

  // Top decorative bar
  if (isNoActivity) {
    doc.setFillColor(100, 116, 139); // slate
  } else if (isLtaRequired) {
    doc.setFillColor(190, 18, 60); // rose
  } else {
    doc.setFillColor(4, 120, 87); // emerald
  }
  doc.rect(marginX, y, contentWidth, 2, 'F');
  y += 5;

  // Header Box
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('PREFEITURA MUNICIPAL DE SERTÃOZINHO-SP', marginX, y + 3);

  // Timestamp tag on the right
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('DATA DA CONSULTA', pageWidth - marginX, y + 1, { align: 'right' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(result.timestamp || new Date().toLocaleString('pt-BR'), pageWidth - marginX, y + 5, {
    align: 'right',
  });

  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Secretaria Municipal de Saúde • Vigilância Sanitária Municipal', marginX, y);

  y += 4.5;
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Ferramenta Eletrônica de Triagem de Necessidade de LTA', marginX, y);

  y += 4;
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.3);
  doc.line(marginX, y, marginX + contentWidth, y);
  y += 6;

  // Document Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42);
  doc.text('COMPROVANTE DE TRIAGEM DE LTA', pageWidth / 2, y, { align: 'center' });

  y += 4.5;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text(
    `Resultado da consulta de enquadramento conforme a ${PORTARIA_CVS_LABEL}`,
    pageWidth / 2,
    y,
    { align: 'center' }
  );
  y += 7;

  // RESULT BANNER
  const bannerPadding = 4;
  let bannerTitle = '';
  let bannerDesc = '';
  let bannerBgR = 248,
    bannerBgG = 250,
    bannerBgB = 252;
  let bannerBorderR = 203,
    bannerBorderG = 213,
    bannerBorderB = 225;
  let bannerTextR = 15,
    bannerTextG = 23,
    bannerTextB = 42;

  if (isNoActivity) {
    bannerTitle = 'SEM ATIVIDADE PARA ENQUADRAMENTO';
    bannerDesc =
      'De acordo com a informação declarada pelo requerente, não há atividade econômica sanitária vinculada ao imóvel nesta consulta. Não há exigência de LTA a ser determinada neste momento. A exigência de LTA dependerá da atividade que vier a ser efetivamente implantada.';
    bannerBgR = 241;
    bannerBgG = 245;
    bannerBgB = 249;
    bannerBorderR = 148;
    bannerBorderG = 163;
    bannerBorderB = 184;
    bannerTextR = 30;
    bannerTextG = 41;
    bannerTextB = 59;
  } else if (isLtaRequired) {
    bannerTitle = 'LTA NECESSÁRIO';
    bannerDesc =
      'De acordo com a informação declarada pelo requerente, a atividade informada exige aprovação de projeto físico-funcional (LTA) perante a Vigilância Sanitária de Sertãozinho-SP (Aprova Online) antes do início de obras e da concessão da licença de funcionamento sanitária.';
    bannerBgR = 255;
    bannerBgG = 241;
    bannerBgB = 242;
    bannerBorderR = 244;
    bannerBorderG = 63;
    bannerBorderB = 94;
    bannerTextR = 159;
    bannerTextG = 18;
    bannerTextB = 57;
  } else {
    bannerTitle = 'LTA NÃO NECESSÁRIO PARA A ATIVIDADE INFORMADA';
    bannerDesc = `De acordo com a informação declarada pelo requerente, a atividade informada está dispensada de aprovação de Laudo Técnico de Avaliação (LTA), conforme a regulamentação da ${PORTARIA_CVS_LABEL}. O licenciamento sanitário segue os trâmites regulares.`;
    bannerBgR = 236;
    bannerBgG = 253;
    bannerBgB = 245;
    bannerBorderR = 16;
    bannerBorderG = 185;
    bannerBorderB = 129;
    bannerTextR = 6;
    bannerTextG = 95;
    bannerTextB = 70;
  }

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  const bannerLines = doc.splitTextToSize(bannerDesc, contentWidth - bannerPadding * 2 - 8);
  const bannerHeight = 16 + bannerLines.length * 3.6 + bannerPadding * 2;

  ensureSpace(bannerHeight);

  // Draw Banner Box
  doc.setFillColor(bannerBgR, bannerBgG, bannerBgB);
  doc.setDrawColor(bannerBorderR, bannerBorderG, bannerBorderB);
  doc.setLineWidth(0.5);
  doc.roundedRect(marginX, y, contentWidth, bannerHeight, 2, 2, 'FD');

  // Status icon indicator circle
  doc.setFillColor(bannerBorderR, bannerBorderG, bannerBorderB);
  doc.circle(marginX + bannerPadding + 3, y + bannerPadding + 5, 2.5, 'F');

  // Status label & title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(bannerTextR, bannerTextG, bannerTextB);
  doc.text('RESULTADO DA TRIAGEM', marginX + bannerPadding + 8, y + bannerPadding + 3);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(bannerTextR, bannerTextG, bannerTextB);
  doc.text(bannerTitle, marginX + bannerPadding + 8, y + bannerPadding + 8);

  // Status description
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(bannerTextR, bannerTextG, bannerTextB);
  doc.text(bannerLines, marginX + bannerPadding + 8, y + bannerPadding + 13);

  y += bannerHeight + 5;

  // SECTION HELPER
  const drawSectionHeader = (numberStr: string, titleStr: string) => {
    ensureSpace(12);
    // Badge number
    doc.setFillColor(0, 62, 111); // Indigo / Navy
    doc.roundedRect(marginX, y, 5, 5, 1, 1, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(numberStr, marginX + 2.5, y + 3.8, { align: 'center' });

    // Section title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(titleStr.toUpperCase(), marginX + 7, y + 3.8);

    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(marginX, y + 6.5, marginX + contentWidth, y + 6.5);
    y += 9;
  };

  // ----------------------------------------------------
  // SECTION 1: IDENTIFICAÇÃO
  // ----------------------------------------------------
  drawSectionHeader('1', 'Identificação');

  const ident = result.identification;
  const enderecoFull = ident.endereco
    ? `${ident.endereco}, ${
        ident.numeroSemNumero && (ident.quadra || ident.lote)
          ? `S/N (Quadra ${ident.quadra || '-'}, Lote ${ident.lote || '-'})`
          : ident.numero || 'S/N'
      }${ident.complemento ? ` (${ident.complemento})` : ''}${
        ident.bairro ? ` - Bairro ${ident.bairro}` : ''
      }, Sertãozinho-SP${ident.cep ? ` - CEP ${ident.cep}` : ''}`
    : 'Sertãozinho-SP';

  const identRows: { label: string; value: string; fullWidth?: boolean }[] = [
    { label: 'ENDEREÇO DO IMÓVEL (OBJETO DA CONSULTA)', value: enderecoFull, fullWidth: true },
  ];

  if (ident.numeroSemNumero && (ident.quadra || ident.lote)) {
    identRows.push({
      label: 'IDENTIFICAÇÃO DO IMÓVEL (S/N)',
      value: `Quadra: ${ident.quadra || '-'} | Lote: ${ident.lote || '-'}`,
      fullWidth: true,
    });
  }

  identRows.push(
    {
      label: 'INTERESSADO / RAZÃO SOCIAL',
      value: ident.razaoSocial || 'Não informado (Consulta prévia de viabilidade)',
    },
    {
      label: 'DATA E HORA DA CONSULTA',
      value: result.timestamp || new Date().toLocaleString('pt-BR'),
    }
  );

  if (ident.cnpjCpf) {
    identRows.push({ label: 'CNPJ / CPF', value: ident.cnpjCpf });
  }
  if (ident.nomeFantasia) {
    identRows.push({ label: 'NOME FANTASIA', value: ident.nomeFantasia });
  }
  if (ident.responsavelTecnico) {
    identRows.push({
      label: 'RESPONSÁVEL TÉCNICO DECLARADO',
      value: `${ident.responsavelTecnico}${
        ident.registroProfissional ? ` — ${ident.registroProfissional}` : ''
      }`,
      fullWidth: true,
    });
  }

  // Draw Ident Card
  const cardStartY = y;
  ensureSpace(28);

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);

  // Calculate required height for ident
  let calcHeight = 4;
  for (const row of identRows) {
    const lines = doc.splitTextToSize(row.value, row.fullWidth ? contentWidth - 8 : contentWidth / 2 - 8);
    calcHeight += 4 + lines.length * 3.5 + 2;
  }

  doc.roundedRect(marginX, y, contentWidth, calcHeight, 1.5, 1.5, 'FD');
  let rowY = y + 4;

  for (let i = 0; i < identRows.length; i++) {
    const row = identRows[i];
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(row.label, marginX + 4, rowY);
    rowY += 3.2;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    const lines = doc.splitTextToSize(row.value, contentWidth - 8);
    doc.text(lines, marginX + 4, rowY);
    rowY += lines.length * 3.5 + 2;
  }

  y += calcHeight + 5;

  // ----------------------------------------------------
  // SECTION 2: DADOS DECLARADOS
  // ----------------------------------------------------
  drawSectionHeader('2', 'Dados Declarados');

  if (isNoActivity) {
    ensureSpace(35);
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.3);
    doc.roundedRect(marginX, y, contentWidth, 32, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    doc.text('Imóvel sem atividade econômica sanitária definida', marginX + 4, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    const noActLines = doc.splitTextToSize(
      `O imóvel foi declarado, nesta consulta, sem atividade econômica sanitária vinculada. Não há exigência de LTA a ser determinada nesta consulta. Caso seja posteriormente implantada atividade econômica sujeita à Vigilância Sanitária, deverá ser realizada nova verificação de enquadramento conforme a ${PORTARIA_CVS_LABEL}.`,
      contentWidth - 8
    );
    doc.text(noActLines, marginX + 4, y + 10);
    y += 36;
  } else {
    // List of CNAEs
    for (const act of activities) {
      const actNeedsLta = isActivityLtaRequired(act);
      const excItems = formatNaoCompreendeItems(act.naoCompreende);

      // Estimate height needed for this activity card
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      const descLines = doc.splitTextToSize(`CNAE ${act.cnae} - ${act.descricaoCnae}`, contentWidth - 45);
      const compLines = doc.splitTextToSize(act.compreensao || '-', contentWidth - 10);
      const excCount = excItems.length;

      const actCardHeight =
        12 +
        descLines.length * 3.5 +
        compLines.length * 3.2 +
        (excCount > 0 ? 8 + excCount * 3.2 : 0);

      ensureSpace(actCardHeight + 3);

      // Draw Activity Card
      if (actNeedsLta) {
        doc.setFillColor(255, 245, 245);
        doc.setDrawColor(244, 63, 94);
      } else {
        doc.setFillColor(240, 253, 244);
        doc.setDrawColor(16, 185, 129);
      }
      doc.setLineWidth(0.4);
      doc.roundedRect(marginX, y, contentWidth, actCardHeight, 1.5, 1.5, 'FD');

      let actY = y + 4;

      // Badge LTA
      if (actNeedsLta) {
        doc.setFillColor(225, 29, 72);
        doc.roundedRect(marginX + contentWidth - 32, actY - 1, 28, 4.5, 1, 1, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(6.5);
        doc.setTextColor(255, 255, 255);
        doc.text('PRECISA DE LTA', marginX + contentWidth - 18, actY + 2.2, { align: 'center' });
      } else {
        doc.setFillColor(5, 150, 105);
        doc.roundedRect(marginX + contentWidth - 36, actY - 1, 32, 4.5, 1, 1, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(6.5);
        doc.setTextColor(255, 255, 255);
        doc.text('NÃO PRECISA DE LTA', marginX + contentWidth - 20, actY + 2.2, { align: 'center' });
      }

      // CNAE Title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text(descLines, marginX + 4, actY);
      actY += descLines.length * 3.5 + 2.5;

      // Compreensão
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.5);
      doc.setTextColor(71, 85, 105);
      doc.text('COMPREENSÃO OFICIAL DA ATIVIDADE (CVS 01):', marginX + 4, actY);
      actY += 3;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);
      doc.text(compLines, marginX + 4, actY);
      actY += compLines.length * 3.2 + 2;

      // Exceções ("Não compreende")
      if (excItems.length > 0) {
        doc.setFillColor(254, 243, 199);
        doc.setDrawColor(245, 158, 11);
        doc.setLineWidth(0.2);
        const excBoxHeight = 4 + excItems.length * 3.2;
        doc.roundedRect(marginX + 4, actY, contentWidth - 8, excBoxHeight, 1, 1, 'FD');

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(6.5);
        doc.setTextColor(146, 64, 14);
        doc.text('Não compreende (atividades excluídas deste enquadramento):', marginX + 6, actY + 3);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(78, 42, 6);
        let excItemY = actY + 6;
        for (const item of excItems) {
          doc.text(`• ${item}`, marginX + 6, excItemY);
          excItemY += 3.2;
        }
        actY += excBoxHeight + 2;
      }

      y += actCardHeight + 3.5;
    }
  }

  // ----------------------------------------------------
  // SECTION: DOCUMENTOS TÉCNICOS PARA LTA (somente quando LTA for obrigatório)
  // ----------------------------------------------------
  if (isLtaRequired && quadro9RequiredDocs.length > 0) {
    ensureSpace(28);

    doc.setFillColor(240, 249, 255);
    doc.setDrawColor(186, 230, 253);
    doc.setLineWidth(0.3);
    doc.roundedRect(marginX, y, contentWidth, 7, 1, 1, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(3, 105, 161);
    doc.text('DOCUMENTOS TÉCNICOS PARA LTA (PROCESSO APROVA ONLINE SERTÃOZINHO)', marginX + 3, y + 4.8);
    y += 9;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    const q9Intro = doc.splitTextToSize(
      `Relação oficial de documentos técnicos exigidos pela ${PORTARIA_CVS_LABEL} e pelo Município de Sertãozinho-SP para análise e emissão de LTA junto à Vigilância Sanitária:`,
      contentWidth
    );
    doc.text(q9Intro, marginX, y);
    y += q9Intro.length * 3.5 + 2;

    // Tabela: CÓDIGO | TIPO
    const colCodWidth = 20;
    const colTipoWidth = contentWidth - colCodWidth;
    const headerHeight = 6;

    ensureSpace(headerHeight + 12);
    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.2);
    doc.roundedRect(marginX, y, contentWidth, headerHeight, 0.5, 0.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(30, 41, 59);
    doc.text('CÓDIGO', marginX + colCodWidth / 2, y + 4.2, { align: 'center' });
    doc.text('TIPO', marginX + colCodWidth + 3, y + 4.2);
    y += headerHeight;

    for (const d of quadro9RequiredDocs) {
      const docNum = Number(d.codigo);
      const isDoc2 = docNum === 2;
      const isDoc9 = docNum === 9;
      const isMuni = d.origem === 'MUNICIPAL';

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.8);
      const tipoText = isMuni ? `${d.tipo} [EXIGIDO PELO MUNICÍPIO]` : d.tipo;
      const tipoLines = doc.splitTextToSize(tipoText, colTipoWidth - 6);

      let noteLines: string[] = [];
      if (isDoc2) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(6.2);
        noteLines = doc.splitTextToSize(
          'Taxa Municipal de LTA (Sertãozinho-SP): O Município de Sertãozinho-SP não instituiu taxa para análise de LTA. Portanto, para o protocolo perante a Vigilância Sanitária Municipal, não é exigido comprovante de recolhimento de taxa municipal (DARE ou equivalente).',
          colTipoWidth - 10
        );
      } else if (isDoc9) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(6.2);
        noteLines = doc.splitTextToSize(
          'Formulário Digital: O formulário de solicitação de LTA será preenchido diretamente no sistema Aprova Online durante a abertura do protocolo (não é necessário anexar formulário externo em papel ou PDF).',
          colTipoWidth - 10
        );
      }

      const noteBoxHeight = noteLines.length > 0 ? noteLines.length * 2.8 + 3.5 : 0;
      const rowHeight = Math.max(7, tipoLines.length * 3.2 + 3 + (noteBoxHeight > 0 ? noteBoxHeight + 2 : 0));

      ensureSpace(rowHeight + 2);

      doc.setFillColor(isMuni ? 254 : 255, isMuni ? 252 : 255, isMuni ? 232 : 255);
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.2);
      doc.rect(marginX, y, contentWidth, rowHeight, 'FD');

      // Código centralizado
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.2);
      if (isMuni) {
        doc.setTextColor(180, 83, 9);
      } else {
        doc.setTextColor(55, 48, 163);
      }
      doc.text(`${d.codigo}`, marginX + colCodWidth / 2, y + 4.5, { align: 'center' });

      // Tipo com quebra de linha
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6.8);
      doc.setTextColor(15, 23, 42);
      doc.text(tipoLines, marginX + colCodWidth + 3, y + 3.8);

      // Caixa destacada para orientações do Doc 2 e Doc 9
      if (noteLines.length > 0) {
        const noteBoxY = y + 3.8 + (tipoLines.length - 1) * 3.2 + 2.5;
        if (isDoc2) {
          doc.setFillColor(240, 253, 244); // fundo verde suave
          doc.setDrawColor(167, 243, 208); // borda verde suave
        } else {
          doc.setFillColor(238, 242, 255); // fundo azul/indigo suave
          doc.setDrawColor(199, 210, 254); // borda azul suave
        }
        doc.setLineWidth(0.2);
        doc.roundedRect(marginX + colCodWidth + 2.5, noteBoxY, colTipoWidth - 5, noteBoxHeight, 0.8, 0.8, 'FD');

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(6.2);
        if (isDoc2) {
          doc.setTextColor(6, 78, 59); // texto verde escuro
        } else {
          doc.setTextColor(30, 27, 75); // texto indigo escuro
        }
        doc.text(noteLines, marginX + colCodWidth + 4.5, noteBoxY + 3.2);
      }

      y += rowHeight;
    }

    y += 2.5;

    // Box informativo sobre o protocolo no Aprova Online
    ensureSpace(16);
    doc.setFillColor(240, 249, 255);
    doc.setDrawColor(186, 230, 253);
    doc.setLineWidth(0.25);
    const infoText =
      'Apresentação no Aprova Online: Os documentos técnicos acima (da Portaria CVS nº 1/2024 e os exigidos pelo Município) devem ser anexados digitalmente no momento da formalização do processo eletrônico de LTA junto à Vigilância Sanitária de Sertãozinho-SP no sistema Aprova Online (https://aprovaonline.sertaozinho.sp.gov.br/alvara_sertaozinho/login.html).';
    const infoLines = doc.splitTextToSize(infoText, contentWidth - 8);
    const infoBoxHeight = 3.5 + infoLines.length * 3 + 2.5;

    doc.roundedRect(marginX, y, contentWidth, infoBoxHeight, 1, 1, 'FD');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(12, 74, 110);
    doc.text(infoLines, marginX + 4, y + 3.8);
    y += infoBoxHeight + 5;
  }

  // ----------------------------------------------------
  // SECTION 3: OBSERVAÇÕES & RESPONSABILIDADE
  // ----------------------------------------------------
  drawSectionHeader('3', 'Observações e Responsabilidade');

  const obsTexts = [
    {
      title: 'Responsabilidade:',
      body: 'O enquadramento baseia-se exclusivamente nas informações e atividades declaradas pelo requerente nesta ferramenta.',
    },
    {
      title: 'Natureza do Documento:',
      body: 'Este comprovante de triagem eletrônica prévia não substitui o Laudo Técnico de Avaliação (LTA) nem a aprovação de projeto físico-funcional.',
      highlight: true,
    },
    {
      title: 'Protocolo no Município:',
      body: 'Para comprovar este enquadramento, anexe este arquivo PDF ao processo no sistema Aprova Online da Prefeitura Municipal de Sertãozinho-SP.',
    },
    {
      title: 'Regularidade Sanitária:',
      body: 'A dispensa de LTA não desobriga o cumprimento integral das Boas Práticas Sanitárias e a obtenção da Licença de Funcionamento regular.',
    },
  ];

  let obsCardHeight = 4;
  for (const obs of obsTexts) {
    const lines = doc.splitTextToSize(obs.body, contentWidth - 8);
    obsCardHeight += 3.5 + lines.length * 3.2 + 3;
  }

  ensureSpace(obsCardHeight + 5);

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.3);
  doc.roundedRect(marginX, y, contentWidth, obsCardHeight, 1.5, 1.5, 'FD');

  let obsY = y + 4;
  for (const obs of obsTexts) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(obs.highlight ? 190 : 15, obs.highlight ? 18 : 23, obs.highlight ? 60 : 42);
    doc.text(obs.title, marginX + 4, obsY);
    obsY += 3.2;

    doc.setFont('helvetica', obs.highlight ? 'bold' : 'normal');
    doc.setFontSize(7);
    doc.setTextColor(obs.highlight ? 159 : 71, obs.highlight ? 18 : 85, obs.highlight ? 57 : 105);
    const bLines = doc.splitTextToSize(obs.body, contentWidth - 8);
    doc.text(bLines, marginX + 4, obsY);
    obsY += bLines.length * 3.2 + 2;
  }

  y += obsCardHeight + 5;

  // ----------------------------------------------------
  // UNIFORM FOOTER ON ALL PAGES
  // ----------------------------------------------------
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.2);
    doc.line(marginX, 288, marginX + contentWidth, 288);

    doc.text(
      'Prefeitura Municipal de Sertãozinho-SP • Vigilância Sanitária Municipal • Dúvidas: visastsertaozinho@gmail.com',
      marginX,
      292
    );
    doc.text(`Página ${i} de ${totalPages}`, marginX + contentWidth, 292, { align: 'right' });
  }

  // Generate safe filename
  const rawIdent =
    result.identification.razaoSocial ||
    result.identification.nomeFantasia ||
    'Sertaozinho';
  const cleanIdent = rawIdent
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .replace(/_+/g, '_')
    .slice(0, 25);
  const today = new Date().toISOString().slice(0, 10);
  const filename = `Comprovante_LTA_${cleanIdent}_${today}.pdf`;

  const blob = doc.output('blob');
  const blobUrl = URL.createObjectURL(blob);

  return { doc, blob, blobUrl, filename };
}
