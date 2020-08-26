# 401 JS --  Lab 38 Full-Stack Token Management

 
## Feature Tasks
* This lab adds form validation - a new npm package is installed: npm i -D validator
* This project uses react/redux best practices


Front-end .env vars:

```
API_URL=http://localhost:3000
NODE_ENV=development

```

To build app, make 2 directories for front-end and back-end.
Add following dependencies to package.json and run npm i:

```

     "devDependencies": {
       "babel-core": "^6.26.3",
       "babel-eslint": "^8.2.3",
       "babel-loader": "^7.1.4",
       "babel-preset-env": "^1.7.0",
       "babel-preset-react": "^6.24.1",
       "babel-preset-stage-0": "^6.24.1",
       "cors": "^2.8.4",
       "css-loader": "^0.28.11",
       "dotenv": "^5.0.1",
       "enzyme": "^3.3.0",
       "enzyme-adapter-react-16": "^1.1.1",
       "eslint": "^4.19.1",
       "eslint-config-airbnb-base": "^12.1.0",
       "eslint-plugin-import": "^2.12.0",
       "eslint-plugin-jest": "^21.15.1",
       "eslint-plugin-react": "^7.8.2",
       "html-webpack-plugin": "^3.2.0",
       "jest": "^22.4.4",
       "mini-css-extract-plugin": "^0.4.0",
       "node-sass": "^4.9.0",
       "prop-types": "^15.6.1",
       "react": "^16.3.2",
       "react-dom": "^16.3.2",
       "react-redux": "^5.0.7",
       "react-router-dom": "^4.2.2",
       "redux": "^4.0.0",
       "redux-devtools-extension": "^2.13.2",
       "redux-mock-store": "^1.5.1",
       "sass-loader": "^7.0.1",
       "style-loader": "^0.21.0",
       "uuid": "^3.2.1",
       "validator": "^10.3.0",
       "webpack": "^4.8.3",
       "webpack-cli": "^2.1.3",
       "webpack-dev-server": "^3.1.4",
       "webpack-merge": "^4.1.2"
     },
     "dependencies": {
       "superagent": "^3.8.3"
     },

```

Add the following dependencies to the back end by running npm i

```
 "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-eslint": "^8.2.3",
    "babel-preset-env": "^1.6.1",
    "babel-preset-stage-0": "^6.24.1",
    "babel-register": "^6.26.0",
    "eslint": "^4.19.1",
    "eslint-config-airbnb-base": "^12.1.0",
    "eslint-plugin-import": "^2.11.0",
    "eslint-plugin-jest": "^21.15.0",
    "fs-extra": "^6.0.1",
    "jest": "^22.4.3",
    "superagent": "^3.8.3"
  },
  "dependencies": {
    "artillery": "^1.6.0-15",
    "bcrypt": "^2.0.1",
    "body-parser": "^1.18.2",
    "cors": "^2.8.4",
    "cowsay": "^1.3.0",
    "dotenv": "^5.0.1",
    "express": "^4.16.3",
    "faker": "^4.1.0",
    "graphhopper-js-api-client": "^0.9.0-4",
    "http-errors": "^1.6.3",
    "jsonwebtoken": "^8.2.1",
    "mongoose": "^5.0.16",
    "twilio": "^3.17.0",
    "winston": "^3.0.0-rc4"
  }
```

Add the following script to your .json front-end file:

```
"scripts": {
    "watch": "webpack-dev-server --config webpack.dev.js",
     "test": "eslint . && jest --coverage --forceExit --runInBand"
  },
```

Add the following scripts to your .json back-end file:

```
 "scripts": {
     "start": "node index.js",
     "start-db": "mkdir -p ./db && mongod --dbpath ./db",
     "stop-db": "killall mongod",
     "test": "mocha"
   },
```

To run program start up a terminal in the front-end and two terminals for the back-end.
Start your back-end mongodb and node servers
Start your front-end


