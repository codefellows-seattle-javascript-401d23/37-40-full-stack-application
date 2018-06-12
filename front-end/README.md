## Install the following npm packages before using this application:

```npm i -D sass-loader node-sass css-loader style-loader html-webpack-plugin webpack webpack-cli webpack-dev-server webpack-merge babel-eslint babel-core babel-loader babel-preset-env babel-preset-react babel-preset-stage-0 react react-dom dotenv eslint eslint-config-airbnb-base eslint-plugin-import eslint-plugin-jest eslint-plugin-react babel-plugin-transform-react-jsx-source file-loader superagent mini-css-extract-plugin react-router-dom prop-types react-test-renderer redux react-redux redux-devtools-extension redux-mock-store validator```

## Lab39
This application is focused around using cookies/tokens as authorization for a user to create an account and login/logout with their account's username and password.

**React** and **redux** best practices are used throughout the application.

A **redux store** is used to essentially house all the reducers used in this application.  **async action creators** are used for making requests to the store and **sync action creators** are utilized for updating the app store.

## Validation
This app uses the **validator npm package** to check the validity of usernames, passwords and emails.  Please ensure your username, password and email are all within 6 to 12 characters long to successfully create your account.


## Additional Details

SCSS was used to style this application. 