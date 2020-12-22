import React, { useState, useEffect } from 'react';
import {
  getAllUserBoards,
  DeleteBoard,
  DeleteBoardPin,
  CreateBoardData,
  UpdateBoardData,
} from '../helpers/data/boardData';
import { getBoardPins, CreatePinBoard } from '../helpers/data/pinData';
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
  }, [currentUserId]);

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
      .then((resp) => {
        const pinBoardInfo = {
          pinId: resp,
          boardId: this.state.boardId,
          userId: this.state.userId,
        };
        return pinBoardInfo;
      }).then((pinBoardInfo) => CreatePinBoard(pinBoardInfo))
      .then(() => getAllBoards());
  };

  const UpdateBoard = (boardObj) => {
    UpdateBoardData(boardObj)
      .then(() => {
        getAllBoards();
      });
  };

  const showBoards = () => (
    boards.length && boards.map((board) => < BoardsCard key = {
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
  );
  return (
      <>
      <AppModal title={'Create Board'} buttonLabel={'Create Board'}>
      <BoardForm UpdateBoard={UpdateBoard} CreateBoard={CreateBoard}/>
        </AppModal>
        { loading ? (
          <Loader />
        ) : (
          <>
        <div className='d-flex justify-content-center flex-wrap container-fluid'>{showBoards()}</div>
          </>
        )}
      </>
  );
}
