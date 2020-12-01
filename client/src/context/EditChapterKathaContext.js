import { useContext } from 'react';
import createDataContext from './createDataContext';

const chapterKathaFormReducer = (state, action) => {
  let index;
  switch (action.type) {
    // When LOADING the existing chapter_kathas.
    case 'POPULATE_KATHA':
      const katha = action.payload;
      const newState = {
        id: katha.id,
        title: katha.title,
        gianiId: katha.giani?.id || null,
        year: katha.year,
        publicUrl: katha.public_url,
      };
      // Use `state.kathaForm.length` to update at a specific index
      return updateKathaForm(state.kathaForm.length, state, newState);
      break;

    case 'UPDATE_KATHA_FORM_ITEM':
      index = findKathaIndex(state, action.payload.id);
      // prettier-ignore
      return updateKathaForm(index, state, {
          ...state.kathaForm[index],
            gianiId: action.payload.gianiId || state.kathaForm[index].gianiId,
            title: action.payload.title || state.kathaForm[index].title,
            year: action.payload.year || state.kathaForm[index].year,
      });

    case 'ADD_KATHA_FORM':
      // After a `chapter_kathas` has been written
      index = state.kathaForm.length + 1;
      return updateKathaForm(index, state, {
        id: action.payload.id,
        title: action.payload.title,
        gianiId: action.payload.giani?.id || null,
        year: action.payload.year,
        publicUrl: action.payload.public_url,
      });

    // case 'REMOVE_LAST_TUK_FORM':
    //   return {
    //     ...state,
    //     kathaForm: [...state.kathaForm.slice(0, -1)],
    //   };

    default:
      console.log(`⚠️ Warning! Action ${action.type} not found!`);
  }
};

const updateKathaForm = (dispatch) => (formItem) => {
  dispatch({ type: 'UPDATE_KATHA_FORM_ITEM', payload: formItem });
};

const addKathaForm = (dispatch) => () => {
  dispatch({ type: 'ADD_KATHA_FORM' });
};

// const removeLastTukForm = (dispatch) => () => {
//   dispatch({ type: 'REMOVE_LAST_TUK_FORM' });
// };

const initializeKathaFormState = (dispatch) => (kathaFiles) => {
  kathaFiles.map((katha) => {
    dispatch({ type: 'POPULATE_KATHA', payload: katha });
  });
};

const findKathaIndex = (state, id) => {
  return state.kathaForm.findIndex((k) => k.id === id);
};

// Don't think I need this...
// const updateOriginalKathaForm = (index, oldState, newState) => {
//   return {
//     ...oldState,
//     kathaForm: [
//       ...oldState.kathaForm.slice(0, index), // everything before current post
//       { ...oldState.kathaForm[index], ...newState },
//       ...oldState.kathaForm.slice(index + 1), // everything after current post
//     ],
//     originalKathaForm: [
//       ...oldState.originalKathaForm.slice(0, index), // everything before current post
//       { ...oldState.originalKathaForm[index], ...newState },
//       ...oldState.kathaForm.slice(index + 1), // everything after current post
//     ],
//   };
// };

// arr.findIndex((item) => item.id === id);

export const { Provider, Context } = createDataContext(
  chapterKathaFormReducer,
  {
    initializeKathaFormState,
    updateKathaForm,
    addKathaForm,
  },
  {
    kathaForm: [
      // {
      //   title: '0034 Leaving-Anandpur.mp3',
      //   gianiId: null,
      //   year: 1992,
      //   publicUrl: 'soundcloud.com',
      // },
    ],
  }
);
