# Backend
Express Api server with Mysql

## Prérequis

- nodejs
- npm
- express
- mysql
- jsonwebtoken
- multer

## Dependencies

```json
"dependencies": {
  "bcrypt": "^5.0.1",
  "body-parser": "^1.19.0",
  "cors": "^2.8.5",
  "crypto-js": "^4.1.1",
  "dotenv": "^10.0.0",
  "express": "^4.17.1",
  "helmet": "^4.6.0",
  "jsonwebtoken": "^8.5.1",
  "multer": "^1.4.3",
  "mysql": "^2.18.1",
  "password-validator": "^5.1.1"
}
```

## .env
Copier dans le dossier racine **backend** le fichier .env.default, en le renommant .env, et ajouter les lignes suivantes dedans. Puis renseigner les crédentials de votre base de donnée Mysql, ainsi que le port de votre serveur.

```
# SERVER
PORT=4000
# DB
DB_NAME=<mongodb-db-name>
DB_USER=<mongodb-user>
DB_PWD=<mongodb-password>
DB_HOST=<mongodb-9utsh.mongodb.net>
ASK_TOKEN=Gvj76GV6kjh_yvzddzsdcC4673X2_vu76mp234g43v
```

## Run

Install all Dependencies
```
npm install
```
and start the server
```
nodemon server
```

