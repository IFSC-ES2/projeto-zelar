# ADR-0003 — Organização em camadas Controller-Service-Repository

## Status

Aceita.

## Contexto

O backend do Zelar possui várias entidades com operações semelhantes, como patrimônio, ambiente, responsável, fornecedor, conferente, tipo de material, estado do item e solicitação.

Sem uma separação clara de responsabilidades, os controllers poderiam acumular validação, regra de negócio e acesso direto ao banco de dados. Isso dificultaria testes, manutenção e evolução do sistema.

## Decisão

A equipe decidiu organizar o backend em camadas:

```txt
Routes -> Controllers -> Services -> Repositories -> Models -> Database
```

Cada camada possui uma responsabilidade principal:

| Camada       | Responsabilidade                                                |
| ------------ | --------------------------------------------------------------- |
| Routes       | Definir endpoints HTTP                                          |
| Controllers  | Receber requisições, validar entrada básica e retornar resposta |
| Services     | Concentrar regras de negócio                                    |
| Repositories | Isolar acesso ao banco de dados                                 |
| Models       | Representar entidades e relacionamentos no Sequelize            |

## Alternativas consideradas

### Controller acessando diretamente o banco

Essa alternativa reduziria a quantidade de arquivos, mas aumentaria o acoplamento entre HTTP, regra de negócio e persistência.

### Service acessando diretamente Models sem Repository

Essa alternativa seria mais simples, mas dificultaria padronização e reaproveitamento das operações CRUD.

### Arquitetura em camadas com Repository

Foi escolhida por equilibrar organização, testabilidade e manutenção.

## Consequências positivas

* Separação clara de responsabilidades.
* Controllers mais simples.
* Regras de negócio concentradas em services.
* Acesso a dados isolado nos repositories.
* Melhor testabilidade.
* Facilidade para adicionar novas entidades seguindo o padrão existente.
* Redução de duplicação com uso de `BaseRepository`.

## Consequências negativas / trade-offs

* Mais arquivos e mais estrutura para manter.
* Pode parecer excessivo para funcionalidades muito simples.
* Exige disciplina da equipe para não colocar regra de negócio no lugar errado.

## Evidências no projeto

Esse padrão aparece nas entidades principais, como:

* Patrimônio;
* Ambiente;
* Responsável;
* Fornecedor;
* Conferente;
* Tipo de Material;
* Estado do Item;
* Solicitação.

A Sprint 4 reforçou esse padrão na implementação da entidade `Solicitacao`, com Model, Repository, Service, Controller e Routes.

## Relação com qualidade

Essa decisão apoia principalmente:

* manutenibilidade;
* testabilidade;
* modularidade;
* rastreabilidade técnica;
* facilidade de defesa do código.

---