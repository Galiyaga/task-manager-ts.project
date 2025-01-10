import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI, loginPropertiesType } from "../api/api";

export const loginThunk = createAsyncThunk<
  { userId: string },
  loginPropertiesType,
  { rejectValue: string | undefined }
>("auth/loginThunk", async (data, { rejectWithValue }) => {
  try {
    const res = await authAPI.login(data);
    if (res.data.resultCode !== 0) {
      return rejectWithValue(
        `Error login: ${res.data.messages}`
      );
    }
    const userId = res.data.data.userId.toString();
    localStorage.setItem("userId", userId);

    return { userId };
  } catch (error: any) {
    return rejectWithValue(error.message || "Unknown error login");
  }
});

export const logoutThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: string | undefined }
>("auth/logoutThunk", async (_, { rejectWithValue }) => {
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
