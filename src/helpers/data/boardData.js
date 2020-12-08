import axios from 'axios';

const baseUrl = 'https://react-pinterest-322f4.firebaseio.com';

const getAllUserBoards = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="userId"&equalTo="${uid}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const SearchBoards = (uid, term) => new Promise((resolve, reject) => {
  getAllUserBoards(uid).then((response) => {
    const searchResults = response.filter((r) => r.name.toLowerCase().includes(term) || r.description.toLowerCase().includes(term));
    resolve(searchResults);
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

const DeleteBoard = (boardId) => axios.delete(`${baseUrl}/boards/${boardId}.json`);

const DeleteBoardPin = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${baseUrl}/pins-boards/${firebaseKey}.json`).then((resolve)).catch((error) => reject(error));
});

export {
  getAllUserBoards, getSingleBoard, CreateBoard, UpdateBoard, SearchBoards, DeleteBoard, DeleteBoardPin,
};
