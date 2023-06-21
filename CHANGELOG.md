# API changelog

## 21/06/2023

- Colocando /api no inicio de todas as rotas, para fazer o proxy

## 19/06/2023

- Arrumando scripts do arquivo `package.json`, e alterando a descrição da API
- Mudando arquivo principal de `app.ts` para `src/index.ts`
- Utilizando JsonWebtoken para ter mais segurança nos cookies
- Implementando rota `/auth/user` para buscar informações do usuário pelo cookie
- Retirando a possibilidade de um cookie ser modificado no console do navegador (mais segurança)
- Novos erros, e arrumando mensagem de erro na rota `/users/:id`
- Impondo limite de até 500 bots por consulta

## 18/06/2023

- Adicionando um arquivo de testes (index.test.ts)
- Implementando nova rota de votos (`/bots/:id/votes`)
- Agora a rota `/bots/:id/votes` retorna uma array de votos
- Sistema de voto mais seguro
- Novos erros
- Adicionando Vercel ao projeto
- Mudando a rota `/feedbacks` para `/bots/:id/feedbacks/:user`
- Atualizando o README da rota `/bots/:id/feedbacls/:user`

## 14/06/2023

- Adicionando comentários (JSDoc) nas funções
- Arrumando código
- Mudando arquivo `.config.json` para `.env`

## 13/06/2023

- Mudando arquivo secreto para `.env`
- Atualizando arquivo de dependências
