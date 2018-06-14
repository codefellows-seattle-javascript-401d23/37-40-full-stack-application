import { combineReducers } from 'redux';
import token from './token';
import profile from './profile';
import search from './search';

export default combineReducers({ token, profile, search });
