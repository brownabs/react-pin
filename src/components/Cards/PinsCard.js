import React from 'react';
import { Link } from 'react-router-dom';
import AppModal from '../AppModal';
import PinForm from '../Forms/PinForm';

export default function PinsCard({ pin, className }) {
  return (
    <div className='card m-2'>
      <img className='card-img-top' src={pin.imgUrl} alt='Card cap' />
      <div className='card-body'>
        <h5 className='card-title'>{pin.name}</h5>
        <p className='card-text'>
          {pin.description}
        </p>
        {(className) ? <Link className='btn btn-primary' to={`/pin-details/${pin.firebaseKey}`}>
          View Pin Details
        </Link> : <AppModal title={'Edit Pin'} buttonLabel={'Edit Pin'}>
      <PinForm pin={pin}/>
        </AppModal>}
      </div>
    </div>
  );
}
