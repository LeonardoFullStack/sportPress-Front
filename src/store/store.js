import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from '../slices/users/userSlice'
import { newSlice } from '../slices/news/newSlice';

export const store = configureStore({
  reducer: {
      users: userSlice.reducer,
      news: newSlice.reducer
  },
})



export default store;