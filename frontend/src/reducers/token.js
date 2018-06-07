import { fetchCookie } from '../utils/cookie';
import { COOKIE_TOKEN_KEY } from '../utils/constants';

const token = fetchCookie(COOKIE_TOKEN_KEY);
console.log('TOKEN', token);
const defaultState = token || null;
console.log('DEFAULT STATE, TOKEN.JS', defaultState);

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'TOKEN_SET':
      console.log('SETTING TOKEN, STATE: ', state);
      return payload;
    case 'TOKEN_REMOVE':
      return null;
    default:
      return state;
  }
};
