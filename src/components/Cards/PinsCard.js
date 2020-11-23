import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import AppModal from '../AppModal';
import PinForm from '../Forms/PinForm';

export default function PinsCard({ pin, removePin }) {
  return (
    <div className='card m-2 h-50 w-25'>
      <img className='card-img-top' src={pin.imgUrl} alt='Card cap' />
      <div className='card-body'>
        <h5 className='card-title'>{pin.name}</h5>
        <p className='card-text'>
          {pin.description}
        </p>
        <Link className='btn btn-primary' to={`/pin-details/${pin.firebaseKey}`}>
        <i className="fas fa-eye"></i>
        </Link> <AppModal title={'Edit Pin'} buttonLabel={'Edit Pin'}>
      <PinForm pin={pin}/>
        </AppModal>
        <AppModal title={'Are you sure you want to delete this pin?'} buttonLabel={'Delete Pin'}>
          <Button id={pin.firebaseKey} onClick={(e) => removePin(e)}>Yes</Button>
        </AppModal>
      </div>
    </div>
  );
}
