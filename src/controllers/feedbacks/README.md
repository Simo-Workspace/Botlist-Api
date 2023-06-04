# BotList API

## EndPoints e Métodos

- Rota: `/feedbacks/:user`.
- Métodos: `DELETE`, `PATCH` e `POST`.

## Rate Limit

O rate limit está definido como 10 requesições por minuto.

### DELETE

Este método é usado para deletar um feedback no banco de dados.

#### Exemplo

```ts
const APIURL: string = 'http://localhost:80/feedbacks/963124227911860264';

fetch(APIURL, { method: 'DELETE', headers: { authorization: 'API-AUTH' } });
```

Retornará uma [estrutura](https://github.com/Simo-Workspace/Botlist-Api/blob/main/src/typings/index.d.ts#L7) de feedback.

### PATCH

Este método é usado para editar um feedback no banco de dados.

#### Exemplo

```ts
const APIURL: string = 'http://localhost:80/feedbacks/963124227911860264';
const properties: Record<string, string> = {
    content: 'Carl-bot é um bot incrível'
};

fetch(APIURL, { method: 'PATCH', headers: { authorization: 'API-AUTH' }, body: JSON.stringify(properties) });
```

Retornará uma [estrutura](https://github.com/Simo-Workspace/Botlist-Api/blob/main/src/typings/index.d.ts#L7) de feedback.

### POST

Este método é usado para adicionar um feedback no banco de dados.

#### Exemplo

```ts
const APIURL: string = 'http://localhost:80/feedbacks/963124227911860264';
const properties: Record<string, string | number> = {
    stars: 5,
    content: 'Carl-bot é um bot incrível',
    targetBot: '235148962103951360',
    postedAt: new Date().toISOString()
};

fetch(APIURL, { method: 'POST', headers: { authorization: 'API-AUTH' }, body: JSON.stringify(properties) });
```

Retornará uma [estrutura](https://github.com/Simo-Workspace/Botlist-Api/blob/main/src/typings/index.d.ts#L7) de feedback.