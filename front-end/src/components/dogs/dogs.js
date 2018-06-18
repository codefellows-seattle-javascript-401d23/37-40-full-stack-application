import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autoBind from '../../utils';
import * as dogActions from '../../actions/dog';
import * as routes from '../../routes';
import DogForm from '../dog-form/dog-form';

class Dog extends React.Component {
  constructor(props) {
    super(props);
    autoBind.call(this, Dog);
  }

  handleCreate(dog) {
    this.props.dogCreate(dog)
      .then(() => {
        this.props.history.push(routes.DOG_ROUTE);
      });
  }

  // handleUpdate(dog) {
  //   this.props.dogUpdate(dog);
  //   this.setState({ editing: false });
  // }

  render() {
    const { dog } = this.props;

    return (
      <div>
        <h2>Add A Dog</h2>
        <DogForm dog={dog} onComplete={this.handleCreate} />
        {/* <h2>Dogs Available</h2>
        <p>{dog.firstName}</p>
        <p>{dog.breed}</p>
        <p>{dog.age}</p>
        <p>{dog.location}</p>
        <p>{dog.description}</p> */}
      </div>
    );
  }
}

Dog.propTypes = {
  dog: PropTypes.object,
  dogCreate: PropTypes.func,
  dogUpdate: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  dog: state.dog,
});

const mapDispatchToProps = dispatch => ({
  dogCreate: dog => dispatch(dogActions.createRequest(dog)),
  dogUpdate: dog => dispatch(dogActions.updateRequest(dog)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dog);
