// Base oficial de subclasses CNAE do IBGE Concla (1332 subclasses)
export interface IbgeSubclassItem {
  id: string; // 7 dígitos, ex: "2099101"
  descricao: string;
  secao?: string;
}

export const IBGE_SUBCLASSES: IbgeSubclassItem[] = [
  {
    "id": "4929902",
    "descricao": "TRANSPORTE RODOVIÁRIO COLETIVO DE PASSAGEIROS, SOB REGIME DE FRETAMENTO, INTERMUNICIPAL, INTERESTADUAL E INTERNACIONAL",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "1610204",
    "descricao": "SERRARIAS SEM DESDOBRAMENTO DE MADEIRA EM BRUTO - RESSERRAGEM",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1610203",
    "descricao": "SERRARIAS COM DESDOBRAMENTO DE MADEIRA EM BRUTO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "4623105",
    "descricao": "COMÉRCIO ATACADISTA DE CACAU",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "3314705",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE EQUIPAMENTOS DE TRANSMISSÃO PARA FINS INDUSTRIAIS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "4623106",
    "descricao": "COMÉRCIO ATACADISTA DE SEMENTES, FLORES, PLANTAS E GRAMAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4623107",
    "descricao": "COMÉRCIO ATACADISTA DE SISAL",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "5620102",
    "descricao": "SERVIÇOS DE ALIMENTAÇÃO PARA EVENTOS E RECEPÇÕES - BUFÊ",
    "secao": "ALOJAMENTO E ALIMENTAÇÃO"
  },
  {
    "id": "6611802",
    "descricao": "BOLSA DE MERCADORIAS",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6611803",
    "descricao": "BOLSA DE MERCADORIAS E FUTUROS",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6611804",
    "descricao": "ADMINISTRAÇÃO DE MERCADOS DE BALCÃO ORGANIZADOS",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "0111301",
    "descricao": "CULTIVO DE ARROZ",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0111302",
    "descricao": "CULTIVO DE MILHO",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0111303",
    "descricao": "CULTIVO DE TRIGO",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "7729201",
    "descricao": "ALUGUEL DE APARELHOS DE JOGOS ELETRÔNICOS",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "0111399",
    "descricao": "CULTIVO DE OUTROS CEREAIS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0112101",
    "descricao": "CULTIVO DE ALGODÃO HERBÁCEO",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0112102",
    "descricao": "CULTIVO DE JUTA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0112199",
    "descricao": "CULTIVO DE OUTRAS FIBRAS DE LAVOURA TEMPORÁRIA NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0113000",
    "descricao": "CULTIVO DE CANA DE AÇÚCAR",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0114800",
    "descricao": "CULTIVO DE FUMO",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0115600",
    "descricao": "CULTIVO DE SOJA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0116401",
    "descricao": "CULTIVO DE AMENDOIM",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0116402",
    "descricao": "CULTIVO DE GIRASSOL",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0116403",
    "descricao": "CULTIVO DE MAMONA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0133406",
    "descricao": "CULTIVO DE GUARANÁ",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0721901",
    "descricao": "EXTRAÇÃO DE MINÉRIO DE ALUMÍNIO",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0116499",
    "descricao": "CULTIVO DE OUTRAS OLEAGINOSAS DE LAVOURA TEMPORÁRIA NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0119901",
    "descricao": "CULTIVO DE ABACAXI",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0119902",
    "descricao": "CULTIVO DE ALHO",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0119903",
    "descricao": "CULTIVO DE BATATA INGLESA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0119904",
    "descricao": "CULTIVO DE CEBOLA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0119905",
    "descricao": "CULTIVO DE FEIJÃO",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0119906",
    "descricao": "CULTIVO DE MANDIOCA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0119907",
    "descricao": "CULTIVO DE MELÃO",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0119908",
    "descricao": "CULTIVO DE MELANCIA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0119909",
    "descricao": "CULTIVO DE TOMATE RASTEIRO",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0133403",
    "descricao": "CULTIVO DE CAJU",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0151203",
    "descricao": "CRIAÇÃO DE BOVINOS, EXCETO PARA CORTE E LEITE",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0133404",
    "descricao": "CULTIVO DE CÍTRICOS, EXCETO LARANJA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0133405",
    "descricao": "CULTIVO DE COCO DA BAÍA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0119999",
    "descricao": "CULTIVO DE OUTRAS PLANTAS DE LAVOURA TEMPORÁRIA NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0121101",
    "descricao": "HORTICULTURA, EXCETO MORANGO",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0121102",
    "descricao": "CULTIVO DE MORANGO",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0122900",
    "descricao": "CULTIVO DE FLORES E PLANTAS ORNAMENTAIS",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0131800",
    "descricao": "CULTIVO DE LARANJA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0132600",
    "descricao": "CULTIVO DE UVA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0133401",
    "descricao": "CULTIVO DE AÇAÍ",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0133402",
    "descricao": "CULTIVO DE BANANA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0139301",
    "descricao": "CULTIVO DE CHÁ DA ÍNDIA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0133407",
    "descricao": "CULTIVO DE MAÇÃ",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0133408",
    "descricao": "CULTIVO DE MAMÃO",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0133409",
    "descricao": "CULTIVO DE MARACUJÁ",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0133410",
    "descricao": "CULTIVO DE MANGA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0133411",
    "descricao": "CULTIVO DE PÊSSEGO",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0133499",
    "descricao": "CULTIVO DE FRUTAS DE LAVOURA PERMANENTE NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0134200",
    "descricao": "CULTIVO DE CAFÉ",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0135100",
    "descricao": "CULTIVO DE CACAU",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0139302",
    "descricao": "CULTIVO DE ERVA MATE",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0139303",
    "descricao": "CULTIVO DE PIMENTA DO REINO",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0152103",
    "descricao": "CRIAÇÃO DE ASININOS E MUARES",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0721902",
    "descricao": "BENEFICIAMENTO DE MINÉRIO DE ALUMÍNIO",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0139304",
    "descricao": "CULTIVO DE PLANTAS PARA CONDIMENTO, EXCETO PIMENTA DO REINO",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0139305",
    "descricao": "CULTIVO DE DENDÊ",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0139306",
    "descricao": "CULTIVO DE SERINGUEIRA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0139399",
    "descricao": "CULTIVO DE OUTRAS PLANTAS DE LAVOURA PERMANENTE NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0141501",
    "descricao": "PRODUÇÃO DE SEMENTES CERTIFICADAS, EXCETO DE FORRAGEIRAS PARA PASTO",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0141502",
    "descricao": "PRODUÇÃO DE SEMENTES CERTIFICADAS DE FORRAGEIRAS PARA FORMAÇÃO DE PASTO",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0142300",
    "descricao": "PRODUÇÃO DE MUDAS E OUTRAS FORMAS DE PROPAGAÇÃO VEGETAL, CERTIFICADAS",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0151201",
    "descricao": "CRIAÇÃO DE BOVINOS PARA CORTE",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0151202",
    "descricao": "CRIAÇÃO DE BOVINOS PARA LEITE",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0161002",
    "descricao": "SERVIÇO DE PODA DE ÁRVORES PARA LAVOURAS",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0152101",
    "descricao": "CRIAÇÃO DE BUFALINOS",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0152102",
    "descricao": "CRIAÇÃO DE EQÜINOS",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0153901",
    "descricao": "CRIAÇÃO DE CAPRINOS",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0153902",
    "descricao": "CRIAÇÃO DE OVINOS, INCLUSIVE PARA PRODUÇÃO DE LÃ",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0154700",
    "descricao": "CRIAÇÃO DE SUÍNOS",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0155501",
    "descricao": "CRIAÇÃO DE FRANGOS PARA CORTE",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0155502",
    "descricao": "PRODUÇÃO DE PINTOS DE UM DIA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0155503",
    "descricao": "CRIAÇÃO DE OUTROS GALINÁCEOS, EXCETO PARA CORTE",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0155504",
    "descricao": "CRIAÇÃO DE AVES, EXCETO GALINÁCEOS",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0155505",
    "descricao": "PRODUÇÃO DE OVOS",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0159801",
    "descricao": "APICULTURA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0159802",
    "descricao": "CRIAÇÃO DE ANIMAIS DE ESTIMAÇÃO",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0159803",
    "descricao": "CRIAÇÃO DE ESCARGÔ",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0159804",
    "descricao": "CRIAÇÃO DE BICHO DA SEDA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0159899",
    "descricao": "CRIAÇÃO DE OUTROS ANIMAIS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0161001",
    "descricao": "SERVIÇO DE PULVERIZAÇÃO E CONTROLE DE PRAGAS AGRÍCOLAS",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0210106",
    "descricao": "CULTIVO DE MUDAS EM VIVEIROS FLORESTAIS",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0161003",
    "descricao": "SERVIÇO DE PREPARAÇÃO DE TERRENO, CULTIVO E COLHEITA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0210107",
    "descricao": "EXTRAÇÃO DE MADEIRA EM FLORESTAS PLANTADAS",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0210109",
    "descricao": "PRODUÇÃO DE CASCA DE ACÁCIA NEGRA - FLORESTAS PLANTADAS",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0161099",
    "descricao": "ATIVIDADES DE APOIO À AGRICULTURA NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0162801",
    "descricao": "SERVIÇO DE INSEMINAÇÃO ARTIFICIAL DE ANIMAIS",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0162802",
    "descricao": "SERVIÇO DE TOSQUIAMENTO DE OVINOS",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0162803",
    "descricao": "SERVIÇO DE MANEJO DE ANIMAIS",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0162899",
    "descricao": "ATIVIDADES DE APOIO À PECUÁRIA NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0163600",
    "descricao": "ATIVIDADES DE PÓS COLHEITA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0170900",
    "descricao": "CAÇA E SERVIÇOS RELACIONADOS",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0210101",
    "descricao": "CULTIVO DE EUCALIPTO",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0210102",
    "descricao": "CULTIVO DE ACÁCIA NEGRA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0210103",
    "descricao": "CULTIVO DE PINUS",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0210104",
    "descricao": "CULTIVO DE TECA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0210105",
    "descricao": "CULTIVO DE ESPÉCIES MADEIREIRAS, EXCETO EUCALIPTO, ACÁCIA NEGRA, PINUS E TECA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0210108",
    "descricao": "PRODUÇÃO DE CARVÃO VEGETAL - FLORESTAS PLANTADAS",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0210199",
    "descricao": "PRODUÇÃO DE PRODUTOS NÃO MADEIREIROS NÃO ESPECIFICADOS ANTERIORMENTE EM FLORESTAS PLANTADAS",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0220901",
    "descricao": "EXTRAÇÃO DE MADEIRA EM FLORESTAS NATIVAS",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0220902",
    "descricao": "PRODUÇÃO DE CARVÃO VEGETAL - FLORESTAS NATIVAS",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0220903",
    "descricao": "COLETA DE CASTANHA DO PARÁ EM FLORESTAS NATIVAS",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0220904",
    "descricao": "COLETA DE LÁTEX EM FLORESTAS NATIVAS",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0220905",
    "descricao": "COLETA DE PALMITO EM FLORESTAS NATIVAS",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0220906",
    "descricao": "CONSERVAÇÃO DE FLORESTAS NATIVAS",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0220999",
    "descricao": "COLETA DE PRODUTOS NÃO MADEIREIROS NÃO ESPECIFICADOS ANTERIORMENTE EM FLORESTAS NATIVAS",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0230600",
    "descricao": "ATIVIDADES DE APOIO À PRODUÇÃO FLORESTAL",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0311601",
    "descricao": "PESCA DE PEIXES EM ÁGUA SALGADA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0311602",
    "descricao": "PESCA DE CRUSTÁCEOS E MOLUSCOS EM ÁGUA SALGADA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0311603",
    "descricao": "COLETA DE OUTROS PRODUTOS MARINHOS",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0311604",
    "descricao": "ATIVIDADES DE APOIO À PESCA EM ÁGUA SALGADA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0312401",
    "descricao": "PESCA DE PEIXES EM ÁGUA DOCE",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0312402",
    "descricao": "PESCA DE CRUSTÁCEOS E MOLUSCOS EM ÁGUA DOCE",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "4633803",
    "descricao": "COMÉRCIO ATACADISTA DE COELHOS E OUTROS PEQUENOS ANIMAIS VIVOS PARA ALIMENTAÇÃO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "0312403",
    "descricao": "COLETA DE OUTROS PRODUTOS AQUÁTICOS DE ÁGUA DOCE",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0312404",
    "descricao": "ATIVIDADES DE APOIO À PESCA EM ÁGUA DOCE",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0710301",
    "descricao": "EXTRAÇÃO DE MINÉRIO DE FERRO",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0710302",
    "descricao": "PELOTIZAÇÃO, SINTERIZAÇÃO E OUTROS BENEFICIAMENTOS DE MINÉRIO DE FERRO",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0321301",
    "descricao": "CRIAÇÃO DE PEIXES EM ÁGUA SALGADA E SALOBRA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0321302",
    "descricao": "CRIAÇÃO DE CAMARÕES EM ÁGUA SALGADA E SALOBRA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0321303",
    "descricao": "CRIAÇÃO DE OSTRAS E MEXILHÕES EM ÁGUA SALGADA E SALOBRA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0321304",
    "descricao": "CRIAÇÃO DE PEIXES ORNAMENTAIS EM ÁGUA SALGADA E SALOBRA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0321305",
    "descricao": "ATIVIDADES DE APOIO À AQÜICULTURA EM ÁGUA SALGADA E SALOBRA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0321399",
    "descricao": "CULTIVOS E SEMICULTIVOS DA AQÜICULTURA EM ÁGUA SALGADA E SALOBRA NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0322101",
    "descricao": "CRIAÇÃO DE PEIXES EM ÁGUA DOCE",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0322102",
    "descricao": "CRIAÇÃO DE CAMARÕES EM ÁGUA DOCE",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0322103",
    "descricao": "CRIAÇÃO DE OSTRAS E MEXILHÕES EM ÁGUA DOCE",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0322104",
    "descricao": "CRIAÇÃO DE PEIXES ORNAMENTAIS EM ÁGUA DOCE",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0322105",
    "descricao": "RANICULTURA",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0322106",
    "descricao": "CRIAÇÃO DE JACARÉ",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0322107",
    "descricao": "ATIVIDADES DE APOIO À AQÜICULTURA EM ÁGUA DOCE",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0322199",
    "descricao": "CULTIVOS E SEMICULTIVOS DA AQÜICULTURA EM ÁGUA DOCE NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "AGRICULTURA, PECUÁRIA, PRODUÇÃO FLORESTAL, PESCA E AQÜICULTURA"
  },
  {
    "id": "0500301",
    "descricao": "EXTRAÇÃO DE CARVÃO MINERAL",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0500302",
    "descricao": "BENEFICIAMENTO DE CARVÃO MINERAL",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0600001",
    "descricao": "EXTRAÇÃO DE PETRÓLEO E GÁS NATURAL",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0600002",
    "descricao": "EXTRAÇÃO E BENEFICIAMENTO DE XISTO",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0600003",
    "descricao": "EXTRAÇÃO E BENEFICIAMENTO DE AREIAS BETUMINOSAS",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0722701",
    "descricao": "EXTRAÇÃO DE MINÉRIO DE ESTANHO",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0722702",
    "descricao": "BENEFICIAMENTO DE MINÉRIO DE ESTANHO",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0723501",
    "descricao": "EXTRAÇÃO DE MINÉRIO DE MANGANÊS",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0723502",
    "descricao": "BENEFICIAMENTO DE MINÉRIO DE MANGANÊS",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0724301",
    "descricao": "EXTRAÇÃO DE MINÉRIO DE METAIS PRECIOSOS",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0724302",
    "descricao": "BENEFICIAMENTO DE MINÉRIO DE METAIS PRECIOSOS",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0725100",
    "descricao": "EXTRAÇÃO DE MINERAIS RADIOATIVOS",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0729401",
    "descricao": "EXTRAÇÃO DE MINÉRIOS DE NIÓBIO E TITÂNIO",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0729402",
    "descricao": "EXTRAÇÃO DE MINÉRIO DE TUNGSTÊNIO",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0729403",
    "descricao": "EXTRAÇÃO DE MINÉRIO DE NÍQUEL",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0729404",
    "descricao": "EXTRAÇÃO DE MINÉRIOS DE COBRE, CHUMBO, ZINCO E OUTROS MINERAIS METÁLICOS NÃO FERROSOS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0729405",
    "descricao": "BENEFICIAMENTO DE MINÉRIOS DE COBRE, CHUMBO, ZINCO E OUTROS MINERAIS METÁLICOS NÃO FERROSOS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0810001",
    "descricao": "EXTRAÇÃO DE ARDÓSIA E BENEFICIAMENTO ASSOCIADO",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0810002",
    "descricao": "EXTRAÇÃO DE GRANITO E BENEFICIAMENTO ASSOCIADO",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0810003",
    "descricao": "EXTRAÇÃO DE MÁRMORE E BENEFICIAMENTO ASSOCIADO",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "1012102",
    "descricao": "ABATE DE PEQUENOS ANIMAIS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "6621502",
    "descricao": "AUDITORIA E CONSULTORIA ATUARIAL",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "0810004",
    "descricao": "EXTRAÇÃO DE CALCÁRIO E DOLOMITA E BENEFICIAMENTO ASSOCIADO",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0810005",
    "descricao": "EXTRAÇÃO DE GESSO E CAULIM",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0810006",
    "descricao": "EXTRAÇÃO DE AREIA, CASCALHO OU PEDREGULHO E BENEFICIAMENTO ASSOCIADO",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "9603302",
    "descricao": "SERVIÇOS DE CREMAÇÃO",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "0810007",
    "descricao": "EXTRAÇÃO DE ARGILA E BENEFICIAMENTO ASSOCIADO",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0810008",
    "descricao": "EXTRAÇÃO DE SAIBRO E BENEFICIAMENTO ASSOCIADO",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0810009",
    "descricao": "EXTRAÇÃO DE BASALTO E BENEFICIAMENTO ASSOCIADO",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0810010",
    "descricao": "BENEFICIAMENTO DE GESSO E CAULIM ASSOCIADO À EXTRAÇÃO",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0810099",
    "descricao": "EXTRAÇÃO E BRITAMENTO DE PEDRAS E OUTROS MATERIAIS PARA CONSTRUÇÃO E BENEFICIAMENTO ASSOCIADO",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0891600",
    "descricao": "EXTRAÇÃO DE MINERAIS PARA FABRICAÇÃO DE ADUBOS, FERTILIZANTES E OUTROS PRODUTOS QUÍMICOS",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0892401",
    "descricao": "EXTRAÇÃO DE SAL MARINHO",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0892402",
    "descricao": "EXTRAÇÃO DE SAL GEMA",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0892403",
    "descricao": "REFINO E OUTROS TRATAMENTOS DO SAL",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0893200",
    "descricao": "EXTRAÇÃO DE GEMAS (PEDRAS PRECIOSAS E SEMIPRECIOSAS)",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0899101",
    "descricao": "EXTRAÇÃO DE GRAFITA",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0899102",
    "descricao": "EXTRAÇÃO DE QUARTZO",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0899103",
    "descricao": "EXTRAÇÃO DE AMIANTO",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0899199",
    "descricao": "EXTRAÇÃO DE OUTROS MINERAIS NÃO METÁLICOS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "1043100",
    "descricao": "FABRICAÇÃO DE MARGARINA E OUTRAS GORDURAS VEGETAIS E DE ÓLEOS NÃO COMESTÍVEIS DE ANIMAIS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1051100",
    "descricao": "PREPARAÇÃO DO LEITE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1351100",
    "descricao": "FABRICAÇÃO DE ARTEFATOS TÊXTEIS PARA USO DOMÉSTICO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "0910600",
    "descricao": "ATIVIDADES DE APOIO À EXTRAÇÃO DE PETRÓLEO E GÁS NATURAL",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0990401",
    "descricao": "ATIVIDADES DE APOIO À EXTRAÇÃO DE MINÉRIO DE FERRO",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0990402",
    "descricao": "ATIVIDADES DE APOIO À EXTRAÇÃO DE MINERAIS METÁLICOS NÃO FERROSOS",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "0990403",
    "descricao": "ATIVIDADES DE APOIO À EXTRAÇÃO DE MINERAIS NÃO METÁLICOS",
    "secao": "INDÚSTRIAS EXTRATIVAS"
  },
  {
    "id": "1011201",
    "descricao": "FRIGORÍFICO - ABATE DE BOVINOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1011202",
    "descricao": "FRIGORÍFICO - ABATE DE EQÜINOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1011203",
    "descricao": "FRIGORÍFICO - ABATE DE OVINOS E CAPRINOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1011204",
    "descricao": "FRIGORÍFICO - ABATE DE BUFALINOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1011205",
    "descricao": "MATADOURO - ABATE DE RESES SOB CONTRATO - EXCETO ABATE DE SUÍNOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1012101",
    "descricao": "ABATE DE AVES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1012103",
    "descricao": "FRIGORÍFICO - ABATE DE SUÍNOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1012104",
    "descricao": "MATADOURO - ABATE DE SUÍNOS SOB CONTRATO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1013901",
    "descricao": "FABRICAÇÃO DE PRODUTOS DE CARNE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1013902",
    "descricao": "PREPARAÇÃO DE SUBPRODUTOS DO ABATE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1020101",
    "descricao": "PRESERVAÇÃO DE PEIXES, CRUSTÁCEOS E MOLUSCOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1020102",
    "descricao": "FABRICAÇÃO DE CONSERVAS DE PEIXES, CRUSTÁCEOS E MOLUSCOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1031700",
    "descricao": "FABRICAÇÃO DE CONSERVAS DE FRUTAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1032501",
    "descricao": "FABRICAÇÃO DE CONSERVAS DE PALMITO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1032599",
    "descricao": "FABRICAÇÃO DE CONSERVAS DE LEGUMES E OUTROS VEGETAIS, EXCETO PALMITO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1033301",
    "descricao": "FABRICAÇÃO DE SUCOS CONCENTRADOS DE FRUTAS, HORTALIÇAS E LEGUMES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1033302",
    "descricao": "FABRICAÇÃO DE SUCOS DE FRUTAS, HORTALIÇAS E LEGUMES, EXCETO CONCENTRADOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1041400",
    "descricao": "FABRICAÇÃO DE ÓLEOS VEGETAIS EM BRUTO, EXCETO ÓLEO DE MILHO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1042200",
    "descricao": "FABRICAÇÃO DE ÓLEOS VEGETAIS REFINADOS, EXCETO ÓLEO DE MILHO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1052000",
    "descricao": "FABRICAÇÃO DE LATICÍNIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1053800",
    "descricao": "FABRICAÇÃO DE SORVETES E OUTROS GELADOS COMESTÍVEIS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1061901",
    "descricao": "BENEFICIAMENTO DE ARROZ",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1061902",
    "descricao": "FABRICAÇÃO DE PRODUTOS DO ARROZ",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1062700",
    "descricao": "MOAGEM DE TRIGO E FABRICAÇÃO DE DERIVADOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1063500",
    "descricao": "FABRICAÇÃO DE FARINHA DE MANDIOCA E DERIVADOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1064300",
    "descricao": "FABRICAÇÃO DE FARINHA DE MILHO E DERIVADOS, EXCETO ÓLEOS DE MILHO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1065101",
    "descricao": "FABRICAÇÃO DE AMIDOS E FÉCULAS DE VEGETAIS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1065102",
    "descricao": "FABRICAÇÃO DE ÓLEO DE MILHO EM BRUTO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1065103",
    "descricao": "FABRICAÇÃO DE ÓLEO DE MILHO REFINADO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1066000",
    "descricao": "FABRICAÇÃO DE ALIMENTOS PARA ANIMAIS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1069400",
    "descricao": "MOAGEM E FABRICAÇÃO DE PRODUTOS DE ORIGEM VEGETAL NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1071600",
    "descricao": "FABRICAÇÃO DE AÇÚCAR EM BRUTO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1072401",
    "descricao": "FABRICAÇÃO DE AÇÚCAR DE CANA REFINADO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1072402",
    "descricao": "FABRICAÇÃO DE AÇÚCAR DE CEREAIS (DEXTROSE) E DE BETERRABA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1081301",
    "descricao": "BENEFICIAMENTO DE CAFÉ",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1421500",
    "descricao": "FABRICAÇÃO DE MEIAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "4763603",
    "descricao": "COMÉRCIO VAREJISTA DE BICICLETAS E TRICICLOS; PEÇAS E ACESSÓRIOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "2062200",
    "descricao": "FABRICAÇÃO DE PRODUTOS DE LIMPEZA E POLIMENTO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1081302",
    "descricao": "TORREFAÇÃO E MOAGEM DE CAFÉ",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1082100",
    "descricao": "FABRICAÇÃO DE PRODUTOS À BASE DE CAFÉ",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1091101",
    "descricao": "FABRICAÇÃO DE PRODUTOS DE PANIFICAÇÃO INDUSTRIAL",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1091102",
    "descricao": "FABRICAÇÃO DE PRODUTOS DE PADARIA E CONFEITARIA COM PREDOMINÂNCIA  DE PRODUÇÃO PRÓPRIA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1092900",
    "descricao": "FABRICAÇÃO DE BISCOITOS E BOLACHAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1093701",
    "descricao": "FABRICAÇÃO DE PRODUTOS DERIVADOS DO CACAU E DE CHOCOLATES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1093702",
    "descricao": "FABRICAÇÃO DE FRUTAS CRISTALIZADAS, BALAS E SEMELHANTES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1094500",
    "descricao": "FABRICAÇÃO DE MASSAS ALIMENTÍCIAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1095300",
    "descricao": "FABRICAÇÃO DE ESPECIARIAS, MOLHOS, TEMPEROS E CONDIMENTOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1099601",
    "descricao": "FABRICAÇÃO DE VINAGRES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1099602",
    "descricao": "FABRICAÇÃO DE PÓS ALIMENTÍCIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1099603",
    "descricao": "FABRICAÇÃO DE FERMENTOS E LEVEDURAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1099604",
    "descricao": "FABRICAÇÃO DE GELO COMUM",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1099605",
    "descricao": "FABRICAÇÃO DE PRODUTOS PARA INFUSÃO (CHÁ, MATE, ETC.)",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1099606",
    "descricao": "FABRICAÇÃO DE ADOÇANTES NATURAIS E ARTIFICIAIS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1099607",
    "descricao": "FABRICAÇÃO DE ALIMENTOS DIETÉTICOS E COMPLEMENTOS ALIMENTARES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1311100",
    "descricao": "PREPARAÇÃO E FIAÇÃO DE FIBRAS DE ALGODÃO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1312000",
    "descricao": "PREPARAÇÃO E FIAÇÃO DE FIBRAS TÊXTEIS NATURAIS, EXCETO ALGODÃO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1099699",
    "descricao": "FABRICAÇÃO DE OUTROS PRODUTOS ALIMENTÍCIOS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1111901",
    "descricao": "FABRICAÇÃO DE AGUARDENTE DE CANA DE AÇÚCAR",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1111902",
    "descricao": "FABRICAÇÃO DE OUTRAS AGUARDENTES E BEBIDAS DESTILADAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1112700",
    "descricao": "FABRICAÇÃO DE VINHO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1113501",
    "descricao": "FABRICAÇÃO DE MALTE, INCLUSIVE MALTE UÍSQUE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1113502",
    "descricao": "FABRICAÇÃO DE CERVEJAS E CHOPES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1121600",
    "descricao": "FABRICAÇÃO DE ÁGUAS ENVASADAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1122401",
    "descricao": "FABRICAÇÃO DE REFRIGERANTES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1122402",
    "descricao": "FABRICAÇÃO DE CHÁ MATE E OUTROS CHÁS PRONTOS PARA CONSUMO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1122403",
    "descricao": "FABRICAÇÃO DE REFRESCOS, XAROPES E PÓS PARA REFRESCOS, EXCETO REFRESCOS DE FRUTAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1122404",
    "descricao": "FABRICAÇÃO DE BEBIDAS ISOTÔNICAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1122499",
    "descricao": "FABRICAÇÃO DE OUTRAS BEBIDAS NÃO ALCOÓLICAS NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1210700",
    "descricao": "PROCESSAMENTO INDUSTRIAL DO FUMO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1220401",
    "descricao": "FABRICAÇÃO DE CIGARROS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1220402",
    "descricao": "FABRICAÇÃO DE CIGARRILHAS E CHARUTOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1220403",
    "descricao": "FABRICAÇÃO DE FILTROS PARA CIGARROS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1220499",
    "descricao": "FABRICAÇÃO DE OUTROS PRODUTOS DO FUMO, EXCETO CIGARROS, CIGARRILHAS E CHARUTOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1313800",
    "descricao": "FIAÇÃO DE FIBRAS ARTIFICIAIS E SINTÉTICAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1314600",
    "descricao": "FABRICAÇÃO DE LINHAS PARA COSTURAR E BORDAR",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1321900",
    "descricao": "TECELAGEM DE FIOS DE ALGODÃO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1322700",
    "descricao": "TECELAGEM DE FIOS DE FIBRAS TÊXTEIS NATURAIS, EXCETO ALGODÃO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1323500",
    "descricao": "TECELAGEM DE FIOS DE FIBRAS ARTIFICIAIS E SINTÉTICAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1330800",
    "descricao": "FABRICAÇÃO DE TECIDOS DE MALHA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1340501",
    "descricao": "ESTAMPARIA E TEXTURIZAÇÃO EM FIOS, TECIDOS, ARTEFATOS TÊXTEIS E PEÇAS DO VESTUÁRIO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1340502",
    "descricao": "ALVEJAMENTO, TINGIMENTO E TORÇÃO EM FIOS, TECIDOS, ARTEFATOS TÊXTEIS E PEÇAS DO VESTUÁRIO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1932200",
    "descricao": "FABRICAÇÃO DE BIOCOMBUSTÍVEIS, EXCETO ÁLCOOL",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1340599",
    "descricao": "OUTROS SERVIÇOS DE ACABAMENTO EM FIOS, TECIDOS, ARTEFATOS TÊXTEIS E PEÇAS DO VESTUÁRIO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "7729202",
    "descricao": "ALUGUEL DE MÓVEIS, UTENSÍLIOS E APARELHOS DE USO DOMÉSTICO E PESSOAL; INSTRUMENTOS MUSICAIS",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "1352900",
    "descricao": "FABRICAÇÃO DE ARTEFATOS DE TAPEÇARIA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1353700",
    "descricao": "FABRICAÇÃO DE ARTEFATOS DE CORDOARIA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1354500",
    "descricao": "FABRICAÇÃO DE TECIDOS ESPECIAIS, INCLUSIVE ARTEFATOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1359600",
    "descricao": "FABRICAÇÃO DE OUTROS PRODUTOS TÊXTEIS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1411801",
    "descricao": "CONFECÇÃO DE ROUPAS ÍNTIMAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1411802",
    "descricao": "FACÇÃO DE ROUPAS ÍNTIMAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1412601",
    "descricao": "CONFECÇÃO DE PEÇAS DE VESTUÁRIO, EXCETO ROUPAS ÍNTIMAS E AS CONFECCIONADAS SOB MEDIDA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1412602",
    "descricao": "CONFECÇÃO, SOB MEDIDA, DE PEÇAS DO VESTUÁRIO, EXCETO ROUPAS ÍNTIMAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1412603",
    "descricao": "FACÇÃO DE PEÇAS DO VESTUÁRIO, EXCETO ROUPAS ÍNTIMAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1413401",
    "descricao": "CONFECÇÃO DE ROUPAS PROFISSIONAIS, EXCETO SOB MEDIDA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1413402",
    "descricao": "CONFECÇÃO, SOB MEDIDA, DE ROUPAS PROFISSIONAIS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1413403",
    "descricao": "FACÇÃO DE ROUPAS PROFISSIONAIS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1622699",
    "descricao": "FABRICAÇÃO DE OUTROS ARTIGOS DE CARPINTARIA PARA CONSTRUÇÃO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "4763604",
    "descricao": "COMÉRCIO VAREJISTA DE ARTIGOS DE CAÇA, PESCA E CAMPING",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "1414200",
    "descricao": "FABRICAÇÃO DE ACESSÓRIOS DO VESTUÁRIO, EXCETO PARA SEGURANÇA E PROTEÇÃO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "7729203",
    "descricao": "ALUGUEL DE MATERIAL MÉDICO",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "1422300",
    "descricao": "FABRICAÇÃO DE ARTIGOS DO VESTUÁRIO, PRODUZIDOS EM MALHARIAS E TRICOTAGENS, EXCETO MEIAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1510600",
    "descricao": "CURTIMENTO E OUTRAS PREPARAÇÕES DE COURO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1521100",
    "descricao": "FABRICAÇÃO DE ARTIGOS PARA VIAGEM, BOLSAS E SEMELHANTES DE QUALQUER MATERIAL",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1529700",
    "descricao": "FABRICAÇÃO DE ARTEFATOS DE COURO NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1531901",
    "descricao": "FABRICAÇÃO DE CALÇADOS DE COURO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1531902",
    "descricao": "ACABAMENTO DE CALÇADOS DE COURO SOB CONTRATO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1532700",
    "descricao": "FABRICAÇÃO DE TÊNIS DE QUALQUER MATERIAL",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1533500",
    "descricao": "FABRICAÇÃO DE CALÇADOS DE MATERIAL SINTÉTICO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1539400",
    "descricao": "FABRICAÇÃO DE CALÇADOS DE MATERIAIS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1540800",
    "descricao": "FABRICAÇÃO DE PARTES PARA CALÇADOS, DE QUALQUER MATERIAL",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1621800",
    "descricao": "FABRICAÇÃO DE MADEIRA LAMINADA E DE CHAPAS DE MADEIRA COMPENSADA, PRENSADA E AGLOMERADA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1622601",
    "descricao": "FABRICAÇÃO DE CASAS DE MADEIRA PRÉ FABRICADAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1622602",
    "descricao": "FABRICAÇÃO DE ESQUADRIAS DE MADEIRA E DE PEÇAS DE MADEIRA PARA INSTALAÇÕES INDUSTRIAIS E COMERCIAIS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "4924800",
    "descricao": "TRANSPORTE ESCOLAR",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "1623400",
    "descricao": "FABRICAÇÃO DE ARTEFATOS DE TANOARIA E DE EMBALAGENS DE MADEIRA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "4643501",
    "descricao": "COMÉRCIO ATACADISTA DE CALÇADOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "8599601",
    "descricao": "FORMAÇÃO DE CONDUTORES",
    "secao": "EDUCAÇÃO"
  },
  {
    "id": "1629301",
    "descricao": "FABRICAÇÃO DE ARTEFATOS DIVERSOS DE MADEIRA, EXCETO MÓVEIS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1629302",
    "descricao": "FABRICAÇÃO DE ARTEFATOS DIVERSOS DE CORTIÇA, BAMBU, PALHA, VIME E OUTROS MATERIAIS TRANÇADOS, EXCETO MÓVEIS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1710900",
    "descricao": "FABRICAÇÃO DE CELULOSE E OUTRAS PASTAS PARA A FABRICAÇÃO DE PAPEL",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1721400",
    "descricao": "FABRICAÇÃO DE PAPEL",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1722200",
    "descricao": "FABRICAÇÃO DE CARTOLINA E PAPEL CARTÃO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1731100",
    "descricao": "FABRICAÇÃO DE EMBALAGENS DE PAPEL",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1732000",
    "descricao": "FABRICAÇÃO DE EMBALAGENS DE CARTOLINA E PAPEL CARTÃO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1733800",
    "descricao": "FABRICAÇÃO DE CHAPAS E DE EMBALAGENS DE PAPELÃO ONDULADO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1741901",
    "descricao": "FABRICAÇÃO DE FORMULÁRIOS CONTÍNUOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1741902",
    "descricao": "FABRICAÇÃO DE PRODUTOS DE PAPEL, CARTOLINA, PAPEL CARTÃO E PAPELÃO ONDULADO PARA USO COMERCIAL E DE ESCRITÓRIO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1742701",
    "descricao": "FABRICAÇÃO DE FRALDAS DESCARTÁVEIS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1742702",
    "descricao": "FABRICAÇÃO DE ABSORVENTES HIGIÊNICOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1742799",
    "descricao": "FABRICAÇÃO DE PRODUTOS DE PAPEL PARA USO DOMÉSTICO E HIGIÊNICO SANITÁRIO NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1749400",
    "descricao": "FABRICAÇÃO DE PRODUTOS DE PASTAS CELULÓSICAS, PAPEL, CARTOLINA, PAPEL CARTÃO E PAPELÃO ONDULADO NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1922599",
    "descricao": "FABRICAÇÃO DE OUTROS PRODUTOS DERIVADOS DO PETRÓLEO, EXCETO PRODUTOS DO REFINO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1811301",
    "descricao": "IMPRESSÃO DE JORNAIS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2011800",
    "descricao": "FABRICAÇÃO DE CLORO E ÁLCALIS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1811302",
    "descricao": "IMPRESSÃO DE LIVROS, REVISTAS E OUTRAS PUBLICAÇÕES PERIÓDICAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1812100",
    "descricao": "IMPRESSÃO DE MATERIAL DE SEGURANÇA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1813001",
    "descricao": "IMPRESSÃO DE MATERIAL PARA USO PUBLICITÁRIO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1813099",
    "descricao": "IMPRESSÃO DE MATERIAL PARA OUTROS USOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1821100",
    "descricao": "SERVIÇOS DE PRÉ IMPRESSÃO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1822901",
    "descricao": "SERVIÇOS DE ENCADERNAÇÃO E PLASTIFICAÇÃO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1822999",
    "descricao": "SERVIÇOS DE ACABAMENTOS GRÁFICOS, EXCETO ENCADERNAÇÃO E PLASTIFICAÇÃO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1830001",
    "descricao": "REPRODUÇÃO DE SOM EM QUALQUER SUPORTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1830002",
    "descricao": "REPRODUÇÃO DE VÍDEO EM QUALQUER SUPORTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1830003",
    "descricao": "REPRODUÇÃO DE SOFTWARE EM QUALQUER SUPORTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1910100",
    "descricao": "COQUERIAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1922501",
    "descricao": "FORMULAÇÃO DE COMBUSTÍVEIS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1922502",
    "descricao": "RERREFINO DE ÓLEOS LUBRIFICANTES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2013401",
    "descricao": "FABRICAÇÃO DE ADUBOS E FERTILIZANTES ORGANOMINERAIS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2012600",
    "descricao": "FABRICAÇÃO DE INTERMEDIÁRIOS PARA FERTILIZANTES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2013402",
    "descricao": "FABRICAÇÃO DE ADUBOS E FERTILIZANTES, EXCETO ORGANOMINERAIS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2019301",
    "descricao": "ELABORAÇÃO DE COMBUSTÍVEIS NUCLEARES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2122000",
    "descricao": "FABRICAÇÃO DE MEDICAMENTOS PARA USO VETERINÁRIO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2019399",
    "descricao": "FABRICAÇÃO DE OUTROS PRODUTOS QUÍMICOS INORGÂNICOS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2021500",
    "descricao": "FABRICAÇÃO DE PRODUTOS PETROQUÍMICOS BÁSICOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2022300",
    "descricao": "FABRICAÇÃO DE INTERMEDIÁRIOS PARA PLASTIFICANTES, RESINAS E FIBRAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2029100",
    "descricao": "FABRICAÇÃO DE PRODUTOS QUÍMICOS ORGÂNICOS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2031200",
    "descricao": "FABRICAÇÃO DE RESINAS TERMOPLÁSTICAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2032100",
    "descricao": "FABRICAÇÃO DE RESINAS TERMOFIXAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2033900",
    "descricao": "FABRICAÇÃO DE ELASTÔMEROS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "4643502",
    "descricao": "COMÉRCIO ATACADISTA DE BOLSAS, MALAS E ARTIGOS DE VIAGEM",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "2040100",
    "descricao": "FABRICAÇÃO DE FIBRAS ARTIFICIAIS E SINTÉTICAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2051700",
    "descricao": "FABRICAÇÃO DE DEFENSIVOS AGRÍCOLAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2052500",
    "descricao": "FABRICAÇÃO DE DESINFESTANTES DOMISSANITÁRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2061400",
    "descricao": "FABRICAÇÃO DE SABÕES E DETERGENTES SINTÉTICOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2063100",
    "descricao": "FABRICAÇÃO DE COSMÉTICOS, PRODUTOS DE PERFUMARIA E DE HIGIENE PESSOAL",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2071100",
    "descricao": "FABRICAÇÃO DE TINTAS, VERNIZES, ESMALTES E LACAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2072000",
    "descricao": "FABRICAÇÃO DE TINTAS DE IMPRESSÃO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2092401",
    "descricao": "FABRICAÇÃO DE PÓLVORAS, EXPLOSIVOS E DETONANTES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2092402",
    "descricao": "FABRICAÇÃO DE ARTIGOS PIROTÉCNICOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2092403",
    "descricao": "FABRICAÇÃO DE FÓSFOROS DE SEGURANÇA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2093200",
    "descricao": "FABRICAÇÃO DE ADITIVOS DE USO INDUSTRIAL",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2094100",
    "descricao": "FABRICAÇÃO DE CATALISADORES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2099101",
    "descricao": "FABRICAÇÃO DE CHAPAS, FILMES, PAPÉIS E OUTROS MATERIAIS E PRODUTOS QUÍMICOS PARA FOTOGRAFIA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2099199",
    "descricao": "FABRICAÇÃO DE OUTROS PRODUTOS QUÍMICOS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2091600",
    "descricao": "FABRICAÇÃO DE ADESIVOS E SELANTES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2110600",
    "descricao": "FABRICAÇÃO DE PRODUTOS FARMOQUÍMICOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2121101",
    "descricao": "FABRICAÇÃO DE MEDICAMENTOS ALOPÁTICOS PARA USO HUMANO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2121102",
    "descricao": "FABRICAÇÃO DE MEDICAMENTOS HOMEOPÁTICOS PARA USO HUMANO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2121103",
    "descricao": "FABRICAÇÃO DE MEDICAMENTOS FITOTERÁPICOS PARA USO HUMANO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2342701",
    "descricao": "FABRICAÇÃO DE AZULEJOS E PISOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2211100",
    "descricao": "FABRICAÇÃO DE PNEUMÁTICOS E DE CÂMARAS DE AR",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2212900",
    "descricao": "REFORMA DE PNEUMÁTICOS USADOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2391501",
    "descricao": "BRITAMENTO DE PEDRAS, EXCETO ASSOCIADO À EXTRAÇÃO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2219600",
    "descricao": "FABRICAÇÃO DE ARTEFATOS DE BORRACHA NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2442300",
    "descricao": "METALURGIA DOS METAIS PRECIOSOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3299004",
    "descricao": "FABRICAÇÃO DE PAINÉIS E LETREIROS LUMINOSOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2221800",
    "descricao": "FABRICAÇÃO DE LAMINADOS PLANOS E TUBULARES DE MATERIAL PLÁSTICO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2222600",
    "descricao": "FABRICAÇÃO DE EMBALAGENS DE MATERIAL PLÁSTICO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2223400",
    "descricao": "FABRICAÇÃO DE TUBOS E ACESSÓRIOS DE MATERIAL PLÁSTICO PARA USO NA CONSTRUÇÃO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2229301",
    "descricao": "FABRICAÇÃO DE ARTEFATOS DE MATERIAL PLÁSTICO PARA USO PESSOAL E DOMÉSTICO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2229302",
    "descricao": "FABRICAÇÃO DE ARTEFATOS DE MATERIAL PLÁSTICO PARA USOS INDUSTRIAIS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2229303",
    "descricao": "FABRICAÇÃO DE ARTEFATOS DE MATERIAL PLÁSTICO PARA USO NA CONSTRUÇÃO, EXCETO TUBOS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3600602",
    "descricao": "DISTRIBUIÇÃO DE ÁGUA POR CAMINHÕES",
    "secao": "ÁGUA, ESGOTO, ATIVIDADES DE GESTÃO DE RESÍDUOS E DESCONTAMINAÇÃO"
  },
  {
    "id": "2229399",
    "descricao": "FABRICAÇÃO DE ARTEFATOS DE MATERIAL PLÁSTICO PARA OUTROS USOS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2311700",
    "descricao": "FABRICAÇÃO DE VIDRO PLANO E DE SEGURANÇA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2312500",
    "descricao": "FABRICAÇÃO DE EMBALAGENS DE VIDRO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2424502",
    "descricao": "PRODUÇÃO DE RELAMINADOS, TREFILADOS E PERFILADOS DE AÇO, EXCETO ARAMES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2319200",
    "descricao": "FABRICAÇÃO DE ARTIGOS DE VIDRO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2320600",
    "descricao": "FABRICAÇÃO DE CIMENTO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2330301",
    "descricao": "FABRICAÇÃO DE ESTRUTURAS PRÉ MOLDADAS DE CONCRETO ARMADO, EM SÉRIE E SOB ENCOMENDA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2449101",
    "descricao": "PRODUÇÃO DE ZINCO EM FORMAS PRIMÁRIAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2330302",
    "descricao": "FABRICAÇÃO DE ARTEFATOS DE CIMENTO PARA USO NA CONSTRUÇÃO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2330303",
    "descricao": "FABRICAÇÃO DE ARTEFATOS DE FIBROCIMENTO PARA USO NA CONSTRUÇÃO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2330304",
    "descricao": "FABRICAÇÃO DE CASAS PRÉ MOLDADAS DE CONCRETO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2330305",
    "descricao": "PREPARAÇÃO DE MASSA DE CONCRETO E ARGAMASSA PARA CONSTRUÇÃO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2330399",
    "descricao": "FABRICAÇÃO DE OUTROS ARTEFATOS E PRODUTOS DE CONCRETO, CIMENTO, FIBROCIMENTO, GESSO E MATERIAIS SEMELHANTES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2341900",
    "descricao": "FABRICAÇÃO DE PRODUTOS CERÂMICOS REFRATÁRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2342702",
    "descricao": "FABRICAÇÃO DE ARTEFATOS DE CERÂMICA E BARRO COZIDO PARA USO NA CONSTRUÇÃO, EXCETO AZULEJOS E PISOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2349401",
    "descricao": "FABRICAÇÃO DE MATERIAL SANITÁRIO DE CERÂMICA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2349499",
    "descricao": "FABRICAÇÃO DE PRODUTOS CERÂMICOS NÃO REFRATÁRIOS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3314706",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE MÁQUINAS, APARELHOS E EQUIPAMENTOS PARA INSTALAÇÕES TÉRMICAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2392300",
    "descricao": "FABRICAÇÃO DE CAL E GESSO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2399101",
    "descricao": "DECORAÇÃO, LAPIDAÇÃO, GRAVAÇÃO, VITRIFICAÇÃO E OUTROS TRABALHOS EM CERÂMICA, LOUÇA, VIDRO E CRISTAL",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2399102",
    "descricao": "FABRICAÇÃO DE ABRASIVOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2443100",
    "descricao": "METALURGIA DO COBRE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2599301",
    "descricao": "SERVIÇOS DE CONFECÇÃO DE ARMAÇÕES METÁLICAS PARA A CONSTRUÇÃO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2399199",
    "descricao": "FABRICAÇÃO DE OUTROS PRODUTOS DE MINERAIS NÃO METÁLICOS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2411300",
    "descricao": "PRODUÇÃO DE FERRO GUSA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2412100",
    "descricao": "PRODUÇÃO DE FERROLIGAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2422901",
    "descricao": "PRODUÇÃO DE LAMINADOS PLANOS DE AÇO AO CARBONO, REVESTIDOS OU NÃO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2422902",
    "descricao": "PRODUÇÃO DE LAMINADOS PLANOS DE AÇOS ESPECIAIS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "9603303",
    "descricao": "SERVIÇOS DE SEPULTAMENTO",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "2423701",
    "descricao": "PRODUÇÃO DE TUBOS DE AÇO SEM COSTURA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2423702",
    "descricao": "PRODUÇÃO DE LAMINADOS LONGOS DE AÇO, EXCETO TUBOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2424501",
    "descricao": "PRODUÇÃO DE ARAMES DE AÇO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2431800",
    "descricao": "PRODUÇÃO DE TUBOS DE AÇO COM COSTURA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2439300",
    "descricao": "PRODUÇÃO DE OUTROS TUBOS DE FERRO E AÇO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2441501",
    "descricao": "PRODUÇÃO DE ALUMÍNIO E SUAS LIGAS EM FORMAS PRIMÁRIAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2441502",
    "descricao": "PRODUÇÃO DE LAMINADOS DE ALUMÍNIO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2449102",
    "descricao": "PRODUÇÃO DE LAMINADOS DE ZINCO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2449103",
    "descricao": "FABRICAÇÃO DE ÂNODOS PARA GALVANOPLASTIA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2449199",
    "descricao": "METALURGIA DE OUTROS METAIS NÃO FERROSOS E SUAS LIGAS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2451200",
    "descricao": "FUNDIÇÃO DE FERRO E AÇO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2452100",
    "descricao": "FUNDIÇÃO DE METAIS NÃO FERROSOS E SUAS LIGAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2511000",
    "descricao": "FABRICAÇÃO DE ESTRUTURAS METÁLICAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2512800",
    "descricao": "FABRICAÇÃO DE ESQUADRIAS DE METAL",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2542000",
    "descricao": "FABRICAÇÃO DE ARTIGOS DE SERRALHERIA, EXCETO ESQUADRIAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "4679699",
    "descricao": "COMÉRCIO ATACADISTA DE MATERIAIS DE CONSTRUÇÃO EM GERAL",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "2513600",
    "descricao": "FABRICAÇÃO DE OBRAS DE CALDEIRARIA PESADA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2550101",
    "descricao": "FABRICAÇÃO DE EQUIPAMENTO BÉLICO PESADO, EXCETO VEÍCULOS MILITARES DE COMBATE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2521700",
    "descricao": "FABRICAÇÃO DE TANQUES, RESERVATÓRIOS METÁLICOS E CALDEIRAS PARA AQUECIMENTO CENTRAL",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2522500",
    "descricao": "FABRICAÇÃO DE CALDEIRAS GERADORAS DE VAPOR, EXCETO PARA AQUECIMENTO CENTRAL E PARA VEÍCULOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2531401",
    "descricao": "PRODUÇÃO DE FORJADOS DE AÇO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2531402",
    "descricao": "PRODUÇÃO DE FORJADOS DE METAIS NÃO FERROSOS E SUAS LIGAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2599302",
    "descricao": "SERVIÇO DE CORTE E DOBRA DE METAIS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2532201",
    "descricao": "PRODUÇÃO DE ARTEFATOS ESTAMPADOS DE METAL",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2532202",
    "descricao": "METALURGIA DO PÓ",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2539001",
    "descricao": "SERVIÇOS DE USINAGEM, TORNEARIA E SOLDA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2539002",
    "descricao": "SERVIÇOS DE TRATAMENTO E REVESTIMENTO EM METAIS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2541100",
    "descricao": "FABRICAÇÃO DE ARTIGOS DE CUTELARIA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2543800",
    "descricao": "FABRICAÇÃO DE FERRAMENTAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2550102",
    "descricao": "FABRICAÇÃO DE ARMAS DE FOGO, OUTRAS ARMAS  E MUNIÇÕES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2591800",
    "descricao": "FABRICAÇÃO DE EMBALAGENS METÁLICAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2592601",
    "descricao": "FABRICAÇÃO DE PRODUTOS DE TREFILADOS DE METAL PADRONIZADOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2592602",
    "descricao": "FABRICAÇÃO DE PRODUTOS DE TREFILADOS DE METAL, EXCETO PADRONIZADOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2593400",
    "descricao": "FABRICAÇÃO DE ARTIGOS DE METAL PARA USO DOMÉSTICO E PESSOAL",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2599399",
    "descricao": "FABRICAÇÃO DE OUTROS PRODUTOS DE METAL NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2610800",
    "descricao": "FABRICAÇÃO DE COMPONENTES ELETRÔNICOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2621300",
    "descricao": "FABRICAÇÃO DE EQUIPAMENTOS DE INFORMÁTICA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2670102",
    "descricao": "FABRICAÇÃO DE APARELHOS FOTOGRÁFICOS E CINEMATOGRÁFICOS, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2622100",
    "descricao": "FABRICAÇÃO DE PERIFÉRICOS PARA EQUIPAMENTOS DE INFORMÁTICA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2722802",
    "descricao": "RECONDICIONAMENTO DE BATERIAS E ACUMULADORES PARA VEÍCULOS AUTOMOTORES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3250704",
    "descricao": "FABRICAÇÃO DE APARELHOS E UTENSÍLIOS PARA CORREÇÃO DE DEFEITOS FÍSICOS E APARELHOS ORTOPÉDICOS EM GERAL, EXCETO SOB ENCOMENDA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2631100",
    "descricao": "FABRICAÇÃO DE EQUIPAMENTOS TRANSMISSORES DE COMUNICAÇÃO, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2632900",
    "descricao": "FABRICAÇÃO DE APARELHOS TELEFÔNICOS E DE OUTROS EQUIPAMENTOS DE COMUNICAÇÃO, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2680900",
    "descricao": "FABRICAÇÃO DE MÍDIAS VIRGENS, MAGNÉTICAS E ÓPTICAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3299005",
    "descricao": "FABRICAÇÃO DE AVIAMENTOS PARA COSTURA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2640000",
    "descricao": "FABRICAÇÃO DE APARELHOS DE RECEPÇÃO, REPRODUÇÃO, GRAVAÇÃO E AMPLIFICAÇÃO DE ÁUDIO E VÍDEO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2710401",
    "descricao": "FABRICAÇÃO DE GERADORES DE CORRENTE CONTÍNUA E ALTERNADA, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2815101",
    "descricao": "FABRICAÇÃO DE ROLAMENTOS PARA FINS INDUSTRIAIS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2651500",
    "descricao": "FABRICAÇÃO DE APARELHOS E EQUIPAMENTOS DE MEDIDA, TESTE E CONTROLE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2652300",
    "descricao": "FABRICAÇÃO DE CRONÔMETROS E RELÓGIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2731700",
    "descricao": "FABRICAÇÃO DE APARELHOS E EQUIPAMENTOS PARA DISTRIBUIÇÃO E CONTROLE DE ENERGIA ELÉTRICA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3314703",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE VÁLVULAS INDUSTRIAIS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2660400",
    "descricao": "FABRICAÇÃO DE APARELHOS ELETROMÉDICOS E ELETROTERAPÊUTICOS E EQUIPAMENTOS DE IRRADIAÇÃO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2670101",
    "descricao": "FABRICAÇÃO DE EQUIPAMENTOS E INSTRUMENTOS ÓPTICOS, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2814301",
    "descricao": "FABRICAÇÃO DE COMPRESSORES PARA USO INDUSTRIAL, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2710402",
    "descricao": "FABRICAÇÃO DE TRANSFORMADORES, INDUTORES, CONVERSORES, SINCRONIZADORES E SEMELHANTES, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2710403",
    "descricao": "FABRICAÇÃO DE MOTORES ELÉTRICOS, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2721000",
    "descricao": "FABRICAÇÃO DE PILHAS, BATERIAS E ACUMULADORES ELÉTRICOS, EXCETO PARA VEÍCULOS AUTOMOTORES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2722801",
    "descricao": "FABRICAÇÃO DE BATERIAS E ACUMULADORES PARA VEÍCULOS AUTOMOTORES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2732500",
    "descricao": "FABRICAÇÃO DE MATERIAL ELÉTRICO PARA INSTALAÇÕES EM CIRCUITO DE CONSUMO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2733300",
    "descricao": "FABRICAÇÃO DE FIOS, CABOS E CONDUTORES ELÉTRICOS ISOLADOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2740601",
    "descricao": "FABRICAÇÃO DE LÂMPADAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2740602",
    "descricao": "FABRICAÇÃO DE LUMINÁRIAS E OUTROS EQUIPAMENTOS DE ILUMINAÇÃO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3299006",
    "descricao": "FABRICAÇÃO DE VELAS, INCLUSIVE DECORATIVAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2751100",
    "descricao": "FABRICAÇÃO DE FOGÕES, REFRIGERADORES E MÁQUINAS DE LAVAR E SECAR PARA USO DOMÉSTICO, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2759701",
    "descricao": "FABRICAÇÃO DE APARELHOS ELÉTRICOS DE USO PESSOAL, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2814302",
    "descricao": "FABRICAÇÃO DE COMPRESSORES PARA USO NÃO INDUSTRIAL, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2759799",
    "descricao": "FABRICAÇÃO DE OUTROS APARELHOS ELETRODOMÉSTICOS NÃO ESPECIFICADOS ANTERIORMENTE, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2790201",
    "descricao": "FABRICAÇÃO DE ELETRODOS, CONTATOS E OUTROS ARTIGOS DE CARVÃO E GRAFITA PARA USO ELÉTRICO, ELETROÍMÃS E ISOLADORES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2790202",
    "descricao": "FABRICAÇÃO DE EQUIPAMENTOS PARA SINALIZAÇÃO E ALARME",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2790299",
    "descricao": "FABRICAÇÃO DE OUTROS EQUIPAMENTOS E APARELHOS ELÉTRICOS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2811900",
    "descricao": "FABRICAÇÃO DE MOTORES E TURBINAS, PEÇAS E ACESSÓRIOS, EXCETO PARA AVIÕES E VEÍCULOS RODOVIÁRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2812700",
    "descricao": "FABRICAÇÃO DE EQUIPAMENTOS HIDRÁULICOS E PNEUMÁTICOS, PEÇAS E ACESSÓRIOS, EXCETO VÁLVULAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2832100",
    "descricao": "FABRICAÇÃO DE EQUIPAMENTOS PARA IRRIGAÇÃO AGRÍCOLA, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2813500",
    "descricao": "FABRICAÇÃO DE VÁLVULAS, REGISTROS E DISPOSITIVOS SEMELHANTES, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2815102",
    "descricao": "FABRICAÇÃO DE EQUIPAMENTOS DE TRANSMISSÃO PARA FINS INDUSTRIAIS, EXCETO ROLAMENTOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2824102",
    "descricao": "FABRICAÇÃO DE APARELHOS E EQUIPAMENTOS DE AR CONDICIONADO PARA USO NÃO INDUSTRIAL",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3102100",
    "descricao": "FABRICAÇÃO DE MÓVEIS COM PREDOMINÂNCIA DE METAL",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2821601",
    "descricao": "FABRICAÇÃO DE FORNOS INDUSTRIAIS, APARELHOS E EQUIPAMENTOS NÃO ELÉTRICOS PARA INSTALAÇÕES TÉRMICAS, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2821602",
    "descricao": "FABRICAÇÃO DE ESTUFAS E FORNOS ELÉTRICOS PARA FINS INDUSTRIAIS, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2822401",
    "descricao": "FABRICAÇÃO DE MÁQUINAS, EQUIPAMENTOS E APARELHOS PARA TRANSPORTE E ELEVAÇÃO DE PESSOAS, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2941700",
    "descricao": "FABRICAÇÃO DE PEÇAS E ACESSÓRIOS PARA O SISTEMA MOTOR DE VEÍCULOS AUTOMOTORES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2942500",
    "descricao": "FABRICAÇÃO DE PEÇAS E ACESSÓRIOS PARA OS SISTEMAS DE MARCHA E TRANSMISSÃO DE VEÍCULOS AUTOMOTORES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2822402",
    "descricao": "FABRICAÇÃO DE MÁQUINAS, EQUIPAMENTOS E APARELHOS PARA TRANSPORTE E ELEVAÇÃO DE CARGAS, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3317102",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE EMBARCAÇÕES PARA ESPORTE E LAZER",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "4732600",
    "descricao": "COMÉRCIO VAREJISTA DE LUBRIFICANTES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "2823200",
    "descricao": "FABRICAÇÃO DE MÁQUINAS E APARELHOS DE REFRIGERAÇÃO E VENTILAÇÃO PARA USO INDUSTRIAL E COMERCIAL, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2824101",
    "descricao": "FABRICAÇÃO DE APARELHOS E EQUIPAMENTOS DE AR CONDICIONADO PARA USO INDUSTRIAL",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2950600",
    "descricao": "RECONDICIONAMENTO E RECUPERAÇÃO DE MOTORES PARA VEÍCULOS AUTOMOTORES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2825900",
    "descricao": "FABRICAÇÃO DE MÁQUINAS E EQUIPAMENTOS PARA SANEAMENTO BÁSICO E AMBIENTAL, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2829101",
    "descricao": "FABRICAÇÃO DE MÁQUINAS DE ESCREVER, CALCULAR E OUTROS EQUIPAMENTOS NÃO ELETRÔNICOS PARA ESCRITÓRIO, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2829199",
    "descricao": "FABRICAÇÃO DE OUTRAS MÁQUINAS E EQUIPAMENTOS DE USO GERAL NÃO ESPECIFICADOS ANTERIORMENTE, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2831300",
    "descricao": "FABRICAÇÃO DE TRATORES AGRÍCOLAS, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2943300",
    "descricao": "FABRICAÇÃO DE PEÇAS E ACESSÓRIOS PARA O SISTEMA DE FREIOS DE VEÍCULOS AUTOMOTORES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2854200",
    "descricao": "FABRICAÇÃO DE MÁQUINAS E EQUIPAMENTOS PARA TERRAPLENAGEM, PAVIMENTAÇÃO E CONSTRUÇÃO, PEÇAS E ACESSÓRIOS, EXCETO TRATORES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "4724500",
    "descricao": "COMÉRCIO VAREJISTA DE HORTIFRUTIGRANJEIROS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "2833000",
    "descricao": "FABRICAÇÃO DE MÁQUINAS E EQUIPAMENTOS PARA A AGRICULTURA E PECUÁRIA, PEÇAS E ACESSÓRIOS, EXCETO PARA IRRIGAÇÃO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2840200",
    "descricao": "FABRICAÇÃO DE MÁQUINAS FERRAMENTA, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3250702",
    "descricao": "FABRICAÇÃO DE MOBILIÁRIO PARA USO MÉDICO, CIRÚRGICO, ODONTOLÓGICO E DE LABORATÓRIO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2851800",
    "descricao": "FABRICAÇÃO DE MÁQUINAS E EQUIPAMENTOS PARA A PROSPECÇÃO E EXTRAÇÃO DE PETRÓLEO, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2852600",
    "descricao": "FABRICAÇÃO DE OUTRAS MÁQUINAS E EQUIPAMENTOS PARA USO NA EXTRAÇÃO MINERAL, PEÇAS E ACESSÓRIOS, EXCETO NA EXTRAÇÃO DE PETRÓLEO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2853400",
    "descricao": "FABRICAÇÃO DE TRATORES, PEÇAS E ACESSÓRIOS, EXCETO AGRÍCOLAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2944100",
    "descricao": "FABRICAÇÃO DE PEÇAS E ACESSÓRIOS PARA O SISTEMA DE DIREÇÃO E SUSPENSÃO DE VEÍCULOS AUTOMOTORES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2861500",
    "descricao": "FABRICAÇÃO DE MÁQUINAS PARA A INDÚSTRIA METALÚRGICA, PEÇAS E ACESSÓRIOS, EXCETO MÁQUINAS FERRAMENTA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3101200",
    "descricao": "FABRICAÇÃO DE MÓVEIS COM PREDOMINÂNCIA DE MADEIRA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3314704",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE COMPRESSORES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2862300",
    "descricao": "FABRICAÇÃO DE MÁQUINAS E EQUIPAMENTOS PARA AS INDÚSTRIAS DE ALIMENTOS, BEBIDAS E FUMO, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2863100",
    "descricao": "FABRICAÇÃO DE MÁQUINAS E EQUIPAMENTOS PARA A INDÚSTRIA TÊXTIL, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2864000",
    "descricao": "FABRICAÇÃO DE MÁQUINAS E EQUIPAMENTOS PARA AS INDÚSTRIAS DO VESTUÁRIO, DO COURO E DE CALÇADOS, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3042300",
    "descricao": "FABRICAÇÃO DE TURBINAS, MOTORES E OUTROS COMPONENTES E PEÇAS PARA AERONAVES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3314715",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE MÁQUINAS E EQUIPAMENTOS PARA USO NA EXTRAÇÃO MINERAL, EXCETO NA EXTRAÇÃO DE PETRÓLEO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2865800",
    "descricao": "FABRICAÇÃO DE MÁQUINAS E EQUIPAMENTOS PARA AS INDÚSTRIAS DE CELULOSE, PAPEL E PAPELÃO E ARTEFATOS, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2866600",
    "descricao": "FABRICAÇÃO DE MÁQUINAS E EQUIPAMENTOS PARA A INDÚSTRIA DO PLÁSTICO, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3250703",
    "descricao": "FABRICAÇÃO DE APARELHOS E UTENSÍLIOS PARA CORREÇÃO DE DEFEITOS FÍSICOS E APARELHOS ORTOPÉDICOS EM GERAL SOB ENCOMENDA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2869100",
    "descricao": "FABRICAÇÃO DE MÁQUINAS E EQUIPAMENTOS PARA USO INDUSTRIAL ESPECÍFICO NÃO ESPECIFICADOS ANTERIORMENTE, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2910701",
    "descricao": "FABRICAÇÃO DE AUTOMÓVEIS, CAMIONETAS E UTILITÁRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2910702",
    "descricao": "FABRICAÇÃO DE CHASSIS COM MOTOR PARA AUTOMÓVEIS, CAMIONETAS E UTILITÁRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2910703",
    "descricao": "FABRICAÇÃO DE MOTORES PARA AUTOMÓVEIS, CAMIONETAS E UTILITÁRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2920401",
    "descricao": "FABRICAÇÃO DE CAMINHÕES E ÔNIBUS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2920402",
    "descricao": "FABRICAÇÃO DE MOTORES PARA CAMINHÕES E ÔNIBUS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2930101",
    "descricao": "FABRICAÇÃO DE CABINES, CARROCERIAS E REBOQUES PARA CAMINHÕES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2930102",
    "descricao": "FABRICAÇÃO DE CARROCERIAS PARA ÔNIBUS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2930103",
    "descricao": "FABRICAÇÃO DE CABINES, CARROCERIAS E REBOQUES PARA OUTROS VEÍCULOS AUTOMOTORES, EXCETO CAMINHÕES E ÔNIBUS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3299001",
    "descricao": "FABRICAÇÃO DE GUARDA CHUVAS E SIMILARES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2945000",
    "descricao": "FABRICAÇÃO DE MATERIAL ELÉTRICO E ELETRÔNICO PARA VEÍCULOS AUTOMOTORES, EXCETO BATERIAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2949201",
    "descricao": "FABRICAÇÃO DE BANCOS E ESTOFADOS PARA VEÍCULOS AUTOMOTORES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2949299",
    "descricao": "FABRICAÇÃO DE OUTRAS PEÇAS E ACESSÓRIOS PARA VEÍCULOS AUTOMOTORES NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3011301",
    "descricao": "CONSTRUÇÃO DE EMBARCAÇÕES DE GRANDE PORTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3011302",
    "descricao": "CONSTRUÇÃO DE EMBARCAÇÕES PARA USO COMERCIAL E PARA USOS ESPECIAIS, EXCETO DE GRANDE PORTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3012100",
    "descricao": "CONSTRUÇÃO DE EMBARCAÇÕES PARA ESPORTE E LAZER",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3031800",
    "descricao": "FABRICAÇÃO DE LOCOMOTIVAS, VAGÕES E OUTROS MATERIAIS RODANTES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3032600",
    "descricao": "FABRICAÇÃO DE PEÇAS E ACESSÓRIOS PARA VEÍCULOS FERROVIÁRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3314716",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE TRATORES, EXCETO AGRÍCOLAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "4729601",
    "descricao": "TABACARIA",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "3041500",
    "descricao": "FABRICAÇÃO DE AERONAVES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "6622300",
    "descricao": "CORRETORES E AGENTES DE SEGUROS, DE PLANOS DE PREVIDÊNCIA COMPLEMENTAR E DE SAÚDE",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "3050400",
    "descricao": "FABRICAÇÃO DE VEÍCULOS MILITARES DE COMBATE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3091101",
    "descricao": "FABRICAÇÃO DE MOTOCICLETAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3091102",
    "descricao": "FABRICAÇÃO DE PEÇAS E ACESSÓRIOS PARA MOTOCICLETAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3092000",
    "descricao": "FABRICAÇÃO DE BICICLETAS E TRICICLOS NÃO MOTORIZADOS, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3099700",
    "descricao": "FABRICAÇÃO DE EQUIPAMENTOS DE TRANSPORTE NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3103900",
    "descricao": "FABRICAÇÃO DE MÓVEIS DE OUTROS MATERIAIS, EXCETO MADEIRA E METAL",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3211601",
    "descricao": "LAPIDAÇÃO DE GEMAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3211602",
    "descricao": "FABRICAÇÃO DE ARTEFATOS DE JOALHERIA E OURIVESARIA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3211603",
    "descricao": "CUNHAGEM DE MOEDAS E MEDALHAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3212400",
    "descricao": "FABRICAÇÃO DE BIJUTERIAS E ARTEFATOS SEMELHANTES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3220500",
    "descricao": "FABRICAÇÃO DE INSTRUMENTOS MUSICAIS, PEÇAS E ACESSÓRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3299002",
    "descricao": "FABRICAÇÃO DE CANETAS, LÁPIS E OUTROS ARTIGOS PARA ESCRITÓRIO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3299003",
    "descricao": "FABRICAÇÃO DE LETRAS, LETREIROS E PLACAS DE QUALQUER MATERIAL, EXCETO LUMINOSOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3530100",
    "descricao": "PRODUÇÃO E DISTRIBUIÇÃO DE VAPOR, ÁGUA QUENTE E AR CONDICIONADO",
    "secao": "ELETRICIDADE E GÁS"
  },
  {
    "id": "3230200",
    "descricao": "FABRICAÇÃO DE ARTEFATOS PARA PESCA E ESPORTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3240001",
    "descricao": "FABRICAÇÃO DE JOGOS ELETRÔNICOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3240002",
    "descricao": "FABRICAÇÃO DE MESAS DE BILHAR, DE SINUCA E ACESSÓRIOS NÃO ASSOCIADA À LOCAÇÃO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3240003",
    "descricao": "FABRICAÇÃO DE MESAS DE BILHAR, DE SINUCA E ACESSÓRIOS ASSOCIADA À LOCAÇÃO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3240099",
    "descricao": "FABRICAÇÃO DE OUTROS BRINQUEDOS E JOGOS RECREATIVOS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3250701",
    "descricao": "FABRICAÇÃO DE INSTRUMENTOS NÃO ELETRÔNICOS E UTENSÍLIOS PARA USO MÉDICO, CIRÚRGICO, ODONTOLÓGICO E DE LABORATÓRIO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3250705",
    "descricao": "FABRICAÇÃO DE MATERIAIS PARA MEDICINA E ODONTOLOGIA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3250706",
    "descricao": "SERVIÇOS DE PRÓTESE DENTÁRIA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3250707",
    "descricao": "FABRICAÇÃO DE ARTIGOS ÓPTICOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3250709",
    "descricao": "SERVIÇO DE LABORATÓRIO ÓPTICO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3291400",
    "descricao": "FABRICAÇÃO DE ESCOVAS, PINCÉIS E VASSOURAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3292201",
    "descricao": "FABRICAÇÃO DE ROUPAS DE PROTEÇÃO E SEGURANÇA E RESISTENTES A FOGO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3292202",
    "descricao": "FABRICAÇÃO DE EQUIPAMENTOS E ACESSÓRIOS PARA SEGURANÇA PESSOAL E PROFISSIONAL",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3299099",
    "descricao": "FABRICAÇÃO DE PRODUTOS DIVERSOS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3311200",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE TANQUES, RESERVATÓRIOS METÁLICOS E CALDEIRAS, EXCETO PARA VEÍCULOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3312102",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE APARELHOS E INSTRUMENTOS DE MEDIDA, TESTE E CONTROLE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3312103",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE APARELHOS ELETROMÉDICOS E ELETROTERAPÊUTICOS E EQUIPAMENTOS DE IRRADIAÇÃO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3312104",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE EQUIPAMENTOS E INSTRUMENTOS ÓPTICOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3313901",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE GERADORES, TRANSFORMADORES E MOTORES ELÉTRICOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3313902",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE BATERIAS E ACUMULADORES ELÉTRICOS, EXCETO PARA VEÍCULOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3313999",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE MÁQUINAS, APARELHOS E MATERIAIS ELÉTRICOS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3314701",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE MÁQUINAS MOTRIZES NÃO ELÉTRICAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3314702",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE EQUIPAMENTOS HIDRÁULICOS E PNEUMÁTICOS, EXCETO VÁLVULAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3314707",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE MÁQUINAS E APARELHOS DE REFRIGERAÇÃO E VENTILAÇÃO PARA USO INDUSTRIAL E COMERCIAL",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3314708",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE MÁQUINAS, EQUIPAMENTOS E APARELHOS PARA TRANSPORTE E ELEVAÇÃO DE CARGAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3314709",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE MÁQUINAS DE ESCREVER, CALCULAR E DE OUTROS EQUIPAMENTOS NÃO ELETRÔNICOS PARA ESCRITÓRIO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3314710",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE MÁQUINAS E EQUIPAMENTOS PARA USO GERAL NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3314711",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE MÁQUINAS E EQUIPAMENTOS PARA AGRICULTURA E PECUÁRIA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3314712",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE TRATORES AGRÍCOLAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3314713",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE MÁQUINAS FERRAMENTA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3314714",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE MÁQUINAS E EQUIPAMENTOS PARA A PROSPECÇÃO E EXTRAÇÃO DE PETRÓLEO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3314717",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE MÁQUINAS E EQUIPAMENTOS DE TERRAPLENAGEM, PAVIMENTAÇÃO E CONSTRUÇÃO, EXCETO TRATORES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3314718",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE MÁQUINAS PARA A INDÚSTRIA METALÚRGICA, EXCETO MÁQUINAS FERRAMENTA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3314719",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE MÁQUINAS E EQUIPAMENTOS PARA AS INDÚSTRIAS DE ALIMENTOS, BEBIDAS E FUMO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3314720",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE MÁQUINAS E EQUIPAMENTOS PARA A INDÚSTRIA TÊXTIL, DO VESTUÁRIO, DO COURO E CALÇADOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3314721",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE MÁQUINAS E APARELHOS PARA A INDÚSTRIA DE CELULOSE, PAPEL E PAPELÃO E ARTEFATOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3314722",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE MÁQUINAS E APARELHOS PARA A INDÚSTRIA DO PLÁSTICO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "4221905",
    "descricao": "MANUTENÇÃO DE ESTAÇÕES E REDES DE TELECOMUNICAÇÕES",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "3314799",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE OUTRAS MÁQUINAS E EQUIPAMENTOS PARA USOS INDUSTRIAIS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3315500",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE VEÍCULOS FERROVIÁRIOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3316301",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE AERONAVES, EXCETO A MANUTENÇÃO NA PISTA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3316302",
    "descricao": "MANUTENÇÃO DE AERONAVES NA PISTA",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3317101",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE EMBARCAÇÕES E ESTRUTURAS FLUTUANTES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3319800",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE EQUIPAMENTOS E PRODUTOS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3321000",
    "descricao": "INSTALAÇÃO DE MÁQUINAS E EQUIPAMENTOS INDUSTRIAIS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3329501",
    "descricao": "SERVIÇOS DE MONTAGEM DE MÓVEIS DE QUALQUER MATERIAL",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3511501",
    "descricao": "GERAÇÃO DE ENERGIA ELÉTRICA",
    "secao": "ELETRICIDADE E GÁS"
  },
  {
    "id": "3511502",
    "descricao": "ATIVIDADES DE COORDENAÇÃO E CONTROLE DA OPERAÇÃO DA GERAÇÃO E TRANSMISSÃO DE ENERGIA ELÉTRICA",
    "secao": "ELETRICIDADE E GÁS"
  },
  {
    "id": "3512300",
    "descricao": "TRANSMISSÃO DE ENERGIA ELÉTRICA",
    "secao": "ELETRICIDADE E GÁS"
  },
  {
    "id": "3513100",
    "descricao": "COMÉRCIO ATACADISTA DE ENERGIA ELÉTRICA",
    "secao": "ELETRICIDADE E GÁS"
  },
  {
    "id": "3514000",
    "descricao": "DISTRIBUIÇÃO DE ENERGIA ELÉTRICA",
    "secao": "ELETRICIDADE E GÁS"
  },
  {
    "id": "4212000",
    "descricao": "CONSTRUÇÃO DE OBRAS DE ARTE ESPECIAIS",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "3520401",
    "descricao": "PRODUÇÃO DE GÁS; PROCESSAMENTO DE GÁS NATURAL",
    "secao": "ELETRICIDADE E GÁS"
  },
  {
    "id": "3520402",
    "descricao": "DISTRIBUIÇÃO DE COMBUSTÍVEIS GASOSOS POR REDES URBANAS",
    "secao": "ELETRICIDADE E GÁS"
  },
  {
    "id": "3701100",
    "descricao": "GESTÃO DE REDES DE ESGOTO",
    "secao": "ÁGUA, ESGOTO, ATIVIDADES DE GESTÃO DE RESÍDUOS E DESCONTAMINAÇÃO"
  },
  {
    "id": "3702900",
    "descricao": "ATIVIDADES RELACIONADAS A ESGOTO, EXCETO A GESTÃO DE REDES",
    "secao": "ÁGUA, ESGOTO, ATIVIDADES DE GESTÃO DE RESÍDUOS E DESCONTAMINAÇÃO"
  },
  {
    "id": "3811400",
    "descricao": "COLETA DE RESÍDUOS NÃO PERIGOSOS",
    "secao": "ÁGUA, ESGOTO, ATIVIDADES DE GESTÃO DE RESÍDUOS E DESCONTAMINAÇÃO"
  },
  {
    "id": "4634601",
    "descricao": "COMÉRCIO ATACADISTA DE CARNES BOVINAS E SUÍNAS E DERIVADOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "3812200",
    "descricao": "COLETA DE RESÍDUOS PERIGOSOS",
    "secao": "ÁGUA, ESGOTO, ATIVIDADES DE GESTÃO DE RESÍDUOS E DESCONTAMINAÇÃO"
  },
  {
    "id": "3821100",
    "descricao": "TRATAMENTO E DISPOSIÇÃO DE RESÍDUOS NÃO PERIGOSOS",
    "secao": "ÁGUA, ESGOTO, ATIVIDADES DE GESTÃO DE RESÍDUOS E DESCONTAMINAÇÃO"
  },
  {
    "id": "3822000",
    "descricao": "TRATAMENTO E DISPOSIÇÃO DE RESÍDUOS PERIGOSOS",
    "secao": "ÁGUA, ESGOTO, ATIVIDADES DE GESTÃO DE RESÍDUOS E DESCONTAMINAÇÃO"
  },
  {
    "id": "3831901",
    "descricao": "RECUPERAÇÃO DE SUCATAS DE ALUMÍNIO",
    "secao": "ÁGUA, ESGOTO, ATIVIDADES DE GESTÃO DE RESÍDUOS E DESCONTAMINAÇÃO"
  },
  {
    "id": "4330403",
    "descricao": "OBRAS DE ACABAMENTO EM GESSO E ESTUQUE",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "3831999",
    "descricao": "RECUPERAÇÃO DE MATERIAIS METÁLICOS, EXCETO ALUMÍNIO",
    "secao": "ÁGUA, ESGOTO, ATIVIDADES DE GESTÃO DE RESÍDUOS E DESCONTAMINAÇÃO"
  },
  {
    "id": "3832700",
    "descricao": "RECUPERAÇÃO DE MATERIAIS PLÁSTICOS",
    "secao": "ÁGUA, ESGOTO, ATIVIDADES DE GESTÃO DE RESÍDUOS E DESCONTAMINAÇÃO"
  },
  {
    "id": "3839401",
    "descricao": "USINAS DE COMPOSTAGEM",
    "secao": "ÁGUA, ESGOTO, ATIVIDADES DE GESTÃO DE RESÍDUOS E DESCONTAMINAÇÃO"
  },
  {
    "id": "4311801",
    "descricao": "DEMOLIÇÃO DE EDIFÍCIOS E OUTRAS ESTRUTURAS",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "3839499",
    "descricao": "RECUPERAÇÃO DE MATERIAIS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "ÁGUA, ESGOTO, ATIVIDADES DE GESTÃO DE RESÍDUOS E DESCONTAMINAÇÃO"
  },
  {
    "id": "3900500",
    "descricao": "DESCONTAMINAÇÃO E OUTROS SERVIÇOS DE GESTÃO DE RESÍDUOS",
    "secao": "ÁGUA, ESGOTO, ATIVIDADES DE GESTÃO DE RESÍDUOS E DESCONTAMINAÇÃO"
  },
  {
    "id": "4110700",
    "descricao": "INCORPORAÇÃO DE EMPREENDIMENTOS IMOBILIÁRIOS",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4330404",
    "descricao": "SERVIÇOS DE PINTURA DE EDIFÍCIOS EM GERAL",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4623102",
    "descricao": "COMÉRCIO ATACADISTA DE COUROS, LÃS, PELES E OUTROS SUBPRODUTOS NÃO COMESTÍVEIS DE ORIGEM ANIMAL",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4120400",
    "descricao": "CONSTRUÇÃO DE EDIFÍCIOS",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4211101",
    "descricao": "CONSTRUÇÃO DE RODOVIAS E FERROVIAS",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4211102",
    "descricao": "PINTURA PARA SINALIZAÇÃO EM PISTAS RODOVIÁRIAS E AEROPORTOS",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4311802",
    "descricao": "PREPARAÇÃO DE CANTEIRO E LIMPEZA DE TERRENO",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4634602",
    "descricao": "COMÉRCIO ATACADISTA DE AVES ABATIDAS E DERIVADOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4213800",
    "descricao": "OBRAS DE URBANIZAÇÃO - RUAS, PRAÇAS E CALÇADAS",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4221901",
    "descricao": "CONSTRUÇÃO DE BARRAGENS E REPRESAS PARA GERAÇÃO DE ENERGIA ELÉTRICA",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4221902",
    "descricao": "CONSTRUÇÃO DE ESTAÇÕES E REDES DE DISTRIBUIÇÃO DE ENERGIA ELÉTRICA",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4221903",
    "descricao": "MANUTENÇÃO DE REDES DE DISTRIBUIÇÃO DE ENERGIA ELÉTRICA",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4221904",
    "descricao": "CONSTRUÇÃO DE ESTAÇÕES E REDES DE TELECOMUNICAÇÕES",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4623103",
    "descricao": "COMÉRCIO ATACADISTA DE ALGODÃO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4222701",
    "descricao": "CONSTRUÇÃO DE REDES DE ABASTECIMENTO DE ÁGUA, COLETA DE ESGOTO E CONSTRUÇÕES CORRELATAS, EXCETO OBRAS DE IRRIGAÇÃO",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4222702",
    "descricao": "OBRAS DE IRRIGAÇÃO",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4223500",
    "descricao": "CONSTRUÇÃO DE REDES DE TRANSPORTES POR DUTOS, EXCETO PARA ÁGUA E ESGOTO",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4291000",
    "descricao": "OBRAS PORTUÁRIAS, MARÍTIMAS E FLUVIAIS",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4292801",
    "descricao": "MONTAGEM DE ESTRUTURAS METÁLICAS",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4292802",
    "descricao": "OBRAS DE MONTAGEM INDUSTRIAL",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4299501",
    "descricao": "CONSTRUÇÃO DE INSTALAÇÕES ESPORTIVAS E RECREATIVAS",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4299599",
    "descricao": "OUTRAS OBRAS DE ENGENHARIA CIVIL NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4634603",
    "descricao": "COMÉRCIO ATACADISTA DE PESCADOS E FRUTOS DO MAR",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4312600",
    "descricao": "PERFURAÇÕES E SONDAGENS",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4313400",
    "descricao": "OBRAS DE TERRAPLENAGEM",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4319300",
    "descricao": "SERVIÇOS DE PREPARAÇÃO DO TERRENO NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4330405",
    "descricao": "APLICAÇÃO DE REVESTIMENTOS E DE RESINAS EM INTERIORES E EXTERIORES",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4321500",
    "descricao": "INSTALAÇÃO E MANUTENÇÃO ELÉTRICA",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4322301",
    "descricao": "INSTALAÇÕES HIDRÁULICAS, SANITÁRIAS E DE GÁS",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4322302",
    "descricao": "INSTALAÇÃO E MANUTENÇÃO DE SISTEMAS CENTRAIS DE AR CONDICIONADO, DE VENTILAÇÃO E REFRIGERAÇÃO",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4322303",
    "descricao": "INSTALAÇÕES DE SISTEMA DE PREVENÇÃO CONTRA INCÊNDIO",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4329101",
    "descricao": "INSTALAÇÃO DE PAINÉIS PUBLICITÁRIOS",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4329102",
    "descricao": "INSTALAÇÃO DE EQUIPAMENTOS PARA ORIENTAÇÃO À NAVEGAÇÃO MARÍTIMA FLUVIAL E LACUSTRE",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4329103",
    "descricao": "INSTALAÇÃO, MANUTENÇÃO E REPARAÇÃO DE ELEVADORES, ESCADAS E ESTEIRAS ROLANTES",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4520006",
    "descricao": "SERVIÇOS DE BORRACHARIA PARA VEÍCULOS AUTOMOTORES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4329104",
    "descricao": "MONTAGEM E INSTALAÇÃO DE SISTEMAS E EQUIPAMENTOS DE ILUMINAÇÃO E SINALIZAÇÃO EM VIAS PÚBLICAS, PORTOS E AEROPORTOS",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4329105",
    "descricao": "TRATAMENTOS TÉRMICOS, ACÚSTICOS OU DE VIBRAÇÃO",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4329199",
    "descricao": "OUTRAS OBRAS DE INSTALAÇÕES EM CONSTRUÇÕES NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4330401",
    "descricao": "IMPERMEABILIZAÇÃO EM OBRAS DE ENGENHARIA CIVIL",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4330402",
    "descricao": "INSTALAÇÃO DE PORTAS, JANELAS, TETOS, DIVISÓRIAS E ARMÁRIOS EMBUTIDOS DE QUALQUER MATERIAL",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4330499",
    "descricao": "OUTRAS OBRAS DE ACABAMENTO DA CONSTRUÇÃO",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4391600",
    "descricao": "OBRAS DE FUNDAÇÕES",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4399101",
    "descricao": "ADMINISTRAÇÃO DE OBRAS",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4399102",
    "descricao": "MONTAGEM E DESMONTAGEM DE ANDAIMES E OUTRAS ESTRUTURAS TEMPORÁRIAS",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4399103",
    "descricao": "OBRAS DE ALVENARIA",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4399104",
    "descricao": "SERVIÇOS DE OPERAÇÃO E FORNECIMENTO DE EQUIPAMENTOS PARA TRANSPORTE E ELEVAÇÃO DE CARGAS E PESSOAS PARA USO EM OBRAS",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4399105",
    "descricao": "PERFURAÇÃO E CONSTRUÇÃO DE POÇOS DE ÁGUA",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4399199",
    "descricao": "SERVIÇOS ESPECIALIZADOS PARA CONSTRUÇÃO NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "CONSTRUÇÃO"
  },
  {
    "id": "4511101",
    "descricao": "COMÉRCIO A VAREJO DE AUTOMÓVEIS, CAMIONETAS E UTILITÁRIOS NOVOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4511102",
    "descricao": "COMÉRCIO A VAREJO DE AUTOMÓVEIS, CAMIONETAS E UTILITÁRIOS USADOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4511103",
    "descricao": "COMÉRCIO POR ATACADO DE AUTOMÓVEIS, CAMIONETAS E UTILITÁRIOS NOVOS E USADOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4511104",
    "descricao": "COMÉRCIO POR ATACADO DE CAMINHÕES NOVOS E USADOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4511105",
    "descricao": "COMÉRCIO POR ATACADO DE REBOQUES E SEMI REBOQUES NOVOS E USADOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "5611204",
    "descricao": "BARES E OUTROS ESTABELECIMENTOS ESPECIALIZADOS EM SERVIR BEBIDAS, SEM ENTRETENIMENTO",
    "secao": "ALOJAMENTO E ALIMENTAÇÃO"
  },
  {
    "id": "4511106",
    "descricao": "COMÉRCIO POR ATACADO DE ÔNIBUS E MICROÔNIBUS NOVOS E USADOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4512901",
    "descricao": "REPRESENTANTES COMERCIAIS E AGENTES DO COMÉRCIO DE VEÍCULOS AUTOMOTORES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4512902",
    "descricao": "COMÉRCIO SOB CONSIGNAÇÃO DE VEÍCULOS AUTOMOTORES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4520001",
    "descricao": "SERVIÇOS DE MANUTENÇÃO E REPARAÇÃO MECÂNICA DE VEÍCULOS AUTOMOTORES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4520002",
    "descricao": "SERVIÇOS DE LANTERNAGEM OU FUNILARIA E PINTURA DE VEÍCULOS AUTOMOTORES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4520003",
    "descricao": "SERVIÇOS DE MANUTENÇÃO E REPARAÇÃO ELÉTRICA DE VEÍCULOS AUTOMOTORES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4520004",
    "descricao": "SERVIÇOS DE ALINHAMENTO E BALANCEAMENTO DE VEÍCULOS AUTOMOTORES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4520005",
    "descricao": "SERVIÇOS DE LAVAGEM, LUBRIFICAÇÃO E POLIMENTO DE VEÍCULOS AUTOMOTORES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4520007",
    "descricao": "SERVIÇOS DE INSTALAÇÃO, MANUTENÇÃO E REPARAÇÃO DE ACESSÓRIOS PARA VEÍCULOS AUTOMOTORES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4520008",
    "descricao": "SERVIÇOS DE CAPOTARIA",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4530701",
    "descricao": "COMÉRCIO POR ATACADO DE PEÇAS E ACESSÓRIOS NOVOS PARA VEÍCULOS AUTOMOTORES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4530702",
    "descricao": "COMÉRCIO POR ATACADO DE PNEUMÁTICOS E CÂMARAS DE AR",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4530703",
    "descricao": "COMÉRCIO A VAREJO DE PEÇAS E ACESSÓRIOS NOVOS PARA VEÍCULOS AUTOMOTORES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4623101",
    "descricao": "COMÉRCIO ATACADISTA DE ANIMAIS VIVOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4530704",
    "descricao": "COMÉRCIO A VAREJO DE PEÇAS E ACESSÓRIOS USADOS PARA VEÍCULOS AUTOMOTORES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4530705",
    "descricao": "COMÉRCIO A VAREJO DE PNEUMÁTICOS E CÂMARAS DE AR",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4530706",
    "descricao": "REPRESENTANTES COMERCIAIS E AGENTES DO COMÉRCIO DE PEÇAS E ACESSÓRIOS NOVOS E USADOS PARA VEÍCULOS AUTOMOTORES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4541201",
    "descricao": "COMÉRCIO POR ATACADO DE MOTOCICLETAS E MOTONETAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4541202",
    "descricao": "COMÉRCIO POR ATACADO DE PEÇAS E ACESSÓRIOS PARA MOTOCICLETAS E MOTONETAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4541203",
    "descricao": "COMÉRCIO A VAREJO DE MOTOCICLETAS E MOTONETAS NOVAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4541204",
    "descricao": "COMÉRCIO A VAREJO DE MOTOCICLETAS E MOTONETAS USADAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4618401",
    "descricao": "REPRESENTANTES COMERCIAIS E AGENTES DO COMÉRCIO DE MEDICAMENTOS, COSMÉTICOS E PRODUTOS DE PERFUMARIA",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4542101",
    "descricao": "REPRESENTANTES COMERCIAIS E AGENTES DO COMÉRCIO DE MOTOCICLETAS E MOTONETAS, PEÇAS E ACESSÓRIOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4542102",
    "descricao": "COMÉRCIO SOB CONSIGNAÇÃO DE MOTOCICLETAS E MOTONETAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4543900",
    "descricao": "MANUTENÇÃO E REPARAÇÃO DE MOTOCICLETAS E MOTONETAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4611700",
    "descricao": "REPRESENTANTES COMERCIAIS E AGENTES DO COMÉRCIO DE MATÉRIAS PRIMAS AGRÍCOLAS E ANIMAIS VIVOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4612500",
    "descricao": "REPRESENTANTES COMERCIAIS E AGENTES DO COMÉRCIO DE COMBUSTÍVEIS, MINERAIS, PRODUTOS SIDERÚRGICOS E QUÍMICOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4613300",
    "descricao": "REPRESENTANTES COMERCIAIS E AGENTES DO COMÉRCIO DE MADEIRA, MATERIAL DE CONSTRUÇÃO E FERRAGENS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4614100",
    "descricao": "REPRESENTANTES COMERCIAIS E AGENTES DO COMÉRCIO DE MÁQUINAS, EQUIPAMENTOS, EMBARCAÇÕES E AERONAVES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4615000",
    "descricao": "REPRESENTANTES COMERCIAIS E AGENTES DO COMÉRCIO DE ELETRODOMÉSTICOS, MÓVEIS E ARTIGOS DE USO DOMÉSTICO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4616800",
    "descricao": "REPRESENTANTES COMERCIAIS E AGENTES DO COMÉRCIO DE TÊXTEIS, VESTUÁRIO, CALÇADOS E ARTIGOS DE VIAGEM",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4617600",
    "descricao": "REPRESENTANTES COMERCIAIS E AGENTES DO COMÉRCIO DE PRODUTOS ALIMENTÍCIOS, BEBIDAS E FUMO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4618402",
    "descricao": "REPRESENTANTES COMERCIAIS E AGENTES DO COMÉRCIO DE INSTRUMENTOS E MATERIAIS ODONTO MÉDICO HOSPITALARES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4618403",
    "descricao": "REPRESENTANTES COMERCIAIS E AGENTES DO COMÉRCIO DE JORNAIS, REVISTAS E OUTRAS PUBLICAÇÕES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4618499",
    "descricao": "OUTROS REPRESENTANTES COMERCIAIS E AGENTES DO COMÉRCIO ESPECIALIZADO EM PRODUTOS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4619200",
    "descricao": "REPRESENTANTES COMERCIAIS E AGENTES DO COMÉRCIO DE MERCADORIAS EM GERAL NÃO ESPECIALIZADO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4621400",
    "descricao": "COMÉRCIO ATACADISTA DE CAFÉ EM GRÃO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4622200",
    "descricao": "COMÉRCIO ATACADISTA DE SOJA",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4623104",
    "descricao": "COMÉRCIO ATACADISTA DE FUMO EM FOLHA NÃO BENEFICIADO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4623108",
    "descricao": "COMÉRCIO ATACADISTA DE MATÉRIAS PRIMAS AGRÍCOLAS COM ATIVIDADE DE FRACIONAMENTO E ACONDICIONAMENTO ASSOCIADA",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4623109",
    "descricao": "COMÉRCIO ATACADISTA DE ALIMENTOS PARA ANIMAIS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4623199",
    "descricao": "COMÉRCIO ATACADISTA DE MATÉRIAS PRIMAS AGRÍCOLAS NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4631100",
    "descricao": "COMÉRCIO ATACADISTA DE LEITE E LATICÍNIOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4632001",
    "descricao": "COMÉRCIO ATACADISTA DE CEREAIS E LEGUMINOSAS BENEFICIADOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4632002",
    "descricao": "COMÉRCIO ATACADISTA DE FARINHAS, AMIDOS E FÉCULAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4632003",
    "descricao": "COMÉRCIO ATACADISTA DE CEREAIS E LEGUMINOSAS BENEFICIADOS, FARINHAS, AMIDOS E FÉCULAS, COM ATIVIDADE DE FRACIONAMENTO E ACONDICIONAMENTO ASSOCIADA",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4633801",
    "descricao": "COMÉRCIO ATACADISTA DE FRUTAS, VERDURAS, RAÍZES, TUBÉRCULOS, HORTALIÇAS E LEGUMES FRESCOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4633802",
    "descricao": "COMÉRCIO ATACADISTA DE AVES VIVAS E OVOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4634699",
    "descricao": "COMÉRCIO ATACADISTA DE CARNES E DERIVADOS DE OUTROS ANIMAIS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4635401",
    "descricao": "COMÉRCIO ATACADISTA DE ÁGUA MINERAL",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4635402",
    "descricao": "COMÉRCIO ATACADISTA DE CERVEJA, CHOPE E REFRIGERANTE",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4635403",
    "descricao": "COMÉRCIO ATACADISTA DE BEBIDAS COM ATIVIDADE DE FRACIONAMENTO E ACONDICIONAMENTO ASSOCIADA",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4635499",
    "descricao": "COMÉRCIO ATACADISTA DE BEBIDAS NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4636201",
    "descricao": "COMÉRCIO ATACADISTA DE FUMO BENEFICIADO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4636202",
    "descricao": "COMÉRCIO ATACADISTA DE CIGARROS, CIGARRILHAS E CHARUTOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4637101",
    "descricao": "COMÉRCIO ATACADISTA DE CAFÉ TORRADO, MOÍDO E SOLÚVEL",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4637102",
    "descricao": "COMÉRCIO ATACADISTA DE AÇÚCAR",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4637103",
    "descricao": "COMÉRCIO ATACADISTA DE ÓLEOS E GORDURAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4637104",
    "descricao": "COMÉRCIO ATACADISTA DE PÃES, BOLOS, BISCOITOS E SIMILARES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4637105",
    "descricao": "COMÉRCIO ATACADISTA DE MASSAS ALIMENTÍCIAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4637106",
    "descricao": "COMÉRCIO ATACADISTA DE SORVETES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4637107",
    "descricao": "COMÉRCIO ATACADISTA DE CHOCOLATES, CONFEITOS, BALAS, BOMBONS E SEMELHANTES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4637199",
    "descricao": "COMÉRCIO ATACADISTA ESPECIALIZADO EM OUTROS PRODUTOS ALIMENTÍCIOS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4639701",
    "descricao": "COMÉRCIO ATACADISTA DE PRODUTOS ALIMENTÍCIOS EM GERAL",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4639702",
    "descricao": "COMÉRCIO ATACADISTA DE PRODUTOS ALIMENTÍCIOS EM GERAL, COM ATIVIDADE DE FRACIONAMENTO E ACONDICIONAMENTO ASSOCIADA",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4641902",
    "descricao": "COMÉRCIO ATACADISTA DE ARTIGOS DE CAMA, MESA E BANHO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4641903",
    "descricao": "COMÉRCIO ATACADISTA DE ARTIGOS DE ARMARINHO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4642701",
    "descricao": "COMÉRCIO ATACADISTA DE ARTIGOS DO VESTUÁRIO E ACESSÓRIOS, EXCETO PROFISSIONAIS E DE SEGURANÇA",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4642702",
    "descricao": "COMÉRCIO ATACADISTA DE ROUPAS E ACESSÓRIOS PARA USO PROFISSIONAL E DE SEGURANÇA DO TRABALHO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4644301",
    "descricao": "COMÉRCIO ATACADISTA DE MEDICAMENTOS E DROGAS DE USO HUMANO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4644302",
    "descricao": "COMÉRCIO ATACADISTA DE MEDICAMENTOS E DROGAS DE USO VETERINÁRIO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4645101",
    "descricao": "COMÉRCIO ATACADISTA DE INSTRUMENTOS E MATERIAIS PARA USO MÉDICO, CIRÚRGICO, HOSPITALAR E DE LABORATÓRIOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4645102",
    "descricao": "COMÉRCIO ATACADISTA DE PRÓTESES E ARTIGOS DE ORTOPEDIA",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4645103",
    "descricao": "COMÉRCIO ATACADISTA DE PRODUTOS ODONTOLÓGICOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4646001",
    "descricao": "COMÉRCIO ATACADISTA DE COSMÉTICOS E PRODUTOS DE PERFUMARIA",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4646002",
    "descricao": "COMÉRCIO ATACADISTA DE PRODUTOS DE HIGIENE PESSOAL",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4647801",
    "descricao": "COMÉRCIO ATACADISTA DE ARTIGOS DE ESCRITÓRIO E DE PAPELARIA",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4647802",
    "descricao": "COMÉRCIO ATACADISTA DE LIVROS, JORNAIS E OUTRAS PUBLICAÇÕES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4679601",
    "descricao": "COMÉRCIO ATACADISTA DE TINTAS, VERNIZES E SIMILARES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4649401",
    "descricao": "COMÉRCIO ATACADISTA DE EQUIPAMENTOS ELÉTRICOS DE USO PESSOAL E DOMÉSTICO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4649402",
    "descricao": "COMÉRCIO ATACADISTA DE APARELHOS ELETRÔNICOS DE USO PESSOAL E DOMÉSTICO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4649403",
    "descricao": "COMÉRCIO ATACADISTA DE BICICLETAS, TRICICLOS E OUTROS VEÍCULOS RECREATIVOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4649404",
    "descricao": "COMÉRCIO ATACADISTA DE MÓVEIS E ARTIGOS DE COLCHOARIA",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4649405",
    "descricao": "COMÉRCIO ATACADISTA DE ARTIGOS DE TAPEÇARIA; PERSIANAS E CORTINAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4649406",
    "descricao": "COMÉRCIO ATACADISTA DE LUSTRES, LUMINÁRIAS E ABAJURES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4649407",
    "descricao": "COMÉRCIO ATACADISTA DE FILMES, CDS, DVDS, FITAS E DISCOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4649408",
    "descricao": "COMÉRCIO ATACADISTA DE PRODUTOS DE HIGIENE, LIMPEZA E CONSERVAÇÃO DOMICILIAR",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4649409",
    "descricao": "COMÉRCIO ATACADISTA DE PRODUTOS DE HIGIENE, LIMPEZA E CONSERVAÇÃO DOMICILIAR, COM ATIVIDADE DE FRACIONAMENTO E ACONDICIONAMENTO ASSOCIADA",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4649410",
    "descricao": "COMÉRCIO ATACADISTA DE JÓIAS, RELÓGIOS E BIJUTERIAS, INCLUSIVE PEDRAS PRECIOSAS E SEMIPRECIOSAS LAPIDADAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4649499",
    "descricao": "COMÉRCIO ATACADISTA DE OUTROS EQUIPAMENTOS E ARTIGOS DE USO PESSOAL E DOMÉSTICO NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4651601",
    "descricao": "COMÉRCIO ATACADISTA DE EQUIPAMENTOS DE INFORMÁTICA",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4651602",
    "descricao": "COMÉRCIO ATACADISTA DE SUPRIMENTOS PARA INFORMÁTICA",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4652400",
    "descricao": "COMÉRCIO ATACADISTA DE COMPONENTES ELETRÔNICOS E EQUIPAMENTOS DE TELEFONIA E COMUNICAÇÃO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4661300",
    "descricao": "COMÉRCIO ATACADISTA DE MÁQUINAS, APARELHOS E EQUIPAMENTOS PARA USO AGROPECUÁRIO; PARTES E PEÇAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4679602",
    "descricao": "COMÉRCIO ATACADISTA DE MÁRMORES E GRANITOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4662100",
    "descricao": "COMÉRCIO ATACADISTA DE MÁQUINAS, EQUIPAMENTOS PARA TERRAPLENAGEM, MINERAÇÃO E CONSTRUÇÃO; PARTES E PEÇAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4663000",
    "descricao": "COMÉRCIO ATACADISTA DE MÁQUINAS E EQUIPAMENTOS PARA USO INDUSTRIAL; PARTES E PEÇAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4664800",
    "descricao": "COMÉRCIO ATACADISTA DE MÁQUINAS, APARELHOS E EQUIPAMENTOS PARA USO ODONTO MÉDICO HOSPITALAR; PARTES E PEÇAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4665600",
    "descricao": "COMÉRCIO ATACADISTA DE MÁQUINAS E EQUIPAMENTOS PARA USO COMERCIAL; PARTES E PEÇAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4669901",
    "descricao": "COMÉRCIO ATACADISTA DE BOMBAS E COMPRESSORES; PARTES E PEÇAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4741500",
    "descricao": "COMÉRCIO VAREJISTA DE TINTAS E MATERIAIS PARA PINTURA",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4669999",
    "descricao": "COMÉRCIO ATACADISTA DE OUTRAS MÁQUINAS E EQUIPAMENTOS NÃO ESPECIFICADOS ANTERIORMENTE; PARTES E PEÇAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4671100",
    "descricao": "COMÉRCIO ATACADISTA DE MADEIRA E PRODUTOS DERIVADOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4672900",
    "descricao": "COMÉRCIO ATACADISTA DE FERRAGENS E FERRAMENTAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4673700",
    "descricao": "COMÉRCIO ATACADISTA DE MATERIAL ELÉTRICO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4674500",
    "descricao": "COMÉRCIO ATACADISTA DE CIMENTO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4679603",
    "descricao": "COMÉRCIO ATACADISTA DE VIDROS, ESPELHOS E VITRAIS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4679604",
    "descricao": "COMÉRCIO ATACADISTA ESPECIALIZADO DE MATERIAIS DE CONSTRUÇÃO NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4681801",
    "descricao": "COMÉRCIO ATACADISTA DE ÁLCOOL CARBURANTE, BIODIESEL, GASOLINA E DEMAIS DERIVADOS DE PETRÓLEO, EXCETO LUBRIFICANTES, NÃO REALIZADO POR TRANSPORTADOR RETALHISTA (T.R.R.)",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4681802",
    "descricao": "COMÉRCIO ATACADISTA DE COMBUSTÍVEIS REALIZADO POR TRANSPORTADOR RETALHISTA (T.R.R.)",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4681803",
    "descricao": "COMÉRCIO ATACADISTA DE COMBUSTÍVEIS DE ORIGEM VEGETAL, EXCETO ÁLCOOL CARBURANTE",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4681804",
    "descricao": "COMÉRCIO ATACADISTA DE COMBUSTÍVEIS DE ORIGEM MINERAL EM BRUTO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4681805",
    "descricao": "COMÉRCIO ATACADISTA DE LUBRIFICANTES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4682600",
    "descricao": "COMÉRCIO ATACADISTA DE GÁS LIQÜEFEITO DE PETRÓLEO (GLP)",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4683400",
    "descricao": "COMÉRCIO ATACADISTA DE DEFENSIVOS AGRÍCOLAS, ADUBOS, FERTILIZANTES E CORRETIVOS DO SOLO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4684201",
    "descricao": "COMÉRCIO ATACADISTA DE RESINAS E ELASTÔMEROS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4684202",
    "descricao": "COMÉRCIO ATACADISTA DE SOLVENTES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4684299",
    "descricao": "COMÉRCIO ATACADISTA DE OUTROS PRODUTOS QUÍMICOS E PETROQUÍMICOS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4685100",
    "descricao": "COMÉRCIO ATACADISTA DE PRODUTOS SIDERÚRGICOS E METALÚRGICOS, EXCETO PARA CONSTRUÇÃO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4686901",
    "descricao": "COMÉRCIO ATACADISTA DE PAPEL E PAPELÃO EM BRUTO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4686902",
    "descricao": "COMÉRCIO ATACADISTA DE EMBALAGENS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4687701",
    "descricao": "COMÉRCIO ATACADISTA DE RESÍDUOS DE PAPEL E PAPELÃO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4721103",
    "descricao": "COMÉRCIO VAREJISTA DE LATICÍNIOS E FRIOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4687702",
    "descricao": "COMÉRCIO ATACADISTA DE RESÍDUOS E SUCATAS NÃO METÁLICOS, EXCETO DE PAPEL E PAPELÃO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4687703",
    "descricao": "COMÉRCIO ATACADISTA DE RESÍDUOS E SUCATAS METÁLICOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4689301",
    "descricao": "COMÉRCIO ATACADISTA DE PRODUTOS DA EXTRAÇÃO MINERAL, EXCETO COMBUSTÍVEIS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4689302",
    "descricao": "COMÉRCIO ATACADISTA DE FIOS E FIBRAS BENEFICIADOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4689399",
    "descricao": "COMÉRCIO ATACADISTA ESPECIALIZADO EM OUTROS PRODUTOS INTERMEDIÁRIOS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4691500",
    "descricao": "COMÉRCIO ATACADISTA DE MERCADORIAS EM GERAL, COM PREDOMINÂNCIA DE PRODUTOS ALIMENTÍCIOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4692300",
    "descricao": "COMÉRCIO ATACADISTA DE MERCADORIAS EM GERAL, COM PREDOMINÂNCIA DE INSUMOS AGROPECUÁRIOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4693100",
    "descricao": "COMÉRCIO ATACADISTA DE MERCADORIAS EM GERAL, SEM PREDOMINÂNCIA DE ALIMENTOS OU DE INSUMOS AGROPECUÁRIOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4774100",
    "descricao": "COMÉRCIO VAREJISTA DE ARTIGOS DE ÓPTICA",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4711301",
    "descricao": "COMÉRCIO VAREJISTA DE MERCADORIAS EM GERAL, COM PREDOMINÂNCIA DE PRODUTOS ALIMENTÍCIOS   HIPERMERCADOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4711302",
    "descricao": "COMÉRCIO VAREJISTA DE MERCADORIAS EM GERAL, COM PREDOMINÂNCIA DE PRODUTOS ALIMENTÍCIOS - SUPERMERCADOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4712100",
    "descricao": "COMÉRCIO VAREJISTA DE MERCADORIAS EM GERAL, COM PREDOMINÂNCIA DE PRODUTOS ALIMENTÍCIOS - MINIMERCADOS, MERCEARIAS E ARMAZÉNS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4713002",
    "descricao": "LOJAS DE VARIEDADES, EXCETO LOJAS DE DEPARTAMENTOS OU MAGAZINES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4721102",
    "descricao": "PADARIA E CONFEITARIA COM PREDOMINÂNCIA DE REVENDA",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4721104",
    "descricao": "COMÉRCIO VAREJISTA DE DOCES, BALAS, BOMBONS E SEMELHANTES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4722901",
    "descricao": "COMÉRCIO VAREJISTA DE CARNES - AÇOUGUES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4722902",
    "descricao": "PEIXARIA",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4723700",
    "descricao": "COMÉRCIO VAREJISTA DE BEBIDAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4729602",
    "descricao": "COMÉRCIO VAREJISTA DE MERCADORIAS EM LOJAS DE CONVENIÊNCIA",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4729699",
    "descricao": "COMÉRCIO VAREJISTA DE PRODUTOS ALIMENTÍCIOS EM GERAL OU ESPECIALIZADO EM PRODUTOS ALIMENTÍCIOS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4731800",
    "descricao": "COMÉRCIO VAREJISTA DE COMBUSTÍVEIS PARA VEÍCULOS AUTOMOTORES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4742300",
    "descricao": "COMÉRCIO VAREJISTA DE MATERIAL ELÉTRICO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4743100",
    "descricao": "COMÉRCIO VAREJISTA DE VIDROS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4744001",
    "descricao": "COMÉRCIO VAREJISTA DE FERRAGENS E FERRAMENTAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4744002",
    "descricao": "COMÉRCIO VAREJISTA DE MADEIRA E ARTEFATOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4744003",
    "descricao": "COMÉRCIO VAREJISTA DE MATERIAIS HIDRÁULICOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4744004",
    "descricao": "COMÉRCIO VAREJISTA DE CAL, AREIA, PEDRA BRITADA, TIJOLOS E TELHAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4744005",
    "descricao": "COMÉRCIO VAREJISTA DE MATERIAIS DE CONSTRUÇÃO NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4744006",
    "descricao": "COMÉRCIO VAREJISTA DE PEDRAS PARA REVESTIMENTO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4744099",
    "descricao": "COMÉRCIO VAREJISTA DE MATERIAIS DE CONSTRUÇÃO EM GERAL",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4751201",
    "descricao": "COMÉRCIO VAREJISTA ESPECIALIZADO DE EQUIPAMENTOS E SUPRIMENTOS DE INFORMÁTICA",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4751202",
    "descricao": "RECARGA DE CARTUCHOS PARA EQUIPAMENTOS DE INFORMÁTICA",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4752100",
    "descricao": "COMÉRCIO VAREJISTA ESPECIALIZADO DE EQUIPAMENTOS DE TELEFONIA E COMUNICAÇÃO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4753900",
    "descricao": "COMÉRCIO VAREJISTA ESPECIALIZADO DE ELETRODOMÉSTICOS E EQUIPAMENTOS DE ÁUDIO E VÍDEO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4754701",
    "descricao": "COMÉRCIO VAREJISTA DE MÓVEIS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4754702",
    "descricao": "COMÉRCIO VAREJISTA DE ARTIGOS DE COLCHOARIA",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4754703",
    "descricao": "COMÉRCIO VAREJISTA DE ARTIGOS DE ILUMINAÇÃO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4755501",
    "descricao": "COMÉRCIO VAREJISTA DE TECIDOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4755502",
    "descricao": "COMERCIO VAREJISTA DE ARTIGOS DE ARMARINHO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4755503",
    "descricao": "COMERCIO VAREJISTA DE ARTIGOS DE CAMA, MESA E BANHO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4756300",
    "descricao": "COMÉRCIO VAREJISTA ESPECIALIZADO DE INSTRUMENTOS MUSICAIS E ACESSÓRIOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "5320201",
    "descricao": "SERVIÇOS DE MALOTE NÃO REALIZADOS PELO CORREIO NACIONAL",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "4757100",
    "descricao": "COMÉRCIO VAREJISTA ESPECIALIZADO DE PEÇAS E ACESSÓRIOS PARA APARELHOS ELETROELETRÔNICOS PARA USO DOMÉSTICO, EXCETO INFORMÁTICA E COMUNICAÇÃO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4759801",
    "descricao": "COMÉRCIO VAREJISTA DE ARTIGOS DE TAPEÇARIA, CORTINAS E PERSIANAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4759899",
    "descricao": "COMÉRCIO VAREJISTA DE OUTROS ARTIGOS DE USO PESSOAL E DOMÉSTICO NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4761001",
    "descricao": "COMÉRCIO VAREJISTA DE LIVROS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4761002",
    "descricao": "COMÉRCIO VAREJISTA DE JORNAIS E REVISTAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4761003",
    "descricao": "COMÉRCIO VAREJISTA DE ARTIGOS DE PAPELARIA",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4762800",
    "descricao": "COMÉRCIO VAREJISTA DE DISCOS, CDS, DVDS E FITAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4763601",
    "descricao": "COMÉRCIO VAREJISTA DE BRINQUEDOS E ARTIGOS RECREATIVOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4763602",
    "descricao": "COMÉRCIO VAREJISTA DE ARTIGOS ESPORTIVOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4763605",
    "descricao": "COMÉRCIO VAREJISTA DE EMBARCAÇÕES E OUTROS VEÍCULOS RECREATIVOS; PEÇAS E ACESSÓRIOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4771701",
    "descricao": "COMÉRCIO VAREJISTA DE PRODUTOS FARMACÊUTICOS, SEM MANIPULAÇÃO DE FÓRMULAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4771702",
    "descricao": "COMÉRCIO VAREJISTA DE PRODUTOS FARMACÊUTICOS, COM MANIPULAÇÃO DE FÓRMULAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4771703",
    "descricao": "COMÉRCIO VAREJISTA DE PRODUTOS FARMACÊUTICOS HOMEOPÁTICOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4771704",
    "descricao": "COMÉRCIO VAREJISTA DE MEDICAMENTOS VETERINÁRIOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4772500",
    "descricao": "COMÉRCIO VAREJISTA DE COSMÉTICOS, PRODUTOS DE PERFUMARIA E DE HIGIENE PESSOAL",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4773300",
    "descricao": "COMÉRCIO VAREJISTA DE ARTIGOS MÉDICOS E ORTOPÉDICOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4781400",
    "descricao": "COMÉRCIO VAREJISTA DE ARTIGOS DO VESTUÁRIO E ACESSÓRIOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4782201",
    "descricao": "COMÉRCIO VAREJISTA DE CALÇADOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4782202",
    "descricao": "COMÉRCIO VAREJISTA DE ARTIGOS DE VIAGEM",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4783101",
    "descricao": "COMÉRCIO VAREJISTA DE ARTIGOS DE JOALHERIA",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4783102",
    "descricao": "COMÉRCIO VAREJISTA DE ARTIGOS DE RELOJOARIA",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4784900",
    "descricao": "COMÉRCIO VAREJISTA DE GÁS LIQÜEFEITO DE PETRÓLEO (GLP)",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4785701",
    "descricao": "COMÉRCIO VAREJISTA DE ANTIGÜIDADES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4785799",
    "descricao": "COMÉRCIO VAREJISTA DE OUTROS ARTIGOS USADOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4789001",
    "descricao": "COMÉRCIO VAREJISTA DE SUVENIRES, BIJUTERIAS E ARTESANATOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4789002",
    "descricao": "COMÉRCIO VAREJISTA DE PLANTAS E FLORES NATURAIS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4789003",
    "descricao": "COMÉRCIO VAREJISTA DE OBJETOS DE ARTE",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4789004",
    "descricao": "COMÉRCIO VAREJISTA DE ANIMAIS VIVOS E DE ARTIGOS E ALIMENTOS PARA ANIMAIS DE ESTIMAÇÃO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4789005",
    "descricao": "COMÉRCIO VAREJISTA DE PRODUTOS SANEANTES DOMISSANITÁRIOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4789006",
    "descricao": "COMÉRCIO VAREJISTA DE FOGOS DE ARTIFÍCIO E ARTIGOS PIROTÉCNICOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4789007",
    "descricao": "COMÉRCIO VAREJISTA DE EQUIPAMENTOS PARA ESCRITÓRIO",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4789008",
    "descricao": "COMÉRCIO VAREJISTA DE ARTIGOS FOTOGRÁFICOS E PARA FILMAGEM",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4789009",
    "descricao": "COMÉRCIO VAREJISTA DE ARMAS E MUNIÇÕES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4789099",
    "descricao": "COMÉRCIO VAREJISTA DE OUTROS PRODUTOS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4911600",
    "descricao": "TRANSPORTE FERROVIÁRIO DE CARGA",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "4912401",
    "descricao": "TRANSPORTE FERROVIÁRIO DE PASSAGEIROS INTERMUNICIPAL E INTERESTADUAL",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "4912402",
    "descricao": "TRANSPORTE FERROVIÁRIO DE PASSAGEIROS MUNICIPAL E EM REGIÃO METROPOLITANA",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "4912403",
    "descricao": "TRANSPORTE METROVIÁRIO",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "4921301",
    "descricao": "TRANSPORTE RODOVIÁRIO COLETIVO DE PASSAGEIROS, COM ITINERÁRIO FIXO, MUNICIPAL",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "4921302",
    "descricao": "TRANSPORTE RODOVIÁRIO COLETIVO DE PASSAGEIROS, COM ITINERÁRIO FIXO, INTERMUNICIPAL EM REGIÃO METROPOLITANA",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "4922101",
    "descricao": "TRANSPORTE RODOVIÁRIO COLETIVO DE PASSAGEIROS, COM ITINERÁRIO FIXO, INTERMUNICIPAL, EXCETO EM REGIÃO METROPOLITANA",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "4922102",
    "descricao": "TRANSPORTE RODOVIÁRIO COLETIVO DE PASSAGEIROS, COM ITINERÁRIO FIXO, INTERESTADUAL",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "4922103",
    "descricao": "TRANSPORTE RODOVIÁRIO COLETIVO DE PASSAGEIROS, COM ITINERÁRIO FIXO, INTERNACIONAL",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "4923001",
    "descricao": "SERVIÇO DE TÁXI",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "4923002",
    "descricao": "SERVIÇO DE TRANSPORTE DE PASSAGEIROS - LOCAÇÃO DE AUTOMÓVEIS COM MOTORISTA",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "4929901",
    "descricao": "TRANSPORTE RODOVIÁRIO COLETIVO DE PASSAGEIROS, SOB REGIME DE FRETAMENTO, MUNICIPAL",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "4929903",
    "descricao": "ORGANIZAÇÃO DE EXCURSÕES EM VEÍCULOS RODOVIÁRIOS PRÓPRIOS, MUNICIPAL",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "4929904",
    "descricao": "ORGANIZAÇÃO DE EXCURSÕES EM VEÍCULOS RODOVIÁRIOS PRÓPRIOS, INTERMUNICIPAL, INTERESTADUAL E INTERNACIONAL",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "4929999",
    "descricao": "OUTROS TRANSPORTES RODOVIÁRIOS DE PASSAGEIROS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "4930201",
    "descricao": "TRANSPORTE RODOVIÁRIO DE CARGA, EXCETO PRODUTOS PERIGOSOS E MUDANÇAS, MUNICIPAL",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "4930202",
    "descricao": "TRANSPORTE RODOVIÁRIO DE CARGA, EXCETO PRODUTOS PERIGOSOS E MUDANÇAS, INTERMUNICIPAL, INTERESTADUAL E INTERNACIONAL",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "4930203",
    "descricao": "TRANSPORTE RODOVIÁRIO DE PRODUTOS PERIGOSOS",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "4930204",
    "descricao": "TRANSPORTE RODOVIÁRIO DE MUDANÇAS",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "4940000",
    "descricao": "TRANSPORTE DUTOVIÁRIO",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "4950700",
    "descricao": "TRENS TURÍSTICOS, TELEFÉRICOS E SIMILARES",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5011401",
    "descricao": "TRANSPORTE MARÍTIMO DE CABOTAGEM - CARGA",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5011402",
    "descricao": "TRANSPORTE MARÍTIMO DE CABOTAGEM - PASSAGEIROS",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5012201",
    "descricao": "TRANSPORTE MARÍTIMO DE LONGO CURSO - CARGA",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5012202",
    "descricao": "TRANSPORTE MARÍTIMO DE LONGO CURSO - PASSAGEIROS",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "6612602",
    "descricao": "DISTRIBUIDORAS DE TÍTULOS E VALORES MOBILIÁRIOS",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "5021101",
    "descricao": "TRANSPORTE POR NAVEGAÇÃO INTERIOR DE CARGA, MUNICIPAL, EXCETO TRAVESSIA",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5021102",
    "descricao": "TRANSPORTE POR NAVEGAÇÃO INTERIOR DE CARGA, INTERMUNICIPAL, INTERESTADUAL E INTERNACIONAL, EXCETO TRAVESSIA",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5022001",
    "descricao": "TRANSPORTE POR NAVEGAÇÃO INTERIOR DE PASSAGEIROS EM LINHAS REGULARES, MUNICIPAL, EXCETO TRAVESSIA",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5022002",
    "descricao": "TRANSPORTE POR NAVEGAÇÃO INTERIOR DE PASSAGEIROS EM LINHAS REGULARES, INTERMUNICIPAL, INTERESTADUAL E INTERNACIONAL, EXCETO TRAVESSIA",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5030101",
    "descricao": "NAVEGAÇÃO DE APOIO MARÍTIMO",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5030102",
    "descricao": "NAVEGAÇÃO DE APOIO PORTUÁRIO",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5030103",
    "descricao": "SERVIÇO DE REBOCADORES E EMPURRADORES",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5091201",
    "descricao": "TRANSPORTE POR NAVEGAÇÃO DE TRAVESSIA, MUNICIPAL",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5091202",
    "descricao": "TRANSPORTE POR NAVEGAÇÃO DE TRAVESSIA INTERMUNICIPAL, INTERESTADUAL E INTERNACIONAL",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5099801",
    "descricao": "TRANSPORTE AQUAVIÁRIO PARA PASSEIOS TURÍSTICOS",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5099899",
    "descricao": "OUTROS TRANSPORTES AQUAVIÁRIOS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5111100",
    "descricao": "TRANSPORTE AÉREO DE PASSAGEIROS REGULAR",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5112901",
    "descricao": "SERVIÇO DE TÁXI AÉREO E LOCAÇÃO DE AERONAVES COM TRIPULAÇÃO",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5112999",
    "descricao": "OUTROS SERVIÇOS DE TRANSPORTE AÉREO DE PASSAGEIROS NÃO REGULAR",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5120000",
    "descricao": "TRANSPORTE AÉREO DE CARGA",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5130700",
    "descricao": "TRANSPORTE ESPACIAL",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5211701",
    "descricao": "ARMAZÉNS GERAIS - EMISSÃO DE WARRANT",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5211702",
    "descricao": "GUARDA MÓVEIS",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "6612603",
    "descricao": "CORRETORAS DE CÂMBIO",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "5211799",
    "descricao": "DEPÓSITOS DE MERCADORIAS PARA TERCEIROS, EXCETO ARMAZÉNS GERAIS E GUARDA MÓVEIS",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5212500",
    "descricao": "CARGA E DESCARGA",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5221400",
    "descricao": "CONCESSIONÁRIAS DE RODOVIAS, PONTES, TÚNEIS E SERVIÇOS RELACIONADOS",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5222200",
    "descricao": "TERMINAIS RODOVIÁRIOS E FERROVIÁRIOS",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5223100",
    "descricao": "ESTACIONAMENTO DE VEÍCULOS",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5229001",
    "descricao": "SERVIÇOS DE APOIO AO TRANSPORTE POR TÁXI, INCLUSIVE CENTRAIS DE CHAMADA",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5229002",
    "descricao": "SERVIÇOS DE REBOQUE DE VEÍCULOS",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "8650006",
    "descricao": "ATIVIDADES DE FONOAUDIOLOGIA",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "5229099",
    "descricao": "OUTRAS ATIVIDADES AUXILIARES DOS TRANSPORTES TERRESTRES NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5231101",
    "descricao": "ADMINISTRAÇÃO DA INFRAESTRUTURA PORTUÁRIA",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5231102",
    "descricao": "ATIVIDADES DO OPERADOR PORTUÁRIO",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5231103",
    "descricao": "GESTÃO DE TERMINAIS AQUAVIÁRIOS",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5232000",
    "descricao": "ATIVIDADES DE AGENCIAMENTO MARÍTIMO",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5239701",
    "descricao": "SERVIÇOS DE PRATICAGEM",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5239799",
    "descricao": "ATIVIDADES AUXILIARES DOS TRANSPORTES AQUAVIÁRIOS NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5240101",
    "descricao": "OPERAÇÃO DOS AEROPORTOS E CAMPOS DE ATERRISSAGEM",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5620101",
    "descricao": "FORNECIMENTO DE ALIMENTOS PREPARADOS PREPONDERANTEMENTE PARA EMPRESAS",
    "secao": "ALOJAMENTO E ALIMENTAÇÃO"
  },
  {
    "id": "5620103",
    "descricao": "CANTINAS - SERVIÇOS DE ALIMENTAÇÃO PRIVATIVOS",
    "secao": "ALOJAMENTO E ALIMENTAÇÃO"
  },
  {
    "id": "5620104",
    "descricao": "FORNECIMENTO DE ALIMENTOS PREPARADOS PREPONDERANTEMENTE PARA CONSUMO DOMICILIAR",
    "secao": "ALOJAMENTO E ALIMENTAÇÃO"
  },
  {
    "id": "5240199",
    "descricao": "ATIVIDADES AUXILIARES DOS TRANSPORTES AÉREOS, EXCETO OPERAÇÃO DOS AEROPORTOS E CAMPOS DE ATERRISSAGEM",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5250801",
    "descricao": "COMISSARIA DE DESPACHOS",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5250802",
    "descricao": "ATIVIDADES DE DESPACHANTES ADUANEIROS",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5250803",
    "descricao": "AGENCIAMENTO DE CARGAS, EXCETO PARA O TRANSPORTE MARÍTIMO",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5250804",
    "descricao": "ORGANIZAÇÃO LOGÍSTICA DO TRANSPORTE DE CARGA",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5250805",
    "descricao": "OPERADOR DE TRANSPORTE MULTIMODAL - OTM",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5310501",
    "descricao": "ATIVIDADES DO CORREIO NACIONAL",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5310502",
    "descricao": "ATIVIDADES DE FRANQUEADAS DO CORREIO NACIONAL",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5320202",
    "descricao": "SERVIÇOS DE ENTREGA RÁPIDA",
    "secao": "TRANSPORTE, ARMAZENAGEM E CORREIO"
  },
  {
    "id": "5510801",
    "descricao": "HOTÉIS",
    "secao": "ALOJAMENTO E ALIMENTAÇÃO"
  },
  {
    "id": "5510802",
    "descricao": "APART HOTÉIS",
    "secao": "ALOJAMENTO E ALIMENTAÇÃO"
  },
  {
    "id": "5510803",
    "descricao": "MOTÉIS",
    "secao": "ALOJAMENTO E ALIMENTAÇÃO"
  },
  {
    "id": "5590601",
    "descricao": "ALBERGUES, EXCETO ASSISTENCIAIS",
    "secao": "ALOJAMENTO E ALIMENTAÇÃO"
  },
  {
    "id": "5590602",
    "descricao": "CAMPINGS",
    "secao": "ALOJAMENTO E ALIMENTAÇÃO"
  },
  {
    "id": "5590603",
    "descricao": "PENSÕES(ALOJAMENTO)",
    "secao": "ALOJAMENTO E ALIMENTAÇÃO"
  },
  {
    "id": "5590699",
    "descricao": "OUTROS ALOJAMENTOS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "ALOJAMENTO E ALIMENTAÇÃO"
  },
  {
    "id": "5611201",
    "descricao": "RESTAURANTES E SIMILARES",
    "secao": "ALOJAMENTO E ALIMENTAÇÃO"
  },
  {
    "id": "5611203",
    "descricao": "LANCHONETES, CASAS DE CHÁ, DE SUCOS E SIMILARES",
    "secao": "ALOJAMENTO E ALIMENTAÇÃO"
  },
  {
    "id": "5612100",
    "descricao": "SERVIÇOS AMBULANTES DE ALIMENTAÇÃO",
    "secao": "ALOJAMENTO E ALIMENTAÇÃO"
  },
  {
    "id": "5811500",
    "descricao": "EDIÇÃO DE LIVROS",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "5812301",
    "descricao": "EDIÇÃO DE JORNAIS DIÁRIOS",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "5812302",
    "descricao": "EDIÇÃO DE JORNAIS NÃO DIÁRIOS",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "5813100",
    "descricao": "EDIÇÃO DE REVISTAS",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "6201502",
    "descricao": "WEB DESIGN",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "5819100",
    "descricao": "EDIÇÃO DE CADASTROS, LISTAS E DE OUTROS PRODUTOS GRÁFICOS",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "5821200",
    "descricao": "EDIÇÃO INTEGRADA À IMPRESSÃO DE LIVROS",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "5822101",
    "descricao": "EDIÇÃO INTEGRADA À IMPRESSÃO DE JORNAIS DIÁRIOS",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "5822102",
    "descricao": "EDIÇÃO INTEGRADA À IMPRESSÃO DE JORNAIS NÃO DIÁRIOS",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "5823900",
    "descricao": "EDIÇÃO INTEGRADA À IMPRESSÃO DE REVISTAS",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "5829800",
    "descricao": "EDIÇÃO INTEGRADA À IMPRESSÃO DE CADASTROS, LISTAS E DE OUTROS PRODUTOS GRÁFICOS",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "6110803",
    "descricao": "SERVIÇOS DE COMUNICAÇÃO MULTIMÍDIA - SCM",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "6120501",
    "descricao": "TELEFONIA MÓVEL CELULAR",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "5911101",
    "descricao": "ESTÚDIOS CINEMATOGRÁFICOS",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "5911102",
    "descricao": "PRODUÇÃO DE FILMES PARA PUBLICIDADE",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "5911199",
    "descricao": "ATIVIDADES DE PRODUÇÃO CINEMATOGRÁFICA, DE VÍDEOS E DE PROGRAMAS DE TELEVISÃO NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "5912001",
    "descricao": "SERVIÇOS DE DUBLAGEM",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "5912002",
    "descricao": "SERVIÇOS DE MIXAGEM SONORA EM PRODUÇÃO AUDIOVISUAL",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "7220700",
    "descricao": "PESQUISA E DESENVOLVIMENTO EXPERIMENTAL EM CIÊNCIAS SOCIAIS E HUMANAS",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "5912099",
    "descricao": "ATIVIDADES DE PÓS PRODUÇÃO CINEMATOGRÁFICA, DE VÍDEOS E DE PROGRAMAS DE TELEVISÃO NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "5913800",
    "descricao": "DISTRIBUIÇÃO CINEMATOGRÁFICA, DE VÍDEO E DE PROGRAMAS DE TELEVISÃO",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "5914600",
    "descricao": "ATIVIDADES DE EXIBIÇÃO CINEMATOGRÁFICA",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "6110899",
    "descricao": "SERVIÇOS DE TELECOMUNICAÇÕES POR FIO NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "6550200",
    "descricao": "PLANOS DE SAÚDE",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "5920100",
    "descricao": "ATIVIDADES DE GRAVAÇÃO DE SOM E DE EDIÇÃO DE MÚSICA",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "6010100",
    "descricao": "ATIVIDADES DE RÁDIO",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "6021700",
    "descricao": "ATIVIDADES DE TELEVISÃO ABERTA",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "6022501",
    "descricao": "PROGRAMADORAS",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "6022502",
    "descricao": "ATIVIDADES RELACIONADAS À TELEVISÃO POR ASSINATURA, EXCETO PROGRAMADORAS",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "6462000",
    "descricao": "HOLDINGS DE INSTITUIÇÕES NÃO FINANCEIRAS",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6110801",
    "descricao": "SERVIÇOS DE TELEFONIA FIXA COMUTADA - STFC",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "6110802",
    "descricao": "SERVIÇOS DE REDES DE TRANSPORTES DE TELECOMUNICAÇÕES - SRTT",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "6612604",
    "descricao": "CORRETORAS DE CONTRATOS DE MERCADORIAS",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6120502",
    "descricao": "SERVIÇO MÓVEL ESPECIALIZADO - SME",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "6120599",
    "descricao": "SERVIÇOS DE TELECOMUNICAÇÕES SEM FIO NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "6201501",
    "descricao": "DESENVOLVIMENTO DE PROGRAMAS DE COMPUTADOR SOB ENCOMENDA",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "6130200",
    "descricao": "TELECOMUNICAÇÕES POR SATÉLITE",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "6141800",
    "descricao": "OPERADORAS DE TELEVISÃO POR ASSINATURA POR CABO",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "6470102",
    "descricao": "FUNDOS DE INVESTIMENTO PREVIDENCIÁRIOS",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6142600",
    "descricao": "OPERADORAS DE TELEVISÃO POR ASSINATURA POR MICROONDAS",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "6143400",
    "descricao": "OPERADORAS DE TELEVISÃO POR ASSINATURA POR SATÉLITE",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "6190601",
    "descricao": "PROVEDORES DE ACESSO ÀS REDES DE COMUNICAÇÕES",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "6190602",
    "descricao": "PROVEDORES DE VOZ SOBRE PROTOCOLO INTERNET - VOIP",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "6190699",
    "descricao": "OUTRAS ATIVIDADES DE TELECOMUNICAÇÕES NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "6619304",
    "descricao": "CAIXAS ELETRÔNICOS",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6619305",
    "descricao": "OPERADORAS DE CARTÕES DE DÉBITO",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6202300",
    "descricao": "DESENVOLVIMENTO E LICENCIAMENTO DE PROGRAMAS DE COMPUTADOR CUSTOMIZÁVEIS",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "6203100",
    "descricao": "DESENVOLVIMENTO E LICENCIAMENTO DE PROGRAMAS DE COMPUTADOR NÃO CUSTOMIZÁVEIS",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "6470103",
    "descricao": "FUNDOS DE INVESTIMENTO IMOBILIÁRIOS",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6422100",
    "descricao": "BANCOS MÚLTIPLOS, COM CARTEIRA COMERCIAL",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6204000",
    "descricao": "CONSULTORIA EM TECNOLOGIA DA INFORMAÇÃO",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "6209100",
    "descricao": "SUPORTE TÉCNICO, MANUTENÇÃO E OUTROS SERVIÇOS EM TECNOLOGIA DA INFORMAÇÃO",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "6311900",
    "descricao": "TRATAMENTO DE DADOS, PROVEDORES DE SERVIÇOS DE APLICAÇÃO E SERVIÇOS DE HOSPEDAGEM NA INTERNET",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "6391700",
    "descricao": "AGÊNCIAS DE NOTÍCIAS",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "6399200",
    "descricao": "OUTRAS ATIVIDADES DE PRESTAÇÃO DE SERVIÇOS DE INFORMAÇÃO NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "6410700",
    "descricao": "BANCO CENTRAL",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6421200",
    "descricao": "BANCOS COMERCIAIS",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6611801",
    "descricao": "BOLSA DE VALORES",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6423900",
    "descricao": "CAIXAS ECONÔMICAS",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6424701",
    "descricao": "BANCOS COOPERATIVOS",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6424702",
    "descricao": "COOPERATIVAS CENTRAIS DE CRÉDITO",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6424703",
    "descricao": "COOPERATIVAS DE CRÉDITO MÚTUO",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6424704",
    "descricao": "COOPERATIVAS DE CRÉDITO RURAL",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6431000",
    "descricao": "BANCOS MÚLTIPLOS, SEM CARTEIRA COMERCIAL",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6432800",
    "descricao": "BANCOS DE INVESTIMENTO",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6619399",
    "descricao": "OUTRAS ATIVIDADES AUXILIARES DOS SERVIÇOS FINANCEIROS NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6433600",
    "descricao": "BANCOS DE DESENVOLVIMENTO",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6491300",
    "descricao": "SOCIEDADES DE FOMENTO MERCANTIL - FACTORING",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6434400",
    "descricao": "AGÊNCIAS DE FOMENTO",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6435201",
    "descricao": "SOCIEDADES DE CRÉDITO IMOBILIÁRIO",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6435202",
    "descricao": "ASSOCIAÇÕES DE POUPANÇA E EMPRÉSTIMO",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6435203",
    "descricao": "COMPANHIAS HIPOTECÁRIAS",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6436100",
    "descricao": "SOCIEDADES DE CRÉDITO, FINANCIAMENTO E INVESTIMENTO - FINANCEIRAS",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6437900",
    "descricao": "SOCIEDADES DE CRÉDITO AO MICROEMPREENDEDOR",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6438701",
    "descricao": "BANCOS DE CÂMBIO",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6438799",
    "descricao": "OUTRAS INSTITUIÇÕES DE INTERMEDIAÇÃO NÃO MONETÁRIA",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6440900",
    "descricao": "ARRENDAMENTO MERCANTIL",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6450600",
    "descricao": "SOCIEDADES DE CAPITALIZAÇÃO",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6461100",
    "descricao": "HOLDINGS DE INSTITUIÇÕES FINANCEIRAS",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6463800",
    "descricao": "OUTRAS SOCIEDADES DE PARTICIPAÇÃO, EXCETO HOLDINGS",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6470101",
    "descricao": "FUNDOS DE INVESTIMENTO, EXCETO PREVIDENCIÁRIOS E IMOBILIÁRIOS",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6612601",
    "descricao": "CORRETORAS DE TÍTULOS E VALORES MOBILIÁRIOS",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6492100",
    "descricao": "SECURITIZAÇÃO DE CRÉDITOS",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6493000",
    "descricao": "ADMINISTRAÇÃO DE CONSÓRCIOS PARA AQUISIÇÃO DE BENS E DIREITOS",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6499901",
    "descricao": "CLUBES DE INVESTIMENTO",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6499902",
    "descricao": "SOCIEDADES DE INVESTIMENTO",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6499903",
    "descricao": "FUNDO GARANTIDOR DE CRÉDITO",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6499904",
    "descricao": "CAIXAS DE FINANCIAMENTO DE CORPORAÇÕES",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6499905",
    "descricao": "CONCESSÃO DE CRÉDITO PELAS OSCIP",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6499999",
    "descricao": "OUTRAS ATIVIDADES DE SERVIÇOS FINANCEIROS NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6511101",
    "descricao": "SOCIEDADE SEGURADORA DE SEGUROS VIDA",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6621501",
    "descricao": "PERITOS E AVALIADORES DE SEGUROS",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6512000",
    "descricao": "SOCIEDADE SEGURADORA DE SEGUROS NÃO VIDA",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6520100",
    "descricao": "SOCIEDADE SEGURADORA DE SEGUROS SAÚDE",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6530800",
    "descricao": "RESSEGUROS",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6541300",
    "descricao": "PREVIDÊNCIA COMPLEMENTAR FECHADA",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6542100",
    "descricao": "PREVIDÊNCIA COMPLEMENTAR ABERTA",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6612605",
    "descricao": "AGENTES DE INVESTIMENTOS EM APLICAÇÕES FINANCEIRAS",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6613400",
    "descricao": "ADMINISTRAÇÃO DE CARTÕES DE CRÉDITO",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6619301",
    "descricao": "SERVIÇOS DE LIQUIDAÇÃO E CUSTÓDIA",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6619302",
    "descricao": "CORRESPONDENTES DE INSTITUIÇÕES FINANCEIRAS",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6619303",
    "descricao": "REPRESENTAÇÕES DE BANCOS ESTRANGEIROS",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6629100",
    "descricao": "ATIVIDADES AUXILIARES DOS SEGUROS, DA PREVIDÊNCIA COMPLEMENTAR E DOS PLANOS DE SAÚDE NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6630400",
    "descricao": "ATIVIDADES DE ADMINISTRAÇÃO DE FUNDOS POR CONTRATO OU COMISSÃO",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "6810201",
    "descricao": "COMPRA E VENDA DE IMÓVEIS PRÓPRIOS",
    "secao": "ATIVIDADES IMOBILIÁRIAS"
  },
  {
    "id": "6810202",
    "descricao": "ALUGUEL DE IMÓVEIS PRÓPRIOS",
    "secao": "ATIVIDADES IMOBILIÁRIAS"
  },
  {
    "id": "6810203",
    "descricao": "LOTEAMENTO DE IMÓVEIS PRÓPRIOS",
    "secao": "ATIVIDADES IMOBILIÁRIAS"
  },
  {
    "id": "6821801",
    "descricao": "CORRETAGEM NA COMPRA E VENDA E AVALIAÇÃO DE IMÓVEIS",
    "secao": "ATIVIDADES IMOBILIÁRIAS"
  },
  {
    "id": "6821802",
    "descricao": "CORRETAGEM NO ALUGUEL DE IMÓVEIS",
    "secao": "ATIVIDADES IMOBILIÁRIAS"
  },
  {
    "id": "6822600",
    "descricao": "GESTÃO E ADMINISTRAÇÃO DA PROPRIEDADE IMOBILIARIA",
    "secao": "ATIVIDADES IMOBILIÁRIAS"
  },
  {
    "id": "6911701",
    "descricao": "SERVIÇOS ADVOCATÍCIOS",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7722500",
    "descricao": "ALUGUEL DE FITAS DE VÍDEO, DVDS E SIMILARES",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "6911703",
    "descricao": "AGENTE DE PROPRIEDADE INDUSTRIAL",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "6912500",
    "descricao": "CARTÓRIOS",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "6920601",
    "descricao": "ATIVIDADES DE CONTABILIDADE",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7490102",
    "descricao": "ESCAFANDRIA E MERGULHO",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7020400",
    "descricao": "ATIVIDADES DE CONSULTORIA EM GESTÃO EMPRESARIAL, EXCETO CONSULTORIA TÉCNICA ESPECÍFICA",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7111100",
    "descricao": "SERVIÇOS DE ARQUITETURA",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7112000",
    "descricao": "SERVIÇOS DE ENGENHARIA",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7119701",
    "descricao": "SERVIÇOS DE CARTOGRAFIA, TOPOGRAFIA E GEODÉSIA",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7119702",
    "descricao": "ATIVIDADES DE ESTUDOS GEOLÓGICOS",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7119703",
    "descricao": "SERVIÇOS DE DESENHO TÉCNICO RELACIONADOS À ARQUITETURA E ENGENHARIA",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7119704",
    "descricao": "SERVIÇOS DE PERÍCIA TÉCNICA RELACIONADOS À SEGURANÇA DO TRABALHO",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7723300",
    "descricao": "ALUGUEL DE OBJETOS DO VESTUÁRIO, JÓIAS E ACESSÓRIOS",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "7119799",
    "descricao": "ATIVIDADES TÉCNICAS RELACIONADAS À ENGENHARIA E ARQUITETURA NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7120100",
    "descricao": "TESTES E ANÁLISES TÉCNICAS",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7210000",
    "descricao": "PESQUISA E DESENVOLVIMENTO EXPERIMENTAL EM CIÊNCIAS FÍSICAS E NATURAIS",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7311400",
    "descricao": "AGÊNCIAS DE PUBLICIDADE",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7312200",
    "descricao": "AGENCIAMENTO DE ESPAÇOS PARA PUBLICIDADE, EXCETO EM VEÍCULOS DE COMUNICAÇÃO",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7319001",
    "descricao": "CRIAÇÃO ESTANDES PARA FEIRAS E EXPOSIÇÕES",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7319002",
    "descricao": "PROMOÇÃO DE VENDAS",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7319003",
    "descricao": "MARKETING DIRETO",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7319004",
    "descricao": "CONSULTORIA EM PUBLICIDADE",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7319099",
    "descricao": "OUTRAS ATIVIDADES DE PUBLICIDADE NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7320300",
    "descricao": "PESQUISAS DE MERCADO E DE OPINIÃO PÚBLICA",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7410202",
    "descricao": "DESIGN DE INTERIORES",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7410203",
    "descricao": "DESIGN DE PRODUTO",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7410299",
    "descricao": "ATIVIDADES DE DESIGN NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7420001",
    "descricao": "ATIVIDADES DE PRODUÇÃO DE FOTOGRAFIAS, EXCETO AÉREA E SUBMARINA",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7420002",
    "descricao": "ATIVIDADES DE PRODUÇÃO DE FOTOGRAFIAS AÉREAS E SUBMARINAS",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7420003",
    "descricao": "LABORATÓRIOS FOTOGRÁFICOS",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7420004",
    "descricao": "FILMAGEM DE FESTAS E EVENTOS",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7420005",
    "descricao": "SERVIÇOS DE MICROFILMAGEM",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7490101",
    "descricao": "SERVIÇOS DE TRADUÇÃO, INTERPRETAÇÃO E SIMILARES",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "8230002",
    "descricao": "CASAS DE FESTAS E EVENTOS",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "7490104",
    "descricao": "ATIVIDADES DE INTERMEDIAÇÃO E AGENCIAMENTO DE SERVIÇOS E NEGÓCIOS EM GERAL, EXCETO IMOBILIÁRIOS",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7490105",
    "descricao": "AGENCIAMENTO DE PROFISSIONAIS PARA ATIVIDADES ESPORTIVAS, CULTURAIS E ARTÍSTICAS",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "7739001",
    "descricao": "ALUGUEL DE MÁQUINAS E EQUIPAMENTOS PARA EXTRAÇÃO DE MINÉRIOS E PETRÓLEO, SEM OPERADOR",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "7711000",
    "descricao": "LOCAÇÃO DE AUTOMÓVEIS SEM CONDUTOR",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "7719501",
    "descricao": "LOCAÇÃO DE EMBARCAÇÕES SEM TRIPULAÇÃO, EXCETO PARA FINS RECREATIVOS",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "7719502",
    "descricao": "LOCAÇÃO DE AERONAVES SEM TRIPULAÇÃO",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "7719599",
    "descricao": "LOCAÇÃO DE OUTROS MEIOS DE TRANSPORTE NÃO ESPECIFICADOS ANTERIORMENTE, SEM CONDUTOR",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "7721700",
    "descricao": "ALUGUEL DE EQUIPAMENTOS RECREATIVOS E ESPORTIVOS",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "7729299",
    "descricao": "ALUGUEL DE OUTROS OBJETOS PESSOAIS E DOMÉSTICOS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "7731400",
    "descricao": "ALUGUEL DE MÁQUINAS E EQUIPAMENTOS AGRÍCOLAS SEM OPERADOR",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "7732201",
    "descricao": "ALUGUEL DE MÁQUINAS E EQUIPAMENTOS PARA CONSTRUÇÃO SEM OPERADOR, EXCETO ANDAIMES",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "7732202",
    "descricao": "ALUGUEL DE ANDAIMES",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "7733100",
    "descricao": "ALUGUEL DE MÁQUINAS E EQUIPAMENTOS PARA ESCRITÓRIOS",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "7739002",
    "descricao": "ALUGUEL DE EQUIPAMENTOS CIENTÍFICOS, MÉDICOS E HOSPITALARES, SEM OPERADOR",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "7739003",
    "descricao": "ALUGUEL DE PALCOS, COBERTURAS E OUTRAS ESTRUTURAS DE USO TEMPORÁRIO, EXCETO ANDAIMES",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "7739099",
    "descricao": "ALUGUEL DE OUTRAS MÁQUINAS E EQUIPAMENTOS COMERCIAIS E INDUSTRIAIS NÃO ESPECIFICADOS ANTERIORMENTE, SEM OPERADOR",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "7740300",
    "descricao": "GESTÃO DE ATIVOS INTANGÍVEIS NÃO FINANCEIROS",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "7810800",
    "descricao": "SELEÇÃO E AGENCIAMENTO DE MÃO DE OBRA",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "7820500",
    "descricao": "LOCAÇÃO DE MÃO DE OBRA TEMPORÁRIA",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "8599602",
    "descricao": "CURSOS DE PILOTAGEM",
    "secao": "EDUCAÇÃO"
  },
  {
    "id": "8591100",
    "descricao": "ENSINO DE ESPORTES",
    "secao": "EDUCAÇÃO"
  },
  {
    "id": "7830200",
    "descricao": "FORNECIMENTO E GESTÃO DE RECURSOS HUMANOS PARA TERCEIROS",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "7911200",
    "descricao": "AGÊNCIAS DE VIAGENS",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "7912100",
    "descricao": "OPERADORES TURÍSTICOS",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "7990200",
    "descricao": "SERVIÇOS DE RESERVAS E OUTROS SERVIÇOS DE TURISMO NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "8011101",
    "descricao": "ATIVIDADES DE VIGILÂNCIA E SEGURANÇA PRIVADA",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "8011102",
    "descricao": "SERVIÇOS DE ADESTRAMENTO DE CÃES DE GUARDA",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "8012900",
    "descricao": "ATIVIDADES DE TRANSPORTE DE VALORES",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "8020001",
    "descricao": "ATIVIDADES DE MONITORAMENTO DE SISTEMAS DE SEGURANÇA ELETRÔNICO",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "8020002",
    "descricao": "OUTRAS ATIVIDADES DE SERVIÇOS DE SEGURANÇA",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "8030700",
    "descricao": "ATIVIDADES DE INVESTIGAÇÃO PARTICULAR",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "8220200",
    "descricao": "ATIVIDADES DE TELEATENDIMENTO",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "8592901",
    "descricao": "ENSINO DE DANÇA",
    "secao": "EDUCAÇÃO"
  },
  {
    "id": "8111700",
    "descricao": "SERVIÇOS COMBINADOS PARA APOIO A EDIFÍCIOS, EXCETO CONDOMÍNIOS PREDIAIS",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "8112500",
    "descricao": "CONDOMÍNIOS PREDIAIS",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "8121400",
    "descricao": "LIMPEZA EM PRÉDIOS E EM DOMICÍLIOS",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "8122200",
    "descricao": "IMUNIZAÇÃO E CONTROLE DE PRAGAS URBANAS",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "8129000",
    "descricao": "ATIVIDADES DE LIMPEZA NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "8130300",
    "descricao": "ATIVIDADES PAISAGÍSTICAS",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "8211300",
    "descricao": "SERVIÇOS COMBINADOS DE ESCRITÓRIO E APOIO ADMINISTRATIVO",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "8219901",
    "descricao": "FOTOCÓPIAS",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "8512100",
    "descricao": "EDUCAÇÃO INFANTIL - PRÉESCOLA",
    "secao": "EDUCAÇÃO"
  },
  {
    "id": "8230001",
    "descricao": "SERVIÇOS DE ORGANIZAÇÃO DE FEIRAS, CONGRESSOS, EXPOSIÇÕES E FESTAS",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "8291100",
    "descricao": "ATIVIDADES DE COBRANÇAS E INFORMAÇÕES CADASTRAIS",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "8292000",
    "descricao": "ENVASAMENTO E EMPACOTAMENTO SOB CONTRATO",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "8299701",
    "descricao": "MEDIÇÃO DE CONSUMO DE ENERGIA ELÉTRICA, GÁS E ÁGUA",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "8299702",
    "descricao": "EMISSÃO DE VALES ALIMENTAÇÃO, VALES TRANSPORTE E SIMILARES",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "8299703",
    "descricao": "SERVIÇOS DE GRAVAÇÃO DE CARIMBOS, EXCETO CONFECÇÃO",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "8299704",
    "descricao": "LEILOEIROS INDEPENDENTES",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "8299705",
    "descricao": "SERVIÇOS DE LEVANTAMENTO DE FUNDOS SOB CONTRATO",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "8299706",
    "descricao": "CASAS LOTÉRICAS",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "8299707",
    "descricao": "SALAS DE ACESSO À INTERNET",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "8299799",
    "descricao": "OUTRAS ATIVIDADES DE SERVIÇOS PRESTADOS PRINCIPALMENTE ÀS EMPRESAS NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "9603304",
    "descricao": "SERVIÇOS DE FUNERÁRIAS",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "8412400",
    "descricao": "REGULAÇÃO DAS ATIVIDADES DE SAÚDE, EDUCAÇÃO, SERVIÇOS CULTURAIS E OUTROS SERVIÇOS SOCIAIS",
    "secao": "ADMINISTRAÇÃO PÚBLICA, DEFESA E SEGURIDADE SOCIAL"
  },
  {
    "id": "8413200",
    "descricao": "REGULAÇÃO DAS ATIVIDADES ECONÔMICAS",
    "secao": "ADMINISTRAÇÃO PÚBLICA, DEFESA E SEGURIDADE SOCIAL"
  },
  {
    "id": "8421300",
    "descricao": "RELAÇÕES EXTERIORES",
    "secao": "ADMINISTRAÇÃO PÚBLICA, DEFESA E SEGURIDADE SOCIAL"
  },
  {
    "id": "8422100",
    "descricao": "DEFESA",
    "secao": "ADMINISTRAÇÃO PÚBLICA, DEFESA E SEGURIDADE SOCIAL"
  },
  {
    "id": "8630599",
    "descricao": "ATIVIDADES DE ATENÇÃO AMBULATORIAL NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8423000",
    "descricao": "JUSTIÇA",
    "secao": "ADMINISTRAÇÃO PÚBLICA, DEFESA E SEGURIDADE SOCIAL"
  },
  {
    "id": "8424800",
    "descricao": "SEGURANÇA E ORDEM PÚBLICA",
    "secao": "ADMINISTRAÇÃO PÚBLICA, DEFESA E SEGURIDADE SOCIAL"
  },
  {
    "id": "8425600",
    "descricao": "DEFESA CIVIL",
    "secao": "ADMINISTRAÇÃO PÚBLICA, DEFESA E SEGURIDADE SOCIAL"
  },
  {
    "id": "8430200",
    "descricao": "SEGURIDADE SOCIAL OBRIGATÓRIA",
    "secao": "ADMINISTRAÇÃO PÚBLICA, DEFESA E SEGURIDADE SOCIAL"
  },
  {
    "id": "8511200",
    "descricao": "EDUCAÇÃO INFANTIL - CRECHE",
    "secao": "EDUCAÇÃO"
  },
  {
    "id": "9603305",
    "descricao": "SERVIÇOS DE SOMATOCONSERVAÇÃO",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "8513900",
    "descricao": "ENSINO FUNDAMENTAL",
    "secao": "EDUCAÇÃO"
  },
  {
    "id": "8599603",
    "descricao": "TREINAMENTO EM INFORMÁTICA",
    "secao": "EDUCAÇÃO"
  },
  {
    "id": "8599604",
    "descricao": "TREINAMENTO EM DESENVOLVIMENTO PROFISSIONAL E GERENCIAL",
    "secao": "EDUCAÇÃO"
  },
  {
    "id": "8599605",
    "descricao": "CURSOS PREPARATÓRIOS PARA CONCURSOS",
    "secao": "EDUCAÇÃO"
  },
  {
    "id": "8520100",
    "descricao": "ENSINO MÉDIO",
    "secao": "EDUCAÇÃO"
  },
  {
    "id": "8531700",
    "descricao": "EDUCAÇÃO SUPERIOR - GRADUAÇÃO",
    "secao": "EDUCAÇÃO"
  },
  {
    "id": "8532500",
    "descricao": "EDUCAÇÃO SUPERIOR - GRADUAÇÃO E PÓS GRADUAÇÃO",
    "secao": "EDUCAÇÃO"
  },
  {
    "id": "8640201",
    "descricao": "LABORATÓRIOS DE ANATOMIA PATOLÓGICA E CITOLÓGICA",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8533300",
    "descricao": "EDUCAÇÃO SUPERIOR - PÓS GRADUAÇÃO E EXTENSÃO",
    "secao": "EDUCAÇÃO"
  },
  {
    "id": "8541400",
    "descricao": "EDUCAÇÃO PROFISSIONAL DE NÍVEL TÉCNICO",
    "secao": "EDUCAÇÃO"
  },
  {
    "id": "8542200",
    "descricao": "EDUCAÇÃO PROFISSIONAL DE NÍVEL TECNOLÓGICO",
    "secao": "EDUCAÇÃO"
  },
  {
    "id": "8550301",
    "descricao": "ADMINISTRAÇÃO DE CAIXAS ESCOLARES",
    "secao": "EDUCAÇÃO"
  },
  {
    "id": "8550302",
    "descricao": "ATIVIDADES DE APOIO À EDUCAÇÃO, EXCETO CAIXAS ESCOLARES",
    "secao": "EDUCAÇÃO"
  },
  {
    "id": "9603399",
    "descricao": "ATIVIDADES FUNERÁRIAS E SERVIÇOS RELACIONADOS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "8592902",
    "descricao": "ENSINO DE ARTES CÊNICAS, EXCETO DANÇA",
    "secao": "EDUCAÇÃO"
  },
  {
    "id": "8592903",
    "descricao": "ENSINO DE MÚSICA",
    "secao": "EDUCAÇÃO"
  },
  {
    "id": "8592999",
    "descricao": "ENSINO DE ARTE E CULTURA NÃO ESPECIFICADO ANTERIORMENTE",
    "secao": "EDUCAÇÃO"
  },
  {
    "id": "8593700",
    "descricao": "ENSINO DE IDIOMAS",
    "secao": "EDUCAÇÃO"
  },
  {
    "id": "8599699",
    "descricao": "OUTRAS ATIVIDADES DE ENSINO NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "EDUCAÇÃO"
  },
  {
    "id": "8640202",
    "descricao": "LABORATÓRIOS CLÍNICOS",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8640203",
    "descricao": "SERVIÇOS DE DIÁLISE E NEFROLOGIA",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8640204",
    "descricao": "SERVIÇOS DE TOMOGRAFIA",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8610101",
    "descricao": "ATIVIDADES DE ATENDIMENTO HOSPITALAR, EXCETO PRONTO SOCORRO E UNIDADES PARA ATENDIMENTO A URGÊNCIAS",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8610102",
    "descricao": "ATIVIDADES DE ATENDIMENTO EM PRONTO SOCORRO E UNIDADES HOSPITALARES PARA ATENDIMENTO A URGÊNCIAS",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8621601",
    "descricao": "UTI MÓVEL",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8621602",
    "descricao": "SERVIÇOS MÓVEIS DE ATENDIMENTO A URGÊNCIAS, EXCETO POR UTI MÓVEL",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8622400",
    "descricao": "SERVIÇOS DE REMOÇÃO DE PACIENTES, EXCETO OS SERVIÇOS MÓVEIS DE ATENDIMENTO A URGÊNCIAS",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "9609202",
    "descricao": "AGÊNCIAS MATRIMONIAIS",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "8630501",
    "descricao": "ATIVIDADE MÉDICA AMBULATORIAL COM RECURSOS PARA REALIZAÇÃO DE PROCEDIMENTOS CIRÚRGICOS",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8630502",
    "descricao": "ATIVIDADE MÉDICA AMBULATORIAL COM RECURSOS PARA REALIZAÇÃO DE EXAMES COMPLEMENTARES",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8630503",
    "descricao": "ATIVIDADE MÉDICA AMBULATORIAL RESTRITA A CONSULTAS",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8650004",
    "descricao": "ATIVIDADES DE FISIOTERAPIA",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8630504",
    "descricao": "ATIVIDADE ODONTOLÓGICA",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8630506",
    "descricao": "SERVIÇOS DE VACINAÇÃO E IMUNIZAÇÃO HUMANA",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8630507",
    "descricao": "ATIVIDADES DE REPRODUÇÃO HUMANA ASSISTIDA",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8640205",
    "descricao": "SERVIÇOS DE DIAGNÓSTICO POR IMAGEM COM USO DE RADIAÇÃO IONIZANTE, EXCETO TOMOGRAFIA",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8640206",
    "descricao": "SERVIÇOS DE RESSONÂNCIA MAGNÉTICA",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8640207",
    "descricao": "SERVIÇOS DE DIAGNÓSTICO POR IMAGEM SEM USO DE RADIAÇÃO IONIZANTE, EXCETO RESSONÂNCIA MAGNÉTICA",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8640208",
    "descricao": "SERVIÇOS DE DIAGNÓSTICO POR REGISTRO GRÁFICO - ECG, EEG E OUTROS EXAMES ANÁLOGOS",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8640209",
    "descricao": "SERVIÇOS DE DIAGNÓSTICO POR MÉTODOS ÓPTICOS - ENDOSCOPIA E OUTROS EXAMES ANÁLOGOS",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8640210",
    "descricao": "SERVIÇOS DE QUIMIOTERAPIA",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8640211",
    "descricao": "SERVIÇOS DE RADIOTERAPIA",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8640212",
    "descricao": "SERVIÇOS DE HEMOTERAPIA",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8640213",
    "descricao": "SERVIÇOS DE LITOTRIPCIA",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8640214",
    "descricao": "SERVIÇOS DE BANCOS DE CÉLULAS E TECIDOS HUMANOS",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8712300",
    "descricao": "ATIVIDADES DE FORNECIMENTO DE INFRAESTRUTURA DE APOIO E ASSISTÊNCIA A PACIENTE NO DOMICÍLIO",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8640299",
    "descricao": "ATIVIDADES DE SERVIÇOS DE COMPLEMENTAÇÃO DIAGNÓSTICA E TERAPÊUTICA NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8650001",
    "descricao": "ATIVIDADES DE ENFERMAGEM",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8650002",
    "descricao": "ATIVIDADES DE PROFISSIONAIS DA NUTRIÇÃO",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8650003",
    "descricao": "ATIVIDADES DE PSICOLOGIA E PSICANÁLISE",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8650007",
    "descricao": "ATIVIDADES DE TERAPIA DE NUTRIÇÃO ENTERAL E PARENTERAL",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8650099",
    "descricao": "ATIVIDADES DE PROFISSIONAIS DA ÁREA DE SAÚDE NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8660700",
    "descricao": "ATIVIDADES DE APOIO À GESTÃO DE SAÚDE",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8690901",
    "descricao": "ATIVIDADES DE PRÁTICAS INTEGRATIVAS E COMPLEMENTARES EM SAÚDE HUMANA",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8690902",
    "descricao": "ATIVIDADES DE BANCO DE LEITE HUMANO",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8690903",
    "descricao": "ATIVIDADES DE ACUPUNTURA",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8690904",
    "descricao": "ATIVIDADES DE PODOLOGIA",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "9529103",
    "descricao": "REPARAÇÃO DE RELÓGIOS",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "8711501",
    "descricao": "CLÍNICAS E RESIDÊNCIAS GERIÁTRICAS",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8711502",
    "descricao": "INSTITUIÇÕES DE LONGA PERMANÊNCIA PARA IDOSOS",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8711503",
    "descricao": "ATIVIDADES DE ASSISTÊNCIA A DEFICIENTES FÍSICOS, IMUNODEPRIMIDOS E CONVALESCENTES",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8711504",
    "descricao": "CENTROS DE APOIO A PACIENTES COM CÂNCER E COM AIDS",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8711505",
    "descricao": "CONDOMÍNIOS RESIDENCIAIS PARA IDOSOS",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "9002702",
    "descricao": "RESTAURAÇÃO DE OBRAS DE ARTE",
    "secao": "ARTES, CULTURA, ESPORTE E RECREAÇÃO"
  },
  {
    "id": "8720401",
    "descricao": "ATIVIDADES DE CENTROS DE ASSISTÊNCIA PSICOSSOCIAL",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8730101",
    "descricao": "ORFANATOS",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8730102",
    "descricao": "ALBERGUES ASSISTENCIAIS",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8730199",
    "descricao": "ATIVIDADES DE ASSISTÊNCIA SOCIAL PRESTADAS EM RESIDÊNCIAS COLETIVAS E PARTICULARES NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "9001901",
    "descricao": "PRODUÇÃO TEATRAL",
    "secao": "ARTES, CULTURA, ESPORTE E RECREAÇÃO"
  },
  {
    "id": "9001902",
    "descricao": "PRODUÇÃO MUSICAL",
    "secao": "ARTES, CULTURA, ESPORTE E RECREAÇÃO"
  },
  {
    "id": "9001903",
    "descricao": "PRODUÇÃO DE ESPETÁCULOS DE DANÇA",
    "secao": "ARTES, CULTURA, ESPORTE E RECREAÇÃO"
  },
  {
    "id": "9001904",
    "descricao": "PRODUÇÃO DE ESPETÁCULOS CIRCENSES, DE MARIONETES E SIMILARES",
    "secao": "ARTES, CULTURA, ESPORTE E RECREAÇÃO"
  },
  {
    "id": "9001905",
    "descricao": "PRODUÇÃO DE ESPETÁCULOS DE RODEIOS, VAQUEJADAS E SIMILARES",
    "secao": "ARTES, CULTURA, ESPORTE E RECREAÇÃO"
  },
  {
    "id": "9001906",
    "descricao": "ATIVIDADES DE SONORIZAÇÃO E DE ILUMINAÇÃO",
    "secao": "ARTES, CULTURA, ESPORTE E RECREAÇÃO"
  },
  {
    "id": "9001999",
    "descricao": "ARTES CÊNICAS, ESPETÁCULOS E ATIVIDADES COMPLEMENTARES NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "ARTES, CULTURA, ESPORTE E RECREAÇÃO"
  },
  {
    "id": "9002701",
    "descricao": "ATIVIDADES DE ARTISTAS PLÁSTICOS, JORNALISTAS INDEPENDENTES E ESCRITORES",
    "secao": "ARTES, CULTURA, ESPORTE E RECREAÇÃO"
  },
  {
    "id": "9003500",
    "descricao": "GESTÃO DE ESPAÇOS PARA ARTES CÊNICAS, ESPETÁCULOS E OUTRAS ATIVIDADES ARTÍSTICAS",
    "secao": "ARTES, CULTURA, ESPORTE E RECREAÇÃO"
  },
  {
    "id": "9101500",
    "descricao": "ATIVIDADES DE BIBLIOTECAS E ARQUIVOS",
    "secao": "ARTES, CULTURA, ESPORTE E RECREAÇÃO"
  },
  {
    "id": "9102301",
    "descricao": "ATIVIDADES DE MUSEUS E DE EXPLORAÇÃO DE LUGARES E PRÉDIOS HISTÓRICOS E ATRAÇÕES SIMILARES",
    "secao": "ARTES, CULTURA, ESPORTE E RECREAÇÃO"
  },
  {
    "id": "9102302",
    "descricao": "RESTAURAÇÃO E CONSERVAÇÃO DE LUGARES E PRÉDIOS HISTÓRICOS",
    "secao": "ARTES, CULTURA, ESPORTE E RECREAÇÃO"
  },
  {
    "id": "9103100",
    "descricao": "ATIVIDADES DE JARDINS BOTÂNICOS, ZOOLÓGICOS, PARQUES NACIONAIS, RESERVAS ECOLÓGICAS E ÁREAS DE PROTEÇÃO AMBIENTAL",
    "secao": "ARTES, CULTURA, ESPORTE E RECREAÇÃO"
  },
  {
    "id": "9200301",
    "descricao": "CASAS DE BINGO",
    "secao": "ARTES, CULTURA, ESPORTE E RECREAÇÃO"
  },
  {
    "id": "9200302",
    "descricao": "EXPLORAÇÃO DE APOSTAS EM CORRIDAS DE CAVALOS",
    "secao": "ARTES, CULTURA, ESPORTE E RECREAÇÃO"
  },
  {
    "id": "9200399",
    "descricao": "EXPLORAÇÃO DE JOGOS DE AZAR E APOSTAS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "ARTES, CULTURA, ESPORTE E RECREAÇÃO"
  },
  {
    "id": "9311500",
    "descricao": "GESTÃO DE INSTALAÇÕES DE ESPORTES",
    "secao": "ARTES, CULTURA, ESPORTE E RECREAÇÃO"
  },
  {
    "id": "9312300",
    "descricao": "CLUBES SOCIAIS, ESPORTIVOS E SIMILARES",
    "secao": "ARTES, CULTURA, ESPORTE E RECREAÇÃO"
  },
  {
    "id": "9313100",
    "descricao": "ATIVIDADES DE CONDICIONAMENTO FÍSICO",
    "secao": "ARTES, CULTURA, ESPORTE E RECREAÇÃO"
  },
  {
    "id": "9319101",
    "descricao": "PRODUÇÃO E PROMOÇÃO DE EVENTOS ESPORTIVOS",
    "secao": "ARTES, CULTURA, ESPORTE E RECREAÇÃO"
  },
  {
    "id": "9319199",
    "descricao": "OUTRAS ATIVIDADES ESPORTIVAS NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "ARTES, CULTURA, ESPORTE E RECREAÇÃO"
  },
  {
    "id": "9321200",
    "descricao": "PARQUES DE DIVERSÃO E PARQUES TEMÁTICOS",
    "secao": "ARTES, CULTURA, ESPORTE E RECREAÇÃO"
  },
  {
    "id": "9329801",
    "descricao": "DISCOTECAS, DANCETERIAS, SALÕES DE DANÇA E SIMILARES",
    "secao": "ARTES, CULTURA, ESPORTE E RECREAÇÃO"
  },
  {
    "id": "9329802",
    "descricao": "EXPLORAÇÃO DE BOLICHES",
    "secao": "ARTES, CULTURA, ESPORTE E RECREAÇÃO"
  },
  {
    "id": "9329803",
    "descricao": "EXPLORAÇÃO DE JOGOS DE SINUCA, BILHAR E SIMILARES",
    "secao": "ARTES, CULTURA, ESPORTE E RECREAÇÃO"
  },
  {
    "id": "9329804",
    "descricao": "EXPLORAÇÃO DE JOGOS ELETRÔNICOS RECREATIVOS",
    "secao": "ARTES, CULTURA, ESPORTE E RECREAÇÃO"
  },
  {
    "id": "9609204",
    "descricao": "EXPLORAÇÃO DE MÁQUINAS DE SERVIÇOS PESSOAIS ACIONADAS POR MOEDA",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "9329899",
    "descricao": "OUTRAS ATIVIDADES DE RECREAÇÃO E LAZER NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "ARTES, CULTURA, ESPORTE E RECREAÇÃO"
  },
  {
    "id": "9411100",
    "descricao": "ATIVIDADES DE ORGANIZAÇÕES ASSOCIATIVAS PATRONAIS E EMPRESARIAIS",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "9412001",
    "descricao": "ATIVIDADES DE FISCALIZAÇÃO PROFISSIONAL",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "9412099",
    "descricao": "OUTRAS ATIVIDADES ASSOCIATIVAS PROFISSIONAIS",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "9420100",
    "descricao": "ATIVIDADES DE ORGANIZAÇÕES SINDICAIS",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "9430800",
    "descricao": "ATIVIDADES DE ASSOCIAÇÕES DE DEFESA DE DIREITOS SOCIAIS",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "9491000",
    "descricao": "ATIVIDADES DE ORGANIZAÇÕES RELIGIOSAS OU FILOSÓFICAS",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "9492800",
    "descricao": "ATIVIDADES DE ORGANIZAÇÕES POLÍTICAS",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "9602502",
    "descricao": "ATIVIDADES DE ESTÉTICA E OUTROS SERVIÇOS DE CUIDADOS COM A BELEZA",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "9493600",
    "descricao": "ATIVIDADES DE ORGANIZAÇÕES ASSOCIATIVAS LIGADAS À CULTURA E À ARTE",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "9609205",
    "descricao": "ATIVIDADES DE SAUNA E BANHOS",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "9609206",
    "descricao": "SERVIÇOS DE TATUAGEM E COLOCAÇÃO DE PIERCING",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "9511800",
    "descricao": "REPARAÇÃO E MANUTENÇÃO DE COMPUTADORES E DE EQUIPAMENTOS PERIFÉRICOS",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "9512600",
    "descricao": "REPARAÇÃO E MANUTENÇÃO DE EQUIPAMENTOS DE COMUNICAÇÃO",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "9521500",
    "descricao": "REPARAÇÃO E MANUTENÇÃO DE EQUIPAMENTOS ELETROELETRÔNICOS DE USO PESSOAL E DOMÉSTICO",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "9529101",
    "descricao": "REPARAÇÃO DE CALÇADOS, DE BOLSAS E ARTIGOS DE VIAGEM",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "9529102",
    "descricao": "CHAVEIROS",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "9529104",
    "descricao": "REPARAÇÃO DE BICICLETAS, TRICICLOS E OUTROS VEÍCULOS NÃO MOTORIZADOS",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "9529105",
    "descricao": "REPARAÇÃO DE ARTIGOS DO MOBILIÁRIO",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "9529106",
    "descricao": "REPARAÇÃO DE JÓIAS",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "9529199",
    "descricao": "REPARAÇÃO E MANUTENÇÃO DE OUTROS OBJETOS E EQUIPAMENTOS PESSOAIS E DOMÉSTICOS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "9601701",
    "descricao": "LAVANDERIAS",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "9601702",
    "descricao": "TINTURARIAS",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "9601703",
    "descricao": "TOALHEIROS",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "9602501",
    "descricao": "CABELEIREIROS, MANICURE E PEDICURE",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "9603301",
    "descricao": "GESTÃO E MANUTENÇÃO DE CEMITÉRIOS",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "9609207",
    "descricao": "ALOJAMENTO DE ANIMAIS DOMÉSTICOS",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "9609208",
    "descricao": "HIGIENE E EMBELEZAMENTO DE ANIMAIS DOMÉSTICOS",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "9609299",
    "descricao": "OUTRAS ATIVIDADES DE SERVIÇOS PESSOAIS NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "9700500",
    "descricao": "SERVIÇOS DOMÉSTICOS",
    "secao": "SERVIÇOS DOMÉSTICOS"
  },
  {
    "id": "9900800",
    "descricao": "ORGANISMOS INTERNACIONAIS E OUTRAS INSTITUIÇÕES EXTRATERRITORIAIS",
    "secao": "ORGANISMOS INTERNACIONAIS E OUTRAS INSTITUIÇÕES EXTRATERRITORIAIS"
  },
  {
    "id": "3104700",
    "descricao": "FABRICAÇÃO DE COLCHÕES",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "4641901",
    "descricao": "COMÉRCIO ATACADISTA DE TECIDOS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "7490199",
    "descricao": "OUTRAS ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "1921700",
    "descricao": "FABRICAÇÃO DE PRODUTOS DO REFINO DE PETRÓLEO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "1931400",
    "descricao": "FABRICAÇÃO DE ÁLCOOL",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2014200",
    "descricao": "FABRICAÇÃO DE GASES INDUSTRIAIS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2073800",
    "descricao": "FABRICAÇÃO DE IMPERMEABILIZANTES, SOLVENTES E PRODUTOS AFINS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2123800",
    "descricao": "FABRICAÇÃO DE PREPARAÇÕES FARMACÊUTICAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2421100",
    "descricao": "PRODUÇÃO DE SEMI ACABADOS DE AÇO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3600601",
    "descricao": "CAPTAÇÃO, TRATAMENTO E DISTRIBUIÇÃO DE ÁGUA",
    "secao": "ÁGUA, ESGOTO, ATIVIDADES DE GESTÃO DE RESÍDUOS E DESCONTAMINAÇÃO"
  },
  {
    "id": "1096100",
    "descricao": "FABRICAÇÃO DE ALIMENTOS E PRATOS PRONTOS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "3329599",
    "descricao": "INSTALAÇÃO DE OUTROS EQUIPAMENTOS NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "7500100",
    "descricao": "ATIVIDADES VETERINÁRIAS",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "8650005",
    "descricao": "ATIVIDADES DE TERAPIA OCUPACIONAL",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "8720499",
    "descricao": "ATIVIDADES DE ASSISTÊNCIA PSICOSSOCIAL E À SAÚDE A PORTADORES DE DISTÚRBIOS PSÍQUICOS, DEFICIÊNCIA MENTAL E DEPENDÊNCIA QUÍMICA E GRUPOS SIMILARES NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "1610205",
    "descricao": "SERVIÇO DE TRATAMENTO DE MADEIRA REALIZADO SOB CONTRATO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "5611205",
    "descricao": "BARES E OUTROS ESTABELECIMENTOS ESPECIALIZADOS EM SERVIR BEBIDAS, COM ENTRETENIMENTO ",
    "secao": "ALOJAMENTO E ALIMENTAÇÃO"
  },
  {
    "id": "7490103",
    "descricao": "SERVIÇOS DE AGRONOMIA E DE CONSULTORIA ÀS ATIVIDADES AGRÍCOLAS E PECUÁRIAS",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "8219999",
    "descricao": "PREPARAÇÃO DE DOCUMENTOS E SERVIÇOS ESPECIALIZADOS DE APOIO ADMINISTRATIVO NÃO ESPECIFICADOS ANTERIORMENTE",
    "secao": "ATIVIDADES ADMINISTRATIVAS E SERVIÇOS COMPLEMENTARES"
  },
  {
    "id": "6319400",
    "descricao": "PORTAIS, PROVEDORES DE CONTEÚDO E OUTROS SERVIÇOS DE INFORMAÇÃO NA INTERNET",
    "secao": "INFORMAÇÃO E COMUNICAÇÃO"
  },
  {
    "id": "9499500",
    "descricao": "ATIVIDADES ASSOCIATIVAS NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "OUTRAS ATIVIDADES DE SERVIÇOS"
  },
  {
    "id": "4713005",
    "descricao": "LOJAS FRANCAS (DUTY FREE) DE AEROPORTOS, PORTOS E EM FRONTEIRAS TERRESTRES",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "8411600",
    "descricao": "ADMINISTRAÇÃO PÚBLICA EM GERAL",
    "secao": "ADMINISTRAÇÃO PÚBLICA, DEFESA E SEGURIDADE SOCIAL"
  },
  {
    "id": "8690999",
    "descricao": "OUTRAS ATIVIDADES DE ATENÇÃO À SAÚDE HUMANA NÃO ESPECIFICADAS ANTERIORMENTE",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "2391502",
    "descricao": "APARELHAMENTO DE PEDRAS PARA CONSTRUÇÃO, EXCETO ASSOCIADO À EXTRAÇÃO",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "2391503",
    "descricao": "APARELHAMENTO DE PLACAS E EXECUÇÃO DE TRABALHOS EM MÁRMORE, GRANITO, ARDÓSIA E OUTRAS PEDRAS",
    "secao": "INDÚSTRIAS DE TRANSFORMAÇÃO"
  },
  {
    "id": "6511102",
    "descricao": "PLANOS DE AUXÍLIO FUNERAL",
    "secao": "ATIVIDADES FINANCEIRAS, DE SEGUROS E SERVIÇOS RELACIONADOS"
  },
  {
    "id": "4541206",
    "descricao": "COMÉRCIO A VAREJO DE PEÇAS E ACESSÓRIOS NOVOS PARA MOTOCICLETAS E MOTONETAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "4541207",
    "descricao": "COMÉRCIO A VAREJO DE PEÇAS E ACESSÓRIOS USADOS PARA MOTOCICLETAS E MOTONETAS",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  },
  {
    "id": "6911702",
    "descricao": "ATIVIDADES AUXILIARES DA JUSTIÇA",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "6920602",
    "descricao": "ATIVIDADES DE CONSULTORIA E AUDITORIA CONTÁBIL E TRIBUTÁRIA",
    "secao": "ATIVIDADES PROFISSIONAIS, CIENTÍFICAS E TÉCNICAS"
  },
  {
    "id": "8800600",
    "descricao": "SERVIÇOS DE ASSISTÊNCIA SOCIAL SEM ALOJAMENTO",
    "secao": "SAÚDE HUMANA E SERVIÇOS SOCIAIS"
  },
  {
    "id": "4713004",
    "descricao": "LOJAS DE DEPARTAMENTOS OU MAGAZINES, EXCETO LOJAS FRANCAS (DUTY FREE)",
    "secao": "COMÉRCIO; REPARAÇÃO DE VEÍCULOS AUTOMOTORES E MOTOCICLETAS"
  }
];
