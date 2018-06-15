import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils/utils';
// import Modal from '../modal/modal';

const defaultState = {
  firstName: '',
  location: '',
};

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.profile || defaultState;
    autoBind.call(this, ProfileForm);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onComplete(this.state);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const buttonText = this.props.profile ? 'Update' : 'Create';

    return (
          <form onSubmit={this.handleSubmit}
                className='profile-form'>
            <input
              type='text'
              name='firstName'
              placeholder='First Name'
              value={this.state.firstName}
              onChange={this.handleChange}
            />
            <br/>
            <input
              type='text'
              name='location'
              placeholder='Location'
              value={this.state.location}
              onChange={this.handleChange}
            />
            <br/>
            <button type="submit">{buttonText} Profile</button>
          </form>
    );
  }
}
ProfileForm.propTypes = {
  profile: PropTypes.object,
  onComplete: PropTypes.func,
};

export default ProfileForm;
