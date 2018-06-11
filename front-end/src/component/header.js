import React from 'react';
import PropTypes from 'prop-types';
import * as authActions from '../actions/auth';


class Header extends React.Component {

}

Header.propTypes = {
  loggedIn: PropTypes.bool,
};

const mapStateToProps = state => ({
  loggedIn: !!state.token, // !! is a double negative which will returns the boolean truthy or falsy
});

const mapDispatchToProps = dispatch = ({
  doLogoutProm: () =>  dispatch(authActions.)
});