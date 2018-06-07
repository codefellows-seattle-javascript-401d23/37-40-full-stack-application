import React from 'react';

class Dashboard extends React.Component {
  render() {
    return (
      <div className='dashboard'>
        <h1> This is your Dashboard </h1>
        <p>This dashboard is only visible if you are properly logged in as a user.</p>
      </div>
    );
  }
}

export default Dashboard;
