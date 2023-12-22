// loginSlice.js

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setCurrentUser, clearCurrentUser } from './userSlice';

const initialState = {
  value: {},
  loggedin: 'empty',
  status: 'idle',
  error: 'no errors yet',
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData, { dispatch }) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/logged_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userData }), // Wrap userData in a "user" key
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      const extractedUserData = {
        id: data.user.id,
        email: data.user.email,
        username: data.user.username,
        token: data.token,
      };

      console.log('Extracted User Data:', extractedUserData);

      dispatch(setCurrentUser(extractedUserData));

      // Store the data along with a timestamp
      const expirationTime = new Date().getTime() + 1 * 60 * 60 * 1000; // 1 hour
      const dataToStore = {
        extractedUserData,
        expirationTime,
      };

      localStorage.setItem('userData', JSON.stringify(dataToStore));

      return data; // You might want to adjust this based on your API response structure
    } catch (error) {
      throw new Error('Something went wrong with creating the user');
    }
  },
);

const loginSlice = createSlice({
  name: 'login_auths',
  initialState,
  reducers: {
    checkLoginStatus: (state) => {
      const key = 'userData'; // Corrected the key
      const storedData = localStorage.getItem(key);

      if (storedData !== null) {
        // Check if the data has expired
        const parsedData = JSON.parse(storedData);
        const currentTime = new Date().getTime();

        if (parsedData.expirationTime && currentTime > parsedData.expirationTime) {
          localStorage.removeItem(key); // Clear expired data
          return {
            ...state,
            loggedin: 'false',
          };
        }

        return {
          ...state,
          loggedin: 'true',
        };
      }

      return {
        ...state,
        loggedin: 'false',
      };
    },
    // logoutUser: (state) => {
    //   localStorage.removeItem('userData');
    //   state.loggedin = 'false';
    //   state.status = 'idle';
    //   state.error = 'no errors yet';
    //   clearCurrentUser(state); // Dispatch clearCurrentUser to reset user data
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => ({
        ...state,
        loggedin: 'false',
        status: 'loading',
      }))
      .addCase(loginUser.fulfilled, (state, action) => ({
        // Update the state with the received user data
        ...state,
        loggedin: 'true',
        value: action.payload,
        status: 'done',
      }))
      .addCase(loginUser.rejected, (state, action) => ({
        ...state,
        loggedin: 'false',
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export const { checkLoginStatus, logoutUser } = loginSlice.actions;
export default loginSlice.reducer;
