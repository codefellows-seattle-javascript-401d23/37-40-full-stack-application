import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as authActions from '../../actions/auth';
import * as routes from '../../routes';

class Header extends React.Component {
  render() {
    const guestJSX =
      <ul>
        <Link to={routes.LANDING}><li>Home</li></Link>
        <Link to={routes.LOGIN}><li>Log in</li></Link>
        <Link to={routes.SIGNUP}><li>Sign up</li></Link>
      </ul>;

    const userJSX =
      <ul>
        <Link to={routes.DASHBOARD}><li>Dashboard</li></Link>
        <Link to={routes.PROFILE}><li>Profile</li></Link>
      </ul>;

    return (
      <header className='header'>
        <h1>PubHub</h1>
        <nav>
          { this.props.loggedIn ? userJSX : guestJSX }
        </nav>
        { this.props.loggedIn && <button onClick={this.props.logout}>Log out</button>}
      </header>
    );
  }
}

Header.propTypes = {
  token: PropTypes.string,
  loggedIn: PropTypes.bool,
  logout: PropTypes.func,
};

const mapStateToProps = state => ({
  loggedIn: !!state.token,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authActions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
