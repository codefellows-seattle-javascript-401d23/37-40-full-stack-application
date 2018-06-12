const validateProfile = (profile) => {
  if (!profile) {
    throw new Error('Profile is required');
  }
  const {
    username, user, bio,
  } = profile;

  if (!username || !user || !bio) {
    throw new Error('Invalid profile');
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
