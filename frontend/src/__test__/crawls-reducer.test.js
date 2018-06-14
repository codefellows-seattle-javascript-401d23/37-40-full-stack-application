import crawlReducer from '../reducers/crawls';

describe('crawl reducer', () => {
  const testState = {
    token: 'token',
    profile: {
      username: 'user',
      _id: 1,
    },
    search: [],
    crawls: [],
  };
  test('CRAWL_ADD', () => {
    const newCrawl = {
      name: 'name',
      stops: [],
      _id: 4,
    };
    const action = {
      type: 'CRAWL_ADD',
      payload: newCrawl,
    };
    expect(crawlReducer(testState.crawls, action)).toEqual([newCrawl]);
  });
  test('CRAWL_GET', () => {
    const action = {
      type: 'CRAWL_GET',
      payload: testState.crawls,
    };
    expect(crawlReducer(testState.crawls, action)).toEqual(testState.crawls);
  });
  test('TOKEN_REMOVE', () => {
    const action = {
      type: 'TOKEN_REMOVE',
      payload: 'something',
    };
    expect(crawlReducer(testState.crawls, action)).toEqual([]);
  });
});
