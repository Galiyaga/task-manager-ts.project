import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { TaskType } from "../components/Todolist";
import {
  PartialUpdateTaskModelType,
  todolistsAndTasksAPI,
  UpdateTaskModelType,
} from "../api/api";
import { TasksStateType } from "../components/AppWithRedux";

export const getTasks = createAsyncThunk<
  { tasksArr: TaskType[]; todolistId: string },
  string,
  { rejectValue: string | undefined }
>("tasks/getTasks", async (todolistId, { rejectWithValue }) => {
  try {
    const res = await todolistsAndTasksAPI.getTasks(todolistId);

    const formattedTasks: TaskType[] = res.data.items.map((apiTask) => ({
      id: apiTask.id,
      title: apiTask.title,
      isDone: !!apiTask.status,
    }));

    // сохранение в LC
    const tasksFromLS = localStorage.getItem("tasks");
    const tasksState: TasksStateType = tasksFromLS
      ? JSON.parse(tasksFromLS)
      : {};

    tasksState[todolistId] = formattedTasks;
    localStorage.setItem("tasks", JSON.stringify(tasksState));
    // возвращаем для редьюсера
    return { tasksArr: formattedTasks, todolistId };
  } catch (error: any) {
    return rejectWithValue(error.message || "Unknown error get tasks");
  }
});
export const createTask = createAsyncThunk<
  { task: TaskType; todolistId: string },
  { todolistId: string; title: string },
  { rejectValue: string | undefined }
>("tasks/createTask", async ({ todolistId, title }, { rejectWithValue }) => {
  try {
    const res = await todolistsAndTasksAPI.createTask(todolistId, title);

    const formattedTask: TaskType = {
      id: res.data.data.item.id,
      title: res.data.data.item.title,
      isDone: false,
    };

    return { task: formattedTask, todolistId };
  } catch (error: any) {
    return rejectWithValue(error.message || "Unknown error create tasks");
  }
});

export const deleteTask = createAsyncThunk<
  { todolistId: string; taskId: string },
  { todolistId: string; taskId: string },
  { rejectValue: string | undefined }
>("tasks/deleteTask", async ({ todolistId, taskId }, { rejectWithValue }) => {
  try {
    const res = await todolistsAndTasksAPI.deleteTask(todolistId, taskId);

    return { todolistId, taskId };
  } catch (error: any) {
    return rejectWithValue(error.message || "Unknown error delete tasks");
  }
});

export const updateTasksTitle = createAsyncThunk<
  { todolistId: string; taskId: string; title: string },
  { todolistId: string; taskId: string; model: UpdateTaskModelType },
  { rejectValue: string | undefined }
>(
  "tasks/updateTasksTitle",
  async ({ todolistId, taskId, model }, { rejectWithValue }) => {
    try {

      const res = await todolistsAndTasksAPI.updateTask(
        todolistId,
        taskId,
        model
      );

      const title = model.title;
      if (res.data.resultCode !== 0) {
        return rejectWithValue(`Failed to update tasks title, resultCode: ${res.data.resultCode }`);
      }
      return { todolistId, taskId, title };
    } catch (error: any) {
      return rejectWithValue(error.message || "Unknown error update tasks");
    }
  }
);

export const updateTasksStatus = createAsyncThunk<
  { todolistId: string; taskId: string; model: {status: boolean, title: string} },
  { todolistId: string; taskId: string; model: UpdateTaskModelType },
  { rejectValue: string | undefined }
>(
  "tasks/updateTasksStatus",
  async ({ todolistId, taskId, model }, { rejectWithValue }) => {
    try {
      const res = await todolistsAndTasksAPI.updateTask(
        todolistId,
        taskId,
        model
      );

      const status = Boolean(model.status);
      console.log('status', status)
      if (res.data.resultCode !== 0) {
        return rejectWithValue(`Failed to update tasks status: ${res.data.messages }`);
      }
      return { todolistId, taskId, model: {status, title: model.title} };
    } catch (error: any) {
      return rejectWithValue(error.message || "Unknown error update tasks");
    }
  }
);
