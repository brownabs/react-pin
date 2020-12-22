import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import { Button } from 'reactstrap';
import GetUser from '../../helpers/data/authData';

export default class BoardForm extends Component {
  state = {
    firebaseKey: this.props.board?.firebaseKey || '',
    name: this.props.board?.name || '',
    description: this.props.board?.description || '',
    imgUrl: this.props.board?.imgUrl || '',
    userId: this.props.board?.userId || '',
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
      this.props.CreateBoard(this.state);
    } else {
      this.props.UpdateBoard(this.state);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <h5 className='card-title'>Boards Form</h5>
      <input
      type=''
      name='name'
      value={this.state.name}
      onChange={this.handleChange}
      placeholder='Board Name'
      className='form control form-control-lg'
      required
      ></input>
      <input
      type=''
      name='description'
      value={this.state.description}
      onChange={this.handleChange}
      placeholder='Board Description'
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
      <Button>Submit</Button>
      </form>
    );
  }
}
