import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../Others/AxiosInstance";

export const fetchActivityList = createAsyncThunk(
  "activity/getAttractionListB2C",
  async (postObject) => {
    try {
      const response = await instance.post(`getAttractionListB2C`, postObject);
      const activity = response.data;
      console.log("Activity List", activity);
      return activity;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const attListSlice = createSlice({
  name: "allactivity",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivityList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchActivityList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchActivityList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default attListSlice.reducer;
