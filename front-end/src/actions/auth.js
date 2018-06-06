import superagent from 'superagent';
import * as routes from '../routes';

export const setTokenAction = token => ({
  type: 'TOKEN_SET',
  payload: token,
});

export const removeTokenAction = () => ({
  type: 'TOKEN_REMOVE',
});

export const signupRequest = user => (store) => {
  console.log('____SIGNUP_USER_______', user);
  return superagent.post(`${API_URL}${routes.SIGNUP_ROUTE}`)
    .send(user)
    .then((response) => {
      return store.dispatch(setTokenAction(response.text));
    });
};

export const loginRequest = user => (store) => {
  console.log('____LOGIN_USER_______', user);
  return superagent.get(`${API_URL}${routes.LOGIN_ROUTE}`)
    .auth(user.username, user.password)
    .then((response) => {
      return store.dispatch(setTokenAction(response.text));
    });
};
