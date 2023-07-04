# API changelog

## 03/07/2023

- Removendo constantes desnecessárias e paramêtros desnecessários de funções [b37405c, 28f2d7d]
- Adicionando logs no discord quando um usuário efetua o login no site \[00fce76]

## 02/07/2023

- Adicionando novo método `log` que loga toda vez que um usuário fizer requisição na API \[dba580b]

## 01/07/2023

- Alterando o nome da pasta `database` para `schemas` \[8032a9e]

## 30/06/2023

- Editando README principal
- Editando mensagem de quando a API fica online
- Removendo informações desnecessárias de cada README de [handler](src/controllers)

## 29/06/2023

- Atualizando README principal
- Removendo erros desnecessários
- Atualizando o README da pasta `src/controllers/bots`
- Implementando o método `exists` na rota GET de `/api/bots/:id/exists`
- Editando rota de bots, para implementar o método `exists`

## 27/06/2023

- Adicionando anti-crashs
- Novas tipagens criados (APIScopes e Schema<T, I>)
- Tipando todas as constantes

## 24/06/2023

- Agora os handlers de método `POST` dizem quais propriedades estão faltando
- Adicionando nova key (`bonus`) para mostrar as propriedades faltantes
- Melhorando tipagens e códigos
- `.env` mais legível
- Arrumando mensagens de errors
- Instalando as bibliotecas `typescript` e `tsx` como depedências de desenvolvedor
- Arrumando arquivo `README.md` de cada handler e o principal
- Adicionando nova propriedade (MAX_REQUESTS_PER_MIN) no arquivo `constants.json`
- Mudando nome de propriedades no arquivo `constants.json`
- Arrumando rotas dinâmicas da API

## 23/06/2023

- Arrumando e estilizando arquivo `GET-AUTH.ts`
- Adicionando nova mensagem de erro
- Agora a propriedade `inviteURL` é obrigatória no esquema `addbots`

## 21/06/2023

- Adicionando `required: true` em algumas chaves de esquemas
- Melhorando a tipagem de interfaces
- Colocando `/api` no início de todas as rotas, para fazer o proxy

## 20/06/26

- Arrumando documentação (README) de cada pasta dos handlers
- Removendo tipagens desnecessárias
- Alterando a rota `/users/:id` para que o `id` seja obrigatório
- `.env.example` mais legível
- Tipagem arrumada
- Removendo um erro desnecessário e modificando a mensagem de um

## 19/06/2023

- Arrumando scripts do arquivo `package.json`, e alterando a descrição da API
- Mudando arquivo principal de `app.ts` para `src/index.ts`
- Utilizando JsonWebtoken para ter mais segurança nos cookies
- Implementando rota `/auth/user` para buscar informações do usuário pelo cookie
- Retirando a possibilidade de um cookie ser modificado no console do navegador (mais segurança)
- Novos erros, e arrumando mensagem de erro na rota `/users/:id`
- Impondo limite de até 500 bots por consulta
- Adicionando URL de origem ao cors

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
