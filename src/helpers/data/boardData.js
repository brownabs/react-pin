import axios from 'axios';

const baseUrl = 'https://react-pinterest-322f4.firebaseio.com';

const getAllUserBoards = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="userId"&equalTo="${uid}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getSingleBoard = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards/${boardId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const CreateBoard = (boardObj) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/boards.json`, boardObj)
    .then((response) => {
      const update = { firebaseKey: response.data.name };
      axios.patch(`${baseUrl}/boards/${response.data.name}.json`, update);
      resolve(response.data);
    }).catch((error) => reject(error));
});

const UpdateBoard = (boardObj) => axios.patch(`${baseUrl}/boards/${boardObj.firebaseKey}.json`, boardObj);

export {
  getAllUserBoards, getSingleBoard, CreateBoard, UpdateBoard,
};
