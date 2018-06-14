import React from 'react';
import PropTypes from 'prop-types';
import autobind from '../../utils/autobind';

const defaultState = {
  bio: '',
};

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.profile ? props.profile : defaultState;
    autobind.call(this, ProfileForm)
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({ bio: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state);
    this.setState(defaultState);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='profile-form'>
        <textarea
          name='bio'
          value={this.state.bio}
          onChange={this.handleChange}
        />
        <button type='submit'>{ this.props.profile ? 'Update' : 'Add' } Bio</button>
      </form>
    );
  }
}

ProfileForm.propTypes = {
  profile: PropTypes.object,
  onComplete: PropTypes.func,
};

export default ProfileForm;
