import React from 'react';
import PinsCard from '../components/Cards/PinsCard';
import Loader from '../components/Loader';
import getUid from '../helpers/data/authData';
import PinForm from '../components/Forms/PinForm';
import AppModal from '../components/AppModal';
import {
  getAllUserPins, DeletePin,
} from '../helpers/data/pinData';

export default class Pins extends React.Component {
  state = {
    pins: [],
    loading: true,
  }

  componentDidMount() {
    this.getPins();
  }

  getPins = () => {
    const currentUserId = getUid();
    getAllUserPins(currentUserId).then((response) => {
      this.setState({
        pins: response,
      }, this.setLoading);
    });
  }

  removePin = (firebaseKey) => {
    DeletePin(firebaseKey)
      .then(() => {
        this.getPins();
      });
  }

  setLoading = () => {
    this.timer = setInterval(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { pins, loading } = this.state;
    const showPins = () => (
      pins.map((pin) => <PinsCard key={pin.firebaseKey} pin={pin} className={'viewDetails'} removePin={this.removePin}/>)
    );
    return (
      <>
      <AppModal title={'Create Pin'} buttonLabel={'Create Pin'}>
      <PinForm onUpdate={this.getPins}/>
        </AppModal>
        { loading ? (
          <Loader />
        ) : (
          <>
          <div className='d-flex justify-content-center flex-wrap container-fluid'>{showPins()}</div>
          </>
        )}
      </>
    );
  }
}
