# BotList API

## EndPoints & Headers

- EndPoints: A base de todos os endpoints são iniciadas com `/bot/:id`, e todos os endpoints retornam o objeto do alvo.
- Headers: O header sempre deve ter a propriedade `authorization` com a autorização para utilizar a API.
- URL Base: http://localhost:{PORT}/bot/

## Status Code

Veja todos os status code em https://restfulapi.net/http-status-codes/.

### POST

Este endpoint é utilizado para adicionar um bot no banco de dados.

#### Exemplo

```ts
const URL: string = 'http://localhost:80/bot/321';
const botProps: Record<string, string> = {
    _id: '321',
    name: 'Some compiler',
    ...
};

fetch(URL, { method: 'POST', headers: { authorization: 'MacDonalds' }, body: JSON.stringify(botProps) });
```

### DELETE

Este endpoint é utilizado para deletar um bot no banco de dados.

#### Exemplo

```ts
const URL: string = 'http://localhost:80/bot/123';

fetch(URL, { method: 'DELETE', headers: { authorization: 'Bobs' } });
```

### PATCH

Este endpoint é utilizado para atualizar propriedades de um bot no banco de dados.

#### Exemplo

```ts
const URL = 'http://localhost:80/bot/123';
const propsToEdit: Record<string, string> = {
    name: 'Angry Compiler'
};

fetch(URL, { method: 'PATCH', headers: { authorization: 'Bob 123' }, body: JSON.stringify(propsToEdit) });
```

### PUT

Este endpoint é usado para atualizar o username e avatar de um bot. Note que você pode passar `auto` como `true` para atualizar sozinho.

```ts
const URL: string = 'http://localhost:80/bot/123';

fetch(URL, { method: 'PUT', headers: { Authorization: 'Bob 321' }, body: JSON.stringify({ name: 'Carlinhos-bot' }) }) // Atualiza passando os dados
fetch(URL, { method: 'PUT', headers: { Authorization: 'Bob 213' }, body: JSON.stringify({ auto: true }) }); // Se `auto` for passado como true, ele buscará os dados na API do Discord e atualizara
```

### GET

Este endpoint é utilizado para buscar algo na API ou na API do discord

```ts
const URL: string = 'http://localhost:80/bot/';
const fetchConfig: Record<string, string | object> = { method: 'GET', headers: { authorization: 'Bob 123' } };

fetch(URL + '@all', fetchConfig); // Retorna uma array com todos os bots no banco de dados
fetch(URL + '123', fetchConfig); // Busca por um bot específico no banco de dados
fetch(URL + '123/discord', fetchConfig); // Busca por um bot específico na API do discord

const query: Record<string, object> = {
    query: {
        name: 'Carl-bot'
    }
};
const queryURL: string = URL + '@all/search';

fetch(queryURL, { method: 'GET', headers: { authorization: 'NakedSpyei' }, body: JSON.stringify(query) }); // Faça uma consulta no banco de dados filtrando por opções (As opções de consulta disponíveis são as mesma do objeto de um bot)

const advancedQuery: Record<string, object> = {
    query: {
        owners: {
            $in: ['955095844275781693']
        }
    }
}; // Busque por um bot onde '955095844275781693' seja o ID de algum dono

fetch(queryURL, { method: 'GET', headers: { authorization: 'NakedSpyei' }, body: JSON.stringify(advandedQuery) });
```