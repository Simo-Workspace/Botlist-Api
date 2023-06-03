# DECREPATED

## EndPoints & Headers

- Endpoints: Atualmente com 2 (dois) endpoints, `/bots` e `/users`.
- Headers: O header sempre deve ter a propriedade `authorization` com a autorização para utilizar a API.
- URL Base: `http://localhost:{PORT}/`.

## Status Code

Veja todos os status code em https://restfulapi.net/http-status-codes/.

## Rate Limit

O rate limit está definido com 10 requisições por minuto.

### POST

Este endpoint é utilizado para adicionar um bot no banco de dados.

#### Exemplo

```ts
const URL: string = 'http://localhost:80/bots/321';
const botProps: Record<string, string> = {
    name: 'Some compiler',
    ...
};

fetch(URL, { method: 'POST', headers: { authorization: 'MacDonalds' }, body: JSON.stringify(botProps) });
```

### DELETE

Este endpoint é utilizado para deletar um bot no banco de dados.

#### Exemplo

```ts
const URL: string = 'http://localhost:80/bots/123';

fetch(URL, { method: 'DELETE', headers: { authorization: 'Bobs' } });
```

### PATCH

Este endpoint é utilizado para atualizar propriedades de um bot no banco de dados.

#### Exemplo

```ts
const URL = 'http://localhost:80/bots/123';
const propsToEdit: Record<string, string> = {
    name: 'Angry Compiler',
    ...
};

fetch(URL, { method: 'PATCH', headers: { authorization: 'Bob 123' }, body: JSON.stringify(propsToEdit) });
```

### PUT

Este endpoint é usado para atualizar o username e avatar de um bot. Note que você pode passar `auto` como `true` para atualizar sozinho.

#### Exemplo

```ts
const URL: string = 'http://localhost:80/bots/123';

fetch(URL, { method: 'PUT', headers: { Authorization: 'Bob 321' }, body: JSON.stringify({ name: 'Carlinhos-bot' }) }) // Atualiza passando os dados
fetch(URL, { method: 'PUT', headers: { Authorization: 'Bob 213' }, body: JSON.stringify({ auto: true }) }); // Se `auto` for passado como `true`, ele buscará os dados do bot na API do Discord e atualizara
```

### GET

Este endpoint é utilizado para buscar algo na API ou na API do Discord.

#### Exemplo

```ts
const botURL: string = 'http://localhost:80/bots';
const userURL: string = 'http://localhost:80/users';
const fetchConfig: Record<string, string | object> = { method: 'GET', headers: { authorization: 'Bob 123' } };

fetch(botURL + '/@all', fetchConfig); // Retorna uma array com todos os bots no banco de dados
fetch(botURL + '/123', fetchConfig); // Busca por um bot específico no banco de dados
fetch(userURL + '/123', fetchConfig); // Busca por um bot específico na API do discord

const query: string = '?_id=504095380166803466';

fetch(userURL + query, fetchConfig); // Busca por query string no banco de dados
```