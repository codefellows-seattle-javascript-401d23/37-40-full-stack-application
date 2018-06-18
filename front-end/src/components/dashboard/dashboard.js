import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DogForm from '../dog-form/dog-form';
import * as dogActions from '../../actions/dog';

class Dashboard extends React.Component {
  render() {
    return (
      <div className='dashboard'>
        <h1> Hello from Pound Puppy Alert </h1>
        <h2> Welcome, you are logged in! </h2>
        <DogForm onComplete={this.props.doCreateDog} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  doCreateDog: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  doCreateDog: dog => dispatch(dogActions.createRequest(dog)),
});

export default connect(null, mapDispatchToProps)(Dashboard);
