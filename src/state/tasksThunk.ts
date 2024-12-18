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
  { rejectValue: string }
>("tasks/getTasks", async (todolistId, { rejectWithValue }) => {
  try {
    const res = await todolistsAndTasksAPI.getTasks(todolistId);

    const formattedTasks: TaskType[] = res.data.items.map((apiTask) => ({
      id: apiTask.id,
      title: apiTask.title,
      isDone: false,
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
    return rejectWithValue(error.message);
  }
});
export const createTask = createAsyncThunk<
  { task: TaskType; todolistId: string },
  { todolistId: string; title: string },
  { rejectValue: string }
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
    return rejectWithValue(error.message);
  }
});

export const deleteTask = createAsyncThunk<
  { todolistId: string; taskId: string },
  { todolistId: string; taskId: string },
  { rejectValue: string }
>("tasks/deleteTask", async ({ todolistId, taskId }, { rejectWithValue }) => {
  try {
    const res = await todolistsAndTasksAPI.deleteTask(todolistId, taskId);

    return { todolistId, taskId };
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const updateTasksTitle = createAsyncThunk<
  { todolistId: string; taskId: string; title: string },
  { todolistId: string; taskId: string; model: UpdateTaskModelType },
  { rejectValue: string }
>(
  "tasks/updateTasksTitle",
  async ({ todolistId, taskId, model }, { rejectWithValue }) => {
    try {
      console.log("todolistId: ", todolistId);
      console.log("taskId: ", taskId);
      console.log("model: ", model);

      const res = await todolistsAndTasksAPI.updateTask(
        todolistId,
        taskId,
        model
      );

      const title = model.title;
      if (res.data.resultCode !== 0) {
        return rejectWithValue("Failed to update task`s title");
      }
      return { todolistId, taskId, title };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
