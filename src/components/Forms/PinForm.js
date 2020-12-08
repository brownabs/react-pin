import React, { Component } from 'react';
import firebase from 'firebase/app';
import { Button } from 'reactstrap';
import 'firebase/storage';
import GetUser from '../../helpers/data/authData';
import { CreatePin, UpdatePin, CreatePinBoard } from '../../helpers/data/pinData';

export default class PinForm extends Component {
  state = {
    firebaseKey: this.props.pin?.firebaseKey || '',
    name: this.props.pin?.name || '',
    description: this.props.pin?.description || '',
    imgUrl: this.props.pin?.imgUrl || '',
    userId: '',
    private: false,
    boardId: this.props.board?.firebaseKey || this.props.board?.boardId,
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
        .then((resp) => {
          const pinBoardInfo = {
            pinId: resp.data.firebaseKey,
            boardId: this.state.boardId,
            userId: this.state.userId,
          };
          return pinBoardInfo;
        }).then((pinBoardInfo) => CreatePinBoard(pinBoardInfo))
        .then((r) => {
          this.props.onUpdate();
        });
      this.props.toggle();
    } else {
      UpdatePin(this.state)
        .then((response) => {
          this.props.onUpdate(this.state.boardId);
        });
      this.props.toggle();
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
        <select name='private' value={this.state.private} onChange={this.handleChange} >
          <option value='true'>Private Pin</option>
          <option value='false'>Public Pin</option>
        </select>
        <Button onClick={this.handleSubmit}>Save</Button>
        </form>
    );
  }
}
