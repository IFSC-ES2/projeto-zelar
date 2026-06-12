# Métricas do Projeto — Zelar

Este documento registra as métricas de projeto, processo e produto acompanhadas durante o desenvolvimento do MVP do sistema **Zelar**.

As métricas foram definidas para apoiar o acompanhamento da evolução do projeto, a previsibilidade da equipe, a qualidade das entregas e a preparação da apresentação e defesa final.

## 1. Objetivo do acompanhamento

O acompanhamento de métricas tem como objetivo:

* verificar se o MVP avançou conforme o planejamento;
* identificar gargalos no fluxo de trabalho;
* registrar a capacidade de entrega da equipe;
* acompanhar defeitos e problemas encontrados;
* produzir evidências objetivas para a apresentação e defesa final;
* relacionar as entregas feitas com issues, pull requests, testes e documentação.

## 2. Fontes utilizadas

As métricas foram coletadas a partir das seguintes fontes:

| Fonte                   | Uso                                                              |
| ----------------------- | ---------------------------------------------------------------- |
| GitHub Issues           | Verificação das tarefas planejadas e concluídas                  |
| GitHub Pull Requests    | Evidência de integração, revisão e fechamento de funcionalidades |
| GitHub Actions          | Evidência de execução automatizada de testes                     |
| Relatórios de Sprint    | Registro das entregas individuais e técnicas                     |
| Documentação do projeto | Arquitetura, riscos, ADRs e entrega final                        |
| Repositório             | Código-fonte, testes, deploy e histórico de commits              |

## 3. Métricas definidas

### 3.1 Percentual de conclusão do MVP

**Classificação:** Métrica de Projeto.

**Objetivo:** Acompanhar quanto do MVP planejado foi concluído até a entrega final.

**Fórmula principal:**

```txt
(Soma dos Story Points das issues finalizadas / Total de Story Points planejados para o MVP) * 100
```

**Fórmula alternativa quando Story Points não estiverem disponíveis:**

```txt
(Quantidade de issues do MVP finalizadas / Quantidade total de issues do MVP planejadas) * 100
```

**Fonte dos dados:** GitHub Projects, GitHub Issues e relatórios de sprint.

**Frequência de atualização:** Final de cada sprint.

**Responsável pelo acompanhamento:** Scrum Master.

**Interpretação:**
Percentual baixo próximo da entrega final indica risco de escopo incompleto. Percentual alto indica que o MVP está convergindo para uma versão demonstrável.

---

### 3.2 Velocity da equipe

**Classificação:** Métrica de Processo.

**Objetivo:** Compreender a capacidade real de entrega da equipe por sprint.

**Fórmula principal:**

```txt
Soma dos Story Points das issues concluídas na sprint
```

**Fórmula alternativa quando Story Points não estiverem disponíveis:**

```txt
Quantidade de issues funcionais concluídas na sprint
```

**Fonte dos dados:** GitHub Projects, GitHub Issues, Pull Requests e relatórios de sprint.

**Frequência de atualização:** Final de cada sprint.

**Responsável pelo acompanhamento:** Scrum Master.

**Interpretação:**
Variações grandes entre sprints indicam mudança de complexidade, gargalos técnicos, impedimentos ou melhoria na organização da equipe.

---

### 3.3 Lead Time

**Classificação:** Métrica de Processo.

**Objetivo:** Identificar o tempo médio entre o início formal de uma tarefa e sua conclusão.

**Fórmula:**

```txt
Data de fechamento da issue - Data de abertura da issue
```

**Fonte dos dados:** GitHub Issues e Pull Requests.

**Frequência de atualização:** Final de cada sprint.

**Responsável pelo acompanhamento:** DevOps/Infra e Scrum Master.

**Interpretação:**
Lead Time alto pode indicar tarefa grande demais, bloqueio técnico, revisão demorada ou dependência entre funcionalidades.

---

### 3.4 Densidade de defeitos

**Classificação:** Métrica de Produto.

**Objetivo:** Acompanhar problemas encontrados em funcionalidades já consideradas concluídas.

**Fórmula:**

```txt
Quantidade de bugs reportados / Quantidade de funcionalidades concluídas
```

**Fonte dos dados:** Issues classificadas como bug, correções em PRs e testes.

**Frequência de atualização:** Semanal e ao final de cada sprint.

**Responsável pelo acompanhamento:** Engenharia de Qualidade.

**Interpretação:**
Alta densidade de defeitos indica falhas nos critérios de aceite, testes insuficientes ou revisão de código incompleta.

---

### 3.5 Rastreabilidade das entregas

**Classificação:** Métrica de Processo/Qualidade.

**Objetivo:** Verificar se cada funcionalidade entregue possui evidência rastreável no repositório.

**Fórmula:**

```txt
(Quantidade de funcionalidades com Issue + PR + Teste + Documentação / Total de funcionalidades entregues) * 100
```

**Fonte dos dados:** Issues, Pull Requests, testes e documentação.

**Frequência de atualização:** Final de cada sprint.

**Responsável pelo acompanhamento:** Equipe.

**Interpretação:**
Uma entrega com baixa rastreabilidade dificulta a defesa técnica, pois não deixa claro onde a funcionalidade foi planejada, implementada, revisada e testada.

---

### 3.6 Estabilidade do pipeline

**Classificação:** Métrica de Qualidade/Processo.

**Objetivo:** Verificar se a integração contínua apoia o controle de qualidade do projeto.

**Critério de acompanhamento:**

```txt
PRs relevantes com checks executados e sem falha bloqueante antes do merge
```

**Fonte dos dados:** GitHub Actions e Pull Requests.

**Frequência de atualização:** A cada Pull Request.

**Responsável pelo acompanhamento:** DevOps/Infra.

**Interpretação:**
Falhas recorrentes no pipeline indicam instabilidade nos testes, problemas de ambiente ou ausência de validações automatizadas.

---

## 4. Acompanhamento por Sprint

| Sprint   | Entregas principais                                                         | Issues/itens funcionais concluídos |  Story Points concluídos | Observação                          |
| -------- | --------------------------------------------------------------------------- | ---------------------------------: | -----------------------: | ----------------------------------- |
| Sprint 1 | Ambiente Docker, modelagem, CRUD de ambientes e responsáveis                |                                  4 | 14 | Primeiro vertical slice do MVP      |
| Sprint 2 | CI, fornecedores, tipos de material, estados do item e conferentes          |                                  4 | 16 | Expansão dos cadastros auxiliares   |
| Sprint 3 | Deploy, patrimônio, soft delete, auditoria, versionamento e timestamps      |                                  6 | 16 | Consolidação técnica e arquitetural |
| Sprint 4 | Dashboard real, solicitações, histórico de estado e responsável obrigatório |                                  4 | 17 | Fechamento do fluxo central do MVP  |

## 5. Acompanhamento final da Sprint 4

A Sprint 4 foi usada para fechar funcionalidades diretamente ligadas ao MVP demonstrável.

| Issue | Funcionalidade                          | Responsável | PR relacionado | Status    | Evidência de qualidade                                     |
| ----- | --------------------------------------- | ----------- | -------------- | --------- | ---------------------------------------------------------- |
| #58   | Dashboard com dados reais               | Vinícius    | #59            | Concluída | Teste de unidade do Dashboard                              |
| #60   | Responsável obrigatório em ambiente     | Letícia     | #65            | Concluída | Testes de rejeição de ambiente sem responsável             |
| #61   | Mudança de estado do item e histórico   | Lucas       | #64            | Concluída | Testes de endpoint/histórico e integração com frontend     |
| #62   | Solicitações de manutenção/substituição | Leonardo    | #63            | Concluída | Testes de criação, listagem filtrada e transição de status |

## 6. Percentual de conclusão do MVP final

Considerando as funcionalidades centrais previstas para o MVP final:

| Item do MVP                                                            | Situação  |
| ---------------------------------------------------------------------- | --------- |
| CRUD de patrimônios                                                    | Concluído |
| CRUD de ambientes                                                      | Concluído |
| CRUD de responsáveis                                                   | Concluído |
| CRUD de fornecedores                                                   | Concluído |
| CRUD de conferentes                                                    | Concluído |
| CRUD de tipos de material                                              | Concluído |
| CRUD de estados do item                                                | Concluído |
| Associação de patrimônio a ambiente/responsável/tipo/estado/fornecedor | Concluído |
| Responsável obrigatório por ambiente                                   | Concluído |
| Registro de mudança de estado do item                                  | Concluído |
| Histórico de estado                                                    | Concluído |
| Solicitações de manutenção/substituição                                | Concluído |
| Dashboard com dados reais                                              | Concluído |
| Deploy demonstrável                                                    | Concluído |
| Testes automatizados                                                   | Concluído |
| Pipeline CI                                                            | Concluído |

**Conclusão:** O MVP demonstrável foi concluído em seus fluxos centrais.

Funcionalidades como autenticação completa, controle de permissões, notificações por e-mail e relatórios exportáveis ficaram como evolução futura e não são consideradas parte concluída do MVP final.

## 7. Lead Time da Sprint 4

| Issue | Data de abertura | Data de fechamento | Lead Time aproximado |
| ----- | ---------------- | ------------------ | -------------------: |
| #58   | 01/06/2026       | 08/06/2026         |               7 dias |
| #60   | 08/06/2026       | 12/06/2026         |               4 dias |
| #61   | 08/06/2026       | 12/06/2026         |               4 dias |
| #62   | 08/06/2026       | 12/06/2026         |               4 dias |

**Lead Time médio aproximado da Sprint 4:**

```txt
(7 + 4 + 4 + 4) / 4 = 4,75 dias
```

**Análise:**
O Lead Time da Sprint 4 foi adequado para uma sprint de fechamento. A issue #58 teve duração maior por envolver substituição de dados mockados do dashboard e preparação de indicadores dinâmicos. As demais issues tiveram duração semelhante, concentradas no período final da sprint.

## 8. Velocity final

| Sprint   | Issues/itens funcionais concluídos | Análise                             |
| -------- | ---------------------------------: | ----------------------------------- |
| Sprint 1 |                                  4 | Entrega inicial do vertical slice   |
| Sprint 2 |                                  4 | Expansão de cadastros e CI          |
| Sprint 3 |                                  6 | Maior volume técnico e arquitetural |
| Sprint 4 |                                  4 | Fechamento do fluxo central do MVP  |

**Análise:**
A equipe manteve uma entrega regular ao longo do projeto, com maior concentração técnica na Sprint 3 e fechamento funcional na Sprint 4. A Sprint 4 não buscou ampliar escopo, mas concluir funcionalidades essenciais para a demonstração final.

## 9. Densidade de defeitos

| Período          |          Bugs formais abertos |           Funcionalidades concluídas | Densidade observada |
| ---------------- | ----------------------------: | -----------------------------------: | ------------------: |
| Fechamento final | 0 bugs abertos no repositório | 4 funcionalidades finais da Sprint 4 |                   0 |

**Análise:**
No fechamento da entrega final, não havia issues abertas no repositório. Correções e ajustes foram tratados por meio de pull requests e testes automatizados. Isso não significa ausência absoluta de defeitos, mas indica que não havia defeitos formalmente registrados e pendentes no GitHub no momento do fechamento.

## 10. Rastreabilidade final

| Funcionalidade                          | Issue | PR  | Testes        | Documento                        |
| --------------------------------------- | ----- | --- | ------------- | -------------------------------- |
| Dashboard com dados reais               | #58   | #59 | Sim           | `docs/entregas/sprint-4.md`      |
| Solicitações de manutenção/substituição | #62   | #63 | Sim           | `docs/entregas/sprint-4.md`      |
| Histórico de mudança de estado          | #61   | #64 | Sim           | `docs/entregas/sprint-4.md`      |
| Responsável obrigatório por ambiente    | #60   | #65 | Sim           | `docs/entregas/sprint-4.md`      |
| Documentação da Sprint 4                | -     | #66 | Não aplicável | `docs/entregas/sprint-4.md`      |
| Entrega final                           | -     | #67 | Não aplicável | `README.md` e documentação final |

**Conclusão:**
As funcionalidades finais possuem rastreabilidade suficiente para a defesa: há issue, pull request, teste e documentação associada para os principais itens da Sprint 4.

## 11. Estabilidade do pipeline

O projeto possui workflow de integração contínua no GitHub Actions.

O pipeline executa:

* testes do backend;
* testes do frontend;
* serviço PostgreSQL para os testes do backend;
* execução em pull requests;
* execução em pushes para a branch principal.

## 12. Conclusão das métricas

As métricas mostram que o projeto chegou ao final com o MVP demonstrável concluído, issues finais fechadas, PRs integrados, testes automatizados e pipeline ativo.

Os principais pontos positivos foram:

* fechamento das quatro funcionalidades finais da Sprint 4;
* redução de escopo não essencial;
* rastreabilidade entre issues, PRs, testes e documentação;
* integração contínua com testes de backend e frontend;
* deploy disponível para demonstração.

Os principais pontos de melhoria futura são:

* registrar Story Points diretamente na documentação final;
* manter métricas atualizadas a cada sprint, e não apenas no fechamento;
* adicionar build e lint ao pipeline;
* medir cobertura real de testes;
* registrar defeitos encontrados durante homologação manual.
