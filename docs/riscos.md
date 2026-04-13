# Registro de Riscos - Projeto Zelar

Este documento descreve a análise de riscos para o MVP do sistema Zelar, conforme os critérios da entrega 4.

## 1. Critérios de Avaliação

A prioridade é calculada multiplicando **Probabilidade (1-5)** por **Impacto (1-5)**.

| Nível | Probabilidade (Frequência) | Impacto (Severidade) |
| :--- | :--- | :--- |
| 1 | Muito Rara | Insignificante |
| 2 | Rara | Baixo |
| 3 | Ocasional | Moderado |
| 4 | Provável | Alto |
| 5 | Frequente | Catastrófico (Impede o MVP) |

## 2. Matriz de Riscos

| Risco | Natureza | Causa | Consequência | Prob. | Imp. | Pri. | Mitigação | Responsável |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| **R01: Falta de Nuvem** | Tecnologia | Ausência de servidor de hospedagem. | Impossibilidade de testar notificações e acesso externo. | 5 | 4 | 20 | Utilizar Docker local e ferramentas como Ngrok para testes externos pontuais. | DevOps |
| **R02: Atraso no Prazo** | Prazo | Carga horária limitada (16h/semana) e complexidade imprevista. | Entrega incompleta do MVP. | 3 | 5 | 15 | Revisão semanal do backlog e corte de funcionalidades não essenciais. | Scrum Master |
| **R03: Inconsistência de Dados** | Qualidade | Falha na validação de estados do item. | Erros no fluxo operacional de patrimônio. | 2 | 4 | 8 | Implementação rigorosa de validações no backend/frontend e testes de integração. | Arquiteto |
| **R04: Gargalo Técnico** | Equipe | Curva de aprendizado elevada em tecnologias específicas (ex: React/PostgreSQL). | Atraso em tarefas complexas e baixa qualidade de código. | 3 | 4 | 12 | Realização de pair programming e compartilhamento de conhecimento em reuniões técnicas. | Arquiteto |
| **R05: Escopo Inflado** | Escopo | Pedidos de novas funcionalidades durante a sprint. | Desfocagem do objetivo central de rastreio. | 3 | 3 | 9 | Manter o Product Backlog visível e negar "gold plating" durante o desenvolvimento. | Scrum Master |

## 3. Plano de Resposta e Acompanhamento

| Risco | Ações Preventivas (Proativas) | Ações Reativas (Contingência) |
| :--- | :--- | :--- |
| **R01: Nuvem** | Utilizar Docker para paridade de ambiente; Configurar Webhooks locais para simular e-mails. | Usar Túneis (Ngrok/LocalTunnel) para demonstrações externas; Gravar vídeos das funcionalidades locais. |
| **R02: Prazo** | Realizar reuniões rápidas de alinhamento; Manter o cronograma da Sprint sempre visível para a equipe. | Reduzir o escopo, focando apenas no que é essencial para o funcionamento do MVP. |
| **R03: Dados** | Definir Schemas de validação (Zod/Joi) no backend; Implementar testes unitários para o fluxo de estado. | Executar Scripts de limpeza e correção de banco de dados; Realizar Rollback de deploy se necessário. |
| **R04: Gargalo** | Realizar sessões de Pair Programming; Consultar documentação oficial e ADRs do projeto. | Reordenar o Backlog para tarefas menos complexas. |
| **R05: Escopo** | Validar requisitos com o PO no início da Sprint; Manter o documento de Inception como referência de limite. | Negociar a inclusão da nova funcionalidade apenas em uma Release futura, mantendo o foco no MVP. |

- **Acompanhamento:** Os riscos serão revisados em cada planejamento de Sprint (Sprint Planning). A matriz de riscos será atualizada caso novas ameaças surjam durante o desenvolvimento.

## 4. Riscos Críticos (Prioridade > 10)

1. **R01 (Tecnologia/Infra):** A falta de nuvem é o maior gargalo técnico, forçando a dependência de ambientes locais.
2. **R02 (Prazo):** A restrição de tempo do semestre exige monitoramento constante do cronograma.
3. **R04 (Equipe):** A complexidade técnica pode impactar a velocidade da squad.
