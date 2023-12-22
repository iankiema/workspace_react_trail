// userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
};

// Try to get user data from local storage
const storedUserData = localStorage.getItem('userData');
if (storedUserData) {
  initialState.currentUser = JSON.parse(storedUserData).extractedUserData;
}


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;

export const selectCurrentUser = (state) => state.user.currentUser;

export default userSlice.reducer;
