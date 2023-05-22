# BotList API

## EndPoints & Headers

- EndPoints: A base de todos os endpoints são iniciadas com `/bot/:id`, e todos os endpoints retornam o objeto do alvo.
- Headers: O header sempre deve ter a propriedade `authorization` com a autorização para utilizar a API.
- URL Base: http://localhost:{PORT}/bot/

### PUT

Este endpoint é utilizado para adicionar um bot no banco de dados.

#### Exemplo

```ts
const URL: string = 'http://localhost:80/bot/321';
const botProps: Record<string, unknown> = {
    _id: '321',
    name: 'Some compiler',
    ...
};

fetch(URL, { headers: { authorization: 'MacDonalds' }, body: JSON.stringify(botProps) });

```

#### Exemplo

```ts
const URL: string = 'http://localhost:80/bot/123';
const botProps: Record<string, unknown> = {
    _id: '123',
    name: 'Happy Compiler',
    ...
};

fetch(URL, { method: 'PUT', headers: { authorization: 'Jorge 321' }, body: JSON.stringify(botProps) })
```

### DELETE

Este endpoint é utilizado para deletar um bot no banco de dados.

#### Exemplo

```ts
const URL: string = 'http://localhost:80/bot/123';

fetch(URL, { method: 'DELETE', headers: { authorization: 'Bobs' } });
```
### PATCH

Este endpoint é utilizado para atualizar propriedades de um bot no banco de dados. Ele deve conter a propriedade `_id` obrigatóriamente.

#### Exemplo

```ts
const URL = 'http://localhost:80/bot/123'; // O ID é opcional
const propsToEdit: Record<string, string> = {
    _id: '123',
    name: 'Angry Compiler'
};

fetch(URL, { method: 'PATCH', headers: { authorization: 'Bob 123' }, body: JSON.stringify(propsToEdit) });
```

### GET

Este endpoint é utilizado para buscar algo na API ou na API do discord

```ts
const URL: string = 'http://localhost:80/bot/';
const fetchConfig: Record<string, unknown> = { method: 'GET', headers: { authorization: 'Bob 123' } };

fetch(URL + '@all', fetchConfig) // Retorna uma array com todos os bots no banco de dados
fetch(URL + '123', fetchConfig) // Busca por um bot específico no banco de dados
fetch(URL + '123/discord', fetchConfig) // Busca por um bot específico na API do discord
```