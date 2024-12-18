import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterValuesType, TodolistType } from "../components/AppWithRedux";
import {
  createTodolist,
  deleteTodolist,
  fetchTodolist,
  updateTodolist,
} from "./todolistsThunks";

// получаем тудулисты или пустой массив с LC
const loadTodolistsState = () => {
  const todolists = localStorage.getItem("todolists");

  return todolists ? JSON.parse(todolists) : [];
};

const initialState: TodolistType[] = loadTodolistsState();

const todolistsSlice = createSlice({
  name: "todolists",
  initialState,
  reducers: {
    changeTodolistFilter(
      state,
      action: PayloadAction<{ id: string; filter: FilterValuesType }>
    ) {
      const todolist = state.find((tl) => tl.id === action.payload.id);
      if (todolist) todolist.filter = action.payload.filter;
      saveTodolistsToLocalStorage(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolist.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(createTodolist.fulfilled, (state, action) => {
        state.unshift(action.payload);
        saveTodolistsToLocalStorage(state);
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        const updateState = state.filter((tl) => tl.id !== action.payload);
        saveTodolistsToLocalStorage(updateState);
        return updateState;
      })
      .addCase(updateTodolist.fulfilled, (state, action) => {
        const todolist = state.find((tl) => tl.id === action.payload.id);
        if (todolist) todolist.title = action.payload.title;
        saveTodolistsToLocalStorage(state);
      });
  },
});

// обобщенная ф-ия для сохранения в LC
const saveTodolistsToLocalStorage = (state: TodolistType[]) => {
  localStorage.setItem("todolists", JSON.stringify(state));
};

export const { changeTodolistFilter } = todolistsSlice.actions;

export const todolistsReducer = todolistsSlice.reducer;
