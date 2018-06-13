import profileReducer from '../reducers/profile';

describe('profile reducer', () => {
  const testState = {
    token: 'token',
    profile: {
      username: 'user',
      _id: 1,
      bio: 'something',
    },
    search: [],
    crawls: [],
  };
  test('BIO_CREATE', () => {
    const action = {
      type: 'BIO_CREATE',
      payload: testState.profile,
    };
    expect(profileReducer(testState, action)).toEqual(testState.profile);
  });
  test('TOKEN_REMOVE', () => {
    const action = {
      type: 'TOKEN_REMOVE',
      payload: testState.profile,
    };
    expect(profileReducer(testState, action)).toBeNull();
  });
});
