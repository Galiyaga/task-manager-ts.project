import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TasksStateType } from "../AppWithRedux";
import { TaskType } from '../Todolist'
import { v1 } from "uuid";
import { addTodolist, removeTodolist } from "./todolistsSlice";

const initialState: TasksStateType = {};

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        removeTask(state, action: PayloadAction<{taskId: string, todolistId: string}>){
            state[action.payload.todolistId] = state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
        },
        addTask(state, action: PayloadAction<{title: string, todolistId: string}>) {
            const newTask: TaskType = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            }
            state[action.payload.todolistId].unshift(newTask)
        },
        changeTaskStatus(state, action: PayloadAction<{taskId: string, todolistId: string, isDone: boolean}>){
            const task =  state[action.payload.todolistId].find(t => t.id === action.payload.taskId)
            if (task) task.isDone = action.payload.isDone
        },
        changeTaskTitle(state, action: PayloadAction<{taskId: string, todolistId: string, title: string}>){
            const task =  state[action.payload.todolistId].find(t => t.id === action.payload.taskId)
            if (task) task.title = action.payload.title
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolist, (state, action) => {
            state[action.payload.todolistId] = []
        }),
        builder.addCase(removeTodolist, (state, action) => {
            delete state[action.payload]
        })
    }
})

export const {
    removeTask,
    addTask,
    changeTaskStatus,
    changeTaskTitle
} = tasksSlice.actions

export const tasksReducer = tasksSlice.reducer
