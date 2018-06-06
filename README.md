# 37-40 Full Stack Application
**Author**: Lacy Hogan
**Version**: 1.0.0

## Overview
This application allows a user to create an account and then use those credentials to log in.

## Getting Started
The following devDependencies need to be installed on the front-end:
- "babel-core": "^6.26.3",
  "babel-eslint": "^8.2.3",
  "babel-loader": "^7.1.4",
  "babel-plugin-transform-react-jsx-source": "^6.22.0",
  "babel-preset-env": "^1.7.0",
  "babel-preset-react": "^6.24.1",
  "babel-preset-stage-0": "^6.24.1",
  "css-loader": "^0.28.11",
  "dotenv": "^5.0.1",
  "enzyme": "^3.3.0",
  "enzyme-adapter-react-16": "^1.1.1",
  "eslint": "^4.19.1",
  "eslint-config-airbnb-base": "^12.1.0",
  "eslint-plugin-import": "^2.12.0",
  "eslint-plugin-jest": "^21.15.1",
  "eslint-plugin-react": "^7.8.2",
  "file-loader": "^1.1.11",
  "html-webpack-plugin": "^3.2.0",
  "jest": "^22.4.4",
  "mini-css-extract-plugin": "^0.4.0",
  "node-sass": "^4.9.0",
  "prop-types": "^15.6.1",
  "react": "^16.3.2",
  "react-dom": "^16.3.2",
  "react-redux": "^5.0.7",
  "react-router-dom": "^4.2.2",
  "react-test-renderer": "^16.4.0",
  "redux": "^4.0.0",
  "redux-devtools-extension": "^2.13.2",
  "redux-mock-store": "^1.5.1",
  "sass-loader": "^7.0.1",
  "style-loader": "^0.21.0",
  "superagent": "^3.8.3",
  "uuid": "^3.2.1",
  "webpack": "^4.8.3",
  "webpack-cli": "^2.1.3",
  "webpack-dev-server": "^3.1.4",
  "webpack-merge": "^4.1.2"

The following devDependencies need to be installed on the front-end:
- "babel-cli": "^6.26.0",
  "babel-eslint": "^8.2.3",
  "babel-preset-env": "^1.7.0",
  "babel-register": "^6.26.0",
  "bluebird": "^3.5.1",
  "eslint": "^4.19.1",
  "eslint-config-airbnb-base": "^12.1.0",
  "eslint-plugin-import": "^2.11.0",
  "eslint-plugin-jest": "^21.15.1",
  "http-errors": "^1.6.3",
  "jest": "^22.4.3",
  "superagent": "^3.8.3"

The following dependencies need to be installed on the front-end:
- "babel-preset-stage-0": "^6.24.1",
  "bcrypt": "^2.0.1",
  "body-parser": "^1.18.3",
  "cors": "^2.8.4",
  "crypto": "^1.0.1",
  "dotenv": "^5.0.1",
  "express": "^4.16.3",
  "faker": "^4.1.0",
  "fs-extra": "^6.0.1",
  "jsonwebtoken": "^8.2.1",
  "mongoose": "^5.1.1",
  "node-schedule": "^1.3.0",
  "twilio": "^3.17.0",
  "winston": "^3.0.0-rc5"

package.json scripts must include on the front-end:
- "test": "eslint . && jest --coverage",
  "watch": "webpack-dev-server --config webpack.dev.js"
  
package.json scripts must include on the back-end:
- "test": "eslint . && jest --coverage --forceExit --runInBand",
  "dbon": "mkdir -p ./db && mongod --dbpath ./db",
  "dboff": "killall mongod",
  "build": "babel src -d build",
  "start": "babel src -d build && node index.js"

To start mondo, open your terminal (anywhere) and enter net start MongoDB

To start the server, open your terminal in the back-end and enter npm run start

To start the server, open your terminal in the front-end and enter npm run watch

To run the tests, enter npm run test in your terminal

## Architecture
This application uses JavaScript, React and sass libraries

## Change Log
06-05-2018 3:30pm - Application able to create an account and log.
06-05-2018 5:30pm - CSS style added.

## Credits and Collaborations
Seth Donohue and Melanie Downing