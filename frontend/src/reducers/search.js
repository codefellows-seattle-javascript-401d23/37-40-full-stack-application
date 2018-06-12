export default (state = null, { type, payload }) => {
  switch (type) {
    case 'CREATE_CRAWL':
      return payload;
    default:
      return state;
  }
};
