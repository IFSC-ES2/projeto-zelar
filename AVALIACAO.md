# Avaliação - Engenharia de Software II

| entrega | aluno                         | commit  | data     | correção | nota | peso |
| ------- | ----------------------------- | ------- | -------- | -------- | ---- | ---- |
| 1       | equipe                        | 246e250 | 18/03/26 | 20/03/26 | 10   | 2    |
| 2       | equipe                        | 04befec | 06/04/26 | 20/03/26 | 9,5  | 2    |
| 3       | equipe                        | 730e1db | 06/04/26 | 22/04/26 | 10   | 3    |
| 4       | equipe                        | ab9cccf | 13/04/26 | 09/05/26 | 9,6  | 3    |
| 5       | Leonardo D. de Martini        | a077309 | 14/05/26 | 24/05/26 | 8,5  | 10   |
| 5       | Letícia Helena do R. Furlan   | a077309 | 14/05/26 | 24/05/26 | 6,4  | 10   |
| 5       | Lucas Barbieri Catarina       | a077309 | 14/05/26 | 24/05/26 | 7,5  | 10   |
| 5       | Vinicíus Martins de M. Lopes  | a077309 | 14/05/26 | 24/05/26 | 4,0  | 10   |

## Nota parcial

| aluno                         | nota parcial |
| ----------------------------- | ------------ |
| Leonardo D. de Martini        | 9,1          |
| Letícia Helena do R. Furlan   | 8,1          |
| Lucas Barbieri Catarina       | 8,6          |
| Vinicíus Martins de M. Lopes  | 6,9          |

## Comentários

### Entrega 1

1. Equipe formada: atendido.
2. Tema definido: atendido.
3. MVP: atendido.
4. Governança mínima: atendido.

### Entrega 2

1. Visão do produto: parcial
   - A equipe não definiu quais objetivos o produto pretende atingir neste semestre
   - A equipe não informou quais premissas, restrições ou limitações já são conhecidas
2. Definição do MVP: parcial
   - A equipe não definiu o objetivo do MVP
   - A equipe não informou porque o recorte das funcionalidades é viável para o semestre
   - A equipe não informou os critérios usados para decidir o que entra e o que fica de fora
3. Backlog inicial com critérios de aceitação: parcial
   - Não foram definidas prioridades relativas. Quais funcionalidades devem ser implementadas primeiro?
4. Definition of Done (DoD): não atendido
5. ADRs iniciais: não atendido
6. Atualização do README: atendido

#### Recuperação

1. Visão do produto: atendido
2. Definição do MVP: parcial
   - Objetivo geral demais; qual é o objetivo do seu MVP?
   - Acredito que vocês quiseram dizer que o "recorte é viável porque o escopo delimitado _vai ao encontro das_ matérias que a equipe está cursando neste semestre"
3. Backlog inicial com critérios de aceitação: parcial
   - As prioridades devem esar definidas na própria issue, não no texto da descrição
4. Definition of Done (DoD): atendido
5. ADRs iniciais: atendido.
6. Atualização do README: atendido

### Entrega 3

1. Planejamento inicial e baseline: atendido
2. Registro da abordagem de estimativa: atendido
3. Capacidade planejada da equipe: atendido
4. Definição das métricas que serão acompanhadas: atendido
5. Ficha de cada métrica: parcialmente atendido
   - Separar as fichas de cada métrica em arquivos diferentes
     - Em cada uma adicionar data do acompanhamento e valor coletado

### Entrega 4

1. Registro inicial de riscos do projeto: parcial
   - A tabela horizontal dificulta a visualização;
2. Análise e priorização dos riscos: parcial
   - A matriz de riscos deve ter como eixos probabilidade x impacto para apresentar visualmente os riscos
3. Plano de resposta aos riscos: atendido
4. Consolidação do fluxo de trabalho no repositório: parcial
5. Definição inicial de critérios de qualidade do projeto: atendido
6. Relação entre riscos e qualidade: atendido
7. Definição preliminar de avaliação da qualidade: atendido
8. Atualização da documentação do projeto: atendido

### Entrega 5

1. Primeiro incremento funcional do sistema: atendido com ressalvas.
   - O incremento entregue implementa um vertical slice relevante para o MVP: CRUD de responsáveis e ambientes, com backend Express/Sequelize, persistência PostgreSQL, telas Next.js e integração front/back.
   - O slice atravessa interface, lógica de aplicação e persistência, mas o relatório da sprint não descreve claramente o que já funciona no MVP nem explicita o recorte do vertical slice com base na priorização.
2. Testes de unidade automatizados: atendido.
   - O backend possui testes Jest/Supertest para `responsaveis`, `ambientes`, validação de schema e health/app, cobrindo comportamentos principais e erros.
   - O frontend possui testes Jest/Testing Library para listas de responsáveis e ambientes.
3. Escopo da Sprint 1 explicitado e justificado: parcial.
   - O baseline previa ambiente Docker, modelagem de banco, CRUD de ambientes e CRUD de responsáveis; os commits e PRs mostram que esses itens foram efetivamente priorizados.
   - O documento `sprint-1.md` é muito curto e não lista claramente issues planejadas, concluídas, parciais e replanejadas.
   - A justificativa do vertical slice aparece apenas de forma indireta pela priorização do baseline, não como explicação consolidada da Sprint 1.
4. Backlog e board atualizados: parcial.
   - Há issues/PRs associados aos itens centrais: `#24` modelagem, `#25` Docker, `#27` CRUD responsável, `#28` CRUD ambientes, `#30` integração do protótipo e `#34` relatório da sprint.
   - Não há consolidação documental da vinculação entre cada issue, commit e PR no relatório da sprint.
5. Fluxo de trabalho evidenciado no repositório: atendido com ressalvas.
   - Os PRs relevantes foram desenvolvidos por branches e tiveram revisão/aprovação de outro integrante antes do merge.
   - PRs principais avaliados: `#24`, `#25`, `#27`, `#28`, `#30` e `#34`.
   - Não havia workflow em `.github/workflows` no commit `v0.1.0`; o pipeline de testes aparece em PR posterior para `dev` (`#36`), portanto não integra a entrega marcada pela tag.
6. Registro das contribuições individuais: parcial.
   - O relatório `sprint-1.md` registra contribuições de Leonardo, Lucas e Letícia, mas não registra Vinícius.
   - O relatório diverge dos papéis informados no README/baseline e não associa contribuições individuais a issues, commits e PRs.
   - Contribuições individuais:
      - Leonardo: principal responsável técnico pela entrega, com commits de inicialização de frontend/backend, Docker Compose, ORM/models, validação de schema, CRUDs de responsáveis e ambientes, integração front/back, testes e ajustes de ambiente. Papel central no vertical slice entregue.
      - Letícia: registrou o relatório da Sprint 1 e há menção documental ao protótipo de baixa fidelidade, mas há pouca contribuição rastreável no commit/tag avaliado para código, testes ou qualidade, apesar do papel de Engenheira de Qualidade no README. Baixa rastreabilidade técnica na entrega.
      - Lucas: contribuiu com modelagem de banco, `schema.sql`, `seed.sql`, documentação de relacionamentos e revisões/aprovações de PRs relevantes. A participação é importante para a persistência e infraestrutura da sprint.
      - Vinicíus: não aparece no relatório de contribuições da Sprint 1 e não há contribuição rastreável no commit/tag `v0.1.0` avaliado. 
7. Documentação atualizada: parcial.
   - O README raiz aponta para documentação principal, board e backlog.
   - `sprint-1.md` existe, mas é insuficiente como relatório da entrega.
   - As instruções de execução são insuficientes no README raiz; há `docker-compose.yml` funcional em `src`, mas o caminho e os comandos de execução/testes não estão claramente documentados no ponto de entrada do projeto.
   - `src/front/README.md` ainda é o README padrão do Next.js, sem instruções específicas do produto.
8. Release do marco: atendido.
   - Tag `v0.1.0` criada no commit `a077309`.
   - Release `Primeira Release` publicada no GitHub.

