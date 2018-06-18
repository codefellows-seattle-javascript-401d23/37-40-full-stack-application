import superagent from 'superagent';
import * as routes from '../routes';

const create = picture => ({
  type: 'CLIENT_PICTURE_CREATE',
  payload: picture,
});

// async

const createRequest = fileDescriptor => (store) => {
  const { token } = store.getState();

  return superagent.post(`${API_URL}${routes.PHOTOS_ROUTE}`)
    .set('Authorization', `Bearer ${token}`)
    .field('description', fileDescriptor.description)
    .attach('photo', fileDescriptor.picture)
    .then((response) => {
      return store.dispatch(create(response.body));
    });
};

export { createRequest };
