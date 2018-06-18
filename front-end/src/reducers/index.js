import { combineReducers } from 'redux';
import token from './token';
import profile from './profile';
import dog from './dog';

export default combineReducers({ token, profile, dog });
