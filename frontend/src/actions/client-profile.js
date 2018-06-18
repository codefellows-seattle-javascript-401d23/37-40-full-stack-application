import superagent from 'superagent';
import * as routes from '../routes';

//------------
// SYNC
//------------
const setProfile = profile => ({
  type: 'CLIENT_PROFILE_SET',
  payload: profile,
});

//------------
// ASYNC
//------------
const createRequest = profile => (store) => {
  const { token } = store.getState();

  return superagent.post(`${API_URL}${routes.PROFILE_ROUTE}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-type', 'application/json')
    .send(profile)
    .then((response) => {
      return store.dispatch(setProfile(response.body));
    });
};

const updateRequest = profile => (store) => {
  const { token } = store.getState();

  return superagent.put(`${API_URL}${routes.PROFILE_ROUTE}/${profile._id}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-type', 'application/json')
    .send(profile)
    .then((response) => {
      return store.dispatch(setProfile(response.body));
    });
};

const fetchRequest = () => (store) => {
  const { token } = store.getState();

  return superagent.get(`${API_URL}${routes.PROFILE_ROUTE}/me`)
    .set('Authorization', `Bearer ${token}`)
    .then((response) => {
      return store.dispatch(setProfile(response.body));
    });
};

export { setProfile, createRequest, updateRequest, fetchRequest };
