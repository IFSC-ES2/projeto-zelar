# Dicionário da EAP - Sistema de Gerenciamento de Patrimônio

## 1. Planejamento do Projeto

- **Definir Escopo do Projeto**  
  Descrever o objetivo do sistema, definir os limites e identificar as funcionalidades principais.

- **Levantamento de Requisitos**  
  Identificar requisitos funcionais e não funcionais, além de definir as regras de negócio.

- **Definir Usuários do Sistema**  
  Mapear os perfis de:
  - Gestor de patrimônio
  - Responsável pelo ambiente
  - Usuários solicitantes



## 2. Modelagem do Sistema

- **Diagramas de Casos de Uso**  
  Identificar atores e definir os casos de uso principais do sistema.

- **Diagrama UML**  
  Criar a modelagem unificada do sistema.

- **Modelagem do Banco de Dados**  
  Definir as entidades do sistema e criar o diagrama MER (Modelo Entidade-Relacionamento).

- **Definição de Estrutura**  
  Detalhar os atributos para:
  - Patrimônio
  - Ambiente
  - Responsável
  - Conferente
  - Fornecedor
  - Tipo de material
  - Estado do item
  - Solicitação de manutenção



## 3. Desenvolvimento do Banco de Dados

- **Criação do Banco e Tabelas**  
  Executar os scripts para criação do banco de dados e das tabelas principais:
  - Patrimônio
  - Ambientes
  - Responsáveis

- **Tabelas Auxiliares**  
  Implementar tabelas para:
  - Fornecedores
  - Tipos de material
  - Estado do item

- **Tabela de Manutenção**  
  Criar estrutura específica para solicitações de manutenção.

- **Inserção de Dados Iniciais**  
  Realizar o *seed* do banco com dados dos ambientes do IFSC Campus São José.



## 4. Desenvolvimento do Sistema (Interfaces)

- **Cadastro de Patrimônio**  
  Interface contendo:
  - Número de patrimônio
  - Descrição
  - Valor
  - Tipo
  - Estado
  - Ambiente
  - Responsável
  - Fornecedor
  - Observações

- **Cadastros Gerais**  
  Desenvolvimento das telas para:
  - Ambientes
  - Responsáveis
  - Fornecedores
  - Conferentes



## 5. Funcionalidades do Sistema

- **Gestão de Vínculos**  
  Implementar a lógica para:
  - Associar patrimônio a ambientes
  - Vincular responsáveis aos locais

- **Registro de Estado e Manutenção**  
  Funcionalidade para:
  - Registrar o estado do item
  - Criar solicitações de manutenção com campos de problema e tipo de solicitação

- **Notificações**  
  Implementar o envio automático de e-mail para:
  - Gestor de patrimônio
  - Responsável pelo ambiente



## 6. Consultas e Relatórios

- **Mecanismos de Busca**  
  Pesquisa por:
  - Número de patrimônio
  - Nome/descrição do item

- **Emissão de Relatórios**  
  Geração de documentos:
  - Por ambiente
  - Por responsável
  - Relatório geral de todos os patrimônios



## 7. Testes

- **Homologação**  
  Realizar testes de:
  - Cadastro
  - Associação de itens
  - Solicitações de manutenção
  - Envio de e-mails
  - Precisão dos relatórios



## 8. Entrega do Projeto

- **Documentação Técnica**  
  Compilar:
  - Descrição do projeto
  - Requisitos
  - Diagramas

- **Manual e Demonstração**  
  Elaborar:
  - Manual do usuário
  - Apresentação com demonstração prática do sistema