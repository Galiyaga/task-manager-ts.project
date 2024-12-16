import { createSlice } from "@reduxjs/toolkit";
import {} from "./todolistsSlice";
import { loginThunk, logoutThunk } from "./authThunk";

const loadAuthState = () => {
  const token = localStorage.getItem("token")
  const userId = localStorage.getItem("userId")

  return token && userId ? {isLogged: true, userId, token} : {isLogged: false, userId: null, token: null}
}

const initialState = loadAuthState()

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(loginThunk.fulfilled, (state, action) => {
      state.isLogged = true;
      state.userId = action.payload.userId
      state.token = action.payload.token
    })
    .addCase(logoutThunk.fulfilled, (state, action) => {
      state.isLogged = false;
      state.userId = null
      state.token = null

      localStorage.removeItem("token")
      localStorage.removeItem("userId")
    });
  },
});

export const {} = authSlice.actions;

export const authReducer = authSlice.reducer;
