# Incializando aplicação sem docker

- Configure o .env (.env.example na raiz) 

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Inicialização da aplicação com Doker
 
- Nesse caso o compose ja declara a variavel de ambiente DATABASE_URL utilizada pelo prisma 
- Outras variaveis devem ser preenchidas (.env.example na raiz) 

```bash
# Constrói e inicia os containers da aplicação e postgresql.
$ docker:dev-build  

# Roda a aplicação se a imagem já tiver sido construída.
$ docker:dev-run

# Encerra o docker compose com a aplicação e db.
$ docker:dev-kill
```