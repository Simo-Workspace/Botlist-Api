# Simo API (Não pública)

Simo API é uma API referente ao servidor da comunidade [Simo](https://discord.gg/tUYhTcAHnt). Especialmente feita para o desenvolvimento do site da botlist do [Simo](https://github.com/Simo-Workspace/Botlist-Website).

## Exemplos

Use os exemplos de cada [pasta](src/controllers/) de handlers.

## EndPoints & Headers

- Endpoints: Atualmente com 3 (três) endpoints, `/api/bots`, `/api/users` e `/api/guilds`.
- Headers: O `header` sempre deve conter o cabeçalho `authorization` (sensitive case) com a autorização para utilizar a API, se não lançará um erro 401.

## Status Code

Veja todos os status code usados no arquivo de [status](src/controllers/status-code.json) de erros.

## Rate Limit

O rate limit de todos os endpoints estão definidos como `25` requisições por minuto.
