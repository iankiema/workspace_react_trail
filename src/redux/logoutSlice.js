// logoutSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { dispatch }) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/logout', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // You might need to include authentication headers like the token
          // Example: 'Authorization': `Bearer ${yourAuthToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Clear any local storage or state data related to the user upon successful logout
      localStorage.clear();

      // You might want to dispatch other actions indicating the successful logout
      // dispatch(someOtherAction());

      return true; // You might want to adjust this based on your API response structure
    } catch (error) {
      throw new Error('Something went wrong with the logout');
    }
  },
);

const initialState = {
  status: 'idle',
  error: null,
};

const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.pending, (state) => {
        return {
          ...state,
          status: 'loading',
          error: null,
        };
      })
      .addCase(logoutUser.fulfilled, (state) => {
        return {
          ...state,
          status: 'succeeded',
          error: null,
        };
      })
      .addCase(logoutUser.rejected, (state, action) => {
        return {
          ...state,
          status: 'failed',
          error: action.error.message,
        };
      });
  },
});

export const {} = logoutSlice.actions;
export default logoutSlice.reducer;
