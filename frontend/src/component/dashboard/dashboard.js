import React from 'react';

class Dashboard extends React.Component {
  render() {
    return (
      <div className='dashboard'>
        <h1>Dashboard</h1>
        <h2>Only visible if logged in.</h2>
      </div>
    );
  }
}

export default Dashboard;
