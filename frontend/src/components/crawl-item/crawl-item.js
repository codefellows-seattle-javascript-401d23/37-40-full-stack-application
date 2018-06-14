import React from 'react';
import PropTypes from 'prop-types';

class CrawlItem extends React.Component {
  render() {
    const { crawl } = this.props;
    return (
      <li className='crawl-item'>
        <h4>{crawl.name.toUpperCase()}</h4>
        <p>+{crawl.votes}</p>
        <p>Stops: {crawl.stops.length}</p>
      </li>
    );
  }
}

CrawlItem.propTypes = {
  crawl: PropTypes.object,
};

export default CrawlItem;
