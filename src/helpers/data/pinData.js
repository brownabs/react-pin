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
    console.warn(response.data);
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const CreatePinBoard = (pinObj) => new Promise((resolve, reject) => {
  const pinBoard = {
    boardId: pinObj.boardId,
    pinId: pinObj.pinId,
    userId: pinObj.userId,
  };
  axios.post(`${baseUrl}/pins-boards.json`, pinBoard)
    .then((response) => {
      const update = { firebaseKey: response.data.name };
      axios.patch(`${baseUrl}/pins-boards/${response.data.name}.json`, update)
        .then((resolve));
    }).catch((error) => reject(error));
});

const getPin = (pinId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins/${pinId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const CreatePinData = (object) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/pins.json`, object)
    .then((response) => {
      axios.patch(`${baseUrl}/pins/${response.data.name}.json`, { firebaseKey: response.data.name }).then((r) => resolve(r));
    }).catch((error) => reject(error));
});

const UpdatePinData = (pinObj) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/pins/${pinObj.firebaseKey}.json`, pinObj)
    .then((r) => resolve(r))
    .catch((error) => reject(error));
});

const DeletePin = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

const DeleteBoardPin = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${baseUrl}/pins-boards/${firebaseKey}.json`).then((resolve)).catch((error) => reject(error));
});

export {
  getBoardPins, getPin, CreatePinData, UpdatePinData, getAllUserPins, getSinglePin, DeletePin, CreatePinBoard, DeleteBoardPin,
};
