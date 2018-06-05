import React from 'react';
import PropTypes from 'prop-types';

class Dashboard extends React.Component {
  render() {
    return (
      <div className='dashboard'>
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard. There is nothing here!</p>
      </div>
    );
  }
}

Dashboard.propTypes = {
  history: PropTypes.object,
};

export default Dashboard;
