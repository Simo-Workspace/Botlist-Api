# BotList API

## EndPoints e Métodos

- URL base: `/api/bots/:id/:method/:user`.
- Métodos: `GET`, `DELETE`, `PATCH` e `POST`.

## Rate Limit

O rate limit está definido como 25 requisições por minuto.

### GET

Este método é usado para buscar um bot no banco de dados ou na API do Discord.

#### Exemplo (GET)

```ts
const APIURLS: Record<string, string> = {
    Bot: 'http://localhost:80/api/bots/971783455425847317',
    All: 'http://localhost:80/api/bots',
    Votes: 'http://localhost:80/api/bots/971783455425847317/votes',
    Query: 'http://localhost:80/api/bots?name=Simo'
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

Este método é usado para deletar um bot/feedback no banco de dados.

#### Exemplo (DELETE)

```ts
const URLS: Record<string, string> = {
    Bot: 'http://localhost:80/api/bots/971783455425847317',
    Feedback: 'http://localhost:80/api/bots/971783455425847317/feedbacks/963124227911860264'
};

fetch(URLS.Bot, { method: 'DELETE', headers: { authorization: 'API-AUTH' } }); // Deletar um bot no banco de dados
fetch(URLS.Feedback, { method: 'DELETE', headers: { authorization: 'API-AUTH' } }); // Deletar um feedback no banco de dados
```

Retornará uma [estrutura](https://github.com/Simo-Workspace/Botlist-Api/blob/main/src/typings/index.d.ts#L7) de bot, ou uma [estrutura](https://github.com/Simo-Workspace/Botlist-Api/blob/main/src/typings/index.d.ts#L7) de feedback.

### PATCH

Este método é usado para editar um bot/feedback no banco de dados.

#### Exemplo (PATCH)

```ts
const URLS: Record<string, string> = {
    Update: 'http://localhost:80/api/bots/971783455425847317',
    UpdateFeedback: 'http://localhost:80/api/bots/971783455425847317/feedbacks/963124227911860264' /* The last ID is of the user who sent the feedback  */
};
const properties: Record<string, string> = {
    name: 'Bot-carl'
};

fetch(URLS.Update, { method: 'PATCH', headers: { authorization: 'API-AUTH' }, body: JSON.stringify(properties) });

const newFeedbackProps: { stars: number; } = {
    stars: 5
};

fetch(URLS.UpdateFeedback, { method: 'PATCH', headers: { authorization: 'API-AUTH' }, body: JSON.stringify(newFeedbackProps) })
```

Retornará uma [estrutura](https://github.com/Simo-Workspace/Botlist-Api/blob/main/src/typings/index.d.ts#L7) de bot, ou uma [estrutura](https://github.com/Simo-Workspace/Botlist-Api/blob/main/src/typings/index.d.ts#L7) de feedback.

### POST

Este método é usado para adicionar um bot/feedback no banco de dados, ou votar em um.

#### Exemplo (POST)

```ts
const URLS: Record<string, string> = {
    Add: 'http://localhost:80/api/bots/971783455425847317',
    Vote: 'http://localhost:80/api/bots/971783455425847317/votes',
    Feedback: 'http://localhost:80/api/bots/971783455425847317/feedbacks/963124227911860264'
};
const properties: Record<string, string> = {
    _id: '971783455425847317'
};

fetch(URLS.Add, { method: 'POST', headers: { authorization: 'API-AUTH' }, body: JSON.stringify(properties) }); // Adicionar um bot. Veja todas as propriedades obrigatórias no arquivo `constants.json` -> REQUIRED_PROPS -> BOT

const voteProps: { user: string; } = {
    user: '955095844275781693'
}; // A propriedade `user` é obrigatório quando se vota em um bot, se não, lançará um erro

fetch(URLS.Vote, { method: 'POST', headers: { authorization: 'API-AUTH' }, body: JSON.stringify(voteProps) }); // Vota em um bot. O cooldown é 24 horas (1 dia)

const feedbackProps: Record<string, string | number> = {
    stars: 5,
    postedAt: new Date().toISOString(),
    content: 'Pablo bot is an amazing bot'
};

fetch(URLS.Feedback, { method: 'POST', headers: { authorization: 'API-AUTH' }, body: JSON.stringify(feedbackProps) }); // Adicione um feedback no bot
```

Retornará uma [estrutura](https://github.com/Simo-Workspace/Botlist-Api/blob/main/src/typings/index.d.ts#L7) de bot, uma [estrutura](https://github.com/Simo-Workspace/Botlist-Api/blob/main/src/typings/index.d.ts#L7) de voto, ou uma [estrutura](https://github.com/Simo-Workspace/Botlist-Api/blob/main/src/typings/index.d.ts#L7) de feedback.
