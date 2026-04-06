# Zelar - Sistema de Gerenciamento de Patrimônio

### Índice

- [**Visão do Produto e MVP**](docs/inception.md)
- [**Definition of Done**](docs/dod.md)
- [**Decisões Arquiteturais (ADRs)**](docs/adrs/)
- [**Acesso ao nosso Board e Backlog**](https://github.com/orgs/IFSC-ES2/projects/27)

---

## 1. Tema Definido
**Título:** Zelar - Sistema de Gerenciamento de Patrimônio WEB.

**Qual problema o sistema pretende resolver?**
A dificuldade na gestão, rastreabilidade e controle de manutenção dos materiais permanentes (patrimônios) de uma organização, que frequentemente sofrem avarias ou são realocados sem o devido registro.

**Quem são os usuários?**
* Gestor de Patrimônio
* Responsável pelo Ambiente
* Conferente

**Qual é a proposta do sistema para resolver o problema?**
Desenvolver um sistema WEB que permita cadastrar, gerenciar e organizar os materiais permanentes associando-os a ambientes específicos (inicialmente focado no IFSC Campus São José). O sistema garantirá que todo ambiente tenha um responsável e automatizará o fluxo de solicitação de manutenção ou substituição de itens avariados via notificações por e-mail.

## 2. Escopo do MVP

**O que o MVP fará:**
O MVP entregará o fluxo completo de cadastro e alocação de patrimônios, além do módulo operacional de controle de estado.

**Funcionalidades Principais:**
* CRUD de Patrimônios, Ambientes, Responsáveis, Conferentes, Fornecedores, Tipos de Material e Estado do Item.
* Associação obrigatória de patrimônio a um ambiente e de um responsável ao ambiente.
* Registro de estado do item e abertura de solicitações de manutenção/substituição.

**O que será implementado em próximas entregas:**
* Envio de e-mail automático ao Gestor e ao Responsável quando um item for reportado como avariado ou tiver manutenção solicitada.
* Geração de relatórios por ambiente, responsável, descrição e número de patrimônio.

**O que ficará fora do escopo neste momento:**
* Aplicativo mobile nativo (o sistema será apenas WEB).

## 3. Equipe Formada
* Lucas Barbieri Catarina, 202410004986, Scrum Master da primeira sprint
* Letícia Helena do R. Furlan, 202320002992, Engenheira de Qualidade
* Vinicíus Martins de M. Lopes, 202320002993, Arquiteto de Software
* Leonardo D. de Martini, 202410004937, DevOps/Infra