import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import AppModal from '../AppModal';
import BoardForm from '../Forms/BoardForm';

export default class BoardsCard extends Component {
  state = {
    board: {},
  }

  componentDidMount() {
    this.setState({
      board: this.props.board,
    });
  }

  render() {
    const { board } = this.state;
    return (
    <div className='card m-1 h-25 w-25'>
      <img className='card-img-top' src={board.imgUrl} alt='Card cap' />
      <div className='card-body'>
        <h5 className='card-title'>{board.name}</h5>
        <p className='card-text'>
          {board.description}
        </p>
        <Link className='btn btn-primary' to={`/boards/${board.firebaseKey}`}>
          View Pins
        </Link>
        <AppModal title={'Edit Board'} buttonLabel={'Edit Board'}>
      <BoardForm board={board} onUpdate={this.props.onUpdate} />
        </AppModal>
        <AppModal title={'Are you sure you want to delete this board?'} buttonLabel={'Delete Board'} >
          <Button onClick={() => this.props.removeBoard(board.firebaseKey)}>Yes</Button>
        </AppModal>
        </div>
        </div>
    );
  }
}
