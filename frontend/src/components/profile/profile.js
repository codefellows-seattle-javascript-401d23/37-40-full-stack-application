import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import autobind from '../../utils/autobind';
import ProfileForm from '../profile-form/profile-form';
import * as profileActions from '../../actions/profile';
import './profile.scss';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
    autobind.call(this, Profile);
  }

  handleUpdate(profile) {
    this.props.profileUpdate(profile);
    this.setState({ editing: false });
  }

  render() {
    const { profile } = this.props;
    let JSXEditing = null;
    let JSXDisplay = null;
    let JSXProfile = null;

    if (this.props.profile) {
      JSXEditing =
        <div>
          <ProfileForm profile={profile} onComplete={this.handleUpdate}/>
          <button onClick={() => this.setState({ editing: false })}> Cancel </button>
        </div>;
      JSXDisplay =
        <div>
          <p>{ profile.bio }</p>
          <button onClick={() => this.setState({ editing: true })}> Edit Bio </button>
        </div>;
      JSXProfile =
        <div>
          <h3>{ profile.username.toUpperCase() }</h3>
          { this.state.editing ? JSXEditing : JSXDisplay }
        </div>;
    }
    return (
      <div className='profile'>
        <h2>Profile</h2>
        { profile ? JSXProfile : <ProfileForm onComplete={this.handleUpdate}/> }
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object,
  profileUpdate: PropTypes.func,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  profileUpdate: profile => dispatch(profileActions.updateProfileRequest(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
