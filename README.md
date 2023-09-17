# Versão do Nodejs

Node.js v18.17.1

Express Framework

PostgreSQL

# Setup
1 - Copie o arquivo `.env.example` para `.env` e preencha os valores substituíndo `<db_name>` para 'minichefe_user' por exemplo.

2 - Instruções: Gerar as chaves `ACCESS_TOKEN_SECRET` e `REFRESH_TOKEN_SECRET` pelo próprio nodejs, rode o comando abaixo duas vezes, copie e cole o hash para as duas constantes :

<code>
node

require("crypto").randomBytes(64).toString("hex")
</code>

3 - Rodar comandos do arquivo `create-db.sql` para a criação do banco de dados

4 - Para rodar o programa rode o comando a seguir:

<code>
npm run dev
</code>