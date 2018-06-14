import { combineReducers } from 'redux';
import token from './token';
import profile from './profile';
import search from './search';
import crawls from './crawls';

export default combineReducers({
  token,
  profile,
  search,
  crawls,
});
