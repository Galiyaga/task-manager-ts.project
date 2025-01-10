import { createSlice } from "@reduxjs/toolkit";
import {} from "./todolistsSlice";
import { loginThunk, logoutThunk } from "./authThunk";
const loadAuthState = () => {
  const userId = localStorage.getItem("userId")

  return userId ? {isLogged: true, userId} : {isLogged: false, userId: null}
}

type AuthStateType = {
  auth: {isLogged: boolean, userId: string | null};  
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

      localStorage.clear()
    })
    .addCase(logoutThunk.rejected, (state, action) => {
      state.isLoading = false
    });
  },
});

export const {} = authSlice.actions;

export const authReducer = authSlice.reducer;
