export default (state = [], { type, payload }) => {
  switch (type) {
    case 'CRAWL_ADD':
      return [...state, payload];
    case 'CRAWL_GET':
      return payload;
    case 'TOKEN_REMOVE':
      return [];
    default:
      return state;
  }
};
