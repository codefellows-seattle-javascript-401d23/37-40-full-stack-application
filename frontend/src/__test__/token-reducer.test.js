import tokenReducer from '../reducers/token';

describe('token reducer', () => {
  const testState = {
    token: 'something',
  };
  test('TOKEN_SET', () => {
    const action = {
      type: 'TOKEN_SET',
      payload: testState.token,
    };
    expect(tokenReducer(testState.token, action)).toEqual('something');
  });
  test('TOKEN_REMOVE', () => {
    const action = {
      type: 'TOKEN_REMOVE',
      payload: testState.token,
    };
    expect(tokenReducer(testState.token, action)).toBeNull();
  });
});
