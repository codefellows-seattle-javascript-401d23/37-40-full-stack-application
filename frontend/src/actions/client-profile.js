import superagent from 'superagent';
import * as routes from '../routes';

const setProfile = profile => ({
  type: 'CLIENT_PROFILE_SET',
  payload: profile,
});

const createRequest = profile => (store) => {
  const { token } = store.getState();
  const parsedToken = (JSON.parse(token));
  console.log(parsedToken.token);

  return superagent.post(`${API_URL}${routes.PROFILE_ROUTE}`)
    .set('Authorization', `Bearer ${parsedToken.token}`)
    .set('Content-Type', 'application/json')
    .send(profile)
    .then((response) => {
      console.log(response, 'this is the response');
      return store.dispatch(setProfile(response.body));
    });
};

const updateRequest = profile => (store) => {
  const { token } = store.getState();
  const parsedToken = (JSON.parse(token));

  return superagent.put(`${API_URL}${routes.PROFILE_ROUTE}/${profile._id}`)
    .set('Authorization', `Bearer ${parsedToken.token}`)
    .set('Content-Type', 'application/json')
    .send(profile)
    .then((response) => {
      return store.dispatch(setProfile(response.body));
    });
};

const fetchRequest = () => (store) => {
  const { token } = store.getState();
  // const parsedToken = (JSON.parse(token));

  return superagent.get(`${API_URL}${routes.PROFILE_ROUTE}/me`) // may need to change the url
    .set('Authorization', `Bearer ${token}`)
    .then((response) => {
      return store.dispatch(setProfile(response.body));
    });
};

export { setProfile, createRequest, updateRequest, fetchRequest };
