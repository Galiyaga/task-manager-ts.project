import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI, loginPropertiesType } from "../api/api";

export const loginThunk = createAsyncThunk<
  {userId: string, token: string},
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
    const userId = res.data.data.userId.toString()
    const token = res.data.data.token
    localStorage.setItem("userId", userId.toString())
    localStorage.setItem("token", token)

    return { userId, token}
  } catch (error: any) {
    return rejectWithValue(error.message || "Unknown error login");
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
    return rejectWithValue(error.message || "Unknown error logout");
  }
});
