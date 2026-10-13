import { AssessmentQuestion } from '../types';

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'q-radiacao',
    title: '1. O estabelecimento utiliza ou planeja utilizar fontes de radiação ionizante ou equipamentos de Raio-X?',
    description: 'Aparelhos de tomografia, mamografia, radiografia odontológica/médica periapical ou panorâmica, fluoroscopia ou aceleradores lineares.',
    category: 'Radioproteção',
    triggersLtaIfYes: true,
    helpText: 'O LTA é obrigatório para avaliação de blindagem física de salas baritadas/chumbadas e memoriais de cálculo de dose conforme Portaria CVS 01/2024 e RDC 50/2002.'
  },
  {
    id: 'q-esterilizacao',
    title: '2. Haverá Central de Material e Esterilização (CME) ou processamento de artigos médicos/odontológicos/cirúrgicos críticos?',
    description: 'Lavagem, desinfecção, esterilização por autoclave e estocagem de instrumentais com fluxo unidirecional de barreira limpo/sujo.',
    category: 'Controle de Infecção',
    triggersLtaIfYes: true,
    helpText: 'Exige comprovação de barreira física com guichê de repasse ou circulação independente para evitar contaminação cruzada.'
  },
  {
    id: 'q-manipulacao-alimentos',
    title: '3. A atividade envolve manipulação, cocção, fracionamento industrial ou produção de alimentos com área construída > 150m²?',
    description: 'Cozinhas industriais, fábricas de massas, açougues com desossa, panificação com produção própria ou padarias com serviço de refeições.',
    category: 'Alimentos & Nutrição',
    triggersLtaIfYes: true,
    helpText: 'Necessário analisar fluxos de recebimento, armazenamento em câmaras frias, pré-preparo, cocção, higienização de caixas e distribuição.'
  },
  {
    id: 'q-procedimentos-invasivos',
    title: '4. Serão realizados procedimentos invasivos, sedação, cirurgias ambulatoriais ou aplicação de toxinas/laser classe 3B/4?',
    description: 'Salas de procedimentos cirúrgicos menores, Day Clinic, biópsias, procedimentos dermatológicos/estéticos invasivos com anestesia local.',
    category: 'Assistência à Saúde',
    triggersLtaIfYes: true,
    helpText: 'Requer posto de enfermagem, sala de recuperação, depósito de material de limpeza (DML) exclusivo e sanitários acessíveis PCD.'
  },
  {
    id: 'q-residuos-saude',
    title: '5. Haverá geração de Resíduos de Serviços de Saúde (RSS) com abrigo externo exclusivo (Grupo A - Biológicos e Grupo B - Químicos)?',
    description: 'Resíduos pérfuro-cortantes, materiais biológicos, sangue, medicamentos vencidos, quimioterápicos ou efluentes químicos.',
    category: 'Gestão Ambiental & RSS',
    triggersLtaIfYes: true,
    helpText: 'O projeto físico deve conter abrigo temporário e abrigo externo dimensionados segundo a RDC Anvisa 222/2018.'
  },
  {
    id: 'q-area-ampliacao',
    title: '6. Trata-se de nova construção, reforma com alteração de layout físico sanitário ou acréscimo de área construída?',
    description: 'Modificações em paredes, novas salas técnicas, alterações de pontos de água/esgoto sanitário ou ampliação do imóvel comercial.',
    category: 'Engenharia & Arquitetura',
    triggersLtaIfYes: true,
    helpText: 'Qualquer intervenção física que altere os fluxos sanitários previamente aprovados demanda nova submissão de LTA.'
  }
];
