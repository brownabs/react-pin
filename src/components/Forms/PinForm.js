import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import GetUser from '../../helpers/data/authData';
import { CreatePin, UpdatePin } from '../../helpers/data/pinData';

export default class PinForm extends Component {
  state = {
    firebaseKey: '',
    name: '',
    description: '',
    imgUrl: '',
    userId: '',
    private: '',
    boardId: this.props.board?.firebaseKey || '',
  }

  componentDidMount() {
    const userId = GetUser();
    this.setState({
      userId,
    });
  }

  handleChange = (e) => {
    if (e.target.name === 'filename') {
      this.setState({ imgUrl: '' });
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`pinterest/${this.state.userId}/${Date.now()}${e.target.files[0].name}`);
      imageRef.put(e.target.files[0]).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((imgUrl) => {
          this.setState({ imgUrl });
        });
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.firebaseKey === '') {
      CreatePin(this.state)
        .then(() => {
          this.props.onUpdate();
        });
    } else {
      UpdatePin(this.state)
        .then(() => {
          this.props.onUpdate(this.state.firebaseKey);
        });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <h5 className='card-title'>Pin Form</h5>
      <input
      type=''
      name='name'
      value={this.state.name}
      onChange={this.handleChange}
      placeholder='Pin Name'
      className='form control form-control-lg'
      required
      ></input>
      <input
      type=''
      name='description'
      value={this.state.description}
      onChange={this.handleChange}
      placeholder='Pin Description'
      className='form control form-control-lg'
      required
      ></input>
      <input
      type='url'
      name='imgUrl'
      value={this.state.imgUrl}
      onChange={this.handleChange}
      placeholder='Enter Image Url or Upload a File'
      className='form control form-control-lg'
      ></input>
      <input
      className='m-2'
      type='file'
      id='myFile'
      name='filename'
      onChange={this.handleChange}
      accept='image/*'
      ></input>
      <button>Submit</button>
      </form>
    );
  }
}
