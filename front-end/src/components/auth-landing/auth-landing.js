import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as authActions from '../../actions/auth';

import poundPuppyImg from '../../assets/puppyPound.png';
import autoBind from '../../utils';
import AuthForm from '../auth-form/auth-form';

import * as routes from '../../routes';
 
class AuthLanding extends React.Component {
  constructor(props) {
    super(props);
    autoBind.call(this, AuthLanding);
  }

  handleLogin(user) {
    return this.props.pDoLogin(user)
      .then(() => {
        this.props.history.push(routes.DASHBOARD_ROUTE);
      })
      .catch(console.error);
  }

  handleSignup(user) {
    return this.props.pDoSignup(user)
      .then(() => {
        this.props.history.push(routes.DASHBOARD_ROUTE);
      })
      .catch(console.error);
  }
  
  render() {
    const rootJSX = <div>
      <h2>WELCOME TO</h2>
      <img src={poundPuppyImg} alt='pound-puppy'/>
      <Link to='/signup' className='links'>Sign up</Link>
      <Link to='/login' className='links'>Login</Link>
    </div>;

    const signupJSX = <div>
      <h2>SIGNUP!</h2>
      <img src={poundPuppyImg} alt='pound-puppy'/>      
      <AuthForm onComplete={this.handleSignup}/>
      <p>Already have an account?</p>
      <Link to='/login' className='links'>Login</Link>
    </div>;
    
    const loginJSX = <div>
      <h2>LOGIN!</h2>
      <img src={poundPuppyImg} alt='pound-puppy'/>      
      <AuthForm type='login' onComplete={this.handleLogin}/>
      <p>Do not have an account?</p>
      <Link to='/signup' className='links'>Sign up</Link>
    </div>;
    
    const { location } = this.props;

    return (
      <div className='landing'>
        { location.pathname === routes.ROOT_ROUTE ? rootJSX : undefined }
        { location.pathname === routes.SIGNUP_ROUTE ? signupJSX : undefined }
        { location.pathname === routes.LOGIN_ROUTE ? loginJSX : undefined }  
      </div>
    );
  }
}

AuthLanding.propTypes = {
  pDoSignup: PropTypes.func,
  pDoLogin: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  token: state.token,
});

const mapDispatchToProps = dispatch => ({
  pDoSignup: user => dispatch(authActions.signupRequest(user)),
  pDoLogin: user => dispatch(authActions.loginRequest(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLanding);
