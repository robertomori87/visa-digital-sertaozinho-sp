/**
 * Teste FASE 3: gera PDFs de comprovante para cenários-chave e verifica
 * se o documento contém os elementos exigidos (título, responsabilidade,
 * norma, hash, estrutura por CNAE, etc.).
 */
import { writeFileSync, mkdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');
import { generateOfficialPdf } from '../src/utils/generateOfficialPdf';
import {
  createDeclaredCnae,
  toggleCompreensao,
  confirmNoneApplies,
  confirmCnaeNotInCvs,
  declaredCnaeToActivities,
  isConsultaCompleta,
} from '../src/data/cvsDeclarationService';
import { getCompreensoesPorCnae, isCnaeInCvsList } from '../src/data/cvsLtaService';
import { PORTARIA_CVS_RASTREABILIDADE } from '../src/data/normativeMetadata';
import type { VerificationResult, SelectedCvsActivity } from '../src/types';

const OUT = join(process.cwd(), 'tmp-pdf-fase3');
mkdirSync(OUT, { recursive: true });

function makeResult(
  cnaes: string[],
  opts: { nome?: string; finalResult: VerificationResult['finalResult']; mode?: 'lta' | 'none' | 'fora' } = {
    finalResult: 'LTA_DISPENSADO',
  }
): VerificationResult {
  const declarados = cnaes.map((c) => {
    let d = createDeclaredCnae(c)!;
    if (opts.mode === 'fora') {
      d = confirmCnaeNotInCvs(d);
    } else if (opts.mode === 'none') {
      d = confirmNoneApplies(d);
    } else {
      const recs = getCompreensoesPorCnae(c);
      if (recs.length > 0) {
        // seleciona a primeira compreensão
        d = toggleCompreensao(d, {
          cvsRecordId: recs[0].id,
          cnae: recs[0].cnae,
          agrupamento: recs[0].agrupamento,
          compreensao: recs[0].compreensao,
          risco: recs[0].risco,
          documentoPrevio: recs[0].documentoPrevio,
          documentosInspecao: recs[0].documentosInspecao,
          naoCompreende: recs[0].naoCompreende,
          paginaCvs: recs[0].paginaCvs,
          exigeLta: recs[0].exigeLta,
        });
      }
    }
    return d;
  });

  const activities: SelectedCvsActivity[] = [];
  for (const d of declarados) {
    for (const a of declaredCnaeToActivities(d)) {
      activities.push({
        cnae: a.cnae,
        cnaeNormalizado: a.cnaeNormalizado,
        descricaoCnae: a.descricaoCnae,
        compreensao: a.compreensao,
        agrupamento: a.agrupamento,
        risco: a.risco,
        documentoPrevio: a.documentoPrevio,
        documentosInspecao: a.documentosInspecao,
        naoCompreende: a.naoCompreende,
        paginaCvs: a.paginaCvs,
        exigeLta: a.exigeLta,
        descritoresSelecionados: a.descritoresSelecionados,
      });
    }
  }

  const hasLta = activities.some((a) => a.exigeLta);
  const finalResult = hasLta ? 'LTA_EXIGIDO' : opts.finalResult;

  return {
    protocol: 'TEST-0001',
    timestamp: new Date().toLocaleString('pt-BR'),
    identification: {
      razaoSocial: opts.nome !== undefined ? opts.nome : 'Clínica Veterinária Exemplo Ltda',
      nomeFantasia: 'Pet Vida',
      cnpjCpf: '12.345.678/0001-90',
      endereco: 'Rua das Flores',
      numero: '123',
      bairro: 'Centro',
      cep: '14160-000',
      cidade: 'Sertãozinho',
      uf: 'SP',
      complemento: '',
      telefone: '',
      email: '',
      responsavelTecnico: '',
      registroProfissional: '',
    },
    selectedCnaes: [],
    selectedCvsActivities: activities,
    finalResult,
    highestRisk: hasLta ? 'LTA Exigido' : 'LTA Não Necessário',
    riskReason: 'Teste',
    authCode: 'TEST-AUTH',
    normativeVersion: PORTARIA_CVS_RASTREABILIDADE,
    normativeHash: 'a4019db9288155894ff1bcb01a5b7d7f4183698b97632d3a12c7b7c66cdef0fd',
  };
}

async function extractText(pdfPath: string): Promise<string> {
  const dataBuffer = new Uint8Array(readFileSync(pdfPath));
  const parser = new PDFParse(dataBuffer);
  await parser.load();
  const result = await parser.getText();
  return (result?.pages || []).map((p: { text: string }) => p.text).join('\n');
}

const cenarios: Array<{
  nome: string;
  cnaes: string[];
  mode?: 'lta' | 'none' | 'fora';
  checks: string[];
  nomeFantasia?: string;
  razaoSocial?: string;
}> = [
  {
    nome: '01-lta-necessario-com-doc52',
    cnaes: ['7500-1/00'],
    mode: 'lta',
    checks: ['COMPROVANTE DE CONSULTA', 'CNAE 7500', 'LTA NECESSÁRIO', 'DOCUMENTO 52', 'Norma:', 'SHA-256'],
  },
  {
    nome: '02-nenhuma-compreensao-aplicavel',
    cnaes: ['7500-1/00'],
    mode: 'none',
    checks: ['Nenhuma compreensão sanitária aplicável', 'LTA NÃO NECESSÁRIO', 'NENHUMA COMPREENSÃO APLICÁVEL'],
  },
  {
    nome: '03-cnae-fora-da-cvs',
    cnaes: ['9999-9/99'],
    mode: 'fora',
    checks: ['não constante na tabela', 'NÃO CONSTA NA CVS 01'],
  },
  {
    nome: '04-multiplos-cnaes',
    cnaes: ['7500-1/00', '8640-2/02'],
    mode: 'lta',
    checks: ['CNAE 7500', 'CNAE 8640'],
  },
  {
    nome: '05-dados-opcionais-em-branco',
    cnaes: ['7500-1/00'],
    mode: 'none',
    razaoSocial: '',
    nomeFantasia: '',
    checks: ['Não informado', 'CNAE 7500'],
  },
];

let falhas = 0;
for (const c of cenarios) {
  const result = makeResult(c.cnaes, {
    mode: c.mode,
    finalResult: 'LTA_DISPENSADO',
    nome: c.razaoSocial,
  });
  if (c.nomeFantasia !== undefined) result.identification.nomeFantasia = c.nomeFantasia;
  const { blob } = generateOfficialPdf(result);
  const bytes = new Uint8Array(await blob.arrayBuffer());
  const pdfPath = join(OUT, `${c.nome}.pdf`);
  writeFileSync(pdfPath, Buffer.from(bytes));
  const text = await extractText(pdfPath);

  console.log(`\n=== ${c.nome} ===`);
  console.log(`  Atividades: ${result.selectedCvsActivities?.length} | finalResult: ${result.finalResult}`);
  for (const check of c.checks) {
    const ok = text.includes(check);
    console.log(`  [${ok ? 'OK' : 'FALHA'}] contém "${check}"`);
    if (!ok) falhas++;
  }
}

console.log(`\nPDFs gerados em: ${OUT}`);
console.log(falhas === 0 ? '\nTODOS OS CHECKS PASSARAM ✓' : `\n${falhas} FALHA(S) ENCONTRADA(S)`);
process.exit(falhas === 0 ? 0 : 1);
