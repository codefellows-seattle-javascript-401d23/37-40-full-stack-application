import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as clientProfileActions from '../../action/client-profile';
import * as routes from '../../routes';

import autoBind from '../../utils/utils';
import ProfileForm from '../profile-form/profile-form';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
    autoBind.call(this, Profile);
  }

  handleCreate(profile) {
    this.props.profileCreate(profile)
      .then(() => {
        this.props.history.push(routes.DASHBOARD_ROUTE);
      });
  }

  handleUpdate(profile) {
    this.props.profileUpdate(profile);
    this.setState({ editing: false });
  }

  // LifeCycle Hooks
  render() {
    const {
      profile,
    } = this.props;

    let JSXEditing = null;
    let JSXDisplay = null;
    let JSXProfile = null;

    if (profile) {
      JSXEditing =
        <div>
          <ProfileForm profile={profile} onComplete={this.handleUpdate}/>
          <button onClick={() => this.setState({ editing: false })}>Cancel</button>
        </div>;
      JSXDisplay =
        <div>
          <p>firstName: {profile.firstName}</p>
          <p>location: {profile.location}</p>

          <button onClick={() => this.setState({ editing: true })}>Edit</button>
        </div>;
      JSXProfile =
        <div>
          <h2>firstName: {profile.firstName}</h2>
          <h3>location: {profile.location}</h3>
          {this.state.editing ? JSXEditing : JSXDisplay}
        </div>;
    }
    return (
      <div>
        <h2>Create a Profile</h2>
        {profile ? JSXProfile : <ProfileForm onComplete={this.handleCreate}/>
        }
      </div>
    );
  }
}
Profile.propTypes = {
  profile: PropTypes.object,
  profileUpdate: PropTypes.func,
  profileCreate: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  profile: state.clientProfile,
});

const mapDispatchToProps = dispatch => ({
  profileCreate: profile => dispatch(clientProfileActions.createRequest(profile)),
  profileUpdate: profile => dispatch(clientProfileActions.updateRequest(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
