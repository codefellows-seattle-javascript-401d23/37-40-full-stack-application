import searchReducer from '../reducers/search';

describe('search reducer', () => {
  const testState = {
    token: 'token',
    profile: {
      username: 'user',
      _id: 1,
    },
    search: [{}, {}, {}, {}],
    crawls: [],
  };
  test('CREATE_CRAWL', () => {
    const action = {
      type: 'CREATE_CRAWL',
      payload: testState.search,
    };
    expect(searchReducer(testState, action)).toEqual(testState.search);
  });
  test('TOKEN_REMOVE', () => {
    const action = {
      type: 'TOKEN_REMOVE',
      payload: testState.search,
    };
    expect(searchReducer(testState, action)).toEqual([]);
  });
});
