import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CrawlItem from '../crawl-item/crawl-item';
import './dashboard.scss';
import * as profileActions from '../../actions/profile';
import * as crawlActions from '../../actions/crawls';

class Dashboard extends React.Component {
  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.fetchProfile()
        .then(() => this.props.fetchCrawls())
        .catch(console.error);
    }
  }

  render() {
    return (
      <div className='dashboard'>
        <h2>Dashboard</h2>
        <h4>My crawls:</h4>
        <ul>
          {
            this.props.crawls.length > 0 &&
            this.props.crawls.map((crawl, index) => <CrawlItem crawl={crawl} key={index}/>)
          }
        </ul>
      </div>
    );
  }
}

Dashboard.propTypes = {
  crawls: PropTypes.array,
  loggedIn: PropTypes.bool,
  fetchProfile: PropTypes.func,
  fetchCrawls: PropTypes.func,
};

const mapStateToProps = state => ({
  crawls: state.crawls,
  loggedIn: !!state.token,
});

const mapDispatchToProps = dispatch => ({
  fetchProfile: () => dispatch(profileActions.fetchRequest()),
  fetchCrawls: () => dispatch(crawlActions.fetchRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
