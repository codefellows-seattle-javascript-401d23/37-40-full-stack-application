const validateProfile = (profile) => {
  if (!profile) throw new Error('profile is required');
  const { username } = profile;
  if (!username) throw new Error('invalid profile');
};

export default (state = null, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'BIO_CREATE':
      validateProfile(payload);
      return payload;
    case 'TOKEN_REMOVE':
      return null;
    default:
      return state;
  }
};
