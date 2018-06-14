import { combineReducers } from 'redux';
import plants from './plant';
import token from './token';

export default combineReducers({
  plants,
  token,
});
