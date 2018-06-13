# Documentation

This is a basic full-stack application using the PubHub API.

Users can log in and sign up. On either, user will be redirected to their dashboard.

## Architecture
- Coding style: AirBnb
- Testing suite: jest
- Transpiling: babel
- Ajax requests: superagent
- Continuous Integration: Travis CI
- Other modules used: eslint, dotenv

#### Front-End
- View Library: React
- State management: redux
- Module bundler: webpack
- Styling: Sass
- Other modules used: css-loader, enzyme, html-webpack-plugin, mini-css-extract-plugin, prop-types

#### Back-End
- Tokens and encryption: bcrypt, jsonwebtoken
- Web Framework: express
- Pathfinding: GraphHopper
- Database management: MongoDB/mongoose
- Logging: winston
- SMS integration: Twilio
- Body parsing: body-parser

## Using locally

Fork and clone this repo. Run this application in Chrome and make sure you have the following extension downloaded on turned on: [Allow-Control-Allow-Origin:*](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en)

### 1. Set up .env files
Create dotenv files in the back-end and front-end project directories:

Back-end:

    PORT=3000
    NODE_ENV=development
    MONGODB_URI=mongodb://localhost/testing
    SECRET='longrandomstring'
    
Front-end:

    API_URL=http://localhost:3000
    NODE_ENV=development
    CDN_URL=/

### 2. Turn on server
In back-end folder of project directory:

    npm i
    npm run dbon
    npm run start

### 3. Open Browser
In front-end folder:

    npm i
    npm run watch
    
When finished, kill all terminal operations.

## Testing

    npm test
