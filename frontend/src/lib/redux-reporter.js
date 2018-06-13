export default store => next => (action) => {
  try {
    console.log('__ACTION__', action);
    const result = next(action);
    console.log('__STATE__', store.getState());
    return result;
  } catch (err) {
    console.log(err);
    action.error = err;
    return action;
  }
};
