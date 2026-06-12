# Relatório de Entregas Individuais | Sprint 4

## [ISSUE 58] Integração de Dados Reais no Dashboard
• Responsável: Vinícius
• Escopo: Substituição dos dados estáticos  da página inicial (/) por 
  indicadores dinâmicos obtidos do sistema.
• Entregas Realizadas:
  - Cartões Dinâmicos: Exibição real do total de patrimônios, ambientes, 
    responsáveis ativos e itens em manutenção.
  - Atividades Recentes: Alimentação da linha do tempo baseada em eventos reais.
  - Resiliência: Tratamento de estados de carregamento (loading) e erros na UI.
  - Qualidade: Desenvolvimento de testes de unidade para o componente Dashboard.tsx.

## [ISSUE 62] Implementação da Entidade e Gestão de Solicitações
• Responsável: Leonardo
• Escopo: Criação do zero da entidade de "Solicitação" (manutenção/substituição) 
  no ecossistema da aplicação, habilitando as regras de backend e a tela de 
  acompanhamento do gestor.
• Entregas Realizadas:
  - Backend & DB: Model Solicitacao (com soft delete, controle de versão e FKs 
    para Patrimonio e Conferente) e respectiva migração de banco de dados.
  - Arquitetura: Implementação completa seguindo o padrão (BaseRepository, 
    Service, Controller e Rotas para CRUD).
  - Frontend: Criação da rota /solicitacoes e do componente SolicitacoesList.tsx, 
    com filtros de status/tipo e vínculo no menu lateral (SidebarLayout.tsx).
  - Qualidade: Testes automatizados cobrindo criação, listagem filtrada e 
    transições de status da solicitação.

## [ISSUE 61] Registro de Mudança de Estado do Item e Histórico
• Responsável: Lucas
• Escopo: Substituição do mockup da tela de alteração de estado do patrimônio e 
  exposição do histórico de movimentações.
• Entregas Realizadas:
  - Backend: Criação do endpoint GET /patrimonios/:id/historico-estado que faz a 
    leitura inteligente a partir do audit_log existente.
  - Frontend Dinâmico: Tela RegistroEstado.tsx realizando cargas de dados reais 
    do patrimônio, estados e conferentes via chamadas de API.
  - Integração: Acoplamento com a Issue 62 para disparar a abertura automática 
    de solicitações quando um item é marcado como avariado ou vai para manutenção.
  - UX/UI: Validação de campos obrigatórios, alertas visuais via Toast.tsx e 
    redirecionamento pós-sucesso.

## [ISSUE 60] Obrigatoriedade de Responsável por Ambiente
• Responsável: Letícia
• Escopo: Adequação do sistema à regra de negócio descrita no inception do produto, 
  onde todo ambiente mapeado necessita, obrigatoriamente, de um responsável direto.
• Entregas Realizadas:
  - Banco de Dados: Alteração do model Ambiente.ts para allowNull: false e 
    migração tratando previamente os dados legados inconsistentes.
  - Segurança (Backend): Validação explícita no AmbienteService.ts barrando 
    operações de escrita/atualização desprovidas de um responsavel_id válido.
  - Frontend: Modificação do formulário AmbienteForm.tsx aplicando a tag 'required' 
    e bloqueando submits sem a indicação do responsável.
  - Qualidade: Escrita de testes cobrindo a rejeição de ambientes sem responsáveis.


### MAPEAMENTO DE DEPENDÊNCIAS E ALINHAMENTO TÉCNICO
-------------------------------------------------------------------------------
• Sequenciamento de Funcionalidades: 
  A Issue 62 serviu de fundação para a Issue 61. O fluxo de 
  desenvolvimento foi respeitado, garantindo que a infraestrutura de solicitações 
  estivesse pronta antes do gatilho automático de abertura por avaria ser acionado.

• Rastreabilidade: 
  Todas as tarefas fecharam diretamente os requisitos previstos para garantir a conformidade regulatória e de negócio do MVP.

• Aproveitamento Arquitetural: 
  A estratégia adotada na Issue 61 de reaproveitar o hook global de 'audit_log' 
  para gerar o histórico de transição de estados evitou a criação de tabelas redundantes e reduziu o débito técnico futuro.


### INDICADORES DE QUALIDADE DA SPRINT
-------------------------------------------------------------------------------
• Cobertura de Testes: [OK] 100% das novas regras e componentes testados.
• Padronização: [OK] Uso estrito do BaseRepository e padrões de listagem comuns.
• Saneamento de Dados: [OK] Resíduos de ambientes sem responsáveis antigos foram 
  corrigidos na execução da migração.
