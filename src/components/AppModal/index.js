import React, { useState } from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';

const AppModal = (props) => {
  const {
    buttonAppear,
    buttonLabel,
    className,
    title,
  } = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      {buttonAppear ? <Button className='m-2' onClick={toggle}>{buttonLabel}</Button>
        : <div className='m-2' onClick={toggle}>{buttonLabel}</div>
    }      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
        {props.children}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AppModal;
