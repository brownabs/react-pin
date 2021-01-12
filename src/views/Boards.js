import React, { useState, useEffect } from 'react';
import {
  getAllUserBoards,
  DeleteBoard,
  CreateBoardData,
  UpdateBoardData,
} from '../helpers/data/boardData';
import BoardsCard from '../components/Cards/BoardsCard';
import Loader from '../components/Loader';
import getUid from '../helpers/data/authData';
import BoardForm from '../components/Forms/BoardForm';
import AppModal from '../components/AppModal';

export default function Boards() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    setCurrentUserId(getUid());
  }, []);

  useEffect(() => {
    getAllBoards();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUserId]);

  // comment out?
  useEffect(() => {
    console.warn(boards);
  }, [boards]);

  function getAllBoards() {
    setLoading(true);
    getAllUserBoards(currentUserId).then((response) => {
      setBoards(response);
      isLoading();
    });
  }

  const isLoading = () => {
    setInterval(() => {
      setLoading(false);
    }, 1000);
  };

  const removeBoard = (firebaseKey) => {
    DeleteBoard(firebaseKey)
      .then(() => {
        getAllBoards();
      });
  };

  const CreateBoard = (boardObj) => {
    CreateBoardData(boardObj)
      .then(() => getAllBoards());
  };

  const UpdateBoard = (boardObj) => {
    UpdateBoardData(boardObj)
      .then(() => {
        getAllBoards();
      });
  };

  const showBoards = () => (
    boards.length ? boards.map((board) => < BoardsCard key = {
        board.firebaseKey
      }
      board = {
        board
      }
      className = {
        'viewDetails'
      }
      removeBoard = {
        removeBoard
      }
      UpdateBoard = {
        UpdateBoard
      }
      CreateBoard = {
        CreateBoard
      }
      />)
      : <div><h1>There are currently no boards to display</h1></div>);

  return (
      <>
      <AppModal title={'Create Board'} buttonLabel={'Create Board'} buttonAppear={true}>
      <BoardForm UpdateBoard={UpdateBoard} CreateBoard={CreateBoard}/>
        </AppModal>
        { loading ? (
           <div className='d-flex justify-content-center'><Loader /></div>
        ) : (
          <>
  <div className='container-fluid' id='board-container'>
  <div className='card-columns'>
    {showBoards()}
    </div>
    </div>
          </>
        )}
      </>
  );
}
