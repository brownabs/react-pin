import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
} from 'reactstrap';
import AppModal from '../AppModal';
import PinForm from '../Forms/PinForm';
import { UpdatePinData, CreatePinBoard } from '../../helpers/data/pinData';

export default function PinsCard({
  currentPin, CreatePin, UpdatePin, removePin, boards, showBoards,
}) {
  const [detailsPage, setDetailsPage] = useState(false);

  const [pin, setPin] = useState({});
  const [showBoard, setShowBoard] = useState(false);

  const [boardss, setBoards] = useState([]);

  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  useEffect(() => setPin(currentPin));
  useEffect(() => setBoards(boards));
  useEffect(() => setShowBoard(showBoards));

  const goBack = () => {
    this.props.history.goBack();
  };

  const handleChange = (e, pinObj) => {
    const boardId = e.target.id;
    const newPinObj = pinObj;
    newPinObj.boardId = boardId;
    UpdatePinData(newPinObj)
      .then((r) => {
        console.warn(r);
        CreatePinBoard(newPinObj);
      });
  };

  return (
    <div className='card pins-card'>
      <img className='card-img-top' src={pin.imgUrl} alt='Card cap' />
      <div className='card-body'>
        <h5 className='card-title'>{pin.name}: {pin.description}</h5>
        { detailsPage ? <div> <Button className='btn btn-dark' onClick={() => this.goBack()}>
          Back </Button></div>
          : <div>
            <Link className='btn btn-primary' to={`/pin-details/${pin.firebaseKey}`}>
        <i className="fas fa-eye"></i>
        </Link>
        <AppModal title={'Edit Pin'} buttonLabel={<i className='fas fa-edit edit-button'></i>} buttonAppear={false}>
      <PinForm pin={pin} UpdatePin={UpdatePin} CreatePin={CreatePin}/>
        </AppModal>
        <AppModal title={'Are you sure you want to delete this pin?'} buttonLabel={<i className='fas fa-trash-alt delete-button'></i>} buttonAppear={false} >
          <Button onClick={() => removePin(pin.firebaseKey)}>Yes</Button>
        </AppModal>
        {showBoard ? <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret> Save Pin
      </DropdownToggle>
      <DropdownMenu name="board" >
      {boardss.map((board) => (
          <DropdownItem id={board.firebaseKey} key={board.firebaseKey} onClick={(e) => handleChange(e, pin)}>{board.name}</DropdownItem>
      ))}
      </DropdownMenu>
    </ButtonDropdown> : <div></div>}
        </div>}
        </div>
      </div>
  );
}
