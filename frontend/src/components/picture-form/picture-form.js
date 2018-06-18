import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils/index';


const fileError = 'File Required';

const fileToBase64String = (file) => {
  return new Promise((resolve, reject) => {
    // errors checks first
    if (!file) {
      return reject(new Error(fileError));
    }
    // then load the file
    const fileReader = new FileReader();

    fileReader.addEventListener('load', () => resolve(fileReader.result));
    fileReader.addEventListener('error', reject);

    return fileReader.readAsDataURL(file);
  });
};

class PictureForm extends React.Component {
  constructor(props) {
    super(props); // Old school OOP, parent class was referred to as super...

    this.emptyState = {
      preview: undefined, // base 64 for display on the browser
      picture: '', // this will be a path used for the backend
      description: '',
    };
    this.state = this.emptyState;

    autoBind.call(this, PictureForm);
  }
  // MEMBER FUNCTIONS
  handleChange(event) {
    const { type, value, files } = event.target;

    if (type === 'file') {
      // ----------------------------
      // ASYNC
      // ----------------------------
      fileToBase64String(files[0])
        .then(preview => this.setState({ preview }));
      // ----------------------------
      this.setState({  // Async again
        picture: files[0],
      }, () => {
        console.log('I will log after the state has changed');
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


  // ------------------------------------------
  // LIFECYCLE HOOKS
  // ------------------------------------------
  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className='picture-form'>
        <img src={this.state.preview}/>
        <label>Picture</label>
        <input
          type='file'
          name='picture'
          onChange={this.handleChange}
        />
        <label>Description</label>
        <input
          type='text'
          name='description'
          value={this.state.description}
          onChange={this.handleChange}
        />
        <button type='submit'> Upload a picture! </button>
      </form>
    );
  }
}

PictureForm.propTypes = {
  onComplete: PropTypes.func,
};

export default PictureForm;
