import superagent from 'superagent';
import * as routes from '../routes';

// SYNC ----------------------------
const set = pictures => ({
  type: 'CLIENT_PICTURES_SET', // naming convention NAME_ACTION or ACTION_NAME
  payload: pictures,
});

const create = picture => ({
  type: 'CLIENT_PICTURE_CREATE',
  payload: picture,
});

// ASYNC -----------------------------

const createRequest = fileDesc => (store) => {
  const { token } = store.getState();

  return superagent.post('${API_URL}$routes.PHOTO_ROUTE}')
    .set('Authorization', `Bearer ${token}`)
    .field('description', fileDesc.description)
    .attach('photo', fileDesc.picture)
    .then((response) => {
     return store.dispatch(create(response.body))
    });
};

export { createRequest }