import { TasksStateType } from "../AppWithRedux";
import { v1 } from "uuid";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  todolistId1,
  todolistId2,
} from "./todolists-reducer";

export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  taskId: string;
  todolistId: string;
};

export type AddTaskActionType = {
  type: "ADD-TASK";
  title: string;
  todolistId: string;
};

export type ChangeTaskStatusActionType = {
  type: "CHANGE-TASK-STATUS";
  taskId: string;
  todolistId: string;
  isDone: boolean;
};

export type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  taskId: string;
  todolistId: string;
  title: string;
};

export type ActionsTypes =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

const initialState: TasksStateType = {

}

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsTypes
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      const filteredTasks = tasks.filter((t) => t.id !== action.taskId);
      stateCopy[action.todolistId] = filteredTasks;
      return stateCopy;
    }
    case "ADD-TASK": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      const newTask = { id: v1(), title: action.title, isDone: false };
      const newTasks = [newTask, ...tasks];
      stateCopy[action.todolistId] = newTasks;
      return stateCopy;
    }
    case "CHANGE-TASK-STATUS": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      const newTasks = tasks.map((t) =>
        t.id === action.taskId ? { ...t, isDone: action.isDone } : t
      );
      stateCopy[action.todolistId] = newTasks;
      return stateCopy;
    }
    case "CHANGE-TASK-TITLE": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      const newTasks = tasks.map((t) =>
        t.id === action.taskId ? { ...t, title: action.title } : t
      );
      stateCopy[action.todolistId] = newTasks;
      return stateCopy;
    }
    case "ADD-TODOLIST": {
      const stateCopy = { ...state };
      return {[action.todolistId]: [], ...stateCopy };
    }
    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };
      const { [action.id]: _, ...taskObjCopy} = stateCopy;
      return taskObjCopy;
    }
    default:
      return state  
    }
};

export const removeTaskAC = (
  taskId: string,
  todolistId: string
): RemoveTaskActionType => {
  return { type: "REMOVE-TASK", taskId, todolistId };
};

export const addTaskAC = (
  title: string,
  todolistId: string
): AddTaskActionType => {
  return { type: "ADD-TASK", title, todolistId };
};

export const changeTaskStatusAC = (
  taskId: string,
  todolistId: string,
  isDone: boolean
): ChangeTaskStatusActionType => {
  return { type: "CHANGE-TASK-STATUS", taskId, todolistId, isDone };
};

export const changeTaskTitleAC = (
  taskId: string,
  todolistId: string,
  title: string
): ChangeTaskTitleActionType => {
  return { type: "CHANGE-TASK-TITLE", taskId, todolistId, title };
};
