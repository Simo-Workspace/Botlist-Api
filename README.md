# Simo API (Não pública)

Simo API é uma API referente ao servidor da comunidade [Simo](https://discord.gg/tUYhTcAHnt). Especialmente feita para o desenvolvimento do site da botlist do [Simo](https://github.com/Simo-Workspace/Botlist-Website).

## Exemplos

Use os exemplos de cada [pasta](src/controllers/) de handlers.

## EndPoints & Headers

- Endpoints: Atualmente com 4 (quatro) endpoints, `/api/bots/:id/:method/:user`, `/api/users/:id`, `/api/guilds/:id/:method` e `/api/auth/:method`.
- Headers: O `header` sempre deve conter o cabeçalho `authorization` (sensitive case) com a autorização para utilizar a API, se não lançará um erro 401.

## Status Code

Veja todos os status code usados no arquivo de [status](src/controllers/status-code.json) de erros.

## Rate Limit

Todas as rotas são aplicados rate-limits.

| Rota | Max | Atordoamento |
| - | - | - |
| * | 25 | Nenhum |
