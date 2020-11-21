import React from 'react';
import { getBoardPins, getPin } from '../helpers/data/pinData';
import { getSingleBoard } from '../helpers/data/boardData';
import PinsCard from '../components/Cards/PinsCard';
import BoardForm from '../components/Forms/BoardForm';
import PinForm from '../components/Forms/PinForm';
import AppModal from '../components/AppModal';

export default class SingleBoard extends React.Component {
  state = {
    board: {},
    pins: [],
    loading: true,
  };

  componentDidMount() {
    // 1. Pull boardId from URL params
    const boardId = this.props.match.params.id;
    // 2. Make a call to the API that gets the board info
    getSingleBoard(boardId).then((response) => {
      this.setState({
        board: response,
      });
    });

    // 3. Make a call to the API that returns the pins associated with this board and set to state.
    this.getPins(boardId)
      // because we did a promise.all, the response will not resolve until all the promises are completed
      .then((resp) => (
        this.setState({
          pins: resp,
        })
      ));
  }

  setLoading = () => {
    this.timer = setInterval(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getPins = (boardId) => (
    getBoardPins(boardId).then((response) => {
      // an array that holds all of the calls to get the pin information
      const pinArray = [];
      response.forEach((item) => {
        // pushing a function that returns a promise into the pinArray
        pinArray.push(getPin(item.pinId));
      });
      // returning an array of all the fullfilled promises
      return Promise.all([...pinArray]);
    })
  )

  render() {
    const { pins, board, loading } = this.state;
    const renderPins = () => (
      pins.map((pin) => (
        <PinsCard key={pin.firebaseKey} pin={pin} />
      ))
    );
      // 4. map over the pins in state

    // 5. Render the pins on the DOM
    return (
      <div className='d-flex flex-column justify-content-center'>
        <h1 classNam='m-3'> <img className='boardImg mr-2' src={board.imgUrl} alt='Card cap' />{board.name} </h1>
        <div className='d-flex flex-row justify-content-center'>
        {/* makes sure that boards has been rendered */}
        <AppModal title={'Update Board'} buttonLabel={'Update Board'}>
        { Object.keys(board).length && <BoardForm board={board} onUpdate={getSingleBoard} />}
        </AppModal>
        {/* makes sure that boards has been rendered */}
        <AppModal title={'Create Pin'} buttonLabel={'Create Pin'}>
          {<PinForm board={board} onUpdate={getSingleBoard}/>}
        </AppModal>
        </div>
        <div className='d-flex justify-content-center flex-wrap container'>
          {pins.length ? renderPins() : <h1>There are currently no pins for this board</h1> }
        </div>
      </div>
    );
  }
}
