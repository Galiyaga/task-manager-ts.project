import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterValuesType, TodolistType } from '../AppWithRedux';
import { v1 } from 'uuid';

const initialState: TodolistType[] = [];

const todolistsSlice = createSlice({
    name: "todolists",
    initialState,
    reducers: {
        removeTodolist(state: TodolistType[], action: PayloadAction<string>): TodolistType[] {
            return state.filter((tl) => tl.id !== action.payload)
        },
        addTodolist(state, action: PayloadAction<{title: string, id: string}>) {
            const newTodolist: TodolistType = {
                id: action.payload.id,
                title: action.payload.title,
                filter: "all"
            }
            state.unshift(newTodolist)
        },
        changeTodolistTitle(state, action: PayloadAction<{id: string, title: string}>) {
            const todolist = state.find((tl) => tl.id === action.payload.id);
            if (todolist) todolist.title = action.payload.title;
        },
        changeTodolistFilter(state, action: PayloadAction<{id: string, filter: FilterValuesType}>) {
            const todolist = state.find((tl) => tl.id === action.payload.id);
            if (todolist) todolist.filter = action.payload.filter;
        }
    } 
})

export const {
    removeTodolist,
    addTodolist,
    changeTodolistTitle,
    changeTodolistFilter
} = todolistsSlice.actions

export const todolistsReducer = todolistsSlice.reducer