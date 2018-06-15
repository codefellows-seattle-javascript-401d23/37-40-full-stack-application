import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as plantActions from '../../action/plant';
import PlantForm from '../plant-form/plant-form';

class Plant extends React.Component {
  render() {
    const {
      plant,
      key,
      plantRemove,
      plantUpdate,
    } = this.props;
    return (
      <div className='plant' key={key}>
        <h2>Common Name: {plant.commonName}</h2>
        <h3>Placement: {plant.placement}</h3>
        <p>Notes: {plant.notes}</p>
        <button onClick={() => plantRemove(plant)}> Delete </button>
        <PlantForm plant={plant} onComplete={plantUpdate}/>
      </div>
    );
  }
}

Plant.propTypes = {
  plant: PropTypes.object,
  key: PropTypes.number,
  plantRemove: PropTypes.func,
  plantUpdate: PropTypes.func,
};


const mapDispatchToProps = (dispatch) => {
  return {
    plantRemove: data => dispatch(plantActions.remove(data)),
    plantUpdate: data => dispatch(plantActions.update(data)),
  };
};

export default connect(null, mapDispatchToProps)(Plant);
