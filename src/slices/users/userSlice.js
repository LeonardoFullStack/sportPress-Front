import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({

    name: 'users',
    initialState: {
        id_user: null,
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
                state.name = action.payload.name;
                state.id_user = action.payload.id_user;
        },
        loginFailed: (state, action) => {
            state.isLoading = false;
            state.email = null;
            state.role = null;
            state.name = null;
            state.id_user = null;
        },
        logOut: (state, action) => {
            
        }
    }

})

export const { startLoadingUsers, setUsers, loginFailed } = userSlice.actions