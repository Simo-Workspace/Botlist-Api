# BotList API

## EndPoints e Métodos

- Rota: `/api/users/:id`.
- Métodos: `GET`.

### GET

Este método é usado para buscar um usuário na API do Discord.

#### Exemplo (GET)

```ts
const APIURL: string = 'http://localhost:80/api/users/963124227911860264';

fetch(APIURL, { method: 'GET', headers: { authorization: 'API-AUTH' } });
```

Retornará uma [estrutura](https://discord.com/developers/docs/resources/user#user-object) de usuário do Discord.
