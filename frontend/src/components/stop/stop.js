import React from 'react';
import PropTypes from 'prop-types';

class Stop extends React.Component {
  render() {
    const { stop } = this.props;
    return (
      <li className='stop'>
        <p>Name: {stop.name}</p>
        <p>Address: {stop.address}</p>
      </li>
    );
  }
}

Stop.propTypes = {
  stop: PropTypes.object,
};

export default Stop;
