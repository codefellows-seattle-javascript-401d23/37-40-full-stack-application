import superagent from 'superagent';
import * as routes from '../utils/routes';

const createBio = profile => ({
  type: 'BIO_CREATE',
  payload: profile,
});

const updateProfileRequest = profile => (store) => {
  const { token } = store.getState();
  return superagent.put(`${API_URL}${routes.PROFILE}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send({ bio: profile.bio })
    .then((response) => {
      console.log(response.body, 'response.body');
      return store.dispatch(createBio(response.body));
    })
    .catch(console.error);
};

const fetchRequest = () => (store) => {
  const { token } = store.getState();
  return superagent.get(`${API_URL}${routes.PROFILE}`)
    .set('Authorization', `Bearer ${token}`)
    .then((response) => {
      return store.dispatch(createBio(response.body));
    })
    .catch(console.error);
};

export { updateProfileRequest, fetchRequest };
