# Curso Angular 1

## Descripción

En este repositorio se encuentran los ejercicios realizados en el curso de la plataforma Udemy "Desarrollo Web con JavaScript, Angular, NodeJS y MongoDB"

## Dependencias instaladas

```sh
# Framework protocolo HTTP
$ npm install express

# Encriptador contraseñas
$ npm install bcrypt-nodejs

# Parsear peticiones JSON
$ npm install body-parser

# Subir ficheros con NodeJS
$ npm install connect-multiparty

# Autenticación con Tokens
$ npm install jwt-simple

# Formato de fechas
$ npm install moment

# ORM MongoDB
$ npm install mongoose

# Paginación
$ npm install mongoose-pagination
```

## Base de datos

```sql
/* Creating a database */
> use musify;

/* Insert first document in the database */
> db.artists.save({name: 'Metallica', desc:'Rock', img:''});

/* Show inserted document */
> db.artists.find();

/* Show all databases */
> show dbs;
```

