import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { reducer as reduxFormReducer } from "redux-form";
import attListSlice from "../Reducers/attListSlice";
import tourListSlice from "../Reducers/tourListSlice";
import comboListSlice from "../Reducers/comboListSlice";
import attDetailsSlice from "../Reducers/attDetailsSlice";
import authSlice from "../Reducers/authSlice";
import cartDataSlice from "../Reducers/cartDataSlice";
import allConstantValues from "../Reducers/allConstantValues";
const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form"
  attList: attListSlice,
  tourList: tourListSlice,
  comboList: comboListSlice,
  attDetails: attDetailsSlice,
  authData: authSlice,
  cartData: cartDataSlice,
  constandvalues: allConstantValues,
});
const store = configureStore({
  reducer,
});
export { store };
