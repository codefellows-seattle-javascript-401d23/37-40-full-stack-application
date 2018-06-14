const validateProfile = (profile) => {
  if (!profile) {
    throw new Error('profile is required');
  }
  const {
    username, bio, account, 
  } = profile;

  if (!username || !bio || !account) {
    throw new Error('Invalid profile');
  }
  return undefined;
};

export default (state = null, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'CLIENT_PROFILE_SET': // refactor (smells)
      validateProfile(payload);
      return payload;
    case 'TOKEN_REMOVE':
      return null;
    default: 
      return state;
  }
};
