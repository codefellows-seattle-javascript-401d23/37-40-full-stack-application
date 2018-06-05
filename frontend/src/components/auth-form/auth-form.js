import React from 'react';
import PropTypes from 'prop-types';
import autobind from '../../utils/autobind';

const defaultState = {
  username: '',
  password: '',
  email: '',
};

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autobind.call(this, AuthForm);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state);
    this.setState(defaultState);
  }

  render() {
    const { type } = this.props;
    const emailInputJSX =
      <input
        name='email'
        placeholder='email'
        type='email'
        value={this.state.email}
        onChange={this.handleChange}
        required
      />;

    return (
      <form className='auth-form' onSubmit={this.handleSubmit}>
        { type === 'signup' && emailInputJSX }
        <input
          name='username'
          placeholder='username'
          type='text'
          value={this.state.username}
          onChange={this.handleChange}
          required
        />
        <input
          name='password'
          placeholder='password'
          type='password'
          value={this.state.password}
          onChange={this.handleChange}
          required
        />
        <button type='submit'>{ type }</button>
      </form>
    );
  }
}

AuthForm.propTypes = {
  onComplete: PropTypes.func,
  type: PropTypes.string,
};

export default AuthForm;
