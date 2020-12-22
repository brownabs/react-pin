import {
  React, useState,
  useEffect,
} from 'react';
import PinsCard from '../components/Cards/PinsCard';
import Loader from '../components/Loader';
import getUid from '../helpers/data/authData';
import PinForm from '../components/Forms/PinForm';
import AppModal from '../components/AppModal';
import {
  getAllUserPins,
  DeletePin,
  CreatePinData,
  UpdatePinData,
  CreatePinBoard,
} from '../helpers/data/pinData';

export default function Pins() {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    setCurrentUserId(getUid());
  }, []);

  useEffect(() => {
    getUserPins();
  }, [currentUserId]);

  useEffect(() => {
    console.warn(pins);
  }, [pins]);

  function getUserPins() {
    setLoading(true);
    getAllUserPins(currentUserId).then((response) => {
      setPins(response);
      isLoading();
    });
  }

  const isLoading = () => {
    setInterval(() => {
      setLoading(false);
    }, 1000);
  };

  const removePin = (firebaseKey) => {
    DeletePin(firebaseKey)
      .then(() => {
        getUserPins();
      });
  };

  const CreatePin = (pinObj) => {
    CreatePinData(pinObj)
      .then((resp) => {
        const pinBoardInfo = {
          pinId: resp.data.firebaseKey,
          boardId: this.state.boardId,
          userId: this.state.userId,
        };
        return pinBoardInfo;
      }).then((pinBoardInfo) => CreatePinBoard(pinBoardInfo))
      .then(() => getUserPins());
  };

  const UpdatePin = (pinObj) => {
    UpdatePinData(pinObj)
      .then(() => {
        getUserPins();
      });
  };

  const showPins = () => (
    pins.length && pins.map((pin) => < PinsCard key = {
        pin.firebaseKey
      }
      pin = {
        pin
      }
      className = {
        'viewDetails'
      }
      removePin = {
        removePin
      }
      UpdatePin = {
        UpdatePin
      }
      CreatePin = {
        CreatePin
      }
      />)
  );
  return (
      <>
      <AppModal title={'Create Pin'} buttonLabel={'Create Pin'}>
      <PinForm UpdatePin={UpdatePin} CreatePin={CreatePin}/>
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
