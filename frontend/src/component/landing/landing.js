import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as plantActions from '../../action/plant';
import PlantForm from '../plant-form/plant-form';
import Plant from '../plant/plant';

class Landing extends React.Component {
  render() {
    const { plants, plantCreate } = this.props;
    return (
      <div className='landing'>
        <PlantForm onComplete={plantCreate}/>
        {
          plants.map((currentPlant, i) =>
            <Plant plant={currentPlant} key={i}/>)
        }
      </div>
    );
  }
}

Landing.propTypes = {
  plants: PropTypes.array,
  plantCreate: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    plants: state.plants,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    plantCreate: data => dispatch(plantActions.create(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
