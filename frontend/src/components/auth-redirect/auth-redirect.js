import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as routes from '../../routes';

class AuthRedirect extends React.Component {
  render() {
    const { location, token } = this.props;
    const { pathname } = location;

    let destinationRoute = null;
    // let loggedIn = false;
    // if (localStorage.getItem('token') || token) loggedIn = true;
    //
    // if (pathname === routes.LOGIN || pathname === routes.SIGNUP || pathname === routes.LANDING) {
    //   if (loggedIn) destinationRoute = routes.DASHBOARD;
    // } else if (!loggedIn) {
    //   destinationRoute = routes.LANDING;
    // }

    if (pathname === routes.LOGIN || pathname === routes.SIGNUP || pathname === routes.LANDING) {
      if (token) destinationRoute = routes.DASHBOARD;
    } else if (!token) {
      destinationRoute = routes.LANDING;
    }

    return (
      <div>
        { destinationRoute && <Redirect to={ destinationRoute }/> }
      </div>
    );
  }
}

AuthRedirect.propTypes = {
  location: PropTypes.object,
  token: PropTypes.string,
};

const mapStateToProps = state => ({
  token: state.token,
});

export default connect(mapStateToProps)(AuthRedirect);
