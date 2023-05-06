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
        }
    }
})

export const { startLoading, uploadInput } = newSlice.actions