import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './userSlice';
import { selectPackageDetail } from './packageDetailSlice';
const { getState } = require('@reduxjs/toolkit');

// Thunk to fetch user reservations
export const fetchUserReservations = createAsyncThunk(
  'reservations/fetchUserReservations',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/packages/${userId}/reservations`);
      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to make a reservation
export const makeReservation = createAsyncThunk(
  'reservations/makeReservation',
  async ({ location, date }, { rejectWithValue, getState }) => {
    try {

        const state = getState();
        const user = selectCurrentUser(state);

        if (!user || !user.id) {
            throw new Error('User information not available');
        }

      const chosenPackage =selectPackageDetail(state);

      console.log(chosenPackage.id)

      const response = await fetch('http://localhost:3001/api/v1/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id,
          package_id: chosenPackage,
          location,
          date,
        }),
      });

      const data = await response.json();
      console.log("Reservations:",data)
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState: {
    userReservations: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserReservations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserReservations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userReservations = action.payload;
      })
      .addCase(fetchUserReservations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(makeReservation.fulfilled, (state, action) => {
        state.userReservations.push(action.payload);
      });
  },
});

// Selector
export const selectAllReservations = (state) => state.reservations.userReservations;
export const selectReservationsStatus = (state) => state.reservations.status;

export default reservationsSlice.reducer;
