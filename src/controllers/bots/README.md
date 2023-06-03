# BotList API

## EndPoints e Métodos

- Rota: `/bots/:id`.
- Métodos: `GET`, `DELETE`, `PATCH` e `POST`.

## Rate Limit

O rate limit está definido como 10 requesições por minuto.

### GET

Este método é usado para buscar um bot no banco de dados ou na API do Discord.

#### Exemplo

```ts
const URLS = {
    Bot: 'http://localhost:80/bots/971783455425847317',
    All: 'http://localhost:80/bots/@all',
    Votes: 'http://localhost:80/bots/971783455425847317/votes',
    Query: 'http://localhost:80/bots?name=Simo'
};

fetch(URLS.Bot, { method: 'GET', headers: { authorization: 'API-AUTH' } }); // Busque por um bot específico
fetch(URLS.All, { method: 'GET', headers: { authorization: 'API-AUTH' } }); // Busque por todos os bots
fetch(URLS.Votes, { method: 'GET', headers: { authorization: 'API-AUTH' } }); // Busque por todos os votos de um bot
fetch(URLS.Query, { method: 'GET', headers: { authorization: 'API-AUTH' } }); // Busque por vários bot que combinem com a consulta
```

### DELETE

Este método é usado para deletar um bot no banco de dados.

#### Exemplo

```ts
const APIURL: string = 'http://localhost:80/bots/971783455425847317';

fetch(APIURL, { method: 'DELETE', headers: { authorization: 'API-AUTH' } });
```

### PATCH

Este método é usado para editar um bot no banco de dados.

#### Exemplo

```ts
const APIURL: string = 'http://localhost:80/bots/971783455425847317';
const properties: Record<string, string> = {
    name: 'Bot-carl'
};

fetch(APIURL, { method: 'PATCH', headers: { authorization: 'API-AUTH' }, body: JSON.stringify(properties) });
```

### POST

Este método é usado para adicionar um bot no banco de dados.

#### Exemplo

```ts
const APIURL: string = 'http://localhost:80/bots/971783455425847317';
const properties: Record<string, string> = {
    _id: '971783455425847317'
};

fetch(APIURL, { method: 'POST', headers: { authorization: 'API-AUTH' }, body: JSON.stringify(properties) });
```