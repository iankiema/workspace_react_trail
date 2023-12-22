import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk to fetch package detail data
export const fetchPackageDetail = createAsyncThunk('packageDetail/fetchPackageDetail', async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:3001/api/v1/packages/${id}`);
    const data = await response.json();
    console.log("Api:",data)
    return data.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  packageDetail: null,
  status: 'idle',
  error: null,
};

const packageDetailSlice = createSlice({
  name: 'packageDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPackageDetail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPackageDetail.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.packageDetail = action.payload.data;
      })
      .addCase(fetchPackageDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectPackageDetail = (state) => state.packageDetail.packageDetail;
export const selectPackageDetailStatus = (state) => state.packageDetail.status;

export default packageDetailSlice.reducer;