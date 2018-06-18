import superagent from 'superagent';
import * as routes from '../routes';
import { deleteCookie } from '../utils/cookie';
import { TOKEN_COOKIE_KEY } from '../utils/constants';

//-------------------
// SYNC
//-------------------
export const setToken = token => ({
  type: 'TOKEN_SET',
  payload: token,
});

export const removeToken = () => ({
  type: 'TOKEN_REMOVE',
});

export const logout = () => {
  // 1 - remove the cookie
  // - remove token from local storage if there....
  // 2 - remove token from store
  deleteCookie(TOKEN_COOKIE_KEY);
  return removeToken(); // you refactored the action but it didn't refactor all the names...
};

//--------------
// ASYNC
//--------------
export const signupRequest = user => (store) => {
  return superagent.post(`${API_URL}${routes.SIGNUP_ROUTE}`)
    .send(user)
    .withCredentials()
    .then((response) => {
      return store.dispatch(setToken(response.text));
    });
};

export const loginRequest = user => (store) => {
  return superagent.get(`${API_URL}${routes.LOGIN_ROUTE}`)
    .auth(user.username, user.password)
    .withCredentials()
    .then((response) => {
      return store.dispatch(setToken(response.text));
    });
};
