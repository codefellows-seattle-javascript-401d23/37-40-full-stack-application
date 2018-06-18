import { combineReducers } from 'redux';
import plants from './plant';
import token from './token';
import clientProfile from './client-profile';

export default combineReducers({
  plants,
  token,
  clientProfile,
});
