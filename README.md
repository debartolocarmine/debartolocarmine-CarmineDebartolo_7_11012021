# GIFSMANIA
Application pour partager des gifs en équipe, réalisée avec Express, Mysql et Reactjs

## Prérequis

- nodejs
- npm
- ReactJs
- mysql
- nodemon

## Base de donnée
Avant de débuter veuillez créer une base de donnée sur une serveur quelqonque, puis, copier le fichier **.env.default** à la racine du dossier backend, et renseigner les crédentials de votre db.

```bash
# SERVER
PORT=4000
CLIENT=http://localhost
PORT_CLIENT=3000
# DB
DB_PWD=<db-password>
DB_USER=<db-user>
DB_HOST=<db-host>
DB_NAME=<db-name>
ASK_TOKEN=<choose-hard-token>
```


## Backend

Consulter le */backend/README.md* à la racine du dossier backend pour plus d'information.

### installer le Backend

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
    "password-validator": "^5.1.1",
    "cookie-parser": "^1.4.5"
  },
  "devDependencies": {
    "nodemon": "^2.0.14"
  }
```

```bash
cd backend
npm install
```

### Démarrer le backend
nodemon est utilisé pour ne pas relancer le serveur à chaque modification de celui-ci.

```bash
nodemon
```


## Frontend

Consulter le */frontend/README.md* à la racine du dossier **frontend** pour plus d'information.


### installer le Frontend

```json
"dependencies": {
  "axios": "^0.24.0",
  "react": "^17.0.2",
  "react-bootstrap-icons": "^1.6.1",
  "react-dom": "^17.0.2",
  "react-router-dom": "^5.3.0",
  "react-scripts": "4.0.3",
  "sass": "^1.43.4",
}
```

```bash
cd frontend
npm install
```

### Démarrer le Frontend

```bash
npm start
```