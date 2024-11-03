import { combineReducers, createStore } from "redux";
import { tasksReducer } from "./mock-tasks-reducer";
import { todolistsReducer } from "./mock-todolists-reducer";
import { TasksStateType, TodolistType } from "../AppWithRedux";

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const mockStore = createStore(rootReducer);

// @ts-ignore
window.store = mockStore;
