import superagent from 'superagent';
import * as routes from '../routes';

const set = pictures => ({
  type: 'CLIENT_PICTURE_SET', // The convention is NAME_ACTION or ACTION_NAME
  payload: pictures,
});

const create = picture => ({
  type: 'CLIENT_PICTURE_CREATE',
  payload: picture,
});

// ------------------
// ASYNC
// ------------------

const createRequest = picture => (store) => {
  // destructure the token we have in the store - we have to be logged in...
  const { token } = store.getState();

  return superagent.post(`${API_URL}${routes.PHOTOS_ROUTE}`)
    .set('authorization', `Bearer ${token}`)
    .field('description', picture.description)
    .attach('photo', picture.picture)
    .then((response) => {
      // finish by updating the store
      return store.dispatch(create(response.body));
    });
};

// we didn't export create but we would here if we need it later.
export default { createRequest };
