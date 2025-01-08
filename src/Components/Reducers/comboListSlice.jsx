import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../Others/AxiosInstance";

export const fetchComboList = createAsyncThunk(
  "allcombo/getComboOfferList",
  async (postObject) => {
    try {
      const response = await instance.post(`getComboOfferList`, postObject);
      const comboList = response.data;
      console.log("Combo List", comboList);

      return comboList;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const comboListSlice = createSlice({
  name: "allcombolist",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComboList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchComboList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchComboList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default comboListSlice.reducer;
