import { v1 } from "uuid";
// import { FilterValuesType, TodolistType } from "../App";
import { FilterValuesType, TodolistType } from "../AppWithReducers";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};

export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
  todolistId: string
};

export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};

export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValuesType;
};

export type ActionsTypes =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

export const todolistsReducer = (
  state: TodolistType[],
  action: ActionsTypes
): TodolistType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.id);
    }
    case "ADD-TODOLIST": {
      return [{ id: action.todolistId, title: action.title, filter: "all" }, ...state];
    }
    // TODO: вернуть копию вместо state
    case "CHANGE-TODOLIST-TITLE": {
      let todolist = state.find((tl) => tl.id === action.id);
      if (todolist) todolist.title = action.title;

      return [...state];
    }
    // TODO: вернуть копию вместо state
    case "CHANGE-TODOLIST-FILTER": {
      let todolist = state.find((tl) => tl.id === action.id);
      if (todolist) todolist.filter = action.filter;

      return [...state];
    }

    default:
      throw new Error("I don`t understand");
  }
};

export const removeTodolistAC = (
  todolistId: string
): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", id: todolistId };
};

export const addTodolistAC = (newTitle: string): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", title: newTitle, todolistId: v1() };
};

export const changeTodolistTitleAC = (
  id: string,
  newTitle: string
): ChangeTodolistTitleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", id: id, title: newTitle };
};

export const changeTodolistFilterAC = (
  id: string,
  newFilter: FilterValuesType
): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", id: id, filter: newFilter };
};
