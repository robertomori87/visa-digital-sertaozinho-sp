import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const cvsData = JSON.parse(fs.readFileSync(path.join(root, 'src/data/cvsLta.json'), 'utf8'));
const conclaData = JSON.parse(fs.readFileSync(path.join(root, 'src/data/conclaCnaeDatabase.json'), 'utf8'));

const cvsCnaes = [...new Set(cvsData.map(r => r.cnaeDigitos).filter(Boolean))];
const conclaIds = new Set(conclaData.map(r => r.cnaeDigitos));

const faltando = cvsCnaes.filter(c => !conclaIds.has(c));
const cobertos = cvsCnaes.filter(c => conclaIds.has(c));

console.log('=== COBERTURA CVS 01 x CONCLA ===');
console.log('CNAEs unicos CVS 01:', cvsCnaes.length);
console.log('Subclasses CONCLA:', conclaData.length);
console.log('CNAEs CVS cobertos pela CONCLA:', cobertos.length);
console.log('CNAEs CVS FALTANDO na CONCLA:', faltando.length);

if (faltando.length > 0) {
  console.log('\n--- CNAEs CVS 01 SEM correspondencia na CONCLA ---');
  faltando.forEach(c => {
    const r = cvsData.find(x => x.cnaeDigitos === c);
    console.log('  ' + r.cnae + ' | ' + r.descricaoCnae.slice(0, 80));
  });
}

// Verificar compatibilidade de versão: os CNAEs CVS usam estrutura 2.0
// A CONCLA 2.3 pode ter renumerado alguns códigos. Verificar se os faltantes
// existem com denominação parecida na base CONCLA.
if (faltando.length > 0) {
  console.log('\n--- Busca por denominacao similar na CONCLA ---');
  faltando.forEach(c => {
    const r = cvsData.find(x => x.cnaeDigitos === c);
    const descNorm = r.descricaoCnae.toLowerCase().slice(0, 30);
    const similares = conclaData.filter(x =>
      x.descricao.toLowerCase().slice(0, 30) === descNorm ||
      x.descricao.toLowerCase().includes(descNorm.slice(0, 20))
    );
    console.log('  CVS ' + r.cnae + ' (' + r.descricaoCnae.slice(0, 50) + ')');
    similares.slice(0, 3).forEach(s => console.log('    -> CONCLA ' + s.cnaeFormatado + ' ' + s.descricao.slice(0, 60)));
    if (similares.length === 0) console.log('    -> SEM similar encontrado');
  });
}

// Validar 7500-1/00 detalhadamente
console.log('\n=== VALIDACAO ESPECIFICA 7500-1/00 ===');
const vet = conclaData.find(r => r.cnaeDigitos === '7500100');
console.log('CNAE:', vet.cnaeFormatado);
console.log('Denominacao:', vet.descricao);
console.log('Secao:', vet.secao.id + ' - ' + vet.secao.descricao);
console.log('Divisao:', vet.divisao.id + ' - ' + vet.divisao.descricao);
console.log('Classe:', vet.classe.id + ' - ' + vet.classe.descricao);
console.log('Numero de descritores:', vet.atividades.length);
console.log('Descritores relevantes:');
['CLÍNICA VETERINÁRIA', 'HOSPITAL VETERINÁRIO', 'RAIO-X VETERINÁRIO', 'LABORATÓRIO DE ANÁLISE VETERINÁRIA'].forEach(p => {
  const e = vet.atividades.find(a => a.toUpperCase().includes(p));
  console.log('  ' + p + ': ' + (e ? 'OK -> "' + e + '"' : 'NAO ENCONTRADO'));
});
console.log('Notas explicativas:', vet.observacoes.length, 'observacao(oes)');

// Estatisticas da base CONCLA
const totalAtiv = conclaData.reduce((s, r) => s + r.atividades.length, 0);
const semAtiv = conclaData.filter(r => r.atividades.length === 0).length;
const semObs = conclaData.filter(r => r.observacoes.length === 0).length;
console.log('\n=== ESTATISTICAS BASE CONCLA ===');
console.log('Total de subclasses:', conclaData.length);
console.log('Total de descritores de atividades:', totalAtiv);
console.log('Subclasses sem atividades:', semAtiv);
console.log('Subclasses sem observacoes:', semObs);
console.log('Media de descritores por subclasse:', (totalAtiv / conclaData.length).toFixed(1));
