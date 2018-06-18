import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils';

const emptyState = {
  firstName: '',
  firstNameDirty: false,
  firstNameError: 'First Name is Required',

  breed: '',
  breedDirty: false,
  breedError: 'Breed is Required',

  age: '',
  ageDirty: false,
  ageError: 'Age is Required',

  location: '',
  locationDirty: false,
  locationError: 'Location is Required',

  description: '',
};

const LOCATION_LENGTH = 5;

class DogForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = emptyState;
    autoBind.call(this, DogForm);
  }

  handleValidation(name, value) {
    switch (name) {
      case 'location':
        if (value.length !== LOCATION_LENGTH) {
          return `Your location is not ${LOCATION_LENGTH} characters long`;
        }
        return null;
      default:
        return null;
    }
  }

  handleChange(e) {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
      [`${name}Dirty`]: true,
      [`${name}Error`]: this.handleValidation(name, value),
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      firstNameError, breedError, ageError, locationError, 
    } = this.state;

    if (!firstNameError && !breedError && !ageError && !locationError) {
      this.props.onComplete(this.state);
      this.setState(emptyState);
    } else {
      this.setState({
        firstNameDirty: true,
        breedDirty: true,
        ageDirty: true,
        locationDirty: true,
      });
    }
  }

  render() {
    return (
      <form className='dog-form' onSubmit={this.handleSubmit}>
        { this.state.firstNameDirty ? <p>{ this.state.firstNameError }</p> : undefined }
        <input
          name='firstName'
          placeholder='Name'
          type='text'
          value={this.state.firstName}
          onChange={this.handleChange}
        />

        { this.state.breedDirty ? <p>{ this.state.breedError }</p> : undefined }
        <input
          name='breed'
          placeholder='Breed'
          type='text'
          value={this.state.breed}
          onChange={this.handleChange}
        />

        { this.state.ageDirty ? <p>{ this.state.ageError }</p> : undefined }
        <input
          name='age'
          placeholder='Age'
          type='text'
          value={this.state.age}
          onChange={this.handleChange}
        />

        { this.state.locationDirty ? <p>{ this.state.locationError }</p> : undefined }
        <input
          name='location'
          placeholder='Zip Code'
          type='text'
          value={this.state.location}
          onChange={this.handleChange}
        />

        <textarea
          name='description'
          placeholder='Description'
          type='text'
          value={this.state.description}
          onChange={this.handleChange}
        />

        <button type='submit'>Create</button>
      </form>
    );
  }
}

DogForm.propTypes = {
  onComplete: PropTypes.func,
};

export default DogForm;
