import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../Others/AxiosInstance";

export const fetchCartDetails = createAsyncThunk(
  "cartallData/getCartInfoList",
  async (postObject) => {
    try {
      console.log(`${JSON.stringify(postObject, null, 2)}`);
      const response = await instance.post(`getCartInfoList`, postObject);
      const cartData = response.data;
      console.log("Cart Details", cartData);
      return cartData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const cartDataSlice = createSlice({
  name: "cartallData",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCartDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchCartDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default cartDataSlice.reducer;
