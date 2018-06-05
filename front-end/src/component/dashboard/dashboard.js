import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TodoForm from '../todo-form/todo-form';
import * as todoActions from '../../actions/todo-actions.js';

class Dashboard extends React.Component {

  componentDidMount() {
    this.props.todosFetch();
  }

  render() {
    const { todos, todoCreate, todoUpdate, todoDelete } = this.props;
    return (
        <div className='dashboard'>
          <h2> DASHBOARD </h2>
          <TodoForm
          onComplete={todoCreate} {todoUpdate}
          buttonText='Create Todo'
        />
        {
          todos.map((todo) => {
          return (
              <div key={todo._id}>
                <p>{todo.title}</p>
                <button onClick={() => todoDelete(todo)}>remove</button>
                <button onClick={() => todoUpdate(todo)}>update</button>
              </div>
            );
          })
        }
      </div>
    );
  }
}

Dashboard.propTypes = {
  todosFetch: PropTypes.func,
  todoCreate: PropTypes.func,
  todoUpdate: PropTypes.func,
  todoDelete: PropTypes.func,
  todos: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  };
};

const mapDispatchToProps = dispatch => ({
  todosFetch: () => dispatch(todoActions.todosFetchRequest()),
  todoCreate: todo => dispatch(todoActions.todoCreateRequest(todo)),
  todoUpdate: todo => dispatch(todoActions.todoUpdateRequest(todo)),
  todoDelete: todo => dispatch(todoActions.todoDeleteRequest(todo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);