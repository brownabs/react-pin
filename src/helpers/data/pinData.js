import axios from 'axios';

const baseUrl = 'https://react-pinterest-322f4.firebaseio.com';

const getAllUserPins = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="userId"&equalTo="${uid}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getSinglePin = (pinId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins/${pinId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const getBoardPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins-boards.json?orderBy="boardId"&equalTo="${boardId}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const CreatePinBoard = (dataResponse, pinObj) => new Promise((resolve, reject) => {
  console.warn(dataResponse, pinObj);
  const pinBoard = {
    boardId: pinObj.boardId,
    pinId: dataResponse.firebaseKey,
    userId: pinObj.userId,
  };
  axios.post(`${baseUrl}/pins-boards.json`, pinBoard)
    .then((response) => {
      const update = { firebaseKey: response.data.name };
      axios.patch(`${baseUrl}/pins-boards/${response.data.name}.json`, update)
        .then((resp) => {
          console.warn(resp.data);
        });
      resolve(response);
    }).catch((error) => reject(error));
});

const getPin = (pinId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins/${pinId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const CreatePin = (pinObj) => new Promise((resolve, reject) => {
  console.warn(pinObj);
  axios.post(`${baseUrl}/pins.json`, pinObj)
    .then((response) => {
      const update = { firebaseKey: response.data.name };
      axios.patch(`${baseUrl}/pins/${response.data.name}.json`, update)
        .then((resp) => {
          CreatePinBoard(resp.data, pinObj);
        });
      resolve(response.data);
    }).catch((error) => reject(error));
});

const UpdatePin = (pinObj) => axios.patch(`${baseUrl}/pins/${pinObj.firebaseKey}.json`, pinObj);

export {
  getBoardPins, getPin, CreatePin, UpdatePin, getAllUserPins, getSinglePin,
};
