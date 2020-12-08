import React from 'react';
import PinsCard from '../components/Cards/PinsCard';
import Loader from '../components/Loader';
import { getSinglePin } from '../helpers/data/pinData';

export default class PinDetails extends React.Component {
  state = {
    pin: {},
    loading: true,
  }

  componentDidMount() {
    const firebaseKey = this.props.match.params.id;
    this.getSelectedPin(firebaseKey);
    console.warn(this.props.history.location.pathname);
  }

  getSelectedPin = (pinId) => {
    getSinglePin(pinId).then((response) => {
      this.setState({
        pin: response,
      }, this.setLoading());
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
    const { pin, loading } = this.state;
    const showPin = () => (
    <PinsCard key={pin.firebaseKey} pin={pin} onUpdate={this.getSelectedPin} detailsPage={'yes'} {...this.props}/>
    );
    return (
      <>
        { loading ? (
          <Loader />
        ) : (
          <>
          <div className='d-flex flex-wrap justify-content-center container-fluid'>{showPin()}</div>
          </>
        )}
      </>
    );
  }
}
