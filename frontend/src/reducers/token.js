import { fetchCookie } from '../utils/cookie';
import { COOKIE_TOKEN_KEY } from '../utils/constants';

const token = fetchCookie(COOKIE_TOKEN_KEY);
const defaultState = token || null;

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'TOKEN_SET':
      return payload;
    case 'TOKEN_REMOVE':
      return null;
    default:
      return state;
  }
};
