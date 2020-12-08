import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import AppModal from '../AppModal';
import PinForm from '../Forms/PinForm';

export default class PinCard extends Component {
  state = {
    detailsPage: this.props.detailsPage,
    pin: {},
  }

  componentDidMount() {
    this.setState({
      pin: this.props.pin,
    });
  }

  goBack = () => {
    this.props.history.goBack();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.toggle();
  }

  render() {
    const { pin, detailsPage } = this.state;
    return (
    <div className='card m-2 h-50 w-25'>
      <img className='card-img-top' src={pin.imgUrl} alt='Card cap' />
      <div className='card-body'>
        <h5 className='card-title'>{pin.name}</h5>
        <p className='card-text'>
          {pin.description}
        </p>
        { detailsPage ? <div> <Button className='btn btn-dark' onClick={() => this.goBack()}>
          Back </Button></div>
          : <div> <Link className='btn btn-primary' to={`/pin-details/${pin.firebaseKey}`}>
        <i className="fas fa-eye"></i>
        </Link>
        <AppModal title={'Edit Pin'} buttonLabel={'Edit Pin'}>
      <PinForm pin={pin} onUpdate={this.props.removePin}/>
        </AppModal>
        <AppModal title={'Are you sure you want to delete this pin?'} buttonLabel={'Delete Pin'}>
          <Button onClick={() => this.props.removePin(pin.firebaseKey)}>Yes</Button>
        </AppModal>
        </div>}
        </div>
      </div>
    );
  }
}
