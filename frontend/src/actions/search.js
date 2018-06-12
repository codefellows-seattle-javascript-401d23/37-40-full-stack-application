import superagent from 'superagent';
import { SEARCH } from '../utils/routes';

const search = searchParams => ({
  type: 'CREATE_CRAWL',
  payload: searchParams,
});

const searchRequest = searchParams => (store) => {
  const {
    latitude, longitude, price, stops,
  } = searchParams;
  return superagent.get(`${API_URL}${SEARCH}/${latitude}/${longitude}/${price}/${stops}`)
    .set('Content-Type', 'application/json')
    .then((response) => {
      return store.dispatch(search(response.body));
    })
    .catch(console.error);
};

export default searchRequest;
