import { combineReducers } from 'redux';
import todos from './todos';
import token from './token';
import clientProfile from './client-profile';

export default combineReducers({ 
  todos, 
  token,
  clientProfile,
});

