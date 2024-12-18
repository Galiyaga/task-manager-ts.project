import { createAsyncThunk } from "@reduxjs/toolkit";
import { todolistsAndTasksAPI } from "../api/api";
import { TodolistType } from "../components/AppWithRedux";

export const fetchTodolist = createAsyncThunk<
  TodolistType[],
  void,
  { rejectValue: string }
>("todolists/fetchTodolists", async (_, { rejectWithValue }) => {
  try {
    const res = await todolistsAndTasksAPI.getTodolists();

    const formattedTodolists: TodolistType[] = res.data.map((apiTodolist) => ({
      id: apiTodolist.id,
      title: apiTodolist.title,
      filter: "all",
    }));

    // сохранение в LC
    localStorage.setItem("todolists", JSON.stringify(formattedTodolists))
    // возвращаем для редьюсера
    return formattedTodolists;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const createTodolist = createAsyncThunk<
  TodolistType,
  string,
  { rejectValue: string }
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
    return rejectWithValue(error.message);
  }
});

export const deleteTodolist = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("todolists/deleteTodolist", async (id, { rejectWithValue }) => {
  try {
    const res = await todolistsAndTasksAPI.deleteTodolist(id);
    return id;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const updateTodolist = createAsyncThunk<
  { id: string; title: string },
  { id: string; title: string },
  { rejectValue: string }
>("todolists/updateTodolists", async ({ id, title }, { rejectWithValue }) => {
  try {
    const res = await todolistsAndTasksAPI.updateTodolist(id, title);
    if (res.data.resultCode !== 0) {
      return rejectWithValue("Failed to update todolist");
    }
    return { id, title };
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
