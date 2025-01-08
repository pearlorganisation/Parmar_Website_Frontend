import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../Others/AxiosInstance";

export const fetchToursList = createAsyncThunk(
  "alltours/gettourpackageall",
  async (postObject) => {
    try {
      const response = await instance.post(`gettourpackageall`, postObject);
      const tourslist = response.data;
      console.log("Tour List", tourslist);
      return tourslist;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const tourListSlice = createSlice({
  name: "atttours",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchToursList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchToursList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchToursList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default tourListSlice.reducer;
