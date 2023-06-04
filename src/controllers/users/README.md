# BotList API

## EndPoints e Métodos

- Rota: `/users/:id`.
- Métodos: `GET`.

## Rate Limit

O rate limit está definido como 10 requesições por minuto.

### GET

Este método é usado para buscar um usuário na API do Discord.

#### Exemplo

```ts
const APIURL: string = 'http://localhost:80/users/963124227911860264';

fetch(APIURL, { method: 'GET', headers: { authorization: 'API-AUTH' } });
```