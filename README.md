# Lab 37 Full-Stack Auth

## Overview

This lab combines a previous backend project (Lab 16-19) and a react frontend. The frontend allows for Signup/Login functionality that hits the backend api account POST and GET routes with async action creators. Redux-reporter and redux-thunk middleware is included. 

## Tech / Framework

- React
- Redux
- Babel
- webpack
- JavaScript
- Node.js
- Express
- Superagent

## Dependencies

- babel-core
- babel-eslint
- babel-loader
- babel-preset-env
- babel-preset-react
- babel-preset-stage-0
- babel-register
- css-loader
- dotenv
- enzyme
- enzyme-adapter-react-16
- eslint
- eslint-config-airbnb-base
- eslint-plugin-import
- eslint-plugin-jest
- html-webpack-plugin
- jest
- mini-css-extract-plugin
- node-sass
- prop-types
- react
- react-dom
- react-redux
- react-router-dom
- react-test-renderer
- redux
- redux-devtools-extension
- sass-loader
- style-loader
- superagent
- uuid
- webpack
- webpack-cli
- webpack-dev-server
- webpack-merge

Additional dependencies for the backend:
- body-parser
- express
- faker
- http-errors
- mongoose
- winston
- aws-sdk
- bcrypt
- jsonwebtoken
- multer

## Getting Started

Fork and clone this repo.

#### Backend

Create .env file that includes:
```
NODE_ENV=development
PORT=3000
DEBUG=true
CORS_ORIGINS=http://localhost:8080
MONGODB_URI=mongodb://localhost/testing
```

In the command line enter ```npm i``` to install required modules. In one terminal tab enter ```nodemon``` to start the server, and in another tab enter ```npm run dbon``` to start MongoDB. 

#### Frontend

Create .env file that includes:
```
API_URL=http://localhost:3000
NODE_ENV=development
```
In a third terminal tab, enter ```npm i``` to install required modules. Enter ```npm run watch``` to open the application in the browser. 