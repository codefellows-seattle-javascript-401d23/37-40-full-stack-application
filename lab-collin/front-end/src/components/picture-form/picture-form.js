import React from 'react';
import autoBind from '../../utils';
import PropTypes from 'prop-types';

const D23_005 = 'File Required';

const fileToBase64String = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error(D23_005));
    }
    const fileReader = new FileReader();

    fileReader.addEventListener('load', () => resolve(fileReader.result));
    fileReader.addEventListener('error', reject);

    return fileReader.readAsDataURL(file);
  });
};

class PictureForm extends React.Component {
  constructor(props) {
    super(props); 
    this.emptyState = {
      preview: undefined, 
      picture: '', 
      description: '',
    };
    this.state = this.emptyState;

    autoBind.call(this, PictureForm); 
  }
 
  handleChange(event) {
    const { type, value, files } = event.target;

    if (type === 'file') {
 
      fileToBase64String(files[0])
        .then(preview => this.setState({ preview })); // { preview : result };

      this.setState({ 
        picture: files[0],
      }, () => {
        console.log('New State Set');
      });
    } else { 
      this.setState({
        description: value,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState(this.emptyState);
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className='picture-form'>
        <img src={this.state.preview}/>
        <label>Picture</label>
        <input
          type='file'
          name='photo'
          onChange={this.handleChange}
        />
        <label>Description</label>
        <input
          type='text'
          name='description'
          value={this.state.description}
          onChange={this.handleChange}
        />
        <button type='submit'> Picture upload </button>
      </form>
    );
  }
}

PictureForm.propTypes = {
  onComplete: PropTypes.func,
};

export default PictureForm;
