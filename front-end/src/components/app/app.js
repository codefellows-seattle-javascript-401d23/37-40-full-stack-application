import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthRedirect from '../auth-redirect/auth-redirect';
import Dashboard from '../dashboard/dashboard';
import AuthLanding from '../auth-landing/auth-landing';
import Header from '../header/header';
import * as profileActions from '../../actions/profile';
import Profile from '../profile/profile';

class App extends React.Component {
  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.pFetchProfile()
        .catch(console.error);
    }
  }

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <div>
            <Header/>
            <Route path='*' component={AuthRedirect} />
            <Route exact path='/' component={AuthLanding} />
            <Route exact path='/signup' component={AuthLanding} />
            <Route exact path='/login' component={AuthLanding} />
            <Route exact path='/dashboard' component={Dashboard} /> 
            <Route exact path='/profiles' component={Profile} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

App.propTypes = {
  loggedIn: PropTypes.bool,
  pFetchProfile: PropTypes.func,
};

const mapStateToProps = state => ({
  loggedIn: !!state.token,
});

const mapDispatchToProps = dispatch => ({
  pFetchProfile: () => dispatch(profileActions.fetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
