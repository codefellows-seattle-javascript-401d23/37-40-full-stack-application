import React from 'react';
import PropTypes from 'prop-types';
import autoBind from './../../utils/utils';

const emptyState = {
  username: '',
  email: '',
  password: '',
};

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = emptyState;
    autoBind.call(this, AuthForm);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state);
    this.setState(emptyState);
  }

  render() {
    let { type } = this.props;

    type = type === 'login' ? type : 'signup';

    const signupJSX =
      <input
        type='email'
        name='email'
        placeholder='email'
        value={this.state.email}
        onChange={this.handleChange}
      />;

    const signupRenderedJSX = (type !== 'login') ? signupJSX : undefined;

    return (
          <form onSubmit={this.handleSubmit}
                className='auth-form'>
            <input
              type='text'
              name='username'
              placeholder='username'
              value={this.state.username}
              onChange={this.handleChange}
            />

            {signupRenderedJSX}

            <input
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
