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
        stateNews: {
            aproved:[],
            pending:[],
            rejected:[],
        },
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
        newState: null,
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
            state.newState = action.payload.state
            state.requestState = 'successfull'
        },
        deleteAComment: (state, action) => {
           
            const newComments = state.comments.filter((item)=> item.id_comment != action.payload.id)
            state.comments = newComments
         
            state.requestState = 'successfull'
        },
        createaComment: (state, action) => {
            state.comments = action.payload.data
        },
        getPendingNewsReducer: (state, action) => {
            state.pendingNews = action.payload.data
            
        },
        updateStateNew: (state, action) => {
            state.pendingNews = state.pendingNews.filter(news => news.id_new !== action.payload.id_new);
            state.requestState = 'successfullStateNew'
        },
        getStateNewsAproved: (state,action) => {
            state.stateNews.aproved =  action.payload.aproved
        },
        getStateNewsPending: (state,action) => {
            state.stateNews.pending =  action.payload.pending
        },
        getStateNewsRejected: (state,action) => {
            state.stateNews.rejected =  action.payload.rejected
        },
        
    }
})

export const {
     startLoading, uploadInput, resetRequestState, getTheNews, getSingleNew,deleteAComment,createaComment,
     getPendingNewsReducer, updateStateNew, getStateNewsAproved, getStateNewsRejected, getStateNewsPending
     } = newSlice.actions