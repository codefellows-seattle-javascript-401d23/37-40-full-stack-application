import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reporter from './lib/redux-reporter';

import App from './component/app/app';
import reducer from './reducer/main';
import thunk from './lib/redux-thunk';
import './styles/main.scss';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const appContainer = document.createElement('div');
document.body.appendChild(appContainer);

ReactDom.render(<Provider store={store}><App /></Provider>, appContainer);
