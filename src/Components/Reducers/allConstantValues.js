import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../Others/AxiosInstance";
export const fetchContantLabels = createAsyncThunk(
  "activity/getLabelTranslation",
  async (postObject) => {
    try {
      const response = await instance.post(`getLabelTranslation`, postObject);
      const data = response.data.transTextList;
      console.log("Contatne values", data);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const allConstantValues = createSlice({
  name: "constantvalues",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContantLabels.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContantLabels.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchContantLabels.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default allConstantValues.reducer;
