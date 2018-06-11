import React from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import { MIN_NAME_LENGTH, MIN_PASSWORD_LENGTH } from '../../constants';
import autoBind from './../../utils/utils';

const emptyState = {
  username: '',
  usernameDirty: false,
  usernameError: 'Username is required', // could be a function creating a specific message
  
  email: '',
  emailDirty: false,
  emailError: 'Email is Required',
  
  password: '',
  passwordDirty: false,
  passwordError: 'Password is Required',
};

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = emptyState;
    autoBind.call(this, AuthForm);
  }

  handleValidation(name, value) {
    if (this.props.type === 'login') {
      return null;
    }
    switch (name) {
      case 'username':
        if (value.length < MIN_NAME_LENGTH) {
          return `Your name must be at least ${MIN_NAME_LENGTH} characters long`;
        }
        return null;
      case 'email':
        if (!validator.isEmail(value)) {
          return 'You must provide a valid email';
        }
        return null;
      case 'password':
        if (value.length < MIN_PASSWORD_LENGTH) {
          return `Your password must be at least ${MIN_PASSWORD_LENGTH} characters long`;
        }
        return null;
      default:
        return null;
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ 
      [name]: value, 
      [`${[name]}Dirty`]: true,
      [`${[name]}Error`]: this.handleValidation(name, value),
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { usernameError, emailError, passwordError } = this.state;

    if (this.props.type === 'login' || (!usernameError && !passwordError && !emailError)) {
      this.props.onComplete(this.state);
      this.setState(emptyState);
    } else {
      this.setState({
        usernameDirty: true,
        emailDirty: true,
        passwordDirty: true,
      });
    }


    this.props.onComplete(this.state);
    this.setState(emptyState);
  }

  render() {
    let { type } = this.props;

    type = type === 'login' ? type : 'signup';

    const signUpJSX = 
    <div>
      { this.state.emailDirty ? <p> {this.state.emailError} </p> : undefined }
      <input
        name='email'
        placeholder='email'
        type='email'
        value={this.state.email}
        onChange={this.handleChange}
      />
    </div>;

    const signUpRenderedJSX = (type !== 'login') ? signUpJSX : undefined;

    return (
      <form className='auth-form' onSubmit={this.handleSubmit}>

        { this.state.usernameDirty ? <p> {this.state.usernameError} </p> : undefined }
        <input 
          name='username'
          type='text'
          placeholder='username'
          value={this.state.username}
          onChange={this.handleChange}
        />

        {signUpRenderedJSX}

        { this.state.passwordDirty ? <p> {this.state.passwordError} </p> : undefined }
        <input 
          name='password'
          type='password'
          placeholder='password'
          value={this.state.password}
          onChange={this.handleChange}
        />

        <button type='submit'> {type} </button>
      </form>
    );
  }
}

AuthForm.propTypes = {
  type: PropTypes.string,
  onComplete: PropTypes.func,
};

export default AuthForm;
