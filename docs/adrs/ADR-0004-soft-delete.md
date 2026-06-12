# ADR-0004 — Uso de Soft Delete para preservação de registros

## Status

Aceita.

## Contexto

O sistema Zelar lida com dados de patrimônio, ambientes, responsáveis e solicitações. Esses dados têm valor histórico e operacional.

Excluir registros fisicamente poderia causar perda de rastreabilidade e inconsistência em fluxos como histórico de alterações, auditoria e vínculos entre entidades.

Por exemplo, um patrimônio excluído fisicamente poderia comprometer registros antigos de auditoria ou solicitações associadas.

## Decisão

A equipe decidiu utilizar **soft delete** nas entidades relevantes.

Em vez de remover registros fisicamente do banco de dados, o sistema marca o registro como removido logicamente, preservando seus dados para auditoria, rastreabilidade e possível restauração.

No Sequelize, essa decisão é representada pelo uso de `paranoid`, mantendo campos como `deleted_at`.

## Alternativas consideradas

### Exclusão física

Remove definitivamente os registros do banco.

**Vantagem:** simplicidade.

**Desvantagem:** perda de histórico e maior risco de inconsistência.

### Desativação manual por campo `ativo`

Mantém o registro, mas exige lógica manual em cada consulta.

**Vantagem:** controle explícito.

**Desvantagem:** mais chance de erro e inconsistência entre queries.

### Soft delete com suporte do ORM

Mantém o registro e padroniza o comportamento de exclusão lógica.

**Vantagem:** preserva histórico e reduz repetição.

**Desvantagem:** exige atenção em consultas que precisam incluir registros excluídos.

## Consequências positivas

* Evita perda acidental de dados.
* Preserva histórico.
* Ajuda na auditoria.
* Permite restauração.
* Reduz risco em operações destrutivas.
* Melhora a confiabilidade do sistema.

## Consequências negativas / trade-offs

* O banco mantém mais registros ao longo do tempo.
* Consultas administrativas podem precisar incluir registros excluídos.
* É necessário garantir que telas e endpoints não mostrem excluídos por engano.
* Pode exigir rotinas futuras de limpeza/arquivamento.

## Evidências no projeto

O soft delete foi aplicado como parte da evolução técnica do MVP e aparece no fluxo de manutenção/reengenharia do projeto.

A entidade `Solicitacao` também foi criada seguindo o padrão do projeto, incluindo soft delete.

## Relação com riscos

Essa decisão mitiga principalmente:

* R03 — Inconsistência de dados;
* R06 — Baixa rastreabilidade;
* risco de perda definitiva de registros importantes.

## Relação com qualidade

A decisão melhora:

* confiabilidade;
* integridade;
* manutenibilidade;
* rastreabilidade.

---