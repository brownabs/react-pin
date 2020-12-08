import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import AppModal from '../AppModal';
import BoardForm from '../Forms/BoardForm';

export default function BoardsCard({ board, removeBoard, onUpdate }) {
  return (
    <div className='card m-2 h-50 w-25'>
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
      <BoardForm board={board} onUpdate={onUpdate}/>
        </AppModal>
        <Button id={board.firebaseKey} onClick={(e) => removeBoard(e)}><i className="fas fa-trash"></i></Button>
      </div>
    </div>
  );
}
