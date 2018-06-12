import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import TodoForm from '../todo-form/todo-form';
// import * as todoActions from '../../actions/todo-actions.js';
import PictureForm from '../picture-form/picture-form';
import * as clientPictureActions from '../../actions/client-pictures';

class Dashboard extends React.Component {

  componentDidMount() {
    this.props.todosFetch();
  }

  render() {
    const { todos, todoCreate, todoUpdate, todoDelete } = this.props;
    return (
        <div className='dashboard'>
          <h2> DASHBOARD </h2>
          <PictureForm onComplete={this.props.doCreatePicture}/>
      </div>
    );
  }
}


Dashboard.propTypes = {
  doCreatePicture: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  doCreatePicture : picture => dispatch(clientPictureActions.createRequest(picture))
});



export default connect(null, mapDispatchToProps)(Dashboard);

