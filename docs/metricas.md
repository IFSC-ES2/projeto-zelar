# Métricas do Projeto

Para garantir o acompanhamento adequado da execução e qualidade do sistema Zelar, a equipe definiu as seguintes métricas de Projeto, Processo e Produto.

## 1. Percentual de Conclusão do MVP
* Classificação: Métrica de Projeto
* Objetivo: Acompanhar o quanto o MVP está perto de ser finalizado dentro do prazo do semestre.
* Definição / Fórmula: `(Soma dos Story Points das Issues finalizadas / Total de Story Points do MVP) * 100`
* Fonte dos dados: Board de acompanhamento (GitHub Projects).
* Frequência de atualização: Final de cada Sprint / Ciclo de entrega.
* Responsável pelo acompanhamento: Scrum Master (Leticia).
* Forma de interpretação: Se o percentual estiver avançando muito devagar em relação ao calendário acadêmico, a equipe precisará repriorizar ou desescopar itens.

## 2. Velocity da Equipe
* Classificação: Métrica de Processo
* Objetivo: Compreender a capacidade real de entrega da equipe e melhorar o dimensionamento das próximas sprints.
* Definição / Fórmula: Soma dos Story Points de todas as issues movidas para a coluna de "Done" ao final do ciclo (sprint).
* Fonte dos dados: GitHub Projects / Repositório.
* Frequência de atualização: Final de cada Sprint.
* Responsável pelo acompanhamento: Scrum Master (Leticia).
* Forma de interpretação: Usado para verificar se as 16 horas de disponibilidade estão refletindo no ritmo estimado. Variações abruptas (para mais ou para menos) indicam problemas nas estimativas ou bloqueios na equipe.

## 3. Lead Time
* Classificação: Métrica de Processo
* Objetivo: Identificar gargalos no fluxo de trabalho a partir do momento em que o código começa a ser feito até ser integrado à branch principal.
* Definição / Fórmula: Tempo percorrido desde a transição de uma issue para "In Progress" até sua conclusão ("Done").
* Fonte dos dados: Timestamp dos cards e Pull Requests no GitHub.
* Frequência de atualização: Contínua (analisada a cada Sprint).
* Responsável pelo acompanhamento: DevOps/Infra (Vinicius) / Scrum Master (Leticia).
* Forma de interpretação: Lead Times altos em tarefas curtas apontam que tarefas estão agarradas em revisões de código (Code Review) ou impedimentos técnicos pendentes.

## 4. Densidade de Defeitos (Bugs)
* Classificação: Métrica de Produto
* Objetivo: Garantir a qualidade das entregas feitas, validando a eficácia do trabalho do desenvolvedor e o amadurecimento do software.
* Definição / Fórmula: Quantidade de bugs/problemas reportados nas funcionalidades que já constam como concluídas (Done).
* Fonte dos dados: Issues categorizadas com a label `bug` no GitHub, originadas após fase de testes.
* Frequência de atualização: Contínua / Semanal.
* Responsável pelo acompanhamento: Engenheiro de Qualidade (Leonardo).
* Forma de interpretação: Uma alta densidade de bugs indica que os critérios de aceite ou o Code Review estão falhos e que o time está focando em entregar "rápido" e não "certo".