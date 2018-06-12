import React from 'react';
import PropTypes from 'prop-types';
import autobind from '../../utils/autobind';
import { DEF_PROFILE_ERR } from '../../utils/constants';

const defaultState = {
  bio: '',
  bioDirty: false,
  bioErr: DEF_PROFILE_ERR,
};

const MAX_BIO_LENGTH = 300;

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.profile ? props.profile : defaultState;
    autobind.call(this, ProfileForm);
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({ bio: value });
  }

  handleValidation(bio) {
    let errMessage = null;
    if (!bio) errMessage = DEF_PROFILE_ERR;
    if (bio.length > MAX_BIO_LENGTH) errMessage = 'Max 300 characters';
    return this.setState({
      bioDirty: !(errMessage === null),
      bioErr: errMessage,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state);
    this.setState(defaultState);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='profile-form'>
        <label>Write a bio:</label>
        <textarea
          name='bio'
          value={this.state.bio}
          onChange={this.handleChange}
          onBlur={() => this.handleValidation(this.state.bio)}
        />
        { this.state.bio && <p>{this.state.bio.length}</p>}
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
