import React from 'react';
import { getAllUserBoards, DeleteBoard, DeleteBoardPin } from '../helpers/data/boardData';
import { getBoardPins } from '../helpers/data/pinData';
import BoardsCard from '../components/Cards/BoardsCard';
import Loader from '../components/Loader';
import getUid from '../helpers/data/authData';
import BoardForm from '../components/Forms/BoardForm';
import AppModal from '../components/AppModal';

export default class Boards extends React.Component {
  state = {
    boards: [],
    loading: true,
  }

  componentDidMount() {
    this.getBoards();
  }

  getBoards = () => {
    const currentUserId = getUid();
    getAllUserBoards(currentUserId).then((response) => {
      this.setState({
        boards: response,
      }, this.setLoading);
    });
  }

  setLoading = () => {
    this.timer = setInterval(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  removeBoard = (e) => {
    const firebaseKey = e.target.id;
    DeleteBoard(firebaseKey);
    getBoardPins(firebaseKey).then((response) => {
      response.forEach((item) => {
        const newArray = Object.values(item);
        if (newArray.includes(firebaseKey)) {
          DeleteBoardPin(item.firebaseKey)
            .then(() => {
              this.getBoards();
            });
        }
      });
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { boards, loading } = this.state;
    const showBoards = () => (
      boards.map((board) => <BoardsCard key={board.firebaseKey} board={board} removeBoard={this.removeBoard}/>)
    );
    return (
      <>
      <AppModal title={'Create Board'} buttonLabel={'Create Board'}>
      <BoardForm onUpdate={this.getBoards}/>
        </AppModal>
        { loading ? (
          <Loader />
        ) : (
          <>
          <div className='boards d-flex flex-wrap container-fluid'>{showBoards()}</div>
          </>
        )}
      </>
    );
  }
}
