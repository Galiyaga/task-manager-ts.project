import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { TaskType } from "../Todolist";
import {
  todolistsAndTasksAPI,
  UpdateTaskModelType,
} from "../api/todolists-tasks-api";

export const getTasks = createAsyncThunk<
  TaskType[],
  string,
  { rejectValue: string }
>("tasks/getTasks", async (todolistId, { rejectWithValue }) => {
  try {
    const res = await todolistsAndTasksAPI.getTasks(todolistId);

    const formattedTasks: TaskType[] = res.data.items.map((apiTask) => ({
      id: apiTask.id,
      title: apiTask.title,
      isDone: apiTask.completed,
    }));

    return formattedTasks;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
export const createTask = createAsyncThunk<
  TaskType,
  { todolistId: string; title: string },
  { rejectValue: string }
>("tasks/createTasks", async ({ todolistId, title }, { rejectWithValue }) => {
  try {
    const res = await todolistsAndTasksAPI.createTask(todolistId, title);

    const formattedTask: TaskType = {
      id: res.data.data.id,
      title: res.data.data.title,
      isDone: res.data.data.completed,
    };

    return formattedTask;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const deleteTask = createAsyncThunk<
  string,
  { todolistId: string; taskId: string },
  { rejectValue: string }
>("tasks/deleteTasks", async ({ todolistId, taskId }, { rejectWithValue }) => {
  try {
    const res = await todolistsAndTasksAPI.deleteTask(todolistId, taskId);

    return taskId;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const updateTask = createAsyncThunk<
  { todolistId: string, taskId: string, title: string, completed: boolean},
  { todolistId: string, taskId: string; model: UpdateTaskModelType },
  { rejectValue: string }
>(
  "tasks/updateTasks",
  async ({ todolistId, taskId, model }, { rejectWithValue }) => {
    try {
      const res = await todolistsAndTasksAPI.updateTask(
        todolistId,
        taskId,
        model
      );

      const title = model.title
      const completed = model.completed
      if (res.data.resultCode !== 0) {
        return rejectWithValue("Failed to update task");
      }
      return { todolistId, taskId, title, completed};
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
