import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../AppWithRedux";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};

export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
  todolistId: string;
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

export let todolistId1 = v1();
export let todolistId2 = v1();

const initialState: TodolistType[] = [
  {
    id: todolistId1,
    title: "What to learn",
    filter: "all",
  }
];

export const todolistsReducer = (
  state: TodolistType[] = initialState,
  action: ActionsTypes
): TodolistType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      const stateCopy = [...state];
      const todolists = stateCopy.filter((tl) => tl.id !== action.id);
      return todolists;
    }

    case "ADD-TODOLIST": {
      const stateCopy = [...state];
      const todolists = [
        {
          id: action.todolistId,
          title: action.title,
          filter: "all" as FilterValuesType,
        },
        ...stateCopy,
      ];
      return todolists;
    }
    case "CHANGE-TODOLIST-TITLE": {
      const stateCopy = [...state];
      let todolists = stateCopy.map((tl) =>
        tl.id === action.id ? { ...tl, title: action.title } : tl
      );
      return todolists;
    }
    case "CHANGE-TODOLIST-FILTER": {
      const stateCopy = [...state];
      let todolists = stateCopy.map((tl) =>
        tl.id === action.id ? { ...tl, filter: action.filter } : tl
      );
      return todolists;
    }

    default:
      return state;
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
  newFilter: FilterValuesType,
  id: string
): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", filter: newFilter, id: id };
};
