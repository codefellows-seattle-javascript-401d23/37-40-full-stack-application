import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as authActions from '../../actions/auth';

import autoBind from '../../utils/index';
import AuthForm from '../auth-form/auth-form';

import * as routes from '../../routes';

class AuthLanding extends React.Component {
  constructor(props) {
    super(props);
    autoBind.call(this, AuthLanding);
  }


  handleLogin(user) {
    return this.props.doLoginProm(user)
        .then(() => {
          this.props.history.push(routes.DASHBOARD_ROUTE);
        })
        .catch(console.error);
  }

  handleSignup(user) {
    return this.props.doSignUpProm(user)
        .then(() => {
          this.props.history.push(routes.DASHBOARD_ROUTE);
        })
        .catch(console.error);
  }

  render() {
    const rootJSX = <div>
      <h2> PubHub </h2>
      <Link to='/signup'>sign up</Link>
      <br/>
      <Link to='/login'>LOGIN</Link>
    </div>;

    const signUpJSX = <div>
      <h2>PubHub sign up</h2>
      <AuthForm onComplete={this.handleSignup}/>
      <p>already a member?</p>
      <Link to='login'>LOGIN</Link>
    </div>;

    const loginJSX = <div>
      <h2>Login in to PubHub</h2>
      <AuthForm type='login' onComplete={this.handleLogin}/>
      <p>need to join?</p>
      <Link to='/signup'>sign up</Link>
    </div>;

    const {location} = this.props;

    return (
        <div className='landing'>
          {location.pathname === routes.ROOT_ROUTE ? rootJSX : undefined}
          {location.pathname === routes.SIGNUP_ROUTE ? signUpJSX : undefined}
          {location.pathname === routes.LOGIN_ROUTE ? loginJSX : undefined}
        </div>
    );
  }
}

AuthLanding.propTypes = {
  doLoginProm: PropTypes.func,
  doSignUpProm: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  token: state.token,
});

const mapDispatchToProps = dispatch => ({
  doSignUpProm: user => dispatch(authActions.signupRequest(user)),
  doLoginProm: user => dispatch(authActions.loginRequest(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLanding);
