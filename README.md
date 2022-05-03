# API de Registros Nacionais

API construída em Node para gerenciar a base de registros nacionais da Neoway

## Instalação

### Pré-requisitos

Para iniciar o projeto você precisar ter a seguinte configuração:

- Docker (https://docs.docker.com/engine/install/)
- Docker Compose (https://docs.docker.com/compose/install/)
- NodeJS v14.17.0

### Após executar o git clone, com o terminal na pasta do projeto, executar os seguintes passos:

#### Docker

```bash
  docker-compose up -d
```

#### Dependências

```bash
  yarn install
```

#### Variaveis de ambiente

- Criar arquivo .env na pasta /env com o seguinte conteúdo:

```
ENVIRONMENT=dev

HTTP_HOST=localhost
HTTP_PORT=3333

DATABASE_TYPE=postgres
DATABASE_URL=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=usr_national_registrations_api
DATABASE_PASSWORD=kfSZgfyTbi0G
DATABASE_NAME=national_registrations_db
DATABASE_LOGGING=false
```

#### Iniciar execução dos testes unitários

```bash
  yarn test
```

#### Iniciar aplicação

```bash
  yarn dev
```

## API Reference

### Checar status da API

```http
  GET /actuator/health
```

### Listar categorias

```http
  GET /api/v1/national-registration
```

#### Parametros de query

| Parametro | Tipo      | Descrição                                       |
| :-------- | :-------- | :---------------------------------------------- |
| `number`  | `string`  | **Opcional** - número do registro nacional      |
| `blocked` | `boolean` | **Opcional** - flag de bloqueio                 |
| `skip`    | `string`  | **Opcional** - página da grid (default 1)       |
| `take`    | `string`  | **Opcional** - quantidade de itens (default 10) |

### Exibir registro nacional

```http
  GET /api/v1/national-registration/:id
```

#### Parametros de rota

| Parametro | Tipo     | Descrição                                |
| :-------- | :------- | :--------------------------------------- |
| `id`      | `number` | **Obrigatório**. Id da registro nacional |

### Cadastrar registro nacional

```http
  POST /api/v1/national-registration
```

#### Corpo da requisição

| Parametro | Tipo     | Descrição                                    |
| :-------- | :------- | :------------------------------------------- |
| `number`  | `string` | **Obrigatório**. Número da registro nacional |

### Atualizar registro nacional

```http
  PUT /api/v1/national-registration/:id
```

#### Parametros de rota

| Parametro | Tipo     | Descrição                                |
| :-------- | :------- | :--------------------------------------- |
| `id`      | `number` | **Obrigatório**. Id do registro nacional |

#### Corpo da requisição

| Parametro | Tipo     | Descrição                                    |
| :-------- | :------- | :------------------------------------------- |
| `number`  | `string` | **Obrigatório**. Número do registro nacional |

### Deletar registro nacional

```http
  DELETE /api/v1/national-registration/:id
```

#### Parametros de rota

| Parametro | Tipo     | Descrição                                |
| :-------- | :------- | :--------------------------------------- |
| `id`      | `number` | **Obrigatório**. Id do registro nacional |
