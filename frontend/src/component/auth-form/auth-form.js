import React from 'react';
import PropTypes from 'prop-types';
import validator from 'validator';
import autoBind from './../../utils/utils';

const emptyState = {
  username: '',
  usernameDirty: false,
  usernameError: 'Username is Required',

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
    function isPalindrome(str) {
      if (str === str.split('').reverse().join('')) {
        return true;
      }
      return false;
    }
    switch (name) {
      case 'username':
        if (!isPalindrome(value)) {
          return 'Your username must be a palindrome (case-sensitive)';
        }
        return null;
      case 'email':
        if (!validator.isEmail(value)) {
          return 'Your email must be a valid email.';
        } if (!validator.matches(value, /[A-Z]/)) {
          return 'Your email must include a capital letter';
        }
        return null;
      case 'password':
        if (!validator.matches(value, /[0-9]/)) {
          return 'Your password must include a number';
        }
        return null;
      default:
        return null;
    }
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      [`${name}Dirty`]: true,
      [`${name}Error`]: this.handleValidation(name, value),
    });
  }

  handleSubmit(e) {
    e.preventDefault();
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
  }

  render() {
    let { type } = this.props;

    type = type === 'login' ? type : 'signup';

    const signupJSX =
      <div>
      { this.state.emailDirty ? <p> { this.state.emailError } </p> : undefined }
      <input
        type='email'
        name='email'
        placeholder='email'
        value={this.state.email}
        onChange={this.handleChange}
      />
      </div>;

    const signupRenderedJSX = (type !== 'login') ? signupJSX : undefined;

    return (
      <form className='auth-form' noValidate onSubmit={this.handleSubmit} >

        { this.state.usernameDirty ? <p> { this.state.usernameError } </p> : undefined }
            <input
              type='text'
              name='username'
              placeholder='username'
              value={this.state.username}
              onChange={this.handleChange}
            />

            {signupRenderedJSX}
        { this.state.passwordDirty ? <p> { this.state.passwordError } </p> : undefined }
            <input
              className={ this.state.passwordDirty ? 'input-error' : ''}
              type='password'
              name='password'
              placeholder='password'
              value={this.state.password}
              onChange={this.handleChange}
            />
            <br/>
            <button type="submit">{type}</button>
          </form>
    );
  }
}

AuthForm.propTypes = {
  type: PropTypes.string,
  onComplete: PropTypes.func,
};

export default AuthForm;
