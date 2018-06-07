import { fetchCookie } from '../utils/cookie';
import { TOKEN_COOKIE_KEY } from '../utils/constants';

const token = fetchCookie('X-Sluggram-Token');
const initialState = token || null;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'TOKEN_SET':
      return payload;
    case 'TOKEN_REMOVE':
      return null;
    default:
      return state;
  }
};
