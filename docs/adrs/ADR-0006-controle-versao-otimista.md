# ADR-0006 — Controle de versão otimista nas entidades

## Status

Aceita.

## Contexto

O sistema Zelar pode ter múltiplos usuários alterando dados de patrimônio, ambiente, solicitações ou entidades auxiliares.

Mesmo sem autenticação e concorrência avançada no MVP, o projeto precisava preparar a base técnica para lidar melhor com alterações simultâneas e rastrear versões dos registros.

Sem controle de versão, duas alterações concorrentes poderiam sobrescrever dados sem indicação clara de conflito.

## Decisão

A equipe decidiu adicionar controle de versão nas entidades, usando um campo de versão, como `versao`.

Esse campo permite identificar a evolução dos registros e preparar o sistema para validações futuras de concorrência otimista.

## Alternativas consideradas

### Não controlar versão

**Vantagem:** menor complexidade.

**Desvantagem:** maior risco de sobrescrita silenciosa de dados.

### Bloqueio pessimista

Bloqueia o registro enquanto alguém está editando.

**Vantagem:** reduz conflito.

**Desvantagem:** mais complexo e pesado para o MVP.

### Controle de versão otimista

Permite editar normalmente, mas registra a versão do dado.

**Vantagem:** solução simples e evolutiva.

**Desvantagem:** exige tratamento adequado para conflitos em versões futuras.

## Consequências positivas

* Prepara o sistema para concorrência.
* Melhora rastreabilidade de alterações.
* Ajuda a identificar evolução dos registros.
* Combina com audit log e timestamps.
* Adiciona segurança sem bloquear o fluxo normal do usuário.

## Consequências negativas / trade-offs

* Adiciona campo extra às entidades.
* Exige disciplina para incrementar versão corretamente.
* O tratamento completo de conflito pode exigir evolução futura.

## Evidências no projeto

O controle de versão foi adicionado como parte da evolução técnica da Sprint 3 e reaproveitado em entidades criadas posteriormente, como `Solicitacao`.

## Relação com riscos

Essa decisão mitiga:

* R03 — Inconsistência de dados;
* R04 — Gargalo técnico futuro;
* R06 — Baixa rastreabilidade.

## Relação com qualidade

A decisão melhora:

* integridade;
* confiabilidade;
* manutenibilidade;
* rastreabilidade.

---
