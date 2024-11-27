import { TasksStateType, TodolistType } from "../AppWithRedux";
import { tasksReducer } from "./tasksSlice";
import { todolistsReducer } from "./todolistsSlice";


// test("ids should be equals", () => {
//   const startTasksState: TasksStateType = {};
//   const startTodolistsState: TodolistType[] = [];

//   const action = addTodolist({title: "new tosolist",
//     id: "todolistId3"});

//   const endTasksState = tasksReducer(startTasksState, action);
//   const endTodolistsState = todolistsReducer(startTodolistsState, action);

//   const keys = Object.keys(endTasksState);
//   const idFromTasks = keys[0];
//   const idFromTodolists = endTodolistsState[0].id;

//   expect(idFromTasks).toBe(action.payload.id);
//   expect(idFromTodolists).toBe(action.payload.id);
// });
