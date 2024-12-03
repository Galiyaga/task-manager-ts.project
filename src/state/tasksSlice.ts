import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TasksStateType } from "../AppWithRedux";
import { TaskType } from "../Todolist";
import { v1 } from "uuid";
import {} from "./todolistsSlice";
import { createTask, deleteTask, getTasks, updateTask } from "./tasksThunk";
import { createTodolist, deleteTodolist } from "./todolistsThunks";

const initialState: TasksStateType = {};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasksArr;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state[action.payload.todolistId].unshift(action.payload.task);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state[action.payload.todolistId] = state[
          action.payload.todolistId
        ].filter((t) => t.id !== action.payload.taskId);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const task = state[action.payload.todolistId].find(
          (t) => t.id === action.payload.taskId
        );
        if (task) {
          task.title = action.payload.title;
          task.isDone = action.payload.completed;
        }
      })
      .addCase(createTodolist.fulfilled, (state, action) => {
        state[action.payload.id] = [];
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        delete state[action.payload]
      })
  },
});

export const {} = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;
