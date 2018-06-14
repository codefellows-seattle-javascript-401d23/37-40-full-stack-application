import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../header/header';
import Profile from '../profile/profile';
import Landing from '../landing/landing';
import Dashboard from '../dashboard/dashboard';
import SearchPage from '../search-page/search-page';
import AuthRedirect from '../auth-redirect/auth-redirect';
import * as profileActions from '../../actions/profile';
import * as crawlActions from '../../actions/crawls';

class App extends React.Component {
  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.fetchProfile()
        .then(() => this.props.fetchCrawls())
        .catch(console.error);
    }
  }

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <div>
            <Header/>
            <Route path='*' component={AuthRedirect}/>
            <Route exact path='/' component={Landing}/>
            <Route exact path='/signup' component={Landing}/>
            <Route exact path='/login' component={Landing}/>
            <Route exact path='/dashboard' component={Dashboard}/>
            <Route exact path='/profile' component={Profile}/>
            <Route exact path='/search' component={SearchPage}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

App.propTypes = {
  loggedIn: PropTypes.bool,
  fetchProfile: PropTypes.func,
  fetchCrawls: PropTypes.func,
};

const mapStateToProps = state => ({
  loggedIn: !!state.token,
  profile: state.profile,
});

const mapDispatchToProps = dispatch => ({
  fetchProfile: () => dispatch(profileActions.fetchRequest()),
  fetchCrawls: () => dispatch(crawlActions.fetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
