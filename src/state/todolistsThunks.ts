import { createAsyncThunk } from "@reduxjs/toolkit";
import { todolistsAndTasksAPI } from "../api/api";
import { TodolistType } from "../components/AppWithRedux";

export const fetchTodolist = createAsyncThunk<
  TodolistType[],
  void,
  { rejectValue: string | undefined }
>("todolists/fetchTodolists", async (_, { rejectWithValue }) => {
  try {
    const res = await todolistsAndTasksAPI.getTodolists();

    const formattedTodolists: TodolistType[] = res.data.map((apiTodolist) => ({
      id: apiTodolist.id,
      title: apiTodolist.title,
      filter: "all",
    }));

    // сохранение в LC
    localStorage.setItem("todolists", JSON.stringify(formattedTodolists));
    // возвращаем для редьюсера
    return formattedTodolists;
  } catch (error: any) {
    return rejectWithValue(error.message || "Unknown error get todolists");
  }
});

export const createTodolist = createAsyncThunk<
  TodolistType,
  string,
  { rejectValue: string | undefined }
>("todolists/createTodolist", async (title, { rejectWithValue }) => {
  try {
    const res = await todolistsAndTasksAPI.createTodolist(title);

    const formattedTodolist: TodolistType = {
      id: res.data.data.item.id,
      title: res.data.data.item.title,
      filter: "all",
    };
    return formattedTodolist;
  } catch (error: any) {
    return rejectWithValue(error.message  || "Unknown error create todolists");
  }
});

export const deleteTodolist = createAsyncThunk<
  string,
  string,
  { rejectValue: string | undefined }
>("todolists/deleteTodolist", async (id, { rejectWithValue }) => {
  try {
    return id;
  } catch (error: any) {
    return rejectWithValue(error.message  || "Unknown error delete todolists");
  }
});

export const updateTodolist = createAsyncThunk<
  { id: string; title: string },
  { id: string; title: string },
  { rejectValue: string | undefined }
>("todolists/updateTodolists", async ({ id, title }, { rejectWithValue }) => {
  try {
    const res = await todolistsAndTasksAPI.updateTodolist(id, title);
    if (res.data.resultCode !== 0) {
      return rejectWithValue("Failed to update todolist");
    }
    return { id, title };
  } catch (error: any) {
    return rejectWithValue(error.message  || "Unknown error update todolists");
  }
});
