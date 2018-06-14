import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducers';
import thunk from './lib/redux-thunk';
// import session from './lib/redux-session';
import reporter from './lib/redux-reporter';
// import getUsername from './lib/local-storage';
import App from './components/app/app';
import './style/main.scss';

// const retrievedState = getUsername();

const store = createStore(
  reducer,
  // retrievedState,
  // composeWithDevTools(applyMiddleware(thunk, reporter, session))
  composeWithDevTools(applyMiddleware(thunk, reporter)),
);

const container = document.createElement('div');
document.body.appendChild(container);
render(<Provider store={store}><App/></Provider>, container);
