import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autoBind from '../../utils';
import * as profileActions from '../../actions/profile';
import * as routes from '../../routes';
import ProfileForm from '../profile-form/profile-form';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
    
    autoBind.call(this, Profile);
  }
  // ----------------
  // Member Functions
  // ----------------
  handleCreate(profile) {
    this.props.profileCreate(profile)
      .then(() => {
        this.props.history.push(routes.DASHBOARD_ROUTE);
      });
  }

  handleUpdate(profile) {
    // add validation (i.e. catch blocks)
    this.props.profileUpdate(profile);
    this.setState({ editing: false });
  }

  // ----------------
  // LifeCycle Hooks
  // ----------------
  render() {
    const { profile } = this.props;

    let JSXEditing = null;
    let JSXDisplay = null;
    let JSXProfile = null;

    if (profile) {
      JSXEditing = 
      <div>
        <ProfileForm profile={profile} onComplete={this.handleUpdate}/>
        <button onClick={() => this.setState({ editing: false })}> Cancel </button>
      </div>;
      JSXDisplay = 
      <div>
        <p>{profile.firstName}</p>
        <p>{profile.lastName}</p>
        <p>{profile.breed}</p>
        <p>{profile.age}</p>
        <p>{profile.location}</p>
        <p>{profile.phoneNumber}</p>
        <button onClick={() => this.setState({ editing: true })}> Edit </button>
      </div>;
      JSXProfile = 
      <div>
        <h2>{profile.username}</h2>
        <h3>{profile.email}</h3>
        { this.state.editing ? JSXEditing : JSXDisplay }
      </div>;
    }

    return (
      <div>
        <h1>PROFILE</h1>
        { profile ? JSXProfile : <ProfileForm onComplete={this.handleCreate}/> }
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object,
  profileCreate: PropTypes.func,
  profileUpdate: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  profileCreate: profile => dispatch(profileActions.createRequest(profile)),
  profileUpdate: profile => dispatch(profileActions.updateRequest(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
