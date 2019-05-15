import { getAllBlock } from 'request_sc/doc_manager';
import { parsenDataBlock } from 'utils/helper/common';

const FETCH_DOC = 'home/FETCH_DOC';

export const fetchDocuments = (contract) => {
  return (dispatch) => {
    getAllBlock(contract)
    .then((response) => {
      const parsenData = response.map(block => {
        return parsenDataBlock(block.returnValues);
      })
      const listOwner = [... new Set(parsenData.map((block) => block.owner))];
      dispatch({
        type: FETCH_DOC,
        payload: {
          docs: parsenData,
          members: listOwner
        }
      })
    })
    .catch((error) => {
      console.log(error);
    });
  };
}

const initState = {
  members: [],
  documents: []
}

export const homeReducer = (state = initState, action) => {
  switch (action.type) {
      case FETCH_DOC:
      return { ...state, documents: action.payload.docs, members: action.payload.members };
    default:
      return state;
  }
};