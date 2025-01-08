import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../Others/AxiosInstance";

export const fetchActivityDetails = createAsyncThunk(
  "activity/getAttractionDetailsTravelPack",
  async (postObject) => {
    try {
      const response = await instance.post(
        `getAttractionDetailsTravelPack`,
        postObject
      );
      const activity = response.data;
      console.log("Activity details", activity);
      return activity;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const attDetailsSlice = createSlice({
  name: "allactivity",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivityDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchActivityDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchActivityDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default attDetailsSlice.reducer;
