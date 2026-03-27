# ADR-0001 — Escolha da stack principal

## Status
Aceita

## Contexto
O projeto precisa de uma stack que permita desenvolvimento rápido,
boa organização do código e facilidade de colaboração entre os membros
da equipe ao longo do semestre.

## Decisão
A equipe decidiu utilizar Node.js com Express no backend, React no frontend e PostgreSQL
como banco de dados principal.

## Alternativas consideradas
- Java com Spring Boot para o backend
- Next.js para o fronted

## Consequências
### Positivas
- Boa organização para aplicações em camadas
- Ecossistema consolidado
- Configuração inicial mais simples em comparação a outras opções
- Facilidade para testes e manutenção

### Negativas / trade-offs
- Falta de padronização nativa (depende da equipe)
- Pode exigir mais decisões arquiteturais em projetos grandes
- Assincronismo pode ter curva de aprendizado para alguns perfis

## Revisão futura
A decisão poderá ser revista caso surjam restrições técnicas relevantes
ou dificuldades excessivas de implementação.