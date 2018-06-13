const D23_001 = 'Profile required';
const D23_002 = 'Invalid Profile';

const validateProfile = (profile) => {
  console.log(profile);
  if (!profile) {
    throw new Error(D23_001);
  }
  const {
    user,
  } = profile;

  // if (!username || !user || !crawls) {
  if (!user) {
    throw new Error(D23_002);
  }
  return undefined;
};

export default (state = null, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'CLIENT_PROFILE_SET':
      validateProfile(payload);
      return payload;
    case 'TOKEN_REMOVE':
      return null;
    default:
      return state;
  }
};
