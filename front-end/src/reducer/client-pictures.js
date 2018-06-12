export const validatePicture = (picture) => {
  if(!picture) {
    throw new Error('Picture is required')
  }
  const {
    _id, url, description, owner
  } = picture;

  if(!_id || !url || !description || !owner) {
    throw new Error('invalid picture');
  }
};

export default(state = [], { type, payload }) => {
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

