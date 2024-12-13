import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI, loginPropertiesType } from "../api/api";
import { fetchTodolist } from "./todolistsThunks";
import { AppDispatch } from "./store";

export const loginThunk = createAsyncThunk<
  void,
  loginPropertiesType,
  { rejectValue: string }
>("auth/loginThunk", async (data, { rejectWithValue }) => {
  try {
    const res = await authAPI.login(data);
    if (res.data.resultCode !== 0) {
      return rejectWithValue(
        `Error login: resultCode returned with value ${res.data.resultCode}`
      );
    }
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const logoutThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>("auth/logoutThunk", async (_,{ rejectWithValue }) => {
  try {
    const res = await authAPI.logout();
    if (res.data.resultCode !== 0) {
      return rejectWithValue(
        `Error logout: resultCode returned with value ${res.data.resultCode}`
      );
    }
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
