import { createSlice } from '@reduxjs/toolkit'

export const newSlice = createSlice({
    name:'news',
    initialState: {
        //Para captar las noticias
        news1:[],
        news2:[],
        singleNew:{},
        comments:[],
        pendingNews:[],
        //Para el cargando.
        requestState:'',

        //Para subir las noticias
        updated:false,
        newTitle:null,
        newText:null,
        newExtract:null,
        newImage:null,
        newAltImage:null,
        newTags:null,
        newDate:null,
        id_new:null,
        id_newUser:null,
    },
    reducers: {
        startLoading: (state) => {
            state.requestState = 'loading';
        },
        uploadInput: (state, action) => {
            
            state.requestState = 'successfull';
        },
        resetRequestState: (state, action) => {
            state.requestState = ''
        },
        requestFailed: (state, action) => {
            state.requestState = 'failed'
        },
        getTheNews: (state, action) => {
            console.log(action.payload.data1)
            state.news1 = action.payload.data1
            state.news2 = action.payload.data2
            state.requestState = 'successfull'
            
        },
        getSingleNew: (state, action) => {
            state.newTitle = action.payload.title
            state.newText = action.payload.text
            state.id_new = action.payload.id_new
            state.newExtract = action.payload.extract
            state.newImage = action.payload.image
            state.newTags = action.payload.tags
            state.newDate = action.payload.date
            state.id_newUser = action.payload.id_user
            state.newAltImage = action.payload.altImage
            state.comments = action.payload.comments
            state.requestState = 'successfull'
        },
        deleteAComment: (state, action) => {
            console.log(action.payload.id)
            const newComments = state.comments.filter((item)=> item.id_comment != action.payload.id)
            state.comments = newComments
            console.log(newComments)
            state.requestState = 'successfull'
        },
        createaComment: (state, action) => {
            state.comments = action.payload.data
        },
        getPendingNewsReducer: (state, action) => {
            state.pendingNews = action.payload.data
            console.log(state.pendingNews)
        },
        updateStateNew: (state, action) => {
            state.pendingNews = state.pendingNews.filter(news => news.id_new !== action.payload.id_new);
            state.requestState = 'successfullStateNew'
        }
        
    }
})

export const {
     startLoading, uploadInput, resetRequestState, getTheNews, getSingleNew,deleteAComment,createaComment,
     getPendingNewsReducer, updateStateNew
     } = newSlice.actions