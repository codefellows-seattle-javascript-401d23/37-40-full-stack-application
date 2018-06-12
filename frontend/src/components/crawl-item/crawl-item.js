import React from 'react';
import PropTypes from 'prop-types';

class CrawlItem extends React.Component {
  render() {
    const { stop } = this.props;
    return (
      <li className='crawl-item'>
        <p>Name: {stop.name}</p>
        <p>Address: {stop.address}</p>
      </li>
    );
  }
}

CrawlItem.propTypes = {
  stop: PropTypes.object,
};

export default CrawlItem;
