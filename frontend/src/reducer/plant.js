const emptyState = [];

export default (state = emptyState, { type, payload }) => {
  switch (type) {
    case 'PLANT_CREATE':
      return [...state, payload];
    case 'PLANT_UPDATE':
      return state.map(plant => (plant.id === payload.id ? payload : plant));
    case 'PLANT_REMOVE':
      return state.filter(plant => plant.id !== payload.id);
    default:
      return state;
  }
};
