import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import AppModal from '../AppModal';
import PinForm from '../Forms/PinForm';

export default class PinCard extends Component {
  state = {
    detailsPage: this.props.detailsPage,
    route: this.props.route,
    pin: {},
  }

  componentDidMount() {
    this.setState({
      pin: this.props.pin,
    });
  }

  render() {
    const { pin, detailsPage, route } = this.state;
    return (
    <div className='card m-2 h-50 w-25'>
      <img className='card-img-top' src={pin.imgUrl} alt='Card cap' />
      <div className='card-body'>
        <h5 className='card-title'>{pin.name}</h5>
        <p className='card-text'>
          {pin.description}
        </p>
        { detailsPage ? <div> <Link className='btn btn-dark' to={`/${route}`}>
          Back </Link></div>
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
