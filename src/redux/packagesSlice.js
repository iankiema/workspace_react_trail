// packagesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPackages = createAsyncThunk('packages/fetchPackages', async () => {
  const response = await fetch('http://localhost:3001/api/v1/packages');
  const data = await response.json();
  return data.data;
});

const initialState = {
  packages: [],
  status: 'idle',
  error: null,
};

const packagesSlice = createSlice({
  name: 'packages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPackages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.packages = action.payload;
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Thunk
export const fetchPackagesData = () => async (dispatch) => {
  try {
    dispatch(fetchPackages());
  } catch (error) {
    console.error('Error fetching packages:', error);
  }
};

// Selector
export const selectAllPackages = (state) => state.packages.packages;
export const selectPackagesStatus = (state) => state.packages.status;

export default packagesSlice.reducer;
