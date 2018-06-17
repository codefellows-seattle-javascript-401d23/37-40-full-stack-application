import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AuthRedirect from '../auth-redirect/auth-redirect';
import Dashboard from '../dashboard/dashboard';
import Profile from '../profile/profile';
import Header from '../header/header';
import AuthLanding from '../auth-landing/auth-landing';
import * as clientProfileActions from '../../action/client-profile';

class App extends React.Component {
  componentDidMount() {
    if (this.props.loggedIn) {
      console.log('COMPONENT DID MOUNT, LOGGED IN');
      this.props.pFetchClientProfile()
        .then((response) => {
          console.log('COMPONENT DID MOUNT response: ', response);
        })
        .catch(console.error);
    }
  }

  render() {
    console.log('APP RENDER props: ', this.props);
    return (
      <div className="app">
        <BrowserRouter>
          <div>
            <Header />
            <Route path='*' component={AuthRedirect}/>
            <Route exact path='/' component={AuthLanding}/>
            <Route exact path='/signup' component={AuthLanding}/>
            <Route exact path='/login' component={AuthLanding}/>
            <Route exact path='/dashboard' component={Dashboard}/>
            <Route exact path='/profile' component={Profile}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

App.propTypes = {
  loggedIn: PropTypes.bool,
  pFetchClientProfile: PropTypes.func,
};

const mapStateToProps = state => ({
  loggedIn: !!state.token,
});

const mapDispatchToProps = dispatch => ({
  pFetchClientProfile: () => dispatch(clientProfileActions.fetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
