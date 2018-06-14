const D23_003 = 'Picture is required';
const D23_004 = 'Invalid picture';

export const validatePicture = (picture) => {
  console.log(picture, 'this is in the reducer');
  if (!picture) {
    throw new Error(D23_003);
  }
  const {
    _id, url, description, account,
  } = picture;

  if (!_id || !url || !description || !account) {
    throw new Error(D23_004);
  }
};

export default (state = [], { type, payload }) => {
  switch (type) {
    case 'CLIENT_PICTURE_CREATE':
      validatePicture(payload);
      return [payload, ...state];
    case 'TOKEN_REMOVE':
      return [];
    default:
      return state;
  }
};
