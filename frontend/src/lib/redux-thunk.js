// exporting store rather than state since state is a optionally use parameter
export default store => next => action =>
  (typeof action === 'function' ? action(store) : next(action));
