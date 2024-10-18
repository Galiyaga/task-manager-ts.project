import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};

export type AddTodolistActionType = {
  type: "ADD-TODOLIST",
  title: string
}

export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE",
  id: string,
  title: string,
}

export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER",
  id: string,
  filter: FilterValuesType,
}

export type ActionsTypes = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType

export const todolistsReducer = (
  state: TodolistType[],
  action: ActionsTypes 
): TodolistType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.id);
    }
    case "ADD-TODOLIST": {
      return [...state, { id: v1(), title: action.title, filter: "all" }];
    }
    case "CHANGE-TODOLIST-TITLE": {
      let todolist = state.find((tl) => tl.id === action.id);
      if (todolist) todolist.title = action.title;
      
      return [...state]
    }
    case "CHANGE-TODOLIST-FILTER": {
      let todolist = state.find((tl) => tl.id === action.id);
      if (todolist) todolist.filter = action.filter;
      
      return [...state]
    }

    default:
      throw new Error("I don`t understand");
  }
};

export const RemoveTodolist = (todolistId: string): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", id: todolistId}
}

export const AddTodolist = (newTitle: string): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", title: newTitle}
}

export const ChangeTodolistTitleAC = (id: string, newTitle: string): ChangeTodolistTitleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", id: id, title: newTitle}
}

export const ChangeTodolistFilterAC = (id: string, newFilter: FilterValuesType): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", id: id, filter: newFilter}
}