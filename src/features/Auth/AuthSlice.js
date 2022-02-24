import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserCredential = createAsyncThunk(
  "Authenticate/fetchUserCredential",
  async ({ username, password }) => {
    const url = "http://chat-server-challenge.herokuapp.com/login";
    const data = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });
    const response = await data.json();
    console.log(response);
    return response;
  }
);

const initialState = {
  userInfo: [],
  name: "",
  password: "",
  loading: false,
  isloading: false,
  hasError: false,
};

const AuthSlice = createSlice({
  name: "Authenticate",
  initialState,
  reducers: {
    addUsers: (state, action) => {
      state.name = action.payload;
    },
    addPassword: (state, action) => {
      state.password = action.payload;
    },
    // showLoader: (state) => {
    //   state.loading = true;
    // },
    // hideLoader: (state) => {
    //   state.loading = false;
    // },
  },
  extraReducers: {
    [fetchUserCredential.pending]: (state) => {
      state.isloading = true;
      state.hasError = false;
    },
    [fetchUserCredential.fulfilled]: (state) => {
      state.isloading = false;
      state.hasError = false;
    },
    [fetchUserCredential.rejected]: (state) => {
      state.isloading = false;
      state.hasError = true;
    },
  },
});

export const { addUsers, addPassword, showLoader, hideLoader } =
  AuthSlice.actions;

export default AuthSlice.reducer;
