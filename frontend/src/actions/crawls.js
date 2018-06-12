import superagent from 'superagent';
import * as routes from '../utils/routes';

const addCrawl = crawls => ({
  type: 'CRAWL_ADD',
  payload: crawls,
});

const getCrawls = crawls => ({
  type: 'CRAWL_GET',
  payload: crawls,
});

const fetchRequest = () => (store) => {
  const { token, profile } = store.getState();
  return superagent.get(`${API_URL}${routes.CRAWLS}/${profile.username}`)
    .set('Authorization', `Bearer ${token}`)
    .then((response) => {
      return store.dispatch(getCrawls(response.body));
    })
    .catch(console.error);
};

export { addCrawl, fetchRequest }; // eslint-disable-line
