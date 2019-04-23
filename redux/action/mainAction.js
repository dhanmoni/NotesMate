import {
  ADD_SUBJECT,
  DELETE_SUBJECT,
  GET_SINGLE_SUBJECT,
  SET_LOADING,
  ADD_NOTES_TO_UNCATAGORISED,
  ADD_PDF_TO_UNCATAGORISED,
  DELETE_PDF_FROM_UNCATAGORISED,
  DELETE_NOTES_FROM_UNCATAGORISED,
  ADD_CHAPTER,
  DELETE_CHAPTER,
  ADD_NOTES_TO_UNCATAGORISED_IN_CHAPTER,
  ADD_PDF_TO_UNCATAGORISED_IN_CHAPTER,
  EDIT_SUBJECT,
  EDIT_CHAPTER,
  DELETE_NOTES_FROM_UNCATAGORISED_IN_CHAPTER,
  DELETE_PDF_FROM_UNCATAGORISED_IN_CHAPTER,
  GET_SINGLE_CHAPTER,
  ADD_NOTES_IN_CHAPTER,
  ADD_PDF_IN_CHAPTER,
  DELETE_NOTES_IN_CHAPTER,
  DELETE_PDF_IN_CHAPTER,
  ADD_PDF_TOUNCATAGORISED_AD_EXPIRATION,
  DELETE_SUBJECT_AD_EXPIRATION,
  EDIT_CHAPTER_AD_EXPIRATION,
  ADD_NOTES_TOUNCATAGORISED_AD_EXPIRATION,
  ADD_NOTES_TOUNCATAGORISED_IN_SUBJECT_AD_EXPIRATION,
  DELETE_NOTES_FROMUNCATAGORISED_IN_SUBJECT_AD_EXPIRATION,
  REMOVE_LOADING,
  CHANGE_THEME_TO_DARK,
  CHANGE_THEME_TO_LIGHT,
  SET_IMPORT_LOADING,
} from './types';
import { ToastAndroid } from 'react-native';

export const getSingleSubject = data => dispatch => {
  dispatch(setLoading())
  dispatch({
    type: GET_SINGLE_SUBJECT,
    payload: {
      subject_name: data.subject_name,
      chapter: data.chapter,
      uncatagorised_note: data.uncatagorised_note,
    },
  })
};

export const getSingleChapter = data => dispatch => {
  dispatch(setLoading())
  dispatch({
    type: GET_SINGLE_CHAPTER,
    payload: {
      chapter_name: data.chapter_name,
      notes: data.notes,
    },
  })
};

//set add show time
export const setAdTimeForAddPdftoUncatagorised = data => dispatch => {
  dispatch({
    type: ADD_PDF_TOUNCATAGORISED_AD_EXPIRATION,
    payload: data,
  })
};

export const setAdTimeForDeleteSubject = data => dispatch => {
  dispatch({
    type: DELETE_SUBJECT_AD_EXPIRATION,
    payload: data,
  })
};
export const setAdTimeForEditChapter = data => dispatch => {
  dispatch({
    type: EDIT_CHAPTER_AD_EXPIRATION,
    payload: data,
  })
};

export const setAdTimeForAddNotestoUncatagorised = data => dispatch => {
  // console.log(data)
  // console.log('========')
  dispatch({
    type: ADD_NOTES_TOUNCATAGORISED_AD_EXPIRATION,
    payload: data,
  })
};

export const setAdTimeForAddNotestoUncatagorisedInSubject = data => dispatch => {
  dispatch({
    type: ADD_NOTES_TOUNCATAGORISED_IN_SUBJECT_AD_EXPIRATION,
    payload: data,
  })
};

export const setAdTimeForDeleteNotestoUncatagorisedInSubject = data => dispatch => {
  dispatch({
    type: DELETE_NOTES_FROMUNCATAGORISED_IN_SUBJECT_AD_EXPIRATION,
    payload: data,
  })
};

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

export const setImportLoading = () => dispatch => {

  dispatch({
    type: SET_IMPORT_LOADING,
  })
};


export const removeLoading = () => {
  return {
    type: REMOVE_LOADING,
  };
};
export const addSubject = data => dispatch => {
  dispatch({
    type: ADD_SUBJECT,
    payload: {
      subject_name: data.subject_name,
      chapter: [],
      uncatagorised_note: {
        photos: [],
        documents: [],
      },
    },
  })
};
export const addChapter = data => dispatch => {
  dispatch({
    type: ADD_CHAPTER,
    payload: {
      subject_name: data.subject_name,
      chapter: {
        chapter_name: data.chapter_name,
        notes: {
          photos: [],
          documents: [],
        },
      },

      uncatagorised_note: {
        photos: data.uncatagorised_photos_in_chapter,
        documents: data.uncatagorised_documents_in_chapter,
      },
    },
  })
};

export const editSubject = (data, prevSub) => dispatch => {
  dispatch({
    type: EDIT_SUBJECT,
    payload: {
      subject_name: data,
      prev_subject_name: prevSub,
    },
  })
};

export const editChapter = (data, sub, prev_chap) => dispatch => {
  dispatch({
    type: EDIT_CHAPTER,
    payload: {
      chapter_name: data,
      subject_name: sub,
      prev_chapter_name: prev_chap,
    },
  })
};

export const deleteChapter = (data, sub) => dispatch => {
  // console.log('data to be deleted==', data)
  dispatch({
    type: DELETE_CHAPTER,
    payload: {
      subject_name: sub,
      chapter: {
        chapter_name: data.chapter_name,
        notes: [],
      },
    },
  })
};

export const deleteSubject = data => dispatch => {
  dispatch({
    type: DELETE_SUBJECT,
    payload: data,
  })
};

export const addnotestoUncatagorised = data => dispatch => {

  dispatch({
    type: ADD_NOTES_TO_UNCATAGORISED,
    payload: data,
  })
};

export const addPdftoUncatagorised = data => dispatch => {
  dispatch(setLoading())

  dispatch({
    type: ADD_PDF_TO_UNCATAGORISED,
    payload: data,
  })
};

export const addnotestoUncatagorisedinChapter = (data, sub) => dispatch => {
  dispatch(setImportLoading());
  //console.log(data)

  //ToastAndroid.show('Importing notes...', ToastAndroid.SHORT);

  dispatch({
    type: ADD_NOTES_TO_UNCATAGORISED_IN_CHAPTER,
    payload: {
      subject_name: sub,
      data: data,
    },
  })
};

export const addpdftoUncatagorisedinChapter = (data, sub) => dispatch => {
  dispatch(setLoading())

  dispatch({
    type: ADD_PDF_TO_UNCATAGORISED_IN_CHAPTER,
    payload: {
      subject_name: sub,
      data: data,
    },
  })
};

export const addnotesinChapter = (data, sub, chap) => dispatch => {
  dispatch(setImportLoading())
  dispatch({
    type: ADD_NOTES_IN_CHAPTER,
    payload: {
      subject_name: sub,
      data: data,
      chapter_name: chap,
    },
  })
};

export const addpdfinChapter = (data, sub, chap) => dispatch => {
  dispatch({
    type: ADD_PDF_IN_CHAPTER,
    payload: {
      subject_name: sub,
      data: data,
      chapter_name: chap,
    },
  })
};

export const deletenotesFromUncatagorised = data => dispatch => {
  dispatch(setLoading())
  // console.log('data is====',data)
  let data_key = data.map(item => {
    return item.key;
  });
  //console.log(data_key)

  //ToastAndroid.show('Removing...', ToastAndroid.SHORT)
  dispatch({
    type: DELETE_NOTES_FROM_UNCATAGORISED,
    payload: data_key,
  })
};

export const deleteNoUrlNotesFromUncatagorised = data => dispatch => {
  let data_key = data.map(item => {
    return item.key;
  });
  // console.log(data_key)
  dispatch({
    type: DELETE_NOTES_FROM_UNCATAGORISED,
    payload: data_key,
  })
};

export const deletepdfFromUncatagorised = data => dispatch => {
  dispatch(setLoading())
  // console.log(data)

  dispatch({
    type: DELETE_PDF_FROM_UNCATAGORISED,
    payload: data,
  })
};

export const deletenotestoUncatagorisedinChapter = (data, sub) => dispatch => {
  dispatch(setLoading())
  console.log(data);
  // ToastAndroid.show('Removing...', ToastAndroid.SHORT)
  let data_key = data.map(item => {
    return item.key;
  });

  // console.log(data_key)

  dispatch({
    type: DELETE_NOTES_FROM_UNCATAGORISED_IN_CHAPTER,
    payload: {
      subject_name: sub,
      data: data_key,
    },
  })
};

export const deletepdftoUncatagorisedinChapter = (data, sub) => dispatch => {
  dispatch(setLoading())
  //console.log(data)

  dispatch({
    type: DELETE_PDF_FROM_UNCATAGORISED_IN_CHAPTER,
    payload: {
      subject_name: sub,
      data: data,
    },
  })
};

export const deletenotesinChapter = (data, sub, chap) => dispatch => {
  dispatch(setLoading())
  //console.log(data)
  // ToastAndroid.show('Removing...', ToastAndroid.SHORT)
  let data_key = data.map(item => {
    return item.key;
  });
  // console.log(data_key)

  dispatch({
    type: DELETE_NOTES_IN_CHAPTER,
    payload: {
      subject_name: sub,
      chapter_name: chap,
      data: data_key,
    },
  })
};

export const deletepdfinChapter = (data, sub, chap) => dispatch => {
  dispatch(setLoading())
  // console.log(data)
  // ToastAndroid.show('Removing...', ToastAndroid.SHORT)

  dispatch({
    type: DELETE_PDF_IN_CHAPTER,
    payload: {
      subject_name: sub,
      chapter_name: chap,
      data: data,
    },
  })
};

export const changeThemeToDark = () => {
  return {
    type: CHANGE_THEME_TO_DARK,
  };
};

export const changeThemeToLight = () => {
  return {
    type: CHANGE_THEME_TO_LIGHT,
  };
};
