import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Stop from '../stop/stop';
import autobind from '../../utils/autobind';
import { addCrawlToProfileRequest } from '../../actions/profile';
import { DASHBOARD } from '../../utils/routes';

const defaultState = {
  crawlName: '',
};

class StopList extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autobind.call(this, StopList);
  }

  handleSave(crawl) {
    this.props.onSave(crawl)
      .then(() => {
        return this.setState({ saved: true });
      });
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({ crawlName: value });
  }

  render() {
    const { search, profile } = this.props;
    const id = search[search.length - 1].crawlId;
    const crawlInfo = {
      id,
      username: profile.username,
      name: this.state.crawlName,
    };
    return (
      <div>
        <ul className='stop-list'>
          {
            search.map((stop, index) => {
              if (stop.name) return <Stop stop={stop} key={index}/>;
              return null;
            })
          }
        </ul>
        <input
          name='crawlName'
          value={this.state.crawlName}
          onChange={this.handleChange}
          placeholder='name your route'
          required
        />
        <button onClick={() => this.handleSave(crawlInfo)}>Save to Profile</button>
        { this.state.saved && <Redirect to={DASHBOARD}/> }
      </div>
    );
  }
}

StopList.propTypes = {
  search: PropTypes.array,
  onSave: PropTypes.func,
  profile: PropTypes.object,
};

const mapStateToProps = store => ({
  profile: store.profile,
  search: store.search,
});

const mapDispatchToProps = dispatch => ({
  onSave: data => dispatch(addCrawlToProfileRequest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StopList);
