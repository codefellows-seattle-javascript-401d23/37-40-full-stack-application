const D23_003 = 'Dog is required';
const D23_004 = 'Dog picture';

export const validateDog = (dog) => {
  if (!dog) {
    throw new Error(D23_003);
  }

  const {
    _id, firstName, breed, age, location,
  } = dog;

  if (!_id || !firstName || !breed || !age || !location) {
    throw new Error(D23_004);
  }
};

export default (state = [], action) => {
  const { type, payload } = action;

  switch (type) {
    case 'DOG_SET':
      validateDog(payload);
      return [payload, ...state];
    default:
      return state;
  }
};
