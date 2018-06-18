import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PictureForm from './../picture-form/picture-form';
import * as clientPicturesActions from '../../actions/client-pictures';

class Dashboard extends React.Component {
  
  render() {
    const { 
      todos, todoCreate, todoUpdate, todoDelete, 
    } = this.props;

    return (
      <div className="dashboard">
        <h2>Welcome to Sluggram</h2>
        <PictureForm onComplete={this.props.doCreatePicture}/>
      </div>
    );
  }
}

Dashboard.propTypes = {
  doCreatePicture: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  doCreatePicture: picture => dispatch(clientPicturesActions.createRequest(picture)),
});

export default connect(null, mapDispatchToProps)(Dashboard);