# ADR-0005 — Uso de Audit Log para histórico de alterações e mudança de estado

## Status

Aceita.

## Contexto

O MVP do Zelar exige que seja possível acompanhar mudanças importantes nos patrimônios, especialmente alterações de estado do item.

Uma alternativa seria criar uma tabela específica apenas para histórico de estado. Porém, o projeto já possuía estrutura de `audit_log` para registrar alterações em entidades.

Criar uma nova tabela específica para histórico de estado poderia gerar duplicação de dados e aumentar o débito técnico.

## Decisão

A equipe decidiu reaproveitar a tabela `audit_log` como fonte para o histórico de mudança de estado dos patrimônios.

Para isso, foi implementado um endpoint de leitura:

```txt
GET /api/patrimonios/:id/historico-estado
```

Esse endpoint consulta os registros de auditoria relacionados à tabela de patrimônio e identifica mudanças no campo `estado_item_id`.

## Alternativas consideradas

### Criar tabela específica de histórico de estado

Exemplo:

```txt
historico_estado_patrimonio
```

**Vantagem:** consulta mais direta.

**Desvantagem:** duplicaria informação já registrada no audit log.

### Salvar histórico como campo JSON no patrimônio

**Vantagem:** implementação rápida.

**Desvantagem:** baixa normalização, difícil consulta e manutenção.

### Reaproveitar o audit log

**Vantagem:** evita redundância e aproveita estrutura global de auditoria.

**Desvantagem:** a consulta exige interpretação dos campos alterados.

## Consequências positivas

* Evita criação de tabela redundante.
* Reaproveita uma estrutura global já existente.
* Reduz débito técnico.
* Centraliza rastreabilidade.
* Facilita defesa técnica da decisão.
* Mantém histórico de mudanças de estado sem duplicar responsabilidade.

## Consequências negativas / trade-offs

* Consulta de histórico fica mais complexa.
* O endpoint depende da qualidade dos registros do audit log.
* Mudanças futuras no formato do audit log podem impactar o histórico de estado.
* Pode ser necessário otimizar consultas se o volume de auditoria crescer.

## Evidências no projeto

A Issue #61 implementou a mudança de estado do item e o histórico. A solução reaproveitou o `audit_log` existente para gerar o histórico de transição de estados.

A Sprint 4 documentou essa escolha como aproveitamento arquitetural, pois evitou criar tabelas redundantes.

## Relação com riscos

Essa decisão mitiga:

* R03 — Inconsistência de dados;
* R06 — Baixa rastreabilidade;
* R08 — Funcionalidade central incompleta.

## Relação com qualidade

A decisão melhora:

* rastreabilidade;
* manutenibilidade;
* integridade;
* explicabilidade técnica.

---