# ADR-0008 — Deploy com Render e empacotamento via Docker

## Status

Aceita.

## Contexto

A entrega final exige que o sistema seja demonstrável em execução, preferencialmente por ambiente de staging ou produção, ou com execução local reprodutível.

O projeto também precisava manter uma forma simples de execução local para desenvolvimento e defesa, evitando problemas de configuração de ambiente.

## Decisão

A equipe decidiu usar:

* Docker Compose para execução local;
* Dockerfiles para frontend e backend;
* Render para deploy online;
* PostgreSQL gerenciado no Render;
* `render.yaml` para declarar os serviços.

O deploy possui:

| Serviço          | Função           |
| ---------------- | ---------------- |
| `zelium`         | Frontend         |
| `zelium-backend` | Backend/API      |
| `zelium-db`      | Banco PostgreSQL |

## Alternativas consideradas

### Apenas execução local

**Vantagem:** menor complexidade.

**Desvantagem:** pior para demonstração e validação externa.

### Deploy manual em VPS

**Vantagem:** mais controle.

**Desvantagem:** maior custo e maior esforço de configuração.

### Render com Docker

**Vantagem:** simplicidade, compatibilidade com Docker e banco gerenciado.

**Desvantagem:** plano gratuito pode demorar para acordar e não garante alta disponibilidade.

## Consequências positivas

* Sistema demonstrável online.
* Execução local reprodutível.
* Menos dependência da máquina de um integrante.
* Deploy descrito como infraestrutura no repositório.
* Facilita apresentação e defesa.

## Consequências negativas / trade-offs

* Plano gratuito pode ter cold start.
* Menor controle sobre infraestrutura.
* Ambiente gratuito pode ser instável.
* É necessário manter fallback local com Docker.

## Evidências no projeto

O arquivo `render.yaml` define o banco PostgreSQL, o backend, o frontend e as variáveis de ambiente de produção.

O `docker-compose.yml` permite execução local com frontend, backend e banco.

## Relação com riscos

Essa decisão mitiga:

* R01 — Falta de nuvem/deploy;
* R02 — Atraso no prazo;
* risco de falha na demonstração.

## Relação com qualidade

A decisão melhora:

* disponibilidade;
* reprodutibilidade;
* confiabilidade operacional;
* facilidade de demonstração.
