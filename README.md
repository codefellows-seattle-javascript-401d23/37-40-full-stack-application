# 401 JS --  Lab 37 Full-Stack Auth
## Install the following npm packages before using this application:

```npm i -D sass-loader node-sass css-loader style-loader html-webpack-plugin webpack webpack-cli webpack-dev-server webpack-merge babel-eslint babel-core babel-loader babel-preset-env babel-preset-react babel-preset-stage-0 react react-dom dotenv eslint eslint-config-airbnb-base eslint-plugin-import eslint-plugin-jest eslint-plugin-react babel-plugin-transform-react-jsx-source file-loader superagent mini-css-extract-plugin react-router-dom prop-types react-test-renderer redux react-redux redux-devtools-extension redux-mock-store```

## How to get things up and running
You will need to run **Nodemon** and **mongodb** to display data from your backend.  You will need to run **npm run watch** to display your localhost:3000 frontend data.  
## Request Info
Async and Sync requests are found from **src/actions/auth.js** and consist of both a superagent.get and superagent.post route to the **API_URL**.  Please set and store your frontend server info and backend server info in the appropriate **.env** module.

## Local Storage
The username and password are stored via local storage.  Both will be cleared upon refreshing the browser.

## User Experience
A user with no account will only be able to view the landing page.  The message "Sign up to our app" will be displayed. 

A user who successfully logs in with their account, will see the message: "You can only see this if you are logged in"
