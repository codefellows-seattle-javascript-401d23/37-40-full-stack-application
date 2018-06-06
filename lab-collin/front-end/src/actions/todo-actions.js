import superagent from 'superagent';

const todosFetch = todos => ({
  type: 'TODOS_FETCH',
  payload: todos,
});

const todoCreate = todo => ({
  type: 'TODO_CREATE',
  payload: todo,
});

const todoUpdate = todo => ({
  type: 'TODO_UPDATE',
  payload: todo,
});

const todoDelete = todo => ({
  type: 'TODO_DELETE',
  payload: todo,
});

const todosFetchRequest = () => (dispatch) => {
  return superagent.get(`${API_URL}/api/lists`)
    .then((response) => {
      dispatch(todosFetch(response.body));
      return response; 
    });
};

const todoCreateRequest = todo => (dispatch) => {
  return superagent.post(`${API_URL}/api/lists`)
    .send(todo)
    .then((response) => {
      dispatch(todoCreate(response.body));
      return response;
    });
};

const todoUpdateRequest = todo => (dispatch) => {
  return superagent.put(`${API_URL}/api/lists/${todo._id}`)
    .then((response) => {
      dispatch(todoUpdate(todo));
      return response;
    });
};

const todoDeleteRequest = todo => (dispatch) => {
  return superagent.delete(`${API_URL}/api/lists/${todo._id}`)
    .then((response) => {
      dispatch(todoDelete(todo));
      return response;
    });
};

export { todosFetchRequest, todoCreateRequest, todoUpdateRequest, todoDeleteRequest };
