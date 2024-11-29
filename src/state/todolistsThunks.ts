import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { todolistsAPI } from "../api/todolists-tasks-api";
import { TodolistType } from "../AppWithRedux";

export const fetchTodolist = createAsyncThunk<
  TodolistType[],
  void,
  { rejectValue: string }
>("todolists/fetchTodolists", async (_, { rejectWithValue }) => {
  try {
    const res = await todolistsAPI.getTodolists();

    const formattedTodolists: TodolistType[] = res.data.map((apiTodolist) => ({
      id: apiTodolist.id,
      title: apiTodolist.title,
      filter: "all",
    }));

    return formattedTodolists;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const createTodolist = createAsyncThunk<
  TodolistType,
  string,
  { rejectValue: string }
>("todolists/addTodolist", async (title, { rejectWithValue }) => {
  try {
    const res = await todolistsAPI.createTodolist(title);

    const formattedTodolist: TodolistType = {
      id: res.data.data.item.id,
      title: res.data.data.item.title,
      filter: "all",
    };
    return formattedTodolist;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const deleteTodolists = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("todolists/deleteTodolists", async (id, { rejectWithValue }) => {
  try {
    const res = await todolistsAPI.deleteTodolist(id);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const updateTodolists = createAsyncThunk<
  { id: string; title: string },
  { id: string; title: string },
  { rejectValue: string }
>("todolists/updateTodolists", async ({ id, title }, { rejectWithValue }) => {
  try {
    const res = await todolistsAPI.updateTodolist(id, title);
    if (res.data.resultCode !== 0) {
      return rejectWithValue("Failed to update todolist");
    }
    return { id, title };
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});