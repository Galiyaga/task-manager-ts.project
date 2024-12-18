import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TasksStateType } from "../components/AppWithRedux";
import {} from "./todolistsSlice";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTasksTitle,
} from "./tasksThunk";
import { createTodolist, deleteTodolist } from "./todolistsThunks";

// получаем таски или пустой объект с LC
const loadTasksState = () => {
  const tasks = localStorage.getItem("tasks");

  return tasks ? JSON.parse(tasks) : {};
};

const initialState: TasksStateType = loadTasksState();

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    updateTasksStatus(
      state,
      action: PayloadAction<{
        todolistId: string;
        taskId: string;
        isDone: boolean;
      }>
    ) {
      const task = state[action.payload.todolistId].find(
        (t) => t.id === action.payload.taskId
      );
      if (task) task.isDone = action.payload.isDone;
      saveTasksToLocalStorage(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasksArr;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state[action.payload.todolistId].unshift(action.payload.task);
        saveTasksToLocalStorage(state);
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state[action.payload.todolistId] = state[
          action.payload.todolistId
        ].filter((t) => t.id !== action.payload.taskId);
        saveTasksToLocalStorage(state);
      })
      .addCase(updateTasksTitle.fulfilled, (state, action) => {
        const task = state[action.payload.todolistId].find(
          (t) => t.id === action.payload.taskId
        );
        if (task) task.title = action.payload.title;
        saveTasksToLocalStorage(state);
      })
      .addCase(createTodolist.fulfilled, (state, action) => {
        state[action.payload.id] = [];
        saveTasksToLocalStorage(state);
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        delete state[action.payload];
        saveTasksToLocalStorage(state);
      });
  },
});

// обобщенная ф-ия для сохранения в LC
const saveTasksToLocalStorage = (state: TasksStateType) => {
  localStorage.setItem("tasks", JSON.stringify(state));
};

export const { updateTasksStatus } = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;
