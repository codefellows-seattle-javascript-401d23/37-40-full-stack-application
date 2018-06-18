import { combineReducers } from 'redux';
import clientPictures from './client-pictures';
import token from './token';
import clientProfile from './client-profile';

export default combineReducers({ 
  clientPictures, 
  token,
  clientProfile,
});

