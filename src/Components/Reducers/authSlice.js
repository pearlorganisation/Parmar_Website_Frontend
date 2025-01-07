import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { AES, enc } from "crypto-js";

const secretKey = "eyJhbGciOiJIUzI1NiJ9";

// Encryption function
const encryptData = (data) => {
  const encryptedData = AES.encrypt(JSON.stringify(data), secretKey).toString();
  return encryptedData;
};

// Decryption function
const decryptData = (encryptedData) => {
  const decryptedData = AES.decrypt(encryptedData, secretKey).toString(
    enc.Utf8
  );
  return JSON.parse(decryptedData);
};

// Check if tpauthToken exists and initialize state accordingly
const tpauthToken = Cookies.get("tpb2cauthtoken");

const initialState = {
  data: tpauthToken ? decryptData(tpauthToken) : null,
  isLoggedIn: tpauthToken ? true : false,
  processState: null,
  currency: Cookies.get("currency") || "AED", // Initialize currency from cookie or default to AED
  language: Cookies.get("language") || "en", // Initialize language from cookie or default to en
};

export const keydata = () => {
  const data = tpauthToken ? decryptData(tpauthToken) : null;
  if (data) {
    const inputString = data.randomKey;

    if (inputString == null) {
      return null;
    } else {
      // Reverse the input string
      const reversedString = inputString.split("").reverse().join("");

      // Split the reversed string into groups of 10 characters
      const splitString = reversedString.match(/.{1,10}/g);

      // Rearrange the groups according to the specified pattern
      const rearrangedString = [
        splitString[4],
        splitString[1],
        splitString[6],
        splitString[5],
        splitString[3],
        splitString[0],
        splitString[9],
        splitString[2],
        splitString[7],
        splitString[8],
      ].join("");
      return rearrangedString;
    }
  }
};

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,

  reducers: {
    login: (state, action) => {
      const user = encryptData(action.payload);
      Cookies.set("tpb2cauthtoken", user, { expires: 7 });
      state.data = user;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      Cookies.remove("tpb2cauthtoken");
      state.data = null;
      state.isLoggedIn = false;
    },
    setCurrency: (state, action) => {
      state.currency = action.payload;
      Cookies.set("currency", action.payload, { expires: 365 });
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
      Cookies.set("language", action.payload, { expires: 365 });
    },
  },
});

export const { login, logout, setCurrency, setLanguage } =
  authenticationSlice.actions;

export default authenticationSlice.reducer;
