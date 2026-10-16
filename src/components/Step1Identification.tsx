import React, { useState } from 'react';
import type { CompanyIdentification } from '../types';
import { StepHelpModal } from './StepHelpModal';
import { PORTARIA_CVS_LABEL } from '../data/normativeMetadata';

interface Step1IdentificationProps {
  data: CompanyIdentification;
  onChange: (updated: Partial<CompanyIdentification>) => void;
  onNext: () => void;
}

const TIPOS_LOGRADOURO = [
  'Rua',
  'Avenida',
  'Alameda',
  'Travessa',
  'Praça',
  'Rodovia',
  'Marginal',
  'Estrada',
  'Via',
  'Viela',
  'Outro',
];

export const Step1Identification: React.FC<Step1IdentificationProps> = ({
  data,
  onChange,
  onNext,
}) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Inicializa tipo e nome do logradouro a partir de data.endereco se não estiverem explícitos
  const [tipoLogradouro, setTipoLogradouro] = useState<string>(() => {
    if (data.tipoLogradouro) return data.tipoLogradouro;
    const parts = (data.endereco || '').trim().split(' ');
    const firstWord = parts[0] || '';
    const match = TIPOS_LOGRADOURO.find(
      (t) => t.toLowerCase() === firstWord.toLowerCase()
    );
    return match || 'Rua';
  });

  const [nomeLogradouro, setNomeLogradouro] = useState<string>(() => {
    if (data.nomeLogradouro !== undefined) return data.nomeLogradouro;
    const parts = (data.endereco || '').trim().split(' ');
    const firstWord = parts[0] || '';
    const match = TIPOS_LOGRADOURO.find(
      (t) => t.toLowerCase() === firstWord.toLowerCase()
    );
    if (match) {
      return parts.slice(1).join(' ');
    }
    return data.endereco || '';
  });

  // Estado para sem número
  const [isSemNumero, setIsSemNumero] = useState<boolean>(() => {
    return (
      data.numeroSemNumero === true ||
      (data.numero || '').toUpperCase().trim() === 'S/N'
    );
  });

  const [numeroDigits, setNumeroDigits] = useState<string>(() => {
    if ((data.numero || '').toUpperCase().trim() === 'S/N') return '';
    return (data.numero || '').replace(/\D/g, '');
  });

  const [numeroLetra, setNumeroLetra] = useState<string>(() => {
    return data.numeroLetra || '';
  });

  const [quadra, setQuadra] = useState<string>(() => data.quadra || '');
  const [lote, setLote] = useState<string>(() => data.lote || '');

  const handleTipoChange = (newTipo: string) => {
    setTipoLogradouro(newTipo);
    const fullEndereco = nomeLogradouro ? `${newTipo} ${nomeLogradouro}` : newTipo;
    onChange({
      tipoLogradouro: newTipo,
      nomeLogradouro,
      endereco: fullEndereco,
    });
  };

  const handleNomeLogradouroChange = (newNome: string) => {
    setNomeLogradouro(newNome);
    const fullEndereco = newNome ? `${tipoLogradouro} ${newNome}` : '';
    onChange({
      tipoLogradouro,
      nomeLogradouro: newNome,
      endereco: fullEndereco,
    });
  };

  const handleQuadraChange = (val: string) => {
    setQuadra(val);
    onChange({ quadra: val });
  };

  const handleLoteChange = (val: string) => {
    setLote(val);
    onChange({ lote: val });
  };

  const handleSemNumeroToggle = (checked: boolean) => {
    setIsSemNumero(checked);
    if (checked) {
      setNumeroDigits('');
      onChange({
        numeroSemNumero: true,
        numero: 'S/N',
        numeroLetra: '',
        quadra,
        lote,
      });
    } else {
      onChange({
        numeroSemNumero: false,
        numero: numeroDigits ? (numeroLetra ? `${numeroDigits}-${numeroLetra}` : numeroDigits) : '',
        numeroLetra,
        quadra,
        lote,
      });
    }
  };

  const handleNumeroDigitsChange = (val: string) => {
    // Filtro rigoroso: apenas números
    const cleanDigits = val.replace(/\D/g, '');
    setNumeroDigits(cleanDigits);
    const fullNum = cleanDigits ? (numeroLetra ? `${cleanDigits}-${numeroLetra}` : cleanDigits) : '';
    onChange({
      numeroSemNumero: false,
      numero: fullNum,
      numeroLetra,
    });
  };

  const handleNumeroLetraChange = (val: string) => {
    // Letra ou complemento do número (ex: A, B, Bloco 1)
    const cleanLetra = val.toUpperCase().slice(0, 8);
    setNumeroLetra(cleanLetra);
    const fullNum = isSemNumero
      ? 'S/N'
      : numeroDigits
      ? cleanLetra
        ? `${numeroDigits}-${cleanLetra}`
        : numeroDigits
      : '';
    onChange({
      numeroLetra: cleanLetra,
      numero: fullNum,
    });
  };

  // Formatação rápida para CPF/CNPJ
  const handleCnpjCpfChange = (val: string) => {
    const rawDigits = val.replace(/\D/g, '');
    let formatted = val;

    if (rawDigits.length <= 11) {
      // Formata como CPF se tiver até 11 dígitos
      if (rawDigits.length > 9) {
        formatted = rawDigits.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
      } else if (rawDigits.length > 6) {
        formatted = rawDigits.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
      } else if (rawDigits.length > 3) {
        formatted = rawDigits.replace(/(\d{3})(\d{1,3})/, '$1.$2');
      }
    } else {
      // Formata como CNPJ se tiver mais de 11 dígitos (máx 14)
      const digits14 = rawDigits.slice(0, 14);
      if (digits14.length > 12) {
        formatted = digits14.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})/, '$1.$2.$3/$4-$5');
      } else if (digits14.length > 8) {
        formatted = digits14.replace(/(\d{2})(\d{3})(\d{3})(\d{1,4})/, '$1.$2.$3/$4');
      } else if (digits14.length > 5) {
        formatted = digits14.replace(/(\d{2})(\d{3})(\d{1,3})/, '$1.$2.$3');
      } else if (digits14.length > 2) {
        formatted = digits14.replace(/(\d{2})(\d{1,3})/, '$1.$2');
      }
    }
    onChange({ cnpjCpf: formatted });
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validação Obrigatória: Nome / Razão Social
    if (!data.razaoSocial || !data.razaoSocial.trim()) {
      setErrorMsg('Por favor, informe o Nome ou Razão Social do interessado/empresa.');
      return;
    }

    // 2. Validação Obrigatória: CPF / CNPJ
    const cleanDigitsId = (data.cnpjCpf || '').replace(/\D/g, '');
    if (!cleanDigitsId) {
      setErrorMsg('Por favor, informe o CPF ou CNPJ do interessado.');
      return;
    }
    if (cleanDigitsId.length < 11) {
      setErrorMsg('O CPF ou CNPJ informado está incompleto. Digite ao menos 11 dígitos.');
      return;
    }

    // 3. Validação Obrigatória: Logradouro
    if (!nomeLogradouro || !nomeLogradouro.trim()) {
      setErrorMsg('Por favor, informe o Nome do Logradouro.');
      return;
    }

    // 4. Validação Obrigatória: Número ou Quadra e Lote
    if (!isSemNumero) {
      if (!numeroDigits.trim()) {
        setErrorMsg('Por favor, informe o número do imóvel ou marque a opção "Sem número oficial (S/N)".');
        return;
      }
    } else {
      if (!quadra.trim()) {
        setErrorMsg('Por favor, informe a Quadra do imóvel.');
        return;
      }
      if (!lote.trim()) {
        setErrorMsg('Por favor, informe o Lote do imóvel.');
        return;
      }
    }

    // 5. Validação Obrigatória: Bairro
    if (!data.bairro || !data.bairro.trim()) {
      setErrorMsg('Por favor, informe o Bairro do imóvel.');
      return;
    }

    // Monta valores consolidados
    const finalEndereco = `${tipoLogradouro} ${nomeLogradouro.trim()}`;
    const finalNumero = isSemNumero
      ? 'S/N'
      : numeroLetra.trim()
      ? `${numeroDigits.trim()}-${numeroLetra.trim()}`
      : numeroDigits.trim();

    onChange({
      tipoLogradouro,
      nomeLogradouro: nomeLogradouro.trim(),
      endereco: finalEndereco,
      numero: finalNumero,
      numeroSemNumero: isSemNumero,
      numeroLetra: isSemNumero ? '' : numeroLetra.trim(),
      quadra: quadra.trim(),
      lote: lote.trim(),
    });

    setErrorMsg(null);
    onNext();
  };

  return (
    <div className="max-w-2xl mx-auto w-full">
      {/* Barra de Progresso Simples */}
      <div className="w-full h-1.5 bg-slate-200 rounded-full mb-4 overflow-hidden">
        <div className="h-full bg-indigo-600 w-1/3 rounded-full transition-all duration-300"></div>
      </div>

      {/* Cabeçalho Resumido & Botão de Ajuda */}
      <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
        <div>
          <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block">
            Etapa 1 de 3 • Triagem Sanitária
          </span>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            Identificação do Imóvel e Requerente
          </h1>
        </div>

        {/* Botão de Ajuda Modal */}
        <button
          type="button"
          onClick={() => setIsHelpOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-200 bg-indigo-50/80 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">help</span>
          <span>Ajuda nesta etapa</span>
        </button>
      </div>

      {/* Texto Explicativo da Triagem Sanitária e Conceito de LTA */}
      <div className="bg-gradient-to-r from-indigo-50/90 via-sky-50/70 to-indigo-50/90 border border-indigo-200/90 rounded-2xl p-4 sm:p-5 mb-5 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
            <span className="material-symbols-outlined text-[20px]">assignment</span>
          </div>
          <div className="flex-1 text-slate-800 text-xs sm:text-sm leading-relaxed space-y-2">
            <div>
              <h2 className="font-bold text-indigo-950 text-sm sm:text-base">
                Para que serve esta Triagem Sanitária?
              </h2>
              <p className="text-slate-700 text-xs sm:text-[13px] mt-1 leading-relaxed">
                Esta ferramenta oficial orienta o interessado sobre a necessidade prévia de <strong>Laudo Técnico de Avaliação (LTA)</strong> para o imóvel onde serão exercidas atividades de interesse à saúde sujeitas à fiscalização da Vigilância Sanitária Municipal de Sertãozinho-SP.
              </p>
            </div>
            <div className="bg-white/85 rounded-xl p-3 border border-indigo-100 text-xs text-slate-700 space-y-1.5">
              <p>
                <strong>O que é o Laudo Técnico de Avaliação (LTA)?</strong> É o documento formal emitido pela Vigilância Sanitária que comprova a aprovação do projeto físico da edificação (instalações, fluxos e condições sanitárias), atestando que o local está adequado antes do início das atividades, reforma ou ampliação.
              </p>
              <p className="text-[11.5px] text-slate-600">
                Ao final das 3 etapas, você emitirá o <strong>Comprovante de Triagem de LTA</strong> com o enquadramento oficial conforme a {PORTARIA_CVS_LABEL}, pronto para anexar junto ao seu processo digital.
              </p>
            </div>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-rose-50 text-rose-900 p-3 rounded-xl mb-4 text-xs font-semibold border border-rose-200 flex items-center gap-2">
          <span className="material-symbols-outlined text-rose-600 text-[18px] shrink-0">
            error
          </span>
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Formulário Principal */}
      <form onSubmit={handleContinue} className="space-y-4">
        {/* Bloco 1: Dados do Requerente */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-indigo-600 text-[18px]">person</span>
              Dados do Interessado / Requerente
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nome ou Razão Social <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                value={data.razaoSocial}
                onChange={(e) => onChange({ razaoSocial: e.target.value })}
                placeholder="Nome da pessoa física ou empresa"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                CPF ou CNPJ <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                value={data.cnpjCpf}
                onChange={(e) => handleCnpjCpfChange(e.target.value)}
                placeholder="000.000.000-00 ou 00.000.000/0001-00"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm font-mono focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              Nome Fantasia (opcional)
            </label>
            <input
              type="text"
              value={data.nomeFantasia}
              onChange={(e) => onChange({ nomeFantasia: e.target.value })}
              placeholder="Nome comercial do estabelecimento, se houver"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50/50 text-slate-900 text-xs sm:text-sm focus:bg-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Bloco 2: Localização do Imóvel */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-indigo-600 text-[18px]">location_on</span>
              Endereço do Imóvel em Sertãozinho-SP
            </span>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
              * Obrigatórios
            </span>
          </div>

          {/* Tipo de Logradouro e Nome do Logradouro */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tipo <span className="text-rose-600">*</span>
              </label>
              <select
                value={tipoLogradouro}
                onChange={(e) => handleTipoChange(e.target.value)}
                className="w-full px-2.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-indigo-600"
              >
                {TIPOS_LOGRADOURO.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nome do Logradouro <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                value={nomeLogradouro}
                onChange={(e) => handleNomeLogradouroChange(e.target.value)}
                placeholder="Ex: Barão do Rio Branco, Sebastião Sampaio"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                required
              />
            </div>
          </div>

          {/* Número, Opção Sem Número e Letra/Complemento */}
          <div className="p-3 bg-slate-50/80 rounded-lg border border-slate-200 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <label className="text-xs font-semibold text-slate-800">
                Número do Imóvel <span className="text-rose-600">*</span>
              </label>

              {/* Opção Sem Número */}
              <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs font-medium text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={isSemNumero}
                  onChange={(e) => handleSemNumeroToggle(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
                />
                <span>Sem número oficial (S/N)</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  inputMode="numeric"
                  disabled={isSemNumero}
                  value={isSemNumero ? 'S/N' : numeroDigits}
                  onChange={(e) => handleNumeroDigitsChange(e.target.value)}
                  placeholder={isSemNumero ? 'S/N' : 'Apenas números (ex: 1234)'}
                  className={`w-full px-3 py-2 rounded-lg border text-xs sm:text-sm font-mono ${
                    isSemNumero
                      ? 'bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed font-bold text-center'
                      : 'bg-white border-slate-300 text-slate-900 focus:outline-none focus:border-indigo-600'
                  }`}
                />
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  {isSemNumero ? 'Imóvel sem número predial oficial' : 'Campo filtrado: aceita somente números.'}
                </span>
              </div>

              <div>
                <input
                  type="text"
                  disabled={isSemNumero}
                  value={isSemNumero ? '' : numeroLetra}
                  onChange={(e) => handleNumeroLetraChange(e.target.value)}
                  placeholder={isSemNumero ? 'Não aplicável para S/N' : 'Letra / Bloco (ex: A, B)'}
                  maxLength={10}
                  className={`w-full px-3 py-2 rounded-lg border text-xs sm:text-sm uppercase ${
                    isSemNumero
                      ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                      : 'border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-indigo-600'
                  }`}
                />
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  {isSemNumero ? 'Preencha a Quadra e o Lote abaixo.' : 'Opcional: letra ou bloco diferenciador.'}
                </span>
              </div>
            </div>

            {/* Se Sem Número (S/N): Campos Obrigatórios de Quadra e Lote */}
            {isSemNumero && (
              <div className="p-3 bg-slate-100/90 rounded-lg border border-slate-300/80 space-y-2 mt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Quadra <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={quadra}
                      onChange={(e) => handleQuadraChange(e.target.value)}
                      placeholder="Ex: Quadra 12, Qd. B"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 uppercase font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Lote <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={lote}
                      onChange={(e) => handleLoteChange(e.target.value)}
                      placeholder="Ex: Lote 05, Lt. 14"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 uppercase font-medium"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bairro, Complemento e CEP */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Bairro <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                value={data.bairro}
                onChange={(e) => onChange({ bairro: e.target.value })}
                placeholder="Ex: Centro, Jd. Alvorada"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Complemento (opcional)
              </label>
              <input
                type="text"
                value={data.complemento}
                onChange={(e) => onChange({ complemento: e.target.value })}
                placeholder="Ex: Sala 1, Galpão B"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">
                CEP (opcional)
              </label>
              <input
                type="text"
                value={data.cep}
                onChange={(e) => onChange({ cep: e.target.value })}
                placeholder="14160-000"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-slate-900 text-xs font-mono focus:bg-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
            <span>Município / UF: <strong>Sertãozinho-SP / SP</strong></span>
          </div>
        </div>

        {/* Botão de Avanço */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Avançar para Atividades
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </form>

      {/* Modal de Ajuda da Etapa 1 */}
      <StepHelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        stepNumber={1}
        title="Orientação sobre a Identificação"
      >
        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-slate-900 mb-1">
              1. Imóvel sem número oficial (S/N)
            </h3>
            <p className="text-slate-600">
              Caso o imóvel ainda não possua número predial atribuído pela Prefeitura, marque a opção <strong>&quot;Sem número oficial (S/N)&quot;</strong> e preencha a <strong>Quadra</strong> e o <strong>Lote</strong> correspondentes.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-1">
              2. Jurisdição Sanitária
            </h3>
            <p className="text-slate-600">
              Esta ferramenta é exclusiva para imóveis situados no município de <strong>Sertãozinho-SP</strong>, sob jurisdição da Vigilância Sanitária Municipal e da {PORTARIA_CVS_LABEL}.
            </p>
          </div>
        </div>
      </StepHelpModal>
    </div>
  );
};
