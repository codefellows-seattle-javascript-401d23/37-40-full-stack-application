import { combineReducers } from 'redux';
import token from './token';
import clientPictures from './client-pictures';
import clientProfile from './client-profile';

export default combineReducers({ token, clientProfile, clientPictures });
