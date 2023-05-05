import { createSlice } from '@reduxjs/toolkit'

export const newSlice = createSlice({
    name:'news',
    initialState: {
        //Para captar las noticias
        news1:[],
        news2:[],
        news3:[],

        //Para el cargando.
        isLoading:false,

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
            state.isLoading = true;
        },
        uploadEntry: (state, action) => {

        }
    }
})

export const { startLoading } = newSlice.actions