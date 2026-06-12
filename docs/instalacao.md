# Execução, Testes, Build e Deploy

Este documento descreve como executar, testar, compilar e publicar o sistema **Zelar**, sistema web de gerenciamento de patrimônio desenvolvido para a disciplina de Engenharia de Software II.

## 1. Visão geral técnica

O Zelar é composto por três partes principais:

| Componente     | Tecnologia                    | Porta local | Descrição                |
| -------------- | ----------------------------- | ----------: | ------------------------ |
| Frontend       | Next.js, React e TypeScript   |      `3000` | Interface web do sistema |
| Backend        | Node.js, Express e TypeScript |      `8000` | API REST do sistema      |
| Banco de dados | PostgreSQL                    |      `5432` | Persistência dos dados   |

A comunicação entre frontend e backend ocorre por meio de requisições HTTP para a API REST. Em ambiente local, o frontend consome a API em:

```txt
http://localhost:8000/api
```

O projeto possui execução local com Docker Compose, testes automatizados no backend e no frontend, build separado para frontend/backend e deploy via Render.

---

## 2. Pré-requisitos

Para executar o projeto localmente com Docker:

* Git;
* Docker;
* Docker Compose.

Para executar comandos manualmente fora do Docker:

* Node.js;
* npm;
* pnpm;
* PostgreSQL.

A forma recomendada de execução para demonstração e homologação local é usando Docker Compose, pois ele sobe frontend, backend e banco de dados com as configurações necessárias.

---

## 3. Execução local com Docker

O arquivo de orquestração está localizado em:

```txt
src/docker-compose.yml
```

Para executar o projeto:

```bash
cd src
docker compose up
```

Após os containers subirem, acesse:

```txt
Frontend: http://localhost:3000
Backend/API: http://localhost:8000
Health check: http://localhost:8000/health
Banco PostgreSQL: localhost:5432
```

O Docker Compose sobe os seguintes serviços:

| Serviço    | Descrição                                                           |
| ---------- | ------------------------------------------------------------------- |
| `db`       | Banco PostgreSQL com banco `zelar`, usuário `zelar` e senha `zelar` |
| `backend`  | API Express executando em modo desenvolvimento                      |
| `frontend` | Aplicação Next.js executando em modo desenvolvimento                |

O banco é inicializado com os scripts:

```txt
src/db/schema.sql
src/db/seed.sql
```

Esses arquivos criam as tabelas principais e inserem dados iniciais para teste/demonstração.

---

## 4. Parar a execução local

Para parar os containers:

```bash
Ctrl + C
```

Ou, em outro terminal:

```bash
cd src
docker compose down
```

Para remover também os volumes e recriar o banco do zero:

```bash
cd src
docker compose down -v
```

Depois, basta subir novamente:

```bash
docker compose up
```

---

## 5. Execução manual do backend

Entre na pasta do backend:

```bash
cd src/backend
```

Instale as dependências:

```bash
npm install
```

Execute em modo desenvolvimento:

```bash
npm run dev
```

O backend será iniciado em:

```txt
http://localhost:8000
```

Endpoint de verificação:

```txt
GET /health
```

Exemplo:

```bash
curl http://localhost:8000/health
```

Resposta esperada:

```json
{
  "status": "ok"
}
```

---

## 6. Variáveis de ambiente do backend

Em ambiente local com Docker, as variáveis já são definidas no `docker-compose.yml`.

Configuração usada localmente:

```env
PORT=8000
DB_HOST=db
DB_PORT=5432
DB_NAME=zelar
DB_USER=zelar
DB_PASSWORD=zelar
```

Caso o backend seja executado manualmente fora do Docker, o `DB_HOST` deve apontar para o host correto do PostgreSQL. Em execução local fora do Docker, normalmente será:

```env
DB_HOST=localhost
```

---

## 7. Execução manual do frontend

Entre na pasta do frontend:

```bash
cd src/front
```

Instale as dependências:

```bash
pnpm install
```

Execute em modo desenvolvimento:

```bash
pnpm dev
```

O frontend será iniciado em:

```txt
http://localhost:3000
```

---

## 8. Variáveis de ambiente do frontend

O frontend precisa saber onde está a API.

Em ambiente local:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

No Docker Compose, essa variável já é configurada automaticamente para o frontend.

Em produção, a variável usada no deploy é:

```env
NEXT_PUBLIC_API_URL=https://zelium-backend.onrender.com/api
```

---

## 9. Testes automatizados

O projeto possui testes automatizados no backend e no frontend.

### 9.1 Testes do backend

Entre na pasta do backend:

```bash
cd src/backend
```

Instale as dependências:

```bash
npm install
```

Execute os testes:

```bash
npm test
```

Para executar com cobertura:

```bash
npm run test:coverage
```

O backend usa Jest e Supertest para testar endpoints, services e regras da API.

Exemplos de áreas cobertas:

* Health check da aplicação;
* CRUDs principais;
* Validações de regras de negócio;
* Auditoria;
* Solicitações;
* Histórico de estado;
* Erros esperados da API.

---

### 9.2 Testes do frontend

Entre na pasta do frontend:

```bash
cd src/front
```

Instale as dependências:

```bash
pnpm install
```

Execute os testes:

```bash
pnpm test
```

O frontend usa Jest e Testing Library para testar componentes e fluxos de interface.

Exemplos de áreas cobertas:

* Listagens;
* Formulários;
* Filtros;
* Estados de carregamento;
* Erros de interface;
* Registro de mudança de estado;
* Criação de solicitação a partir de item em manutenção/avariado.

---

## 10. Lint

O frontend possui script de lint configurado:

```bash
cd src/front
pnpm lint
```

Esse comando executa o ESLint sobre o projeto Next.js.

No backend, o `package.json` atual não define um script próprio de lint. A validação mínima de tipagem/compilação pode ser feita com TypeScript.

---

## 11. Build

### 11.1 Build do frontend

Entre na pasta do frontend:

```bash
cd src/front
```

Instale as dependências:

```bash
pnpm install
```

Execute o build:

```bash
pnpm build
```

Para executar a versão gerada em modo produção:

```bash
pnpm start
```

A aplicação será servida na porta padrão do Next.js:

```txt
http://localhost:3000
```

---

### 11.2 Build do backend

O backend não possui um script `build` declarado no `package.json`, mas o Dockerfile de produção compila o TypeScript com:

```bash
npx tsc
```

Para validar a compilação manualmente:

```bash
cd src/backend
npm install
npx tsc
```

O resultado da compilação é gerado na pasta:

```txt
src/backend/dist
```

Em produção, o backend executa o arquivo compilado:

```bash
node dist/src/index.js
```

---

## 12. Build com Docker

### 12.1 Build da imagem do backend

A partir da raiz do repositório:

```bash
docker build -f src/backend/Dockerfile -t zelar-backend src
```

### 12.2 Build da imagem do frontend

A partir da raiz do repositório:

```bash
docker build \
  -f src/front/Dockerfile \
  -t zelar-frontend \
  --build-arg NEXT_PUBLIC_API_URL=http://localhost:8000/api \
  src/front
```

---

## 13. Integração contínua

O projeto possui workflow de testes no GitHub Actions em:

```txt
.github/workflows/test.yml
```

O workflow é executado em:

* Pull requests;
* Pushes para a branch `main`.

O pipeline possui dois jobs principais:

| Job        | O que executa                                              |
| ---------- | ---------------------------------------------------------- |
| `backend`  | Sobe PostgreSQL, instala dependências e executa `npm test` |
| `frontend` | Instala dependências com pnpm e executa `pnpm test`        |

Esse pipeline fornece evidência de qualidade e ajuda a garantir que alterações submetidas por pull request não quebrem funcionalidades já testadas.

---

## 14. Deploy

O deploy do projeto é feito no Render usando o arquivo:

```txt
render.yaml
```

O arquivo define:

| Recurso  | Nome no Render   | Descrição                       |
| -------- | ---------------- | ------------------------------- |
| Banco    | `zelium-db`      | PostgreSQL usado pela aplicação |
| Backend  | `zelium-backend` | API Node.js/Express em Docker   |
| Frontend | `zelium`         | Aplicação Next.js em Docker     |

A versão online do sistema está disponível em:

```txt
https://zelium.onrender.com/
```

Observação: por usar plano gratuito do Render, o primeiro acesso pode demorar alguns segundos ou até cerca de um minuto para acordar o serviço.

---

## 15. Variáveis de produção

### Backend

O backend em produção usa variáveis preenchidas pelo Render a partir do banco `zelium-db`:

```env
PORT=8000
CORS_ORIGIN=https://zelium.onrender.com
DB_HOST=<host do banco no Render>
DB_PORT=<porta do banco no Render>
DB_NAME=<nome do banco>
DB_USER=<usuário do banco>
DB_PASSWORD=<senha do banco>
```

### Frontend

O frontend em produção usa:

```env
NEXT_PUBLIC_API_URL=https://zelium-backend.onrender.com/api
```

---

## 16. Processo de deploy

O processo de deploy esperado é:

1. Fazer merge das alterações aprovadas para a branch principal.
2. Garantir que os testes estejam passando no GitHub Actions.
3. Criar a tag/release final do projeto.
4. O Render lê o `render.yaml` e publica os serviços configurados.
5. Acessar o frontend publicado.
6. Validar o fluxo principal da aplicação em produção.

Comando sugerido para criação da tag final:

```bash
git checkout main
git pull
git tag -a v1.0.0 -m "Entrega final do MVP"
git push origin v1.0.0
```

Depois, criar a Release no GitHub usando essa tag.
