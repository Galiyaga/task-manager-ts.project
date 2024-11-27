import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterValuesType, TodolistType } from "../AppWithRedux";
import {
  createTodolist,
  deleteTodolists,
  fetchTodolist,
  updateTodolists,
} from "./todolistsThunks";

const initialState: TodolistType[] = [];

const todolistsSlice = createSlice({
  name: "todolists",
  initialState,
  reducers: {
    // removeTodolist(state: TodolistType[], action: PayloadAction<string>): TodolistType[] {
    //     return state.filter((tl) => tl.id !== action.payload)
    // },
    // addTodolist(state, action: PayloadAction<{title: string, id: string}>) {
    //     const newTodolist: TodolistType = {
    //         id: action.payload.id,
    //         title: action.payload.title,
    //         filter: "all"
    //     }
    //     state.unshift(newTodolist)
    // },
    // changeTodolistTitle(state, action: PayloadAction<{id: string, title: string}>) {
    //     const todolist = state.find((tl) => tl.id === action.payload.id);
    //     if (todolist) todolist.title = action.payload.title;
    // },
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
      .addCase(deleteTodolists.fulfilled, (state, action) => {
        return state.filter((tl) => tl.id !== action.payload);
      })
      .addCase(updateTodolists.fulfilled, (state, action) => {
        const todolist = state.find((tl) => tl.id === action.payload.id);
        if (todolist) todolist.title = action.payload.title;
      });
  },
});

export const {
//  removeTodolist,
//  addTodolist,
//  changeTodolistTitle,
  changeTodolistFilter,
} = todolistsSlice.actions;

export const todolistsReducer = todolistsSlice.reducer;
