# Estimativas e Planejamento

## 1. Planejamento Inicial

#### (a) Recorte do backlog base para o planejamento:
Baseado nas prioridades do MVP, o recorte inicial de curto prazo foca na configuração do ambiente de desenvolvimento e banco de dados, seguido pelos CRUDs fundamentais para que o fluxo exista. As issues selecionadas foram:
* #15 [DB] Modelagem e relacionamentos
* #18 [BUILD] Criar com docker ambiente de desenvolvimento
* #9 [BACK] CRUD de ambientes
* #10[BACK] CRUD de responsáveis

#### (b) Priorização dos itens mais importantes do MVP:
A priorização seguiu a ordem de dependência técnica:
1. Configurar o banco de dados e as entidades fundamentais (Issues #15 e #18).
2. Criar os endpoints básicos no backend para popular as entidades independentes do sistema (Ambientes e Responsáveis - Issues #9 e #10).

#### (c) Estimativas dos itens priorizados:
As estimativas foram feitas utilizando Story Points.
* Issue #15 ([DB] Modelagem e relacionamentos): 3 pontos.
* Issue #18 ([BUILD] Ambiente Docker): 5 pontos.
* Issue #9 ([BACK] CRUD de ambientes): 3 pontos.
* Issue #10 ([BACK] CRUD de responsáveis): 2 pontos.

#### (d) Técnica de estimativa adotada pela equipe:
A técnica adotada foi o Planning Poker utilizando *Story Points* baseados na sequência de Fibonacci (1, 2, 3, 5, 8, 13).

#### (e) Hipóteses assumidas para realizar as estimativas:
* Todos os 4 integrantes permanecerão ativos e comprometidos com a carga horária estimada.
* O escopo geral do MVP não sofrerá grandes alterações, embora pequenas adaptações possam ocorrer devido ao aprimoramento do projeto no programa Startup Garage do Sebrae (disciplina de Atividades de Extensão 2).
* Os recursos de laboratório do IFSC estarão integralmente disponíveis durante os horários das aulas.

#### (f) Capacidade planejada da equipe até o próximo marco:
A equipe possui uma capacidade estimada de 16 horas semanais, distribuídas uniformemente (4 horas por integrante, focadas primariamente durante os horários de aula).

#### (g) Previsão inicial do que se espera concluir no período:
Espera-se ter todo o ambiente local funcional rodando via Docker, o banco de dados modelado e populado preliminarmente, e as rotas de API dos responsáveis e ambientes finalizadas.

#### (h) Data de registro da linha de base do planejamento:
06 de abril de 2026.

## 2. Registro da Abordagem de Estimativa

#### (a) Qual técnica foi utilizada: 
Planning Poker adaptado.

#### (b) Quem participou da estimativa: 
Todos os membros (Letícia, Leonardo, Lucas e Vinícius).

#### (c) Qual unidade foi adotada pela equipe: 
Story Points (Sequência de Fibonacci).

#### (d) Quais critérios foram usados para comparar ou dimensionar os itens:
* Esforço de codificação: volume de código a ser escrito.
* Complexidade da regra de negócio: quantos relacionamentos ou validações a tarefa envolve.
* Incerteza tecnológica: o nível de familiaridade da equipe com o fluxo técnico exigido.

#### (e) Limitações ou incertezas percebidas:
A maior incerteza pontuada pela equipe está atrelada à curva de aprendizado inicial com o micro-framework Express, visto que suas particularidades arquiteturais não são tão detalhadamente exploradas no escopo atual do curso de Programação Backend.