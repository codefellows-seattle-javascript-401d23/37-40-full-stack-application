import superagent from 'superagent';
import * as routes from '../utils/routes';

const createBio = profile => ({
  type: 'BIO_CREATE',
  payload: profile,
});

const addCrawl = profile => ({
  type: 'CRAWL_ADD',
  payload: profile,
});

const updateProfileRequest = profile => (store) => {
  const { token } = store.getState();
  return superagent.put(`${API_URL}${routes.PROFILE}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .send({ bio: profile.bio })
    .then((response) => {
      return store.dispatch(createBio(response.body));
    })
    .catch(console.error);
};

const addCrawlToProfileRequest = crawl => (store) => {
  const { token, profile } = store.getState();
  const { username, id, name } = crawl;
  return superagent.put(`${API_URL}${routes.CRAWLS}/${username}/${id}/${name}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .then((response) => {
      console.log('UPDATED CRAWL??', response.body);
      return store.dispatch(addCrawl({ profile, id: response.body._id }));
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

export { updateProfileRequest, fetchRequest, addCrawlToProfileRequest };
