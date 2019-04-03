import { ADD_SUBJECT,
        DELETE_SUBJECT, 
        GET_SINGLE_SUBJECT,
        SET_LOADING,
        ADD_PDF_TO_UNCATAGORISED,
        ADD_NOTES_TO_UNCATAGORISED, 
        DELETE_PDF_FROM_UNCATAGORISED, 
        DELETE_NOTES_FROM_UNCATAGORISED,
        ADD_CHAPTER,
        DELETE_CHAPTER,
        ADD_NOTES_TO_UNCATAGORISED_IN_CHAPTER,
        ADD_PDF_TO_UNCATAGORISED_IN_CHAPTER,
        DELETE_NOTES_FROM_UNCATAGORISED_IN_CHAPTER,
        DELETE_PDF_FROM_UNCATAGORISED_IN_CHAPTER,
        EDIT_SUBJECT,
        EDIT_CHAPTER,
        GET_SINGLE_CHAPTER,
        ADD_NOTES_IN_CHAPTER,
        ADD_PDF_IN_CHAPTER,
        DELETE_NOTES_IN_CHAPTER,
        DELETE_PDF_IN_CHAPTER,
        ADD_NOTES_TOUNCATAGORISED_IN_SUBJECT_AD_EXPIRATION,
        ADD_NOTES_TOUNCATAGORISED_AD_EXPIRATION,
        ADD_PDF_TOUNCATAGORISED_AD_EXPIRATION,
        DELETE_SUBJECT_AD_EXPIRATION,
        EDIT_CHAPTER_AD_EXPIRATION,
        DELETE_NOTES_FROMUNCATAGORISED_IN_SUBJECT_AD_EXPIRATION,
        REMOVE_LOADING,
        CHANGE_THEME_TO_DARK,
        CHANGE_THEME_TO_LIGHT

    } from '../action/types'
//import console = require('console');

const initialState={
    loading:false,
    subjects:[],
    singleSubject:null,
    singleChapter:null,
    uncatagorised_photos:[],
    uncatagorised_documents:[],
    deleteSubjectAdExpiration: null,
    editChapterAdExpiration: null,
    AddNotestoUncatagorisedAdExpiraion: null,
    AddPdftoUncatagorisedAdExpiraion: null,
    AddNotestoUncatagorisedInSubjectAdExpiraion: null,
    DeleteNotesfromUncatagorisedinSubjectAdExpiraion: null,
    darkTheme:false


}
export default function(state= initialState, action){
    switch (action.type) {
        
        case SET_LOADING:
            return{
                ...state,
                loading:true
            }

        case REMOVE_LOADING:
            return{
                ...state,
                loading:false
            }

        case CHANGE_THEME_TO_DARK:
            return{
                ...state,
                darkTheme:true
            }
        case CHANGE_THEME_TO_LIGHT:
            return{
                ...state,
                darkTheme:false
            }

            //ADD
        case ADD_SUBJECT:
            return{
                ...state,
                subjects:[action.payload, ...state.subjects],
                loading:false,
            }
        case ADD_CHAPTER:
        
            return{
                ...state,
                singleSubject: {
                    ...state.singleSubject,
                    chapter: [action.payload.chapter, ...state.singleSubject.chapter]
                },
               subjects: state.subjects.map(
                    (sub) => sub.subject_name === action.payload.subject_name ? 
                    {...sub, chapter:[action.payload.chapter, ...sub.chapter ]}
                                            : sub ),
                loading:false,
            }



            //Add notes
        case ADD_NOTES_TO_UNCATAGORISED:
            return{
                ...state,
                uncatagorised_photos:[action.payload, ...state.uncatagorised_photos],
                loading:false,
            }


        case ADD_PDF_TO_UNCATAGORISED:
            return{
                ...state,
                uncatagorised_documents:[action.payload, ...state.uncatagorised_documents],
                loading:false,
            }
            case ADD_NOTES_TO_UNCATAGORISED_IN_CHAPTER:
            return {
                ...state,
                singleSubject: {
                    ...state.singleSubject,
                   uncatagorised_note: {
                       ...state.singleSubject.uncatagorised_note,
                       photos: [action.payload.data, ...state.singleSubject.uncatagorised_note.photos],
                   }
                },
               subjects: state.subjects.map(
                    (sub) => sub.subject_name === action.payload.subject_name ? 
                    {...sub,
                    uncatagorised_note: {
                        ...sub.uncatagorised_note,
                        photos: [action.payload.data, ...sub.uncatagorised_note.photos],
                    }

                    }: sub ),
                loading:false,
            }


            case ADD_PDF_TO_UNCATAGORISED_IN_CHAPTER:
            
            return {
                ...state,
                singleSubject: {
                    ...state.singleSubject,
                   uncatagorised_note: {
                       ...state.singleSubject.uncatagorised_note,
                       documents: [action.payload.data, ...state.singleSubject.uncatagorised_note.documents],
                   }
                },
               subjects: state.subjects.map(
                    (sub) => sub.subject_name === action.payload.subject_name ? 
                    {...sub,
                    uncatagorised_note: {
                        ...sub.uncatagorised_note,
                        documents: [action.payload.data, ...sub.uncatagorised_note.documents],
                    }

                    }: sub ),
                loading:false,
            }



                
            case ADD_NOTES_IN_CHAPTER:
            return {
                ...state,
                singleChapter:{
                    ...state.singleChapter,
                    notes:{
                        ...state.singleChapter.notes,
                        photos:[action.payload.data, ...state.singleChapter.notes.photos]
                    }
                },
                singleSubject: {
                    ...state.singleSubject,
                    chapter:  state.singleSubject.chapter.map(chap=> chap.chapter_name === action.payload.chapter_name ? {
                            ...chap, 
                            notes:{
                                ...chap.notes,
                                photos:[action.payload.data, ...chap.notes.photos]
                            }
                        } : chap)
                    
                },
               subjects: state.subjects.map(
                    (sub) => sub.subject_name === action.payload.subject_name ? 
                    {...sub,
                        chapter:sub.chapter.map(chap=> chap.chapter_name === action.payload.chapter_name ? {
                            ...chap, 
                            notes:{
                                ...chap.notes,
                                photos:[action.payload.data, ...chap.notes.photos]
                            }
                        } : chap)

                    }: sub ),
                loading:false,
            }

               
            case ADD_PDF_IN_CHAPTER:
            return {
                ...state,
                singleChapter:{
                    ...state.singleChapter,
                    notes:{
                        ...state.singleChapter.notes,
                        documents:[action.payload.data, ...state.singleChapter.notes.documents]
                    }
                },
                singleSubject: {
                    ...state.singleSubject,
                    chapter:  state.singleSubject.chapter.map(chap=> chap.chapter_name === action.payload.chapter_name ? {
                            ...chap, 
                            notes:{
                                ...chap.notes,
                                documents:[action.payload.data, ...chap.notes.documents]
                            }
                        } : chap)
                    
                },
               subjects: state.subjects.map(
                    (sub) => sub.subject_name === action.payload.subject_name ? 
                    {...sub,
                        chapter:sub.chapter.map(chap=> chap.chapter_name === action.payload.chapter_name ? {
                            ...chap, 
                            notes:{
                                ...chap.notes,
                                documents:[action.payload.data, ...chap.notes.documents]
                            }
                        } : chap)

                    }: sub ),
                loading:false,
            }


             case GET_SINGLE_SUBJECT:
            return{
                ...state,
                singleSubject:action.payload,
                loading:false
            }
            case GET_SINGLE_CHAPTER:
            return{
                ...state,
                singleChapter:action.payload,
                loading:false
            }

            //edit
            case EDIT_SUBJECT :
            return {
                ...state,
                singleSubject: {
                    ...state.singleSubject,
                    subject_name: action.payload.subject_name
                },
               subjects: state.subjects.map(
                    (sub) => sub.subject_name === action.payload.prev_subject_name ? 
                    {...sub,
                        subject_name: action.payload.subject_name
                }: sub ),
                loading:false,
            }
            case EDIT_CHAPTER :
            return {
                ...state,
                singleChapter:{
                    ...state.singleChapter,
                    chapter_name: action.payload.chapter_name
                },
                singleSubject: {
                    ...state.singleSubject,
                    chapter:state.singleSubject.chapter.map(chap=> chap.chapter_name === action.payload.prev_chapter_name ? {
                        ...chap, 
                        chapter_name: action.payload.chapter_name
                    } : chap)
                   
                },
               subjects: state.subjects.map(
                    (sub) => sub.subject_name === action.payload.subject_name ? 
                    {...sub,
                        chapter:sub.chapter.map(chap=> chap.chapter_name === action.payload.prev_chapter_name ? {
                            ...chap, 
                            chapter_name: action.payload.chapter_name
                        } : chap)
                }: sub ),
                loading:false,
            }

            //DELETE
        case DELETE_SUBJECT:
            return{
                ...state,
                subjects: state.subjects.filter(subject => subject.subject_name !== action.payload),
                loading:false
            }
        
        case DELETE_CHAPTER:
        
            return{
                ...state,
                singleSubject: {
                    ...state.singleSubject,
                    chapter: state.singleSubject.chapter.filter(chapter => chapter.chapter_name !== action.payload.chapter.chapter_name),
                },
               subjects: state.subjects.map(
                    (sub) => sub.subject_name === action.payload.subject_name ? 
                    {...sub,
                    chapter:  sub.chapter.filter(chapter => chapter.chapter_name !== action.payload.chapter.chapter_name),
                }: sub ),
                loading:false,
            }
        case DELETE_PDF_FROM_UNCATAGORISED:
                payload_data = action.payload;
                       
            return{
                ...state,
                uncatagorised_documents:  state.uncatagorised_documents.filter(item=> item.fileKey !== action.payload),
                loading:false
            }
        case DELETE_NOTES_FROM_UNCATAGORISED:
            
            const images = [];
            state.uncatagorised_photos.map(image=> {
            if(image.length >=1){
                return image.map(image=> {
                images.push(image)
                })
            }
                else {
                    images.push(image)
                } })
                 payload_data = action.payload;
                
                  myArray = images.filter( function( el ) {
                      const filePath_date = el.path  +'DATE:'+ el.modificationDate
                      
                    return payload_data.indexOf( filePath_date ) < 0;
                  } );
                  //console.log('myArray======', myArray)
                  
            return{
                ...state,
                uncatagorised_photos: myArray,
                loading:false
            }

            case DELETE_PDF_FROM_UNCATAGORISED_IN_CHAPTER:
            return{
                ...state,
                singleSubject: {
                    ...state.singleSubject,
                   uncatagorised_note:{
                    ...state.singleSubject.uncatagorised_note,
                    documents: state.singleSubject.uncatagorised_note.documents.filter(document =>
                        document.fileKey !== action.payload.data),
                   }
                },
               subjects: state.subjects.map(
                    (sub) => sub.subject_name === action.payload.subject_name ? 
                    {...sub,
                    uncatagorised_note:{
                        ...sub.uncatagorised_note,
                        documents:sub.uncatagorised_note.documents.filter(document =>
                            document.fileKey !== action.payload.data),
                        }
                }: sub ),
                loading:false
            }

        case DELETE_NOTES_FROM_UNCATAGORISED_IN_CHAPTER:

        const images2 = [];
        state.singleSubject.uncatagorised_note.photos.map(image=> {
        if(image.length >=1){
            return image.map(image=> {
            images2.push(image)
            })
        }
            else {
                images2.push(image)
            } })
             payload_data = action.payload.data;
            // console.log(payload_data)
            myArray = images2.filter( function( el ) {
                const filePath_date = el.path  +'DATE:'+ el.modificationDate
                
              return payload_data.indexOf( filePath_date ) < 0;
            } );
             
              
            
            return{
                ...state,
                singleSubject: {
                    ...state.singleSubject,
                   uncatagorised_note:{
                    ...state.singleSubject.uncatagorised_note,
                    photos: myArray
                   }
                },
               subjects: state.subjects.map(
                    (sub) => sub.subject_name === action.payload.subject_name ? 
                    {...sub,
                    uncatagorised_note:{
                        ...sub.uncatagorised_note,
                        photos:myArray,
                        }
                }: sub ),
                loading:false,
            }

            case DELETE_NOTES_IN_CHAPTER:

            const images3 = [];
            state.singleChapter.notes.photos.map(image=> {
            if(image.length >=1){
                return image.map(image=> {
                images3.push(image)
                })
            }
                else {
                    images3.push(image)
                } })
                 payload_data = action.payload.data;
                 //console.log(payload_data)
                 myArray = images3.filter( function( el ) {
                    const filePath_date = el.path  +'DATE:'+ el.modificationDate
                    
                  return payload_data.indexOf( filePath_date ) < 0;
                } );
                  
                
                return{
                    ...state,

                     singleChapter:{
                    ...state.singleChapter,
                    notes:{
                        ...state.singleChapter.notes,
                        photos:myArray
                    }
                },
                singleSubject: {
                    ...state.singleSubject,
                    chapter:state.singleSubject.chapter.map(chap=> chap.chapter_name === action.payload.chapter_name ? {
                        ...chap, 
                        notes:{
                            ...chap.notes,
                            photos: myArray
                        }
                    } : chap)
                   
                },
                   subjects: state.subjects.map(
                        (sub) => sub.subject_name === action.payload.subject_name ? 
                        {...sub,
                        chapter:sub.chapter.map(chap=> chap.chapter_name === action.payload.chapter_name ? {
                            ...chap, 
                            notes:{
                                ...chap.notes,
                                photos:myArray
                            }
                        } : chap)
                    }: sub ),
                    loading:false,
                }



                case DELETE_PDF_IN_CHAPTER:
            return{
                ...state,
                singleChapter:{
                    ...state.singleChapter,
                    notes:{
                        ...state.singleChapter.notes,
                        documents:   state.singleChapter.notes.documents.filter(document =>
                            document.fileKey !== action.payload.data),
                    }
                },
                singleSubject: {
                    ...state.singleSubject,
                    chapter:state.singleSubject.chapter.map(chap=> chap.chapter_name === action.payload.chapter_name ? {
                        ...chap, 
                       notes:{
                           ...chap.notes,
                           documents: chap.notes.documents.filter(document =>
                            document.fileKey !== action.payload.data),
                       }
                    } : chap),
                  
                },
               subjects: state.subjects.map(
                    (sub) => sub.subject_name === action.payload.subject_name ? 
                    {...sub,
                    chapter: sub.chapter.map(chap=> chap.chapter_name === action.payload.chapter_name ? {
                            ...chap, 
                           notes:{
                               ...chap.notes,
                               documents: chap.notes.documents.filter(document =>
                                document.fileKey !== action.payload.data),
                           }
                        } : chap),
                }: sub ),
                loading:false
            }



            //SET ADD TIME
            case ADD_NOTES_TOUNCATAGORISED_IN_SUBJECT_AD_EXPIRATION: 
                return {
                    ...state,
                    AddNotestoUncatagorisedInSubjectAdExpiraion: action.payload
                }
            case ADD_NOTES_TOUNCATAGORISED_AD_EXPIRATION:
            return{
                ...state,
                AddNotestoUncatagorisedAdExpiraion: action.payload
            }
            case ADD_PDF_TOUNCATAGORISED_AD_EXPIRATION:
            return{
                ...state,
                AddPdftoUncatagorisedAdExpiraion:action.payload
            }
            case DELETE_NOTES_FROMUNCATAGORISED_IN_SUBJECT_AD_EXPIRATION:
            return{
                ...state,
                DeleteNotesfromUncatagorisedinSubjectAdExpiraion: action.payload
            }
            case DELETE_SUBJECT_AD_EXPIRATION:
            return{
                ...state,
                deleteSubjectAdExpiration: action.payload
            }
            case EDIT_CHAPTER_AD_EXPIRATION: 
            return{
                ...state,
                editChapterAdExpiration:action.payload
            }


        default:
            return state;
    }
}