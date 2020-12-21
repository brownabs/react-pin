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

  removeBoard = (fbKey) => {
    const firebaseKey = fbKey;
    console.warn(firebaseKey);
    DeleteBoard(firebaseKey);
    getBoardPins(firebaseKey).then((response) => {
      if (response !== []) {
        response.forEach((item) => {
          DeleteBoardPin(item.firebaseKey).then(() => this.getBoards());
        });
      } else {
        console.warn('else');
        this.getBoards();
      }
    });
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { boards, loading } = this.state;
    const showBoards = () => (
      boards.map((board) => <BoardsCard key={board.firebaseKey} board={board} removeBoard={this.removeBoard} onUpdate={this.getBoards}/>)
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
          {boards.length ? <div className='boards d-flex flex-wrap container-fluid'> {showBoards()} </div> : <div className='d-flex justify-content-center m-3'><h1>You currently have no boards, create one!</h1></div>}
          </>
        )}
      </>
    );
  }
}
