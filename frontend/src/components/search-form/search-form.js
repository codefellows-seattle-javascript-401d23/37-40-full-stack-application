import React from 'react';
import PropTypes from 'prop-types';
import autobind from '../../utils/autobind';
import { DEF_LAT_ERR, DEF_LNG_ERR, DEF_PRICE_ERR, DEF_STOPS_ERR } from '../../utils/constants';

const defaultState = {
  latitude: '',
  latitudeDirty: false,
  latitudeErr: DEF_LAT_ERR,

  longitude: '',
  longitudeDirty: false,
  longitudeErr: DEF_LNG_ERR,

  price: '',
  priceDirty: false,
  priceErr: DEF_PRICE_ERR,

  stops: '',
  stopsDirty: false,
  stopsErr: DEF_STOPS_ERR,
};

const MAX_LAT = 90;
const MAX_LNG = 180;

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autobind.call(this, SearchForm);
  }

  handleValidation(name, value) {
    let errMessage = null;
    switch (name) {
      case 'latitude':
        if (!value) {
          errMessage = DEF_LAT_ERR;
        } else if (!Number(value) || value > MAX_LAT || value < -MAX_LAT) {
          errMessage = 'Must be valid latitude';
        }
        break;
      case 'longitude':
        if (!value) {
          errMessage = DEF_LNG_ERR;
        } else if (!Number(value) || value > MAX_LNG || value < -MAX_LNG) {
          errMessage = 'Must be valid longitude';
        }
        break;
      case 'price':
        if (!value) errMessage = 'Must specify budget';
        break;
      case 'stops':
        if (!value) errMessage = 'Must specify desired number of stops';
        break;
      default:
        break;
    }
    return this.setState({
      [`${name}Dirty`]: true,
      [`${name}Err`]: errMessage,
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      latitudeErr, longitudeErr, priceErr, stopsErr,
    } = this.state;
    if (!latitudeErr && !longitudeErr && !priceErr && !stopsErr) {
      this.props.onComplete(this.state);
      this.setState(defaultState);
    } else {
      this.setState({
        latitudeDirty: true,
        longitudeDirty: true,
        priceDirty: true,
        stopsDirty: true,
      });
    }
  }

  render() {
    return (
      <form className='search-form' onSubmit={this.handleSubmit}>
        <label>Latitude of Starting Location</label>
        <input
          type='text'
          name='latitude'
          value={this.state.latitude}
          onChange={this.handleChange}
          onBlur={() => this.handleValidation('latitude', this.state.latitude)}
        />
        { this.state.latitudeDirty && <p className='error'>{this.state.latitudeErr}</p> }
        <label>Longitude of Starting Location</label>
        <input
          type='text'
          name='longitude'
          value={this.state.longitude}
          onChange={this.handleChange}
          onBlur={() => this.handleValidation('longitude', this.state.longitude)}
        />
        { this.state.longitudeDirty && <p className='error'>{this.state.longitudeErr}</p> }
        <label>Max Budget</label>
        <select
          name='price'
          onChange={this.handleChange}
          onBlur={() => this.handleValidation('price', this.state.price)}>
          <option>--Select--</option>
          <option value='1'>$</option>
          <option value='2'>$$</option>
          <option value='3'>$$$</option>
          <option value='4'>$$$$</option>
        </select>
        { this.state.priceDirty && <p className='error'>{this.state.priceErr}</p> }
        <label>Number of stops</label>
        <select
          name='stops'
          onChange={this.handleChange}
          onBlur={() => this.handleValidation('stops', this.state.stops)}>
          <option>--Select--</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </select>
        { this.state.stopsDirty && <p className='error'>{this.state.stopsErr}</p> }
        <button type='submit'>Create Crawl</button>
      </form>
    );
  }
}

SearchForm.propTypes = {
  onComplete: PropTypes.func,
};

export default SearchForm;
