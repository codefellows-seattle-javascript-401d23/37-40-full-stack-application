import React from 'react';
import autoBind from '../../utils';
import PropTypes from 'prop-types';


const fileToBase64String = (file) => {
  return new Promise((resolve, reject) => {
    if(!file) {
      return reject(new Error ('file required'));
    }
    const fileReader = new FileReader();

    fileReader.addEventListener('load', () => resolve(fileReader.result));
    fileReader.addEventListener('error', reject);

    return fileReader.readAsDataURL(file);
  });
};

class PictureForm extends React.Component {
  constructor(props){
    super(props);



    this.emptyState={
      preview: undefined,
      picture: '',
      description: '',
    };
    this.state = this.emptyState;

    autoBind.call(this, PictureForm);
  }

//  member functions -----------------------
handleChange(event) {
    const { type, value, files } = event.target;
    if (type === 'file') {
      fileToBase64String(files[0])
        .then(result => this.setState({preview: result}));
      this.setState({
        picture: files[0],
      }, () => {
        console.log('this will happen after the state has been changeds');
      })
    } else{
      this.setState({
        description: value,
      });
    }
}

handleSubmit(event) {
    event.preventDefault();
    this.props.onComplete(this.state);

    this.setState(this.emptyState)
}

//  lifecycle hooks -----------------------


  render() {
    return(
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
            <button type='submit'>Upload a Picture</button>
        </form>
    );
  }
}

PictureForm.prototype = {
  onComplete: PropTypes.func,
};

export default pictureForm;