import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils';

const emptyState = {
  firstName: '',
  lastName: '',
  breed: '',
  age: '',
  location: '',
  phoneNumber: '',
};

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.profile ? props.profile : emptyState;
    autoBind.call(this, ProfileForm);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state);
  }

  render() {
    return (
      <form
        className='profile-form'
        onSubmit={this.handleSubmit}>

        <input
          name='firstName'
          placeholder='firstName'
          value={this.state.firstName}
          onChange={this.handleChange}
        />

        <input
          name='lastName'
          placeholder='lastName'
          value={this.state.lastName}
          onChange={this.handleChange}
        />

        <input
          name='breed'
          placeholder='breed'
          value={this.state.breed}
          onChange={this.handleChange}
        />

        <input
          name='age'
          placeholder='age'
          value={this.state.age}
          onChange={this.handleChange}
        />

        <input
          name='location'
          placeholder='location'
          value={this.state.location}
          onChange={this.handleChange}
        />

        <input
          name='phoneNumber'
          placeholder='phoneNumber'
          value={this.state.phoneNumber}
          onChange={this.handleChange}
        />

        <button type='submit'> {this.props.profile ? 'update' : 'create'} profile </button>
      </form>
    );
  }
}

ProfileForm.propTypes = {
  onComplete: PropTypes.func,
  profile: PropTypes.object,
};

export default ProfileForm;
