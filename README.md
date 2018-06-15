Lab 38: Full-Stack Token Management
===

**Author:** Jennifer Piper

This is a project to add a front-end to the existing Bloomio plant-minder back-end. It currently allows a user to sign up with username, email, and password, and allows them to log in again with the same credentials.

## Getting Started
Set up `.env` files, one in the front end and one in the back end:
`/frontend/.env`:
```
NODE_ENV=development
API_URL=http://localhost:3000
```

`/backend/.env`:
```
NODE_ENV=development
PORT=3000
DEBUG=true
CORS_ORIGINS=http://localhost:8080

MONGODB_URI=mongodb://localhost/testing
BLOOMIO_SECRET=topsecret
```


Install dependencies, run this command once from the `/frontend` directory, and once from the `/backend` directory:
* `npm i`

To start the database from `/backend`:
* `npm run dbon`

To start the server from `/backend`:
* `npm start`

To start webpack and activate the app from `/frontend`:
* ` npm run watch`

The app will open in a browser window and present signup and login options to the user.

