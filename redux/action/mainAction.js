import {  ADD_SUBJECT, DELETE_SUBJECT, GET_SINGLE_SUBJECT, SET_LOADING, ADD_NOTES_TO_UNCATAGORISED, ADD_PDF_TO_UNCATAGORISED, DELETE_PDF_FROM_UNCATAGORISED, DELETE_NOTES_FROM_UNCATAGORISED, ADD_CHAPTER, DELETE_CHAPTER, ADD_NOTES_TO_UNCATAGORISED_IN_CHAPTER, ADD_PDF_TO_UNCATAGORISED_IN_CHAPTER, EDIT_SUBJECT, EDIT_CHAPTER, DELETE_NOTES_FROM_UNCATAGORISED_IN_CHAPTER, DELETE_PDF_FROM_UNCATAGORISED_IN_CHAPTER, GET_SINGLE_CHAPTER, ADD_NOTES_IN_CHAPTER, ADD_PDF_IN_CHAPTER, DELETE_NOTES_IN_CHAPTER, DELETE_PDF_IN_CHAPTER, ADD_PDF_TOUNCATAGORISED_AD_EXPIRATION, DELETE_SUBJECT_AD_EXPIRATION, EDIT_CHAPTER_AD_EXPIRATION, ADD_NOTES_TOUNCATAGORISED_AD_EXPIRATION, ADD_NOTES_TOUNCATAGORISED_IN_SUBJECT_AD_EXPIRATION, DELETE_NOTES_FROMUNCATAGORISED_IN_SUBJECT_AD_EXPIRATION, REMOVE_LOADING, CHANGE_THEME_TO_DARK, CHANGE_THEME_TO_LIGHT } from "./types";
import { ToastAndroid} from 'react-native'




export const getSingleSubject = (data) =>{
    setLoading()
    return {
        type: GET_SINGLE_SUBJECT,
        payload: {
            subject_name: data.subject_name,
            chapter:data.chapter ,
            uncatagorised_note: data.uncatagorised_note

        }
    }
}


export const getSingleChapter = (data) =>{
    setLoading()
    return {
        type: GET_SINGLE_CHAPTER,
        payload: {
            chapter_name: data.chapter_name,
            notes:data.notes
        }
    }
}

//set add show time 
export const setAdTimeForAddPdftoUncatagorised = (data)=> {
    return {
        type: ADD_PDF_TOUNCATAGORISED_AD_EXPIRATION,
        payload: data
    }
}

export const setAdTimeForDeleteSubject = (data)=> {
    return {
        type: DELETE_SUBJECT_AD_EXPIRATION,
        payload: data
    }
}
export const setAdTimeForEditChapter = (data)=> {
    return {
        type: EDIT_CHAPTER_AD_EXPIRATION,
        payload: data
    }
}

export const setAdTimeForAddNotestoUncatagorised = (data)=> {
   // console.log(data)
   // console.log('========')
    return {
        type: ADD_NOTES_TOUNCATAGORISED_AD_EXPIRATION,
        payload: data
    }
}

export const setAdTimeForAddNotestoUncatagorisedInSubject = (data)=> {
    return {
        type: ADD_NOTES_TOUNCATAGORISED_IN_SUBJECT_AD_EXPIRATION,
        payload: data
    }
}

export const setAdTimeForDeleteNotestoUncatagorisedInSubject = (data)=> {
    return {
        type: DELETE_NOTES_FROMUNCATAGORISED_IN_SUBJECT_AD_EXPIRATION,
        payload: data
    }
}



export const setLoading = ()=> {
    return {
        type: SET_LOADING
    }
}

export const removeLoading = ()=> {
    return {
        type: REMOVE_LOADING
    }
}
export const addSubject = (data) =>{
   
    return {
        type: ADD_SUBJECT,
        payload: {
            subject_name: data.subject_name,
            chapter: [],
            //     {
            //     chapter_name: data.chapter_name,
            //     notes:[{
            //         photos: data.chapter_photos,
            //         documents: data.chapter_documents
            //     }],
            // }
        
            uncatagorised_note:{
                photos:[],
                documents:[]
            }

        }
    }
}
export const addChapter = (data) =>{
    
   
    return {
        type: ADD_CHAPTER,
        payload: {
            subject_name: data.subject_name,
            chapter: 
                {
                    chapter_name: data.chapter_name,
                    notes:{
                        photos:[],
                        documents:[]
                    },
                },
        
            uncatagorised_note:{
                 photos: data.uncatagorised_photos_in_chapter,
                 documents: data.uncatagorised_documents_in_chapter
             }

        }
    }
}

export const editSubject = (data, prevSub)=> {
    return {
        type: EDIT_SUBJECT,
        payload: {
            subject_name: data,
            prev_subject_name: prevSub
        }
    }
}

export const editChapter = (data, sub, prev_chap)=> {
    

    return {
        type: EDIT_CHAPTER,
        payload: {
            chapter_name: data,
            subject_name: sub,
            prev_chapter_name: prev_chap
        }
    }
}


export const deleteChapter = (data, sub) =>{
   // console.log('data to be deleted==', data)
    return {
        type: DELETE_CHAPTER,
        payload: {
            subject_name: sub,
            chapter: 
                {
                    chapter_name: data.chapter_name,
                    notes:[],
                } ,
        

        }
    }
}

export const addnotestoUncatagorised = (data) =>{
    setLoading()
    //console.log(data)
    
   
    ToastAndroid.show('Importing notes...', ToastAndroid.SHORT) 
    return {
        type: ADD_NOTES_TO_UNCATAGORISED,
        payload: data
        
    }
   
}




export const addPdftoUncatagorised = (data) =>{
    setLoading()
  
    return {
        type: ADD_PDF_TO_UNCATAGORISED,
        payload: data
        
    }
}


export const addnotestoUncatagorisedinChapter = (data, sub) =>{
    setLoading()
    //console.log(data)

   
    ToastAndroid.show('Importing notes...', ToastAndroid.SHORT)
   
    return {
        type: ADD_NOTES_TO_UNCATAGORISED_IN_CHAPTER,
        payload: {
            subject_name:sub,
            data:data
        }
        
    }
}


export const addpdftoUncatagorisedinChapter = (data, sub) =>{
    setLoading()
    
    
    
    return {
        type: ADD_PDF_TO_UNCATAGORISED_IN_CHAPTER,
        payload: {
            subject_name: sub,
            data: data
        }
        
    }
}

export const addnotesinChapter =(data, sub, chap)=> {
    return {
        type: ADD_NOTES_IN_CHAPTER,
        payload: {
            subject_name: sub,
            data: data,
            chapter_name: chap
        }
        
    }
}


export const addpdfinChapter =(data, sub, chap)=> {
    return {
        type: ADD_PDF_IN_CHAPTER,
        payload: {
            subject_name: sub,
            data: data,
            chapter_name: chap
        }
        
    }
}



export const deletenotesFromUncatagorised = (data) =>{
    setLoading()
   // console.log('data is====',data)
    let data_key = data.map(item=> {
        return item.key
    })
    //console.log(data_key)
   
    //ToastAndroid.show('Removing...', ToastAndroid.SHORT) 
    return {
        type: DELETE_NOTES_FROM_UNCATAGORISED,
        payload: data_key
        
    }
}

export const deleteNoUrlNotesFromUncatagorised = (data)=> {
    let data_key = data.map(item=> {
        return item.key
    })
   // console.log(data_key)
    return {
        type: DELETE_NOTES_FROM_UNCATAGORISED,
        payload: data_key
    }
}

export const deletepdfFromUncatagorised = (data) =>{
    setLoading()
   // console.log(data)
   
    
    return {
        type: DELETE_PDF_FROM_UNCATAGORISED,
        payload: data
        
    }
}


export const deleteSubject = (data) =>{
   
    return {
        type: DELETE_SUBJECT,
        payload: data
    }
}



export const deletenotestoUncatagorisedinChapter = (data, sub) =>{
    setLoading()
    console.log(data)
   // ToastAndroid.show('Removing...', ToastAndroid.SHORT) 
    let data_key = data.map(item=> {
        return item.key
    })
   
   // console.log(data_key)
    
    return {
        type: DELETE_NOTES_FROM_UNCATAGORISED_IN_CHAPTER,
        payload: {
            subject_name:sub,
            data:data_key
        }
        
        
    }
}


export const deletepdftoUncatagorisedinChapter = (data, sub) =>{
    setLoading()
    //console.log(data)
   
    
    return {
        type: DELETE_PDF_FROM_UNCATAGORISED_IN_CHAPTER,
        payload: {
            subject_name: sub,
            data: data
        }
        
    }
}


export const deletenotesinChapter = (data, sub, chap) =>{
    setLoading()
    //console.log(data)
   // ToastAndroid.show('Removing...', ToastAndroid.SHORT) 
    let data_key = data.map(item=> {
        return item.key
    })
   // console.log(data_key)
    
    return {
        type: DELETE_NOTES_IN_CHAPTER,
        payload: {
            subject_name:sub,
            chapter_name:chap,
            data:data_key
        }
        
        
    }
}


export const deletepdfinChapter = (data, sub, chap) =>{
    setLoading()
   // console.log(data)
   // ToastAndroid.show('Removing...', ToastAndroid.SHORT) 
    
    return {
        type: DELETE_PDF_IN_CHAPTER,
        payload: {
            subject_name:sub,
            chapter_name:chap,
            data:data
        }
        
        
    }
}

export const changeThemeToDark = ()=> {
    return {
        type: CHANGE_THEME_TO_DARK
    }
}

export const changeThemeToLight = ()=> {
    return {
        type: CHANGE_THEME_TO_LIGHT
    }
}