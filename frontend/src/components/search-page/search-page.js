import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchForm from '../search-form/search-form';
import CrawlList from '../stop-list/stop-list';
import autobind from '../../utils/autobind';
import searchRequest from '../../actions/search';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    autobind.call(this, SearchPage);
  }

  handleSearch(searchParams) {
    this.props.doSearch(searchParams);
  }

  render() {
    return (
      <div className='search-page'>
        {
          this.props.search.length > 0 ?
          <CrawlList/> :
          <SearchForm onComplete={this.handleSearch}/>
        }
      </div>
    );
  }
}

SearchPage.propTypes = {
  doSearch: PropTypes.func,
  search: PropTypes.array,
};

const mapStateToProps = state => ({
  search: state.search,
});

const mapDispatchToProps = dispatch => ({
  doSearch: data => dispatch(searchRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
