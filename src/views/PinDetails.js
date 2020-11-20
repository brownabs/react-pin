import React from 'react';
import { getSinglePin } from '../helpers/data/pinData';
import PinsCard from '../components/Cards/PinsCard';

export default class PinDetails extends React.Component {
  state = {
    pin: {},
  }

  componentDidMount() {
    const firebaseKey = this.props.match.params.id;
    this.getSelectedPin(firebaseKey);
  }

  getSelectedPin = (pinId) => {
    getSinglePin(pinId).then((response) => {
      this.setState({
        pin: response,
      });
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
    const { pin } = this.state;
    const showPin = () => (
    <PinsCard key={pin.firebaseKey} pin={pin} />
    );
    return (
      <>
      <div className='d-flex flex-wrap container'>{showPin()}</div>

      {/* <AppModal title={'Create Pin'} buttonLabel={'Create Pin'}>
      <PinForm onUpdate={this.getPins}/>
        </AppModal>
        { loading ? (
          <Loader />
        ) : (
          <>
          <div className='d-flex flex-wrap container'>{showPins()}</div>
          </>
        )} */}
      </>
    );
  }
}
