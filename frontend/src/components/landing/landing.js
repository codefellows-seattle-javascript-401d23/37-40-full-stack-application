import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as routes from '../../routes';
import * as authActions from '../../actions/auth';
import autobind from '../../utils/autobind';
import AuthForm from '../auth-form/auth-form';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    autobind.call(this, Landing);
  }

  handleLogin(user) {
    return this.props.login(user)
      .then(() => {
        this.props.history.push(routes.DASHBOARD);
      })
      .catch(console.error);
  }

  handleSignup(user) {
    return this.props.signup(user)
      .then(() => {
        this.props.history.push(routes.DASHBOARD);
      })
      .catch(console.error);
  }

  render() {
    const landingJSX =
      <div>
        <h2>Welcome to PubHub!</h2>
        <Link to='/signup'>Sign up</Link>
        <Link to='/login'>Log in</Link>
      </div>;

    const signupJSX =
      <div>
        <h2>Create an account</h2>
        <AuthForm onComplete={this.handleSignup} type='signup'/>
        <p>Already have one?</p>
        <Link to='/login'>Log in</Link>
      </div>;

    const loginJSX =
      <div>
        <h2>Log in</h2>
        <AuthForm onComplete={this.handleLogin} type='login'/>
        <p>Create account</p>
        <Link to='/signup'>Sign up</Link>
      </div>;

    const { location } = this.props;

    return (
      <div className='landing'>
        {location.pathname === routes.LANDING && landingJSX }
        {location.pathname === routes.SIGNUP && signupJSX }
        {location.pathname === routes.LOGIN && loginJSX }
      </div>
    );
  }
}

Landing.propTypes = {
  login: PropTypes.func,
  signup: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = state => ({
  token: state.token,
});

const mapDispatchToProps = dispatch => ({
  signup: user => dispatch(authActions.signupRequest(user)),
  login: user => dispatch(authActions.loginRequest(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
