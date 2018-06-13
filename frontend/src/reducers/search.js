export default (state = [], { type, payload }) => {
  switch (type) {
    case 'CREATE_CRAWL':
      return payload;
    case 'TOKEN_REMOVE':
      return [];
    default:
      return state;
  }
};
