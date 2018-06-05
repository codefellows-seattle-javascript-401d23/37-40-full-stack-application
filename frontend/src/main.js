import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './components/app/app';
import reducer from './reducers';
import thunk from './lib/redux-thunk';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const container = document.createElement('div');
document.body.appendChild(container);
render(<Provider store={store}><App/></Provider>, container);
