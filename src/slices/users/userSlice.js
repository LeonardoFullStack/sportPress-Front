import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({

    name: 'users',
    initialState: {
        email: null,
        name:null,
        role:null,
        isLoading: false,
    },
    reducers: {
        startLoadingUsers: (state) => {
            state.isLoading = true;
        },
        setUsers: (state, action) => {
            
                state.isLoading = false;
                state.email = action.payload.email;
                state.role = action.payload.role;
                state.name = action.payload.name
            /* console.log(store.getState().users) */
        },
        loginFailed: (state, action) => {
            state.isLoading = false;
            state.email = null;
            state.role = null;
            state.name = null;
        }
    }

})

export const { startLoadingUsers, setUsers, loginFailed } = userSlice.actions