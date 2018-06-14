import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils/utils';

const D23_005 = 'File Required';

const fileToBase64String = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error(D23_005));
    }
    const reader = new FileReader();

    reader.addEventListener('load', () => resolve(reader.result));
    reader.addEventListener('error', reject);

    return reader.readAsDataURL(file);
  });
};

class PictureForm extends React.Component {
  constructor(props) {
    super(props);

    this.emptyState = {
      preview: undefined,
      picture: '', // base64 representation of the picture we'll upload.
      description: '',
    };

    this.state = this.emptyState;

    autoBind.call(this, PictureForm);
  }

  handleChange(event) {
    const { type, value, files } = event.target;

    if (type === 'file') {
      fileToBase64String(files[0])
        .then(preview => this.setState({ preview }));

      this.setState({
        picture: files[0],
      }, () => {
        console.log('This will print after the state has been changed');
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
      <form className='picture-form' onSubmit={this.handleSubmit}>
        <img src={this.state.preview} />
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
        <button type='submit'>Upload a Picture!</button>
      </form>
    );
  }
}

PictureForm.propTypes = {
  onComplete: PropTypes.func,
};


export default PictureForm;
