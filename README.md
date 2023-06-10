# Exemplos

Use [os exemplos](https://github.com/Simo-Workspace/Botlist-Api/tree/main/src/controllers) de cada pasta.

## EndPoints & Headers

- Endpoints: Atualmente com 4 (quatro) endpoints, `/bots`, `/users`, `/feedbacks` e `/guilds`.
- Headers: O `header` sempre deve conter o cabeçalho `authorization` (sensitive case) com a autorização para utilizar a API, se não retornará um erro 401.

## Status Code

Veja todos os status code usados em <https://restfulapi.net/http-status-codes/>.

## Rate Limit

O rate limit de todos os endpoints estão definidos como `10` requisições por minuto.
