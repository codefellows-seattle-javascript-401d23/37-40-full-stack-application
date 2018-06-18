import superagent from 'superagent';
import * as routes from '../routes';

const setDog = dog => ({
  type: 'DOG_SET',
  payload: dog,
});

const createRequest = dog => (store) => {
  return superagent.post(`${API_URL}${routes.DOG_ROUTE}`)
    .send(dog)
    .then((response) => {
      return store.dispatch(setDog(response.body));
    });
};

const updateRequest = dog => (store) => {
  return superagent.put(`${API_URL}${routes.DOG_ROUTE}/${dog._id}`)
    .send(dog)
    .then((response) => {
      return store.dispatch(setDog(response.body));
    });
};

const fetchRequest = () => (store) => {
  return superagent.get(`${API_URL}${routes.DOG_ROUTE}`)
    .then((response) => {
      return store.dispatch(setDog(response.body));
    });
};

export { setDog, createRequest, updateRequest, fetchRequest };
