import { createSlice } from "@reduxjs/toolkit";
import {} from "./todolistsSlice";
import { loginThunk, logoutThunk } from "./authThunk";
const loadAuthState = () => {
  const token = localStorage.getItem("token")
  const userId = localStorage.getItem("userId")

  return token && userId ? {isLogged: true, userId, token} : {isLogged: false, userId: null, token: null}
}

type AuthStateType = {
  auth: {isLogged: boolean, token: string | null, userId: string | null};  
  isLoading: boolean;    
}

const initialState: AuthStateType = {
  auth: loadAuthState(),
  isLoading: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(loginThunk.pending, (state, action) => {
      state.isLoading = true
    })
    .addCase(loginThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.auth.isLogged = true;
      state.auth.userId = action.payload.userId
      state.auth.token = action.payload.token
    })
    .addCase(loginThunk.rejected, (state, action) => {
      state.isLoading = false
    })
    .addCase(logoutThunk.pending, (state, action) => {
      state.isLoading = true
    })
    .addCase(logoutThunk.fulfilled, (state, action) => {
      state.isLoading = false
      state.auth.isLogged = false;
      state.auth.userId = null
      state.auth.token = null

      localStorage.clear()
    })
    .addCase(logoutThunk.rejected, (state, action) => {
      state.isLoading = false
    });
  },
});

export const {} = authSlice.actions;

export const authReducer = authSlice.reducer;
