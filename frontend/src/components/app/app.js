import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from '../header/header';
import Profile from '../profile/profile';
import Landing from '../landing/landing';
import Dashboard from '../dashboard/dashboard';
import AuthRedirect from '../auth-redirect/auth-redirect';

class App extends React.Component {
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
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
