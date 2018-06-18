export default store => next => (action) => {
  try {
    console.log('____ACTION____', action);
    const result = next(action); // the store gets updated in this line
    console.log('____STATE____', store.getState());
    return result;
  } catch (error) {
    console.log('____ERROR____', error);
    action.error = error;
    return action;
  }
};
