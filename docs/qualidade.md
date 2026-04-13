# Critérios de Qualidade Inicial

Este documento define os atributos de qualidade prioritários para o MVP do sistema Zelar, baseados na norma **ISO/IEC 25010**.

## 1. Atributos de Qualidade Selecionados

| Atributo (ISO 25010) | Sub-atributo | Justificativa para o MVP |
| :--- | :--- | :--- |
| **Segurança** | Integridade | Dados de patrimônio público são críticos. Prevenir alterações não autorizadas ou corrupção de dados é prioridade máxima. |
| **Manutenibilidade** | Testabilidade | Como o projeto é acadêmico e evolutivo, o código deve ser fácil de testar para garantir que novas funcionalidades não quebrem o CRUD básico. |
| **Confiabilidade** | Disponibilidade | O sistema deve estar operacional para o Gestor e Conferente durante os períodos de inventário no campus. |
| **Capacidade de Interação** | Proteção contra erro | Usuários não devem conseguir deletar patrimônios acidentalmente ou deixar campos obrigatórios vazios. |

## 2. Relação Riscos x Qualidade

- **Risco R01 (Falta de Nuvem):** Afeta a **Disponibilidade**, pois o sistema não estará acessível fora da rede local/laboratório de forma nativa. Mitigação: Uso de Docker e túneis para demonstração.
- **Risco R03 (Inconsistência):** Afeta a **Integridade**. Mitigação: Validações fortes no backend e testes automatizados.
- **Risco R04 (Gargalo Técnico):** Afeta a **Manutenibilidade**, pois código escrito sob pressão e com baixo domínio técnico tende a ser menos modular. Mitigação: Pair programming e code review constante.

## 3. Avaliação da Qualidade e Escopo de Verificação

- **Fluxo Operacional (Fim-a-Fim):** Testes manuais para garantir que o cadastro de patrimônio e a abertura de manutenção funcionem sem erros de lógica.
- **Integridade dos Dados:** Verificação direta no banco PostgreSQL para assegurar que campos obrigatórios não fiquem nulos e que não haja inconsistências.
- **Ambiente Docker e Homologação:** Validação do sistema nos containers para garantir o funcionamento local (IFSC), contornando a falta de nuvem.
- **Conformidade com o DoD e PRs:** Verificação se o checklist do template de Pull Request foi preenchido corretamente e se as regras de workflow foram seguidas.
- **Densidade de Defeitos:** Monitoramento do volume de bugs encontrados em funcionalidades dadas como "prontas" (conforme definido em `metricas.md`).


