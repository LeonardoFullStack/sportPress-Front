import { createSlice } from '@reduxjs/toolkit'

export const newSlice = createSlice({
    name:'news',
    initialState: {
        //Para captar las noticias
        news1:[],
        news2:[],
        news3:[],

        //Para el cargando.
        requestState:'',

        //Para subir las noticias
        updated:false,
        newTitle:null,
        newText:null,
        newExtract:null,
        newImage:null,
        newTags:null,
        newDate:null,
        id_new:null,
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
        getLast4News: (state, action) => {

            state.news1 = action.payload.data
            state.requestState = 'successfull'
        }
    }
})

export const { startLoading, uploadInput, resetRequestState, getLast4News } = newSlice.actions