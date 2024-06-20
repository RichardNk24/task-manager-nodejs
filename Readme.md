
# Task Manager API

Ce projet est une API RESTful construite avec Node.js, Express, PostgreSQL, et JSON Web Tokens (JWT) pour l'authentification. L'API permet aux utilisateurs de gérer des tâches avec des opérations CRUD et enregistre les actions des utilisateurs.

## Table des matières

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Installation

1. **Clone le repository:**

   ```bash
   git clone https://github.com/RichardNk24/task-manager-nodejs.git
   cd task-manager-nodejs
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Install nodemon for development:**

   ```bash
   npm install --save-dev nodemon
   ```

## Configuration

1. **Configurer les variables d'environnement:**

   Créez un fichier `.env` dans le répertoire racine avec le contenu suivant :

   ```env
   DATABASE_URL=postgresql://postgres:@localhost:5433/task_manager ou
   DATABASE_URL=postgresql://postgres:@localhost:5432/task_manager dependamment de votre port
   ```

2. **Configurer Knex:**

   Assurez-vous que `knexfile.js` est correctement configuré pour utiliser les variables d'environnement :

   ```javascript
   require('dotenv').config();

   module.exports = {
     development: {
       client: 'pg',
       connection: process.env.DATABASE_URL,
       migrations: {
         directory: './migrations'
       },
       seeds: {
         directory: './seeds'
       }
     }
   };
   ```

3. **Exécuter des migrations de bases de données:**

   ```bash
   npx knex migrate:latest
   ```

## Usage

1. **Démarrer le serveur:**

   ```bash
   npx nodemon server.js
   ```

2. **Tester l'API à l'aide d'Insomnia ou de Postman ou autre outil comme Thunderclient de VS CODE:**

   - **Login:**
     - URL: `http://localhost:3000/api/login`
     - Method: POST
     - Body: 
       ```json
       {
         "username": "user",
         "password": "password"
       }
       ```
     - Sauvegarder le jeton (token) de la réponse..

   - **Créer une tâche:**
     - URL: `http://localhost:3000/api/tasks`
     - Method: POST
     - Headers:
       - `Authorization: Bearer votre_jwt_token_ici`
     - Body:
       ```json
       {
         "title": "Test Task",
         "description": "Il s'agit d'une tâche d'essai."
       }
       ```

## API Endpoints

### Authentification

- **POST /api/login**
  - Request Body:
    ```json
    {
      "username": "user",
      "password": "password"
    }
    ```
  - Response: JWT Token

### Tasks

- **POST /api/tasks**
  - Headers: `Authorization: Bearer <token>`
  - Request Body:
    ```json
    {
      "title": "Test Task",
      "description": "Il s'agit d'une tâche de test.",
      "date": "2024-06-20T12:00:00Z" // Ceci est facultatif, vous pouvez juste mettre title et description
    }
    ```
  - Response: Bravo! La tâche a été créée avec succès

- **GET /api/tasks**
  - Headers: `Authorization: Bearer <token>`
  - Response: Liste des tâches

- **GET /api/tasks/:id**
  - Headers: `Authorization: Bearer <token>`
  - Response: Détails de la tâche

- **PUT /api/tasks/:id**
  - Headers: `Authorization: Bearer <token>`
  - Request Body:
    ```json
    {
      "title": "Updated Test Task",
      "description": "This is an updated test task.",
      "date": "2024-06-21T12:00:00Z" // Facultatif également
    }
    ```
  - Response: Tâche mise à jour

- **PATCH /api/tasks/:id**
  - Headers: `Authorization: Bearer <token>`
  - Request Body:
    ```json
    {
      "title": "Partially Updated Test Task" // Facultatif également
    }
    ```
  - Response: La tâche a bien été modifiée

- **DELETE /api/tasks/:id**
  - Headers: `Authorization: Bearer <token>`
  - Response: La tâche a bien été supprimée

### Logs

- **GET /api/logs**
  - Headers: `Authorization: Bearer <token>`
  - Response: Liste des Logs

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.