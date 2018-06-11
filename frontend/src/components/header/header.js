import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as authActions from '../../actions/auth';
import * as routes from '../../utils/routes';

import './header.scss';

class Header extends React.Component {
  render() {
    const guestJSX =
      <ul>
        <Link to={routes.LANDING}><li>Home</li></Link>
        <Link to={routes.LOGIN}><li className='right'>Log in</li></Link>
        <Link to={routes.SIGNUP}><li className='right'>Sign up</li></Link>
      </ul>;

    const userJSX =
      <ul>
        <Link to={routes.DASHBOARD}><li>Dashboard</li></Link>
        <Link to={routes.PROFILE}><li>Profile</li></Link>
        <li onClick={this.props.logout} className='right'>Log out</li>
      </ul>;

    return (
      <header className='header'>
        <nav>
          { this.props.loggedIn ? userJSX : guestJSX }
        </nav>
        <h1>PubHub</h1>
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
