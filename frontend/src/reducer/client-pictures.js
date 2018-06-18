const D23_003 = 'Picture is required';
const D23_004 = 'Invalud Picture';

export const validatePicture = (picture) =>  {
  if (!picture) {
    throw new Error(D23_003);
  }
  const {
    _id, url, description, owner,
  } = picture;

  if (!_id || !url || !description || !owner) {
    throw new Error(D23_004);
  }
};

// a reducer is a function that takes in the state and an action and returns an updated state

export default (state = [], { type, payload }) => {
  switch (type) {
    case 'CLIENT_PICTURE_CREATE':
      validatePicture(payload);
      return [payload, ...state];
    case 'TOKEN_REMOVE':
      return []; // removes the pictures
    default:
      return state;
  }
};
