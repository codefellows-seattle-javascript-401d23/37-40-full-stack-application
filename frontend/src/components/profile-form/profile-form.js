import React from 'react';
import PropTypes from 'prop-types';
import autobind from '../../utils/autobind';
import { DEF_PROFILE_ERR } from '../../utils/constants';

const defaultState = {
  bio: '',
  bioDirty: false,
  bioErr: null,
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

  handleSubmit(e) {
    e.preventDefault();
    const { bio } = this.state;
    if (!bio || bio.length < 1) {
      this.setState({ bioDirty: true, bioErr: DEF_PROFILE_ERR });
    } else if (bio.length > MAX_BIO_LENGTH) {
      this.setState({ bioDirty: true, bioErr: 'Max 300 characters' });
    } else {
      this.props.onComplete(this.state);
      this.setState(defaultState);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='profile-form'>
        <label>Write a bio:</label>
        <textarea
          name='bio'
          value={this.state.bio}
          onChange={this.handleChange}
        />
        { this.state.bioDirty && <p className='error'>{this.state.bioErr}</p> }
        { this.state.bio && <p>{this.state.bio.length}</p> }
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
