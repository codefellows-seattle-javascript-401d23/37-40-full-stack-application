import React from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dashboard from '../dashboard/dashboard';
import AuthRedirect from '../auth-redirect/auth-redirect'; 
import AuthLanding from '../auth-landing/auth-landing';
import Header from '../header/header';
import Profile from '../profile/profile';
import '../../../styles/main.scss';
import * as clientProfileActions from '../../redux/action/client-profile';


class App extends React.Component {
  componentDidMount() {
    console.log('IN COMPONENT DID MOUNT IN APP');
    if (this.props.loggedIn) {
      console.log('INSIDE IF< LOGGIN');
      this.props.pFetchClientProfile()
        .catch(console.error);
    }
  }
  render() {
    return (
<div className="app">
<div className='oath'>
poooooppp
      </div>
<BrowserRouter>
<div>
    <Header />
    <Route exact path="*" component= { AuthRedirect }/>
    <Route exact path='/' component={ AuthLanding }/>
    <Route exact path='/signup' component={ AuthLanding }/>
    <Route exact path='/login' component={ AuthLanding }/>
    <Route exact path='/dashboard' component={ Dashboard }/>
    <Route exact path='/profiles' component={ Profile } />
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
// Browser router always sends its location property to its children in the dom-- so the location property in suth-redirect comes from this component/method
