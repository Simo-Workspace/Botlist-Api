# BotList API

## EndPoints e Métodos

- Rota: `/guilds/:id`.
- Métodos: `GET`, `DELETE`, `PATCH` e `POST`.

## Rate Limit

O rate limit está definido como 10 requisições por minuto.

### GET

Este método é usado para buscar uma guilda no banco de dados.

#### Exemplo

```ts
const APIURL: string = 'http://localhost:80/guilds/963067593479057468';

fetch(APIURL, { method: 'GET', headers: { authorization: 'API-AUTH' } });
```

Retornará uma [estrutura](https://github.com/Simo-Workspace/Botlist-Api/blob/main/src/typings/index.d.ts#L7) de guilda.

### DELETE

Este método é usado para deletar uma guilda no banco de dados.

#### Exemplo

```ts
const APIURL: string = 'http://localhost:80/guilds/963067593479057468';

fetch(APIURL, { method: 'DELETE', headers: { authorization: 'API-AUTH' } });
```

Retornará uma [estrutura](https://github.com/Simo-Workspace/Botlist-Api/blob/main/src/typings/index.d.ts#L7) de guilda.

### PATCH

Este método é usado para editar uma guilda no banco de dados.

#### Exemplo

```ts
const APIURL: string = 'http://localhost:80/guilds/963067593479057468';
const properties: Record<string, string> = {
    _id: '1037164227430989874'
};

fetch(APIURL, { method: 'PATCH', headers: { authorization: 'API-AUTH' }, body: JSON.stringify(properties) });
```

Retornará uma [estrutura](https://github.com/Simo-Workspace/Botlist-Api/blob/main/src/typings/index.d.ts#L7) de guilda.

### POST

Este método é usado para adicionar uma guilda no banco de dados.

#### Exemplo

```ts
const APIURL: string = 'http://localhost:80/guilds/963067593479057468';
const properties: Record<string, string> = {
    _id: '963067593479057468'
};

fetch(APIURL, { method: 'POST', headers: { authorization: 'API-AUTH' }, body: JSON.stringify(properties) });
```

Retornará uma [estrutura](https://github.com/Simo-Workspace/Botlist-Api/blob/main/src/typings/index.d.ts#L7) de guilda.
