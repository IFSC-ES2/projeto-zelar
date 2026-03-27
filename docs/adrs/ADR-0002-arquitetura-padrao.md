# ADR-0002 - Arquitetura Web vs Desktop

## Status
- Aceita

## Contexto
- O sistema será usado por vários gestores em diferentes computadores, com configurações variadas e restrições para instalar softwares.


## Decisão
- Será desenvolvida uma aplicação Web, acessível via navegador, utilizando arquitetura cliente-servidor.
O sistema ficará centralizado em um servidor, sem necessidade de instalação nas máquinas dos usuários.


## Alternativas
- Aplicação Desktop instalável
- App Mobile Nativo.


## Consequências
- Facilita atualizações (deploy centralizado) e dispensa instalação nos computadores do campus. Como trade-off, exige conexão com a internet o tempo todo.


### Positivas

- Atualizações centralizadas
- Funciona em diferentes sistemas (Windows, Linux, macOS)
- Sem instalação
- Fácil de escalar
- Manutenção simplificada

### Negativas / trade-offs

- Depende de internet
- Pode ter limitações de desempenho
- Exige testes em navegadores
- Requer cuidados com segurança
