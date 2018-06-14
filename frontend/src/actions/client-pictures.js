import superagent from 'superagent';
import * as routes from '../routes';

// const set = pictures => ({
//   type: 'CLIENT_PICTURES_SET',
//   payload: pictures,
// });

const create = picture => ({
  type: 'CLIENT_PICTURE_CREATE',
  payload: picture,
});

// -------------------------- ASYNC BELOW --------------------------------

const createRequest = picture => (store) => {
  const { token } = store.getState();
  const parsedToken = (JSON.parse(token));
  console.log(parsedToken.token);
  console.log(picture);
  return superagent.post(`${API_URL}${routes.PHOTOS_ROUTE}`)
    .set('Authorization', `Bearer ${parsedToken.token}`)
    .field('description', picture.description)
    .attach('image', picture.picture)
    .then((response) => {
      return store.dispatch(create(response.body));
    });
};

export { create, createRequest };

