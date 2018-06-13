
// ES5 way of writing the following code:
// export default function (store) {
//   return function (next){
//     return function (action) {
//       // do logic here
//     }
//   }}

export default store => next => (action) => {
  try {
    console.log('__ACTION__', action);
    const result = next(action);
    console.log('__STATE__', store.getState());
    return result;
  } catch (error) {
    // Vinicio - gracefully handle the error in a way a user will understand
    console.log('__ERROR__', error);
    return action;
  }
};
