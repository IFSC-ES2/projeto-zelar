# Zelar - Sistema de Gerenciamento de Patrimônio

> 🚀 **Versão online (deploy):** https://zelium.onrender.com/
> _Obs.: por ser hospedagem gratuita (Render), o primeiro acesso pode levar até ~1 minuto para "acordar" o servidor._

### Índice

- [**Visão do Produto e MVP**](docs/inception.md)
- [**Definition of Done**](docs/dod.md)
- [**Decisões Arquiteturais (ADRs)**](docs/adrs/)
- [**Estimativas e Planejamento**](docs/estimativas.md)
- [**Baseline do Projeto**](docs/baseline.md)
- [**Métricas**](docs/metricas.md)
- [**Riscos e Plano de Resposta**](docs/riscos.md)
- [**Fluxo de Trabalho Colaborativo**](docs/fluxo-de-trabalho.md)
- [**Como rodar com Docker (passo a passo)**](#-como-rodar-o-projeto-com-docker-passo-a-passo)
- [**Critérios de Qualidade (ISO 25010)**](docs/qualidade.md)
- [**Exemplo de Pull Request**](https://github.com/IFSC-ES2/projeto-zelar/pull/1)
- [**Acesso ao nosso Board e Backlog**](https://github.com/orgs/IFSC-ES2/projects/27)

## 1. Tema Definido

**Título:** Zelar - Sistema de Gerenciamento de Patrimônio WEB.

**Qual problema o sistema pretende resolver?**
A dificuldade na gestão, rastreabilidade e controle de manutenção dos materiais permanentes (patrimônios) de uma organização, que frequentemente sofrem avarias ou são realocados sem o devido registro.

**Quem são os usuários?**

- Gestor de Patrimônio
- Responsável pelo Ambiente
- Conferente

**Qual é a proposta do sistema para resolver o problema?**
Desenvolver um sistema WEB que permita cadastrar, gerenciar e organizar os materiais permanentes associando-os a ambientes específicos (inicialmente focado no IFSC Campus São José). O sistema garantirá que todo ambiente tenha um responsável e automatizará o fluxo de solicitação de manutenção ou substituição de itens avariados via notificações por e-mail.

## 2. Escopo do MVP

**O que o MVP fará:**
O MVP entregará o fluxo completo de cadastro e alocação de patrimônios, além do módulo operacional de controle de estado.

**Funcionalidades Principais:**

- CRUD de Patrimônios, Ambientes, Responsáveis, Conferentes, Fornecedores, Tipos de Material e Estado do Item.
- Associação obrigatória de patrimônio a um ambiente e de um responsável ao ambiente.
- Registro de estado do item e abertura de solicitações de manutenção/substituição.

**O que será implementado em próximas entregas:**

- Envio de e-mail automático ao Gestor e ao Responsável quando um item for reportado como avariado ou tiver manutenção solicitada.
- Geração de relatórios por ambiente, responsável, descrição e número de patrimônio.

**O que ficará fora do escopo neste momento:**

- Aplicativo mobile nativo (o sistema será apenas WEB).

## 3. Equipe Formada

- Lucas Barbieri Catarina, 202410004986, Scrum Master da primeira sprint
- Letícia Helena do R. Furlan, 202320002992, Engenheira de Qualidade
- Vinicíus Martins de M. Lopes, 202320002993, Arquiteto de Software
- Leonardo D. de Martini, 202410004937, DevOps/Infra

---

## 🐳 Como rodar com Docker

Com Docker você não precisa instalar Node nem PostgreSQL — ele cuida de tudo.

**1. Suba o projeto** (a primeira vez demora alguns minutos):

```bash
cd src
docker compose up
```

**2. Acesse no navegador:** http://localhost:3000 (site). API em `:8000`, banco em `:5432`.

**3. Desligar:** `Ctrl + C`. Para apagar tudo, inclusive dados: `docker compose down -v`.
