/* eslint-disable react-hooks/exhaustive-deps */
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
} from '../helpers/data/pinData';
import {
  getAllUserBoards,
} from '../helpers/data/boardData';

export default function Pins({ searchedPins }) {
  const [pinsSearched] = useState(searchedPins);
  const [pins, setPins] = useState([]);
  const [boards, setBoards] = useState([]);
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

  useEffect(() => {
    getUserBoards();
  }, [currentUserId]);

  useEffect(() => {
    setCurrentUserId(getUid());
  }, []);

  function getUserPins() {
    setLoading(true);
    if (pinsSearched === undefined) {
      getAllUserPins(currentUserId).then((response) => {
        setPins(response);
        isLoading();
      });
    } else {
      setPins([pinsSearched]);
    }
  }

  function getUserBoards() {
    setLoading(true);
    getAllUserBoards(currentUserId).then((response) => {
      setBoards(response);
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
      currentPin = {
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
      boards = {
        boards
      }
      showBoards = {
        true
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
        <div className='container-fluid' id='pin-container'>
          <div className='card-columns'>
           {showPins()}
          </div>
         </div>
          </>
        )}
      </>
  );
}
