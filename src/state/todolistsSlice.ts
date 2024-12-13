import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterValuesType, TodolistType } from "../components/AppWithRedux";
import {
  createTodolist,
  deleteTodolist,
  fetchTodolist,
  updateTodolist,
} from "./todolistsThunks";

const initialState: TodolistType[] = [];

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
    },
  }, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolist.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(createTodolist.fulfilled, (state, action) => {
        state.unshift(action.payload);
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        return state.filter((tl) => tl.id !== action.payload);
      })
      .addCase(updateTodolist.fulfilled, (state, action) => {
        const todolist = state.find((tl) => tl.id === action.payload.id);
        if (todolist) todolist.title = action.payload.title;
      });
  },
});

export const {
  changeTodolistFilter,
} = todolistsSlice.actions;

export const todolistsReducer = todolistsSlice.reducer;
