import { createSlice } from "@reduxjs/toolkit";
import {} from "./todolistsSlice";
import { loginThunk, logoutThunk } from "./authThunk";

const initialState = {
  isLogged: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(loginThunk.fulfilled, (state, action) => {
      initialState.isLogged = true;
    })
    .addCase(logoutThunk.fulfilled, (state, action) => {
      initialState.isLogged = false;
    });
  },
});

export const {} = authSlice.actions;

export const tasksReducer = authSlice.reducer;
