import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './dashboard.scss';
import { fetchRequest } from '../../actions/profile';

class Dashboard extends React.Component {
  render() {
    return (
      <div className='dashboard'>
        <h2>Dashboard</h2>
        <p>Welcome to your dashboard. There is nothing here!</p>
        {
          this.props.crawls &&
          this.props.crawls.map((crawl, index) => <p key={index}>{crawl.name}</p>)
        }
      </div>
    );
  }
}

Dashboard.propTypes = {
  crawls: PropTypes.array,
};

// TODO: add crawls to state
const mapStateToProps = state => ({
  crawls: state.crawls,
});

const mapDispatchToProps = dispatch => ({
  fetchProfile: () => dispatch(fetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
