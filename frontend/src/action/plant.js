const create = plant => ({
  type: 'PLANT_CREATE',
  payload: plant,
});

const update = plant => ({
  type: 'PLANT_UPDATE',
  payload: plant,
});

const remove = plant => ({
  type: 'PLANT_REMOVE',
  payload: plant,
});

export { create, update, remove };
