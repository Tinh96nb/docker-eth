import {getAllBlock, createNewBlock, getDocMinedByIndex} from 'request_sc/doc_manager';
import {parsenDataBlock, parsenFullBlock} from 'utils/helper/common';

const FETCH_DOC = 'doc/FETCH_DOC';
const ADD_DOC = 'doc/ADD_DOC';
const GET_DETAIL = 'doc/GET_DETAIL';

export const fetchDocuments = (contract) => {
  return (dispatch) => {
    getAllBlock(contract)
    .then((response) => {
      const parsenData = response.map(block => {
        return parsenDataBlock(block.returnValues);
      })
      dispatch({
        type: FETCH_DOC,
        payload: parsenData
      })
    })
    .catch((error) => {
      console.log(error);
    });
  };
}

export const addNewDocuments = (fileInfo, contract, owner, cb) => {
  return (dispatch) => {
    createNewBlock(fileInfo, contract, owner)
    .then((response) => {
      const {returnValues} = response.events.LogCreatedDoc
      const parsenData = parsenDataBlock(returnValues);
      dispatch({
        type: ADD_DOC,
        payload: parsenData
      })
      const fullBlock = parsenFullBlock(response);
      return cb && cb(fullBlock);
    })
    .catch((error) => {
      console.log(error);
    });
  };
}

export const getDocByIndex = (numDoc, contract, cb) => {
  return (dispatch) => {
    getDocMinedByIndex(numDoc, contract)
    .then((response) => {
      const parsenData = parsenDataBlock(response);
      dispatch({
        type: GET_DETAIL,
        payload: parsenData
      })
      return cb && cb(parsenData);
    })
    .catch((error) => {
      console.log(error);
    });
  };
}

const initState = {
  documents: []
}

export const docReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_DOC:
      return { ...state, documents: action.payload };
    case ADD_DOC:
      const newList = [ ...state.documents, action.payload ];
      return { ...state, documents: newList };
    default:
      return state;
  }
};