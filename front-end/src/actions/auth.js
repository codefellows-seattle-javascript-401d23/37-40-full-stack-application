import superagent from 'superagent';
import * as routes from '../routes';

const setTokenAction = token => ({
  type: 'TOKEN_SET',
  payload: token,
});

const removeTokenAction = () => ({
  type: 'TOKEN_REMOVE',
});

const signupRequest = user => (store) => {
  return superagent.post(`${API_URL}${routes.SIGNUP_ROUTE}`)
    .send(user)
    .then((response) => {
      return store.dispatch(setTokenAction(response.text));
    });
};

const loginRequest = user => (store) => {
  return superagent.get(`${API_URL}${routes.LOGIN_ROUTE}`)
    .auth(user.username, user.password)
    .then((response) => {
      return store.dispatch(setTokenAction(response.text));
    });
};

export { setTokenAction, removeTokenAction, signupRequest, loginRequest };
