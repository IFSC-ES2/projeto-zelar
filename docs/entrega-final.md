# Entrega Final — MVP Zelar

## 1. Identificação do projeto

**Nome do sistema:** Zelar — Sistema de Gerenciamento de Patrimônio Web.

**Disciplina:** Engenharia de Software II.

**Equipe:**

| Integrante                   | Papel no projeto                                              |
| ---------------------------- | ------------------------------------------------------------- |
| Lucas Barbieri Catarina      | Desenvolvimento backend, auditoria e histórico de estado      |
| Letícia Helena do R. Furlan  | Qualidade, regras de negócio e validações                     |
| Vinícius Martins de M. Lopes | DevOps/Infra, dashboard e integração de dados                 |
| Leonardo D. de Martini       | Desenvolvimento full-stack, deploy, patrimônio e solicitações |

---

## 2. Problema

Organizações que possuem muitos bens patrimoniais enfrentam dificuldade para controlar onde cada item está, quem é o responsável por ele, qual é seu estado de conservação e quando deve ser solicitada manutenção ou substituição.

No contexto acadêmico/corporativo, esse problema aparece na forma de:

* itens sem localização atualizada;
* ambientes sem responsável claramente definido;
* mudanças de estado sem histórico;
* dificuldade para identificar itens em manutenção;
* falta de rastreabilidade sobre alterações feitas no sistema;
* controle manual ou pouco confiável de patrimônios.

---

## 3. Público-alvo

O sistema é voltado principalmente para:

* gestor de patrimônio;
* responsável por ambiente;
* conferente;
* usuários envolvidos na consulta e atualização de bens patrimoniais.

---

## 4. Proposta do sistema

O Zelar propõe uma aplicação web para centralizar o cadastro, consulta, organização e acompanhamento de patrimônios.

A solução permite associar patrimônios a ambientes, responsáveis, fornecedores, tipos de material e estados de conservação. Também permite registrar mudanças no estado dos itens e abrir solicitações de manutenção ou substituição, mantendo histórico de alterações para fins de rastreabilidade.

---

## 5. MVP planejado

O MVP planejado tinha como objetivo entregar o fluxo principal de gerenciamento de patrimônio, incluindo:

* cadastro de patrimônios;
* cadastro de ambientes;
* cadastro de responsáveis;
* cadastro de fornecedores;
* cadastro de conferentes;
* cadastro de tipos de material;
* cadastro de estados do item;
* associação de patrimônio a ambiente, responsável, fornecedor, tipo e estado;
* obrigatoriedade de responsável por ambiente;
* controle do estado do item;
* solicitação de manutenção ou substituição;
* histórico de alterações;
* dashboard com dados reais;
* execução local reproduzível;
* testes automatizados;
* pipeline de integração contínua;
* deploy em ambiente online.

---

## 6. Funcionalidades concluídas

### 6.1 Cadastros principais

Foram implementados os principais CRUDs necessários para o funcionamento do MVP:

* Patrimônios;
* Ambientes;
* Responsáveis;
* Fornecedores;
* Conferentes;
* Tipos de material;
* Estados do item.

Esses cadastros formam a base do sistema e permitem organizar os bens patrimoniais conforme sua localização, tipo, fornecedor, responsável e estado de conservação.

---

### 6.2 Gestão de patrimônios

O sistema permite cadastrar e consultar patrimônios com informações como:

* número de patrimônio;
* descrição;
* valor;
* observações;
* tipo de material;
* estado do item;
* ambiente;
* responsável;
* fornecedor.

Essa funcionalidade representa o núcleo do MVP, pois concentra o controle dos bens gerenciados pelo sistema.

---

### 6.3 Ambientes com responsável obrigatório

Foi implementada a regra de negócio que exige que todo ambiente tenha um responsável vinculado.

Essa regra foi aplicada em múltiplas camadas:

* banco de dados;
* model;
* service;
* formulário do frontend;
* testes automatizados.

Com isso, o sistema reduz inconsistências e garante que cada ambiente possua uma pessoa responsável.

---

### 6.4 Dashboard com dados reais

O dashboard deixou de usar dados fixos e passou a consumir dados reais do sistema.

Os indicadores exibidos incluem:

* total de patrimônios;
* total de ambientes;
* responsáveis ativos;
* itens em manutenção;
* atividades recentes.

Também foram tratados estados de carregamento e erro na interface.

---

### 6.5 Registro de mudança de estado

A tela de registro de estado foi integrada a dados reais da API.

O sistema permite:

* carregar dados do patrimônio;
* listar estados disponíveis;
* selecionar conferente;
* registrar observações;
* atualizar o estado do item;
* redirecionar o usuário após a operação;
* exibir mensagens visuais de sucesso ou erro.

---

### 6.6 Histórico de mudança de estado

Foi implementado o endpoint:

```txt
GET /api/patrimonios/:id/historico-estado
```

Esse endpoint utiliza os registros de auditoria existentes para expor o histórico de movimentações de estado do patrimônio.

Com isso, a equipe evitou criar uma tabela redundante apenas para histórico de estado e reaproveitou a estrutura de `audit_log`.

---

### 6.7 Solicitações de manutenção/substituição

Foi criada a entidade `Solicitacao`, vinculada a patrimônio e conferente.

A funcionalidade permite:

* criar solicitações;
* listar solicitações;
* filtrar por status;
* filtrar por tipo;
* atualizar status;
* excluir solicitação;
* vincular solicitação a patrimônio;
* abrir solicitação automaticamente quando um item é marcado como avariado ou enviado para manutenção.

Essa funcionalidade fecha o fluxo operacional principal do MVP: identificar problema em um item, registrar mudança de estado e abrir uma solicitação relacionada.

---

### 6.8 Auditoria

O sistema possui tabela e estrutura de auditoria para registrar alterações relevantes.

O audit log contribui para:

* rastreabilidade;
* histórico de alterações;
* suporte à manutenção;
* consulta de movimentações;
* evidência de mudanças no sistema.

---

### 6.9 Soft delete e restauração

Foi implementada a estratégia de soft delete para evitar exclusão física imediata dos registros.

Essa decisão permite:

* preservar histórico;
* reduzir risco de perda acidental de dados;
* possibilitar restauração;
* manter coerência com auditoria e rastreabilidade.

---

### 6.10 Controle de versão e timestamps

As entidades foram evoluídas com:

* campos de criação;
* campos de atualização;
* controle de versão.

Esses recursos melhoram a rastreabilidade temporal e ajudam a lidar com alterações concorrentes nos dados.

---

### 6.11 Testes automatizados

O projeto possui testes automatizados no backend e no frontend.

No backend, foram testados endpoints, regras de negócio, validações e fluxos da API.

No frontend, foram testados componentes, listagens, formulários, filtros, estados de carregamento, erros e integração com chamadas de API simuladas.

---

### 6.12 Integração contínua

O projeto possui workflow de CI no GitHub Actions.

O pipeline executa testes em:

* pull requests;
* pushes para a branch principal.

Isso garante maior segurança para integrar alterações e fornece evidências de qualidade no repositório.

---

### 6.13 Deploy

O projeto possui deploy online via Render.

A aplicação publicada está disponível em:

```txt
https://zelium.onrender.com/
```

O deploy utiliza:

* serviço web para o frontend;
* serviço web para o backend;
* banco PostgreSQL;
* configuração por `render.yaml`.

---

## 7. Funcionalidades fora do escopo ou não concluídas

As seguintes funcionalidades ficaram fora do escopo final do MVP ou foram deixadas como próximos passos:

* autenticação e controle de perfis de usuário;
* autorização por papéis, como gestor, responsável e conferente;
* envio automático de e-mails;
* exportação de relatórios em PDF ou CSV;
* aplicativo mobile nativo;
* integração com sistemas externos de patrimônio;
* notificações em tempo real;
* painel administrativo avançado.

Essas funcionalidades não são apresentadas como concluídas na entrega final.

---

## 8. Mudanças de escopo

Durante o desenvolvimento, o escopo foi ajustado para priorizar o fluxo principal do MVP.

A equipe concentrou esforço em:

* concluir o CRUD de patrimônio;
* garantir vínculo entre patrimônio, ambiente e responsável;
* registrar mudança de estado;
* criar solicitações de manutenção/substituição;
* manter histórico por auditoria;
* entregar dashboard com dados reais;
* garantir execução e deploy demonstráveis.

Com isso, funcionalidades complementares como e-mail automático, relatórios exportáveis e autenticação foram mantidas como evolução futura.

---

## 9. Arquitetura final

O sistema segue uma arquitetura web cliente-servidor, com separação entre frontend e backend.

### Frontend

O frontend é uma aplicação Next.js/React responsável pela interface do usuário.

Responsabilidades principais:

* renderizar páginas;
* exibir listagens;
* controlar formulários;
* validar campos obrigatórios;
* consumir a API REST;
* apresentar mensagens de sucesso e erro.

### Backend

O backend é uma API REST em Node.js/Express.

A organização segue separação em camadas:

| Camada       | Responsabilidade                            |
| ------------ | ------------------------------------------- |
| Routes       | Definir endpoints HTTP                      |
| Controllers  | Receber requisições e retornar respostas    |
| Services     | Concentrar regras de negócio                |
| Repositories | Acessar dados via ORM                       |
| Models       | Definir entidades, campos e relacionamentos |

### Banco de dados

O banco usado é PostgreSQL.

Principais tabelas:

* `patrimonio`;
* `ambiente`;
* `responsavel`;
* `conferente`;
* `fornecedor`;
* `tipo_material`;
* `estado_item`;
* `solicitacao`;
* `audit_log`.

---

## 10. Padrões e decisões técnicas

### 10.1 Repository Pattern

O projeto utiliza repositories para isolar o acesso ao banco de dados.

Benefícios:

* reduz acoplamento entre regra de negócio e persistência;
* facilita testes;
* centraliza consultas;
* melhora manutenção.

Trade-off:

* aumenta a quantidade de arquivos e camadas no projeto.

---

### 10.2 Service Layer

A camada de services concentra regras de negócio.

Benefícios:

* evita controllers com excesso de responsabilidade;
* facilita reutilização de regras;
* melhora clareza da aplicação;
* permite testar regras sem depender diretamente da camada HTTP.

Trade-off:

* exige disciplina para não duplicar lógica entre service e controller.

---

### 10.3 Controller-Service-Repository

A aplicação segue uma organização em camadas:

```txt
Route -> Controller -> Service -> Repository -> Model -> Database
```

Essa estrutura facilita a separação de responsabilidades e torna o projeto mais compreensível para manutenção.

---

### 10.4 Soft delete

O soft delete foi adotado para preservar registros e permitir restauração.

Essa decisão evita perda definitiva de dados e combina com a necessidade de auditoria do sistema.

---

### 10.5 Audit log

O audit log foi utilizado para manter histórico de alterações relevantes.

Além de registrar mudanças, ele também foi reaproveitado para expor o histórico de mudança de estado do patrimônio.

---

## 11. Qualidade e testes

A qualidade do projeto foi trabalhada por meio de:

* testes automatizados no backend;
* testes automatizados no frontend;
* revisão por pull request;
* pipeline no GitHub Actions;
* separação em camadas;
* validações no backend e no frontend;
* uso de Docker para reprodutibilidade;
* documentação de arquitetura, execução e entrega.

---

## 12. Execução local

A forma recomendada de execução local é com Docker Compose.

```bash
cd src
docker compose up
```

Acessos locais:

```txt
Frontend: http://localhost:3000
Backend: http://localhost:8000
Health check: http://localhost:8000/health
```

Para desligar:

```bash
docker compose down
```

Para reiniciar o banco do zero:

```bash
docker compose down -v
docker compose up
```

---

## 13. Testes

### Backend

```bash
cd src/backend
npm install
npm test
```

Com cobertura:

```bash
npm run test:coverage
```

### Frontend

```bash
cd src/front
pnpm install
pnpm test
```

### Lint do frontend

```bash
cd src/front
pnpm lint
```

### Build do frontend

```bash
cd src/front
pnpm build
```

### Validação de compilação do backend

```bash
cd src/backend
npx tsc
```

---

## 14. Deploy e ambiente de demonstração

O sistema está publicado em:

```txt
https://zelium.onrender.com/
```

O deploy é configurado via:

```txt
render.yaml
```

Serviços usados:

| Serviço  | Nome             | Descrição     |
| -------- | ---------------- | ------------- |
| Banco    | `zelium-db`      | PostgreSQL    |
| Backend  | `zelium-backend` | API REST      |
| Frontend | `zelium`         | Interface web |

Observação: por usar plano gratuito do Render, o primeiro acesso pode demorar para iniciar.

---

## 15. Situação final do projeto

### O que está funcionando

* Execução local com Docker;
* Frontend web;
* Backend/API REST;
* Banco PostgreSQL;
* CRUDs principais;
* Dashboard com dados reais;
* Gestão de patrimônios;
* Responsável obrigatório por ambiente;
* Registro de mudança de estado;
* Histórico de estado;
* Solicitações de manutenção/substituição;
* Audit log;
* Soft delete;
* Controle de versão;
* Testes automatizados;
* Pipeline de CI;
* Deploy online.

---

### Limitações conhecidas

* O sistema ainda não possui autenticação completa de usuários.
* O sistema ainda não possui autorização por papéis.
* O envio automático de e-mails ficou como funcionalidade futura.
* A geração de relatórios/exportações ficou como funcionalidade futura.
* O sistema depende de conexão com internet para uso no ambiente publicado.
* O deploy em plano gratuito pode apresentar demora no primeiro acesso.

---

### Próximos passos sugeridos

Caso o projeto continue, os próximos passos recomendados são:

1. Implementar autenticação.
2. Implementar autorização por perfis.
3. Implementar notificações por e-mail.
4. Implementar relatórios por ambiente, responsável e patrimônio.
5. Adicionar exportação em PDF/CSV.
6. Melhorar cobertura de testes.
7. Adicionar build e lint ao pipeline de CI.
8. Melhorar UX do fluxo de solicitações.
9. Criar painel administrativo.
10. Preparar ambiente de produção mais estável.

---

## 18. Evidências no repositório

As principais evidências da entrega final estão distribuídas em:

| Evidência            | Local                                |
| -------------------- | ------------------------------------ |
| Código-fonte         | `src/backend` e `src/front`          |
| Docker Compose       | `src/docker-compose.yml`             |
| Deploy               | `render.yaml`                        |
| Testes backend       | `src/backend/tests`                  |
| Testes frontend      | `src/front/app/components/__tests__` |
| Workflow CI          | `.github/workflows/test.yml`         |
| Arquitetura          | `docs/arquitetura.md`                |
| Diagramas C4         | `docs/c4-diagrams.md`                |
| ADRs                 | `docs/adrs`                          |
| Métricas             | `docs/metricas.md`                   |
| Riscos               | `docs/riscos.md`                     |
| Relatórios de sprint | `docs/entregas`                      |
| Release final        | GitHub Releases                      |
| Tag final            | `v1.0.0` ou tag final equivalente    |

---

## 19. Conclusão

O MVP do Zelar entrega o fluxo essencial de gerenciamento de patrimônio: cadastro dos dados principais, associação dos bens a ambientes e responsáveis, controle de estado, histórico de alterações e abertura de solicitações de manutenção/substituição.

A entrega final prioriza a demonstração prática do produto funcionando e apresenta evidências técnicas no repositório, incluindo documentação, testes, CI, deploy e release final.

