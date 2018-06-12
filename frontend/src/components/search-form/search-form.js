import React from 'react';
import PropTypes from 'prop-types';
import autobind from '../../utils/autobind';

const defaultState = {
  latitude: '',
  longitude: '',
  price: '',
  stops: '',
};

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autobind.call(this, SearchForm);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state);
    this.setState(defaultState);
  }

  render() {
    return (
      <form className='search-form' onSubmit={this.handleSubmit}>
        <label htmlFor='latitude'>Latitude of Starting Location</label>
        <input
          id='latitude'
          type='text'
          name='latitude'
          value={this.state.latitude}
          onChange={this.handleChange}
          required
        />
        <label htmlFor='longitude'>Longitude of Starting Location</label>
        <input
          id='longitude'
          type='text'
          name='longitude'
          value={this.state.longitude}
          onChange={this.handleChange}
          required
        />
        <label htmlFor='price'>Max Budget</label>
        <select name='price' id='price' onChange={this.handleChange}>
          <option>--Select--</option>
          <option value='1'>$</option>
          <option value='2'>$$</option>
          <option value='3'>$$$</option>
          <option value='4'>$$$$</option>
        </select>
        <label htmlFor='stops' >Number of stops</label>
        <select name='stops' id='stops' onChange={this.handleChange}>
          <option>--Select--</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </select>
        <button type='submit'>Create Crawl</button>
      </form>
    );
  }
}

SearchForm.propTypes = {
  onComplete: PropTypes.func,
};

export default SearchForm;
