# Registro e Acompanhamento de Riscos — Projeto Zelar

Este documento registra os riscos identificados no projeto **Zelar**, suas prioridades, respostas planejadas e acompanhamento final após a conclusão do MVP.

## 1. Objetivo

O gerenciamento de riscos tem como objetivo antecipar problemas que poderiam comprometer:

* prazo de entrega;
* qualidade do MVP;
* deploy e demonstração;
* consistência dos dados;
* capacidade técnica da equipe;
* rastreabilidade das entregas;
* defesa técnica final.

## 2. Critérios de avaliação

A prioridade do risco é calculada pela fórmula:

```txt
Prioridade = Probabilidade x Impacto
```

| Nível | Probabilidade | Impacto        |
| ----: | ------------- | -------------- |
|     1 | Muito rara    | Insignificante |
|     2 | Rara          | Baixo          |
|     3 | Ocasional     | Moderado       |
|     4 | Provável      | Alto           |
|     5 | Frequente     | Catastrófico   |

## 3. Matriz inicial de riscos

| Código | Risco                             | Natureza   | Causa                                                    | Consequência                          | Prob. | Impacto | Prioridade | Responsável           |
| ------ | --------------------------------- | ---------- | -------------------------------------------------------- | ------------------------------------- | ----: | ------: | ---------: | --------------------- |
| R01    | Falta de nuvem/deploy             | Tecnologia | Ausência de ambiente externo estável                     | Dificuldade para demonstrar o sistema |     5 |       4 |         20 | DevOps                |
| R02    | Atraso no prazo                   | Prazo      | Carga horária limitada e escopo do MVP                   | Entrega incompleta                    |     3 |       5 |         15 | Scrum Master          |
| R03    | Inconsistência de dados           | Qualidade  | Validações fracas ou dados legados inconsistentes        | Erros no fluxo de patrimônio          |     2 |       4 |          8 | Arquitetura/Qualidade |
| R04    | Gargalo técnico                   | Equipe     | Curva de aprendizado em React, Node, PostgreSQL e deploy | Atraso e baixa qualidade              |     3 |       4 |         12 | Equipe                |
| R05    | Escopo inflado                    | Escopo     | Inclusão de funcionalidades extras durante as sprints    | Perda de foco no MVP                  |     3 |       3 |          9 | Scrum Master          |
| R06    | Baixa rastreabilidade             | Processo   | Falta de vínculo entre issue, PR, teste e documentação   | Dificuldade na defesa técnica         |     3 |       4 |         12 | Equipe                |
| R07    | Pipeline insuficiente             | Qualidade  | CI executa testes, mas não cobre build/lint completo     | Erros podem chegar à release          |     3 |       3 |          9 | DevOps/Qualidade      |
| R08    | Funcionalidade central incompleta | Produto    | Fluxo de mudança de estado/solicitação não integrado     | MVP perde aderência ao objetivo       |     3 |       5 |         15 | Equipe                |

## 4. Plano de resposta

| Risco                                   | Ação preventiva                                                          | Ação de contingência                                                       |
| --------------------------------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| R01 — Falta de nuvem/deploy             | Configurar deploy em ambiente externo e manter execução local com Docker | Demonstrar localmente via Docker caso o deploy falhe                       |
| R02 — Atraso no prazo                   | Priorizar funcionalidades centrais do MVP e revisar backlog por sprint   | Cortar funcionalidades não essenciais, como relatórios e e-mail automático |
| R03 — Inconsistência de dados           | Validações em backend, frontend e banco de dados                         | Criar migração de saneamento e bloquear dados inválidos                    |
| R04 — Gargalo técnico                   | Dividir tarefas por domínio, revisar PRs e compartilhar conhecimento     | Reatribuir tarefas críticas e simplificar escopo                           |
| R05 — Escopo inflado                    | Manter foco no MVP e registrar itens futuros separadamente               | Mover funcionalidades extras para próximos passos                          |
| R06 — Baixa rastreabilidade             | Registrar issue, PR, testes e documentação para cada entrega             | Criar tabela final de rastreabilidade antes da defesa                      |
| R07 — Pipeline insuficiente             | Manter testes automatizados no GitHub Actions                            | Executar build/lint manualmente antes da release                           |
| R08 — Funcionalidade central incompleta | Priorizar solicitação, mudança de estado e histórico na Sprint 4         | Demonstrar apenas o fluxo concluído e declarar limitações                  |

## 5. Acompanhamento por Sprint

### Sprint 1

| Risco                       | Situação | Ação tomada                                                  |
| --------------------------- | -------- | ------------------------------------------------------------ |
| R02 — Atraso no prazo       | Ativo    | Escopo inicial focado em ambiente, banco e CRUDs base        |
| R04 — Gargalo técnico       | Ativo    | Separação de responsabilidades por área                      |
| R06 — Baixa rastreabilidade | Ativo    | Uso inicial de issues e PRs, mas documentação ainda limitada |

**Análise:**
A Sprint 1 entregou o primeiro vertical slice, mas ainda havia risco de documentação insuficiente e rastreabilidade parcial.

---

### Sprint 2

| Risco                                   | Situação              | Ação tomada                                |
| --------------------------------------- | --------------------- | ------------------------------------------ |
| R02 — Atraso no prazo                   | Ativo                 | Priorização de cadastros auxiliares e CI   |
| R04 — Gargalo técnico                   | Ativo                 | Implementação distribuída entre membros    |
| R07 — Pipeline insuficiente             | Parcialmente mitigado | Criação do workflow de testes              |
| R08 — Funcionalidade central incompleta | Ativo                 | Patrimônio ainda precisava ser consolidado |

**Análise:**
A Sprint 2 avançou em cadastros e CI, mas o risco de funcionalidade central incompleta permaneceu, principalmente em relação ao fluxo de patrimônio.

---

### Sprint 3

| Risco                                   | Situação              | Ação tomada                                        |
| --------------------------------------- | --------------------- | -------------------------------------------------- |
| R01 — Falta de nuvem/deploy             | Mitigado parcialmente | Deploy iniciado/configurado                        |
| R03 — Inconsistência de dados           | Mitigado parcialmente | Soft delete, timestamps, versionamento e auditoria |
| R06 — Baixa rastreabilidade             | Parcialmente mitigado | PRs e documentação de Sprint 3                     |
| R08 — Funcionalidade central incompleta | Parcialmente mitigado | CRUD de patrimônio consolidado                     |

**Análise:**
A Sprint 3 foi importante para reduzir riscos técnicos. A inclusão de auditoria, soft delete, versionamento e timestamps aumentou a confiabilidade e manutenibilidade do sistema.

---

### Sprint 4

| Risco                                   | Situação              | Ação tomada                                                  |
| --------------------------------------- | --------------------- | ------------------------------------------------------------ |
| R02 — Atraso no prazo                   | Mitigado              | Sprint focada apenas em funcionalidades finais do MVP        |
| R03 — Inconsistência de dados           | Mitigado              | Responsável por ambiente tornou-se obrigatório               |
| R06 — Baixa rastreabilidade             | Mitigado              | Issues finais vinculadas a PRs e documentação                |
| R07 — Pipeline insuficiente             | Parcialmente mitigado | Testes mantidos no CI; build/lint recomendados manualmente   |
| R08 — Funcionalidade central incompleta | Mitigado              | Solicitações, mudança de estado e histórico foram concluídos |

**Análise:**
A Sprint 4 reduziu os riscos mais importantes para a entrega final. O fluxo principal do MVP foi fechado com dashboard real, solicitações, mudança de estado, histórico e obrigatoriedade de responsável por ambiente.

## 6. Situação final dos riscos

| Código | Risco                             | Situação final        | Justificativa                                                                               |
| ------ | --------------------------------- | --------------------- | ------------------------------------------------------------------------------------------- |
| R01    | Falta de nuvem/deploy             | Mitigado              | O projeto possui deploy via Render e execução local com Docker                              |
| R02    | Atraso no prazo                   | Mitigado              | O escopo foi controlado e as funcionalidades centrais foram concluídas                      |
| R03    | Inconsistência de dados           | Mitigado              | Foram adicionadas validações, migrações e responsável obrigatório                           |
| R04    | Gargalo técnico                   | Parcialmente mitigado | A equipe entregou o MVP, mas a complexidade técnica exigiu maior esforço nas sprints finais |
| R05    | Escopo inflado                    | Mitigado              | Funcionalidades como e-mail, autenticação e relatórios foram deixadas como futuras          |
| R06    | Baixa rastreabilidade             | Mitigado              | Issues, PRs, testes e documentos finais foram consolidados                                  |
| R07    | Pipeline insuficiente             | Parcialmente mitigado | CI executa testes, mas build/lint ainda podem ser melhorados                                |
| R08    | Funcionalidade central incompleta | Mitigado              | Fluxo de solicitação e mudança de estado foi implementado na Sprint 4                       |


## 7. Relação entre riscos e decisões técnicas

| Decisão técnica                         | Risco mitigado | Como ajudou                                              |
| --------------------------------------- | -------------- | -------------------------------------------------------- |
| Docker Compose                          | R01            | Permite executar o sistema localmente se o deploy falhar |
| Deploy no Render                        | R01            | Fornece ambiente online de demonstração                  |
| Testes automatizados                    | R03, R07       | Reduz regressões e valida regras principais              |
| CI no GitHub Actions                    | R07            | Executa testes em PRs e pushes                           |
| Soft delete                             | R03            | Evita perda definitiva de dados                          |
| Audit log                               | R03, R06       | Garante rastreabilidade das alterações                   |
| Controle de versão                      | R03            | Reduz risco de conflito em alterações                    |
| Responsável obrigatório por ambiente    | R03            | Bloqueia dado inconsistente no fluxo principal           |
| Solicitações de manutenção/substituição | R08            | Fecha o fluxo operacional do MVP                         |

## 8. Conclusão

Os principais riscos do projeto foram reduzidos até a entrega final.

Os riscos mais críticos no início eram falta de deploy, atraso no prazo e funcionalidade central incompleta. Ao final, o sistema possui deploy, execução local, testes, CI, documentação e fluxo principal do MVP implementado.

O principal risco residual é a estabilidade operacional da demonstração, especialmente por depender de hospedagem gratuita. Por isso, a equipe deve manter uma alternativa local com Docker pronta para a apresentação e defesa.