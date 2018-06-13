import superagent from 'superagent';
import * as routes from '../utils/routes';
import { addCrawl } from './crawls';

const updateProfile = profile => ({
  type: 'BIO_CREATE',
  payload: profile,
});

const fetchRequest = () => (store) => {
  const { token } = store.getState();
  return superagent.get(`${API_URL}${routes.PROFILE}`)
    .set('Authorization', `Bearer ${token}`)
    .then((response) => {
      return store.dispatch(updateProfile(response.body));
    })
    .catch(console.error);
};

const addBioRequest = profile => (store) => {
  const { token } = store.getState();
  return superagent.put(`${API_URL}${routes.PROFILE}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send({ bio: profile.bio })
    .then((response) => {
      return store.dispatch(updateProfile(response.body));
    })
    .catch(console.error);
};

const addCrawlToProfileRequest = crawlParams => (store) => {
  const { token } = store.getState();
  const { username, id, name } = crawlParams;
  return superagent.put(`${API_URL}${routes.CRAWLS}/${username}/${id}/${name}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .then((response) => {
      store.dispatch(addCrawl(response.body));
      return superagent.get(`${API_URL}${routes.PROFILE}`)
        .set('Authorization', `Bearer ${token}`);
    })
    .then(() => fetchRequest())
    .catch(console.error);
};

export { addBioRequest, fetchRequest, addCrawlToProfileRequest };
