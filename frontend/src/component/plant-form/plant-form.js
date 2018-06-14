import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils/utils';
import Modal from '../modal/modal';
import './plant-form.scss';

const defaultState = {
  commonName: '',
  placement: '',
  notes: '',
  editing: false,
};

class PlantForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.props.plant || defaultState;
    autoBind.call(this, PlantForm);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      editing: false,
    });
    this.props.onComplete(this.state);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  handleShowModal() {
    this.setState({
      editing: true,
    });
  }
  handleHideModal() {
    this.setState({
      editing: false,
    });
  }
  render() {
    const buttonText = this.props.plant ? 'Update' : 'Add';

    return (
      <div className='plant-block'>
        <button onClick={this.handleShowModal}>Add a Plant</button>
      <Modal show={this.state.editing} handleClose={this.handleHideModal}>
      <form onSubmit={this.handleSubmit}
      className='plant-form'>
        <input
          type='text'
          name='commonName'
          placeholder='Plant Name'
          value={this.state.plantName}
          onChange={this.handleChange}
        />
        <input
          type='text'
          name='placement'
          placeholder='Placement'
          value={this.state.placement}
          onChange={this.handleChange}
        />
        <input
          type='text'
          name='notes'
          placeholder='Notes'
          value={this.state.info}
          onChange={this.handleChange}
        />
        <br/>
        <button type="submit">{buttonText} Plant</button>
      </form>
      </Modal>
      </div>
    );
  }
}
PlantForm.propTypes = {
  plant: PropTypes.object,
  onComplete: PropTypes.func,
};

export default PlantForm;
