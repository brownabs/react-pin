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
    <div className='card boards-card'>
      <img className='card-img-top' src={board.imgUrl} alt='Card cap' />
      <div className='card-child'>
      <div className='card-body'>
        <h5 className='card-title'>{board.name}</h5>
        <Link className='btn btn-dark' to={`/boards/${board.firebaseKey}`}>
        View Pins
        </Link>
        <AppModal title={'Edit Board'} buttonLabel={<i className='fas fa-edit edit-button'></i>} buttonAppear={false}>
      <BoardForm board={board} UpdateBoard={this.props.UpdateBoard} CreateBoard={this.props.CreateBoard}/>
        </AppModal>
        <AppModal title={'Are you sure you want to delete this board?'} buttonLabel={<i className='fas fa-trash-alt delete-button'></i>} buttonAppear={false} >
          <Button onClick={() => this.props.removeBoard(board.firebaseKey)}>Yes</Button>
        </AppModal>
        </div>
        </div>
        </div>
    );
  }
}
