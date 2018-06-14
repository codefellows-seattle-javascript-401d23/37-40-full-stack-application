import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PictureForm from '../picture-form/picture-form';
import * as clientPictureActions from '../../actions/client-pictures';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <h2>Welcome to the Dashboard!</h2>
        <h3>You are logged in</h3>

        <PictureForm onComplete={this.props.doCreatePicture}/>
      </div>
    );
  }
}

Dashboard.propTypes = {
  doCreatePicture: PropTypes.func,
};

// every property inside this object will become part of the props.
const mapDispatchToProps = dispatch => ({
  doCreatePicture: picture => dispatch(clientPictureActions.createRequest(picture)),
});

export default connect(null, mapDispatchToProps)(Dashboard);
