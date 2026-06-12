# ADR-0007 — Criação da entidade Solicitação para manutenção e substituição

## Status

Aceita.

## Contexto

O MVP do Zelar precisava permitir que um item patrimonial avariado ou em manutenção gerasse uma ação de acompanhamento.

Antes da Sprint 4, não existia uma entidade específica para representar solicitações de manutenção ou substituição. Isso deixava o fluxo principal incompleto: o sistema permitia cadastrar e alterar dados, mas não registrava formalmente uma solicitação operacional para resolver o problema encontrado.

## Decisão

A equipe decidiu criar a entidade `Solicitacao`.

A entidade representa pedidos de manutenção ou substituição associados a um patrimônio e a um conferente.

Campos principais:

* `id`;
* `patrimonio_id`;
* `tipo`;
* `status`;
* `descricao`;
* `conferente_id`;
* timestamps;
* soft delete;
* controle de versão.

Valores esperados para `tipo`:

```txt
manutencao
substituicao
```

Valores esperados para `status`:

```txt
aberta
em_andamento
concluida
cancelada
```

## Alternativas consideradas

### Registrar solicitação apenas como observação no patrimônio

**Vantagem:** implementação mais rápida.

**Desvantagem:** não permite acompanhar status, filtrar solicitações ou manter histórico operacional adequado.

### Criar somente um campo de status no patrimônio

**Vantagem:** simples.

**Desvantagem:** não representa o processo de solicitação, nem múltiplas ocorrências ao longo do tempo.

### Criar entidade própria de Solicitação

**Vantagem:** modela corretamente o fluxo operacional.

**Desvantagem:** exige nova tabela, endpoints, tela e testes.

## Consequências positivas

* Fecha o fluxo principal do MVP.
* Permite acompanhar solicitações por status.
* Permite diferenciar manutenção e substituição.
* Permite vincular solicitação a patrimônio e conferente.
* Facilita filtros e gestão pelo usuário.
* Melhora rastreabilidade.
* Permite evolução futura para notificações por e-mail.

## Consequências negativas / trade-offs

* Aumenta a complexidade do modelo.
* Exige novas validações.
* Exige nova tela no frontend.
* Exige testes específicos.
* Depende da integração correta com mudança de estado.

## Evidências no projeto

A Issue #62 implementou a entidade e gestão de solicitações.

A Sprint 4 integrou essa funcionalidade com a Issue #61, permitindo abertura automática de solicitação quando um item é marcado como avariado ou enviado para manutenção.

## Relação com riscos

Essa decisão mitiga:

* R08 — Funcionalidade central incompleta;
* R03 — Inconsistência de dados;
* R06 — Baixa rastreabilidade.

## Relação com qualidade

A decisão melhora:

* adequação funcional;
* rastreabilidade;
* manutenibilidade;
* integridade do fluxo de negócio.

---
