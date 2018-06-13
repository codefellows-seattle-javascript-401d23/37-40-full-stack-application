import superagent from 'superagent';
import * as routes from '../routes';

export const setToken = token => ({
  type: 'TOKEN_SET',
  payload: token,
});

export const removeToken = () => ({
  type: 'TOKEN_REMOVE',
});

export const signupRequest = user => (store) => {
  return superagent.post(`${API_URL}${routes.SIGNUP}`)
    .send(user)
    .then((response) => {
      const { token } = JSON.parse(response.text);
      return store.dispatch(setToken(token));
    });
};

export const loginRequest = user => (store) => {
  return superagent.get(`${API_URL}${routes.LOGIN}`)
    .auth(user.username, user.password)
    .then((response) => {
      const { token } = JSON.parse(response.text);
      return store.dispatch(setToken(token));
    });
};
