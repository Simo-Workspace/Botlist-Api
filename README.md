# BotList API

## EndPoints & Headers

- EndPoints: A base de todos os endpoints são iniciadas com `/bot/:id`, e todos os endpoints retornam o objeto do alvo.
- Headers: O header sempre deve ter a propriedade `authorization` com a autorização para utilizar a API.

### PUT

Este endpoint é utilizado para adicionar um bot no banco de dados.

### DELETE

Este endpoint é utilizado para deletar um bot no banco de dados.

### PATCH

Este endpoint é utilizado para atualizar propriedades de um bot no banco de dados. Ele deve conter a propriedade `_id` obrigatóriamente.

#### Exemplo

```ts
const propsToEdit: Record<string, unknown> = {
    _id: '123',
    name: 'Angry Compiler'
};

fetch(URL, { method: 'DELETE', body: propsToEdit, { headers: { authorization: 'Bob 123' } } });
```

### GET

Este endpoint é utilizado para buscar algo na API ou na API do discord

```ts
const URL: string = 'http://localhost:80/bot/';
const fetchConfig: Record<string, unknown> = { method: 'GET', { headers: { authorization: 'Bob 123' } } };

fetch(URL + '@all', fetchConfig) // Retorna uma array com todos os bots no banco de dados
fetch(URL + '123', fetchConfig) // Busca por um bot específico no banco de dados
fetch(URL + '123', fetchConfig) // Busca por um bot específico na API do discord
```