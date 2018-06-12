
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as authActions from '../../actions/auth';
import * as routes from '../../routes';

class Header extends React.Component {
  render() {
    const JSXNotLoggedIn = 
    <ul>
      <li><Link to={routes.ROOT_ROUTE}>Home</Link></li>
      <li><Link to={routes.LOGIN_ROUTE}>Login</Link></li>
      <li><Link to={routes.SIGNUP_ROUTE}>Sign Up</Link></li>
    </ul>;
    const JSXLoggedIn = 
    <ul>
      <li><Link to={routes.DASHBOARD_ROUTE}>Dashboard</Link></li>
      <li><Link to={routes.PROFILE_ROUTE}>Sign Up</Link></li>
    </ul>;

    return (
      <header className='header'>
      <h1> BLOOMIO</h1>
      <nav>
        {this.props.loggedIn ? JSXLoggedIn : JSXNotLoggedIn
        }
      </nav>
        {this.props.loggedIn ? 
        <button onClick={this.props.doLogout}>Logout</button> : undefined}
      </header>
    );
  }
}
// in front end check if the token exists but we should send request with 
// a scrypt to server to verify the password
// building new component to show sth else when logged in and when logged out
Header.propTypes = {
  loggedIn: PropTypes.bool,
  doLogout: PropTypes.func,
};

const mapStateToProps = state => ({
  loggedIn: !!state.token, 
  // this is giving truthy/falsy value (boolean) for any expression in this case truthy, 
  // its the same as if exists but this is common
});

const mapDispatchToProps = dispatch => ({
  doLogout: () => dispatch(authActions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
