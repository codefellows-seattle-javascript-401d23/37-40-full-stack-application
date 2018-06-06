## Lab 37 - Full Stack Auth

### Overview

This application allows users to sign up or login to the Bloomio API that was created during project week.

To run application, MongoDB and the server must be launched from the back-end repository while `npm run watch` must be run from the front-end repository.

### Front End

Built using React, Redux, and Webpack. `.env` file must be structured as follows:

```
API_URL=http://localhost:3000
NODE_ENV=development
```

### Back End

Built using Node.js and integrated with MongoDB for persistence. `.env` file must be structured as follows:
```
PORT=3000
MONGODB_URI=mongodb://localhost/testing1
NODE_ENV=development
DEBUG=true
CORS_ORIGINS=http://localhost:8080
BLOOMIO_SECRET=123412341234
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_BUCKET=
```