import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const data = JSON.parse(fs.readFileSync(path.join(root, 'src/data/cvsLta.json'), 'utf8'));
const legacy = JSON.parse(fs.readFileSync(path.join(root, 'src/data/cvsLta.legacy-2024.json'), 'utf8'));

let passed = 0;
let failed = 0;
const failures = [];

function test(name, fn) {
  try {
    const result = fn();
    if (result === true) { passed++; console.log(`  PASS: ${name}`); }
    else { failed++; failures.push(name); console.log(`  FAIL: ${name}`); }
  } catch (e) { failed++; failures.push(name + ' (' + e.message + ')'); console.log(`  ERROR: ${name}: ${e.message}`); }
}

function has52(s) { return (String(s).match(/\b52\b/g) || []).length > 0; }
function norm(s) { return String(s || '').toLowerCase().replace(/\s+/g, ' ').replace(/[^\w\s]/g, '').trim(); }

console.log('=== TESTES DE REGRESSAO FASE 1D ===\n');

console.log('1. CNAE 8640-2/11 - EXIGE LTA');
{
  const recs = data.filter(r => r.cnae === '8640-2/11');
  test('Existe registro 8640-2/11', () => recs.length > 0);
  test('8640-2/11 exigeLta=true', () => recs.length > 0 && recs.every(r => r.exigeLta === true));
  test('8640-2/11 contem doc 52', () => recs.length > 0 && recs.every(r => has52(r.documentosInspecao)));
  test('8640-2/11 descricao = SERVICO DE RADIOTERAPIA', () => recs.length > 0 && recs[0].descricaoCnae.includes('RADIOTERAPIA'));
}

console.log('\n2. CNAE 8720-4/01 - DISPENSADO DE LTA');
{
  const recs = data.filter(r => r.cnae === '8720-4/01');
  test('Existe registro 8720-4/01', () => recs.length > 0);
  test('8720-4/01 exigeLta=false', () => recs.length > 0 && recs.every(r => r.exigeLta === false));
  test('8720-4/01 NAO contem doc 52', () => recs.length > 0 && recs.every(r => !has52(r.documentosInspecao)));
  test('8720-4/01 contem doc 60', () => recs.length > 0 && recs.every(r => /\b60\b/.test(r.documentosInspecao)));
}

console.log('\n3. CNAE 1042-2/00 - denominacao corrigida');
{
  const recs = data.filter(r => r.cnae === '1042-2/00');
  test('Existe registro 1042-2/00', () => recs.length > 0);
  test('1042-2/00 descricao contem REFINADOS', () => recs.length > 0 && recs[0].descricaoCnae.includes('REFINADOS'));
  test('1042-2/00 descricao NAO contem EM BRUTO', () => recs.length > 0 && !recs[0].descricaoCnae.includes('EM BRUTO'));
}

console.log('\n4. CNAEs 2660-4/00, 2829-1/99, 3092-0/00 - presentes');
{
  ['2660-4/00', '2829-1/99', '3092-0/00'].forEach(cnae => {
    const recs = data.filter(r => r.cnae === cnae);
    test(`${cnae} presente na base`, () => recs.length > 0);
  });
  test('2660-4/00 tem 6 compreensoes', () => data.filter(r => r.cnae === '2660-4/00').length === 6);
  test('2829-1/99 tem 4 compreensoes', () => data.filter(r => r.cnae === '2829-1/99').length === 4);
  test('3092-0/00 tem 3 compreensoes', () => data.filter(r => r.cnae === '3092-0/00').length === 3);
}

console.log('\n5. CNAE 1081-3/01 - ausente da base');
{
  const recs = data.filter(r => r.cnae === '1081-3/01');
  test('1081-3/01 NAO esta na base consolidada', () => recs.length === 0);
}

console.log('\n6. CNAEs mistos - verificacao por compreensao');
{
  const cnaeLta = {};
  data.forEach(r => {
    if (!cnaeLta[r.cnae]) cnaeLta[r.cnae] = { exige: 0, disp: 0 };
    if (r.exigeLta) cnaeLta[r.cnae].exige++; else cnaeLta[r.cnae].disp++;
  });
  const mistos = Object.entries(cnaeLta).filter(([c, v]) => v.exige > 0 && v.disp > 0);
  test('Existem 11 CNAEs mistos', () => mistos.length === 11);
  test('7500-1/00 e misto', () => cnaeLta['7500-1/00']?.exige > 0 && cnaeLta['7500-1/00']?.disp > 0);
  test('8640-2/02 e misto', () => cnaeLta['8640-2/02']?.exige > 0 && cnaeLta['8640-2/02']?.disp > 0);
  // Verificar que nao existe classificacao automatica por CNAE (cada registro tem seu proprio exigeLta)
  test('Nenhum CNAE tem exigeLta derivado automaticamente (todos vem do doc 52)', () => {
    return data.every(r => r.exigeLta === has52(r.documentosInspecao));
  });
}

console.log('\n7. Todos os registros - exigeLta coerente com doc 52');
{
  const incoerentes = data.filter(r => r.exigeLta !== has52(r.documentosInspecao));
  test('0 registros incoerentes (exigeLta vs doc 52)', () => incoerentes.length === 0);
}

console.log('\n8. IDs antigos - manutencao de vinculos');
{
  const legacyMap = new Map(legacy.map(r => [r.id, r]));
  let mismatch = 0;
  data.forEach(r => {
    const old = legacyMap.get(r.id);
    if (old) {
      if (norm(old.compreensao) !== norm(r.compreensao) || old.cnae !== r.cnae) mismatch++;
    }
  });
  test('0 IDs antigos reutilizados para compreensao diferente', () => mismatch === 0);
  // IDs dos removidos nao reutilizados
  const removedIds = new Set();
  const newKeys = new Set(data.map(r => r.cnae + '||' + norm(r.compreensao)));
  legacy.forEach(r => {
    const k = r.cnae + '||' + norm(r.compreensao);
    if (!newKeys.has(k)) removedIds.add(r.id);
  });
  const reused = data.filter(r => removedIds.has(r.id));
  test('0 IDs de registros removidos reutilizados', () => reused.length === 0);
}

console.log('\n9. Exigencia de LTA quando qualquer compreensao selecionada exigir doc 52');
{
  // Simular: para um CNAE misto, selecionar uma compreensao que exige LTA
  const misto = data.find(r => r.cnae === '7500-1/00' && r.exigeLta === true);
  test('7500-1/00 tem compreensao que exige LTA', () => !!misto);
  // Selecionar tambem uma dispensada
  const disp = data.find(r => r.cnae === '7500-1/00' && r.exigeLta === false);
  test('7500-1/00 tem compreensao dispensada', () => !!disp);
  // Regra: se qualquer uma exige, o resultado e EXIGE
  test('Regra: qualquer compreensao com exigeLta=true => EXIGE LTA', () => {
    const selecionadas = [misto, disp].filter(Boolean);
    return selecionadas.some(r => r.exigeLta) === true;
  });
}

console.log('\n10. Estrutura do JSON compativel');
{
  const expectedKeys = ['id', 'agrupamento', 'cnae', 'cnaeNormalizado', 'cnaeDigitos', 'descricaoCnae', 'compreensao', 'risco', 'documentoPrevio', 'documentosInspecao', 'naoCompreende', 'paginaCvs', 'exigeLta'];
  const actualKeys = Object.keys(data[0]);
  test('13 campos no JSON', () => actualKeys.length === 13);
  test('Campos identicos ao esperado', () => JSON.stringify(actualKeys) === JSON.stringify(expectedKeys));
  test('Todos os registros tem todos os campos', () => data.every(r => expectedKeys.every(k => k in r)));
}

console.log('\n11. Totais');
{
  test('733 registros', () => data.length === 733);
  test('201 CNAEs unicos', () => new Set(data.map(r => r.cnae)).size === 201);
  test('451 exigem LTA', () => data.filter(r => r.exigeLta).length === 451);
  test('282 dispensados', () => data.filter(r => !r.exigeLta).length === 282);
}

console.log(`\n=== RESULTADO: ${passed} passaram, ${failed} falharam ===`);
if (failures.length > 0) {
  console.log('Falhas:', failures);
  process.exit(1);
}
