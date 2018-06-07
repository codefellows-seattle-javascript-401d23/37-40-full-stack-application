import React from 'react';
import PropTypes from 'prop-types';
import autoBind from './../../utils';

const defaultState = {
  username: '',
  password: '',
  email: '',
};

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autoBind.call(this, AuthForm);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState(defaultState);
  }

  render() {
    let { type } = this.props;
    type = type === 'login' ? type : 'signup';
    
    const signupJSX = 
      <input 
        name='email'
        placeholder='Enter Email Here'
        type='email'
        value={this.state.email}
        onChange={this.handleChange}
      />;

    const signupRenderedJSX = (type !== 'login') ? signupJSX : undefined;

    return (
      <form className='authForm' onSubmit={this.handleSubmit}>
        <input 
          name='username'
          placeholder='Enter Username Here'
          type='text'
          value={this.state.username}
          onChange={this.handleChange}
        />

        <input
          name='password'
          placeholder='Enter Password'
          type='password'
          value={this.state.password}
          onChange={this.handleChange}
        />

        {signupRenderedJSX}

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
