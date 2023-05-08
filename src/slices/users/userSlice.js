import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({

    name: 'users',
    initialState: {
        id_user: null,
        email: null,
        name:null,
        role:null,
        isLoading: false,
        team: null,
        requestState: '',
        users:[],
        emailModified: null,
    },
    reducers: {
        startLoadingUsers: (state) => {
            state.isLoading = true;
            state.requestState = 'loading'
        },
        setUsers: (state, action) => {
            
                state.isLoading = false;
                state.email = action.payload.email;
                state.role = action.payload.role;
                state.name = action.payload.name;
                state.id_user = action.payload.id_user;
                state.team = action.payload.team;
        },
        loginFailed: (state, action) => {
            state.isLoading = false;
            state.email = null;
            state.role = null;
            state.name = null;
            state.id_user = null;
            state.team = null;
        },
        setTeam: (state, action) => {
            state.team = action.payload.team
            state.isLoading = false;
            state.requestState = 'successfull'
        },
        requestFailed: (state, action) => {
            state.requestState = 'failed'
        },
        getTheUsers: (state, action) => {
            state.users = action.payload.users
            console.log(state.users)
        },
        roleModified: (state, action) => {
            state.emailModified = action.payload.email
            state.requestState = 'roleModified'
        }
    }

})

export const { startLoadingUsers, setUsers, loginFailed, setTeam, requestFailed, getTheUsers,
roleModified } = userSlice.actions