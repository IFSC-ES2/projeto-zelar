# Fluxo de Trabalho e Colaboração

Este documento formaliza o processo de desenvolvimento, integração e revisão de código para o projeto Zelar, garantindo a qualidade e a organização das entregas.

## 1. Estratégia de Branching

O projeto utiliza um modelo de branches baseado em funcionalidades para manter a branch principal sempre estável:

- **`main`**: Branch de produção/entrega. Contém o código estável e revisado. **Proibido push direto.**
- **`feature/descricao-curta`**: Para desenvolvimento de novas funcionalidades.
- **`fix/descricao-do-bug`**: Para correção de erros encontrados.
- **`docs/assunto`**: Para atualizações exclusivas de documentação.

## 2. Processo de Integração via Pull Request (PR)

Toda alteração de código ou documentação deve ser integrada através de Pull Requests, seguindo estes passos:

1. **Criação da Branch:** O desenvolvedor cria uma branch a partir da `main`.
2. **Desenvolvimento Local:** As alterações são feitas e testadas no ambiente Docker local.
3. **Abertura do PR:** Ao concluir a tarefa, o desenvolvedor abre um PR para a branch `main`.
4. **Uso de Template:** É obrigatório o preenchimento do [Template de Pull Request](../.github/PULL_REQUEST_TEMPLATE.md), descrevendo o que foi feito e como testar.

## 3. Revisão e Aprovação

Para garantir a qualidade e o compartilhamento de conhecimento, adotamos as seguintes regras:

- **Quem revisa:** Qualquer membro da equipe que não seja o autor das alterações.
- **Critério de Aprovação:** Exigência de, no mínimo, **1 aprovação** de outro membro antes de realizar o merge.
- **Checklist Mínimo:** O revisor deve validar se:
    - O código segue os padrões arquiteturais ([ADRs](adrs/)).
    - A funcionalidade atende ao critério de aceitação.
    - Não há erros de sintaxe ou lógica evidente.
    - A documentação foi atualizada, se necessário.

## 4. Impedimentos e Boas Práticas

- **Sem Pushes Diretos:** A branch `main` é protegida. Pushes diretos devem ser evitados para prevenir a quebra do ambiente estável.
- **Sincronização:** Antes de abrir um PR, o autor deve garantir que sua branch está atualizada com a `main` para evitar conflitos complexos no momento do merge.
- **Frequência de Commits:** Commits pequenos e frequentes são preferíveis a um único commit gigante ao final da tarefa.
