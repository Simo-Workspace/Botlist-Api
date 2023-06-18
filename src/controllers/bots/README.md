# BotList API

## EndPoints e Métodos

- Rota: `/bots/:id`.
- Métodos: `GET`, `DELETE`, `PATCH` e `POST`.

## Rate Limit

O rate limit está definido como 10 requisições por minuto.

### GET

Este método é usado para buscar um bot no banco de dados ou na API do Discord.

#### Exemplo

```ts
const APIURLS: Record<string, string> = {
    Bot: 'http://localhost:80/bots/971783455425847317',
    All: 'http://localhost:80/bots',
    Votes: 'http://localhost:80/bots/971783455425847317/votes',
    Query: 'http://localhost:80/bots?name=Simo'
};
const requestInit: Record<string, string | object> = {
    method: 'GET',
    headers: {
        authorization: 'API-AUTH'
    }
}

fetch(APIURLS.Bot, requestInit); // Busque por um bot específico
fetch(APIURLS.All, requestInit); // Busque por todos os bots
fetch(APIURLS.Votes, requestInit); // Busque pelos 
fetch(APIURLS.Query, requestInit); // Busque por vários bot que combinem com a consulta
```

Retornará uma [estrutura](https://github.com/Simo-Workspace/Botlist-Api/blob/main/src/typings/index.d.ts#L7) de bot, uma [array](https://github.com/Simo-Workspace/Botlist-Api/blob/main/src/typings/index.d.ts#L7) de bots, ou uma array de [votos](https://github.com/Simo-Workspace/Botlist-Api/blob/main/src/typings/index.d.ts#L64).

### DELETE

Este método é usado para deletar um bot no banco de dados.

#### Exemplo

```ts
const APIURL: string = 'http://localhost:80/bots/971783455425847317';

fetch(APIURL, { method: 'DELETE', headers: { authorization: 'API-AUTH' } });
```

Retornará uma [estrutura](https://github.com/Simo-Workspace/Botlist-Api/blob/main/src/typings/index.d.ts#L7) de bot.

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

Retornará uma [estrutura](https://github.com/Simo-Workspace/Botlist-Api/blob/main/src/typings/index.d.ts#L7) de bot.

### POST

Este método é usado para adicionar um bot no banco de dados, ou votar em um.

#### Exemplo

```ts
const URLS: Record<string, string> = {
    Add: 'http://localhost:80/bots/971783455425847317',
    Vote: 'http://localhost:80/bots/971783455425847317/votes'
};
const properties: Record<string, string> = {
    _id: '971783455425847317'
};

fetch(URLS.Add, { method: 'POST', headers: { authorization: 'API-AUTH' }, body: JSON.stringify(properties) }); // Adicionar um bot

const voteProps: { user: string; } = {
    user: '955095844275781693'
}; // A propriedade `user` é obrigatório quando se vota em um bot, se não, lançará um erro

fetch(URLS.Vote, { method: 'POST', headers: { authorization: 'API-AUTH' }, body: JSON.stringify(voteProps) }) // Vota em um bot. O cooldown é 24 horas (1 dia)
```

Retornará uma [estrutura](https://github.com/Simo-Workspace/Botlist-Api/blob/main/src/typings/index.d.ts#L7) de bot, ou uma [estrutura](https://github.com/Simo-Workspace/Botlist-Api/blob/main/src/typings/index.d.ts#L7) de voto.
