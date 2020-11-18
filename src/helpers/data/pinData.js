import axios from 'axios';

const baseUrl = 'https://react-pinterest-322f4.firebaseio.com';

const getBoardPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins-boards.json?orderBy="boardId"&equalTo="${boardId}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getPin = (pinId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins/${pinId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const CreatePin = (pinObj) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/pins.json`, pinObj)
    .then((response) => {
      resolve(response.data);
    }).catch((error) => reject(error));
});

const UpdatePin = (pinObj) => axios.patch(`${baseUrl}/pins/${pinObj.firebaseKey}.json`, pinObj);

export {
  getBoardPins, getPin, CreatePin, UpdatePin,
};
