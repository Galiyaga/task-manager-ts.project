import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../../components/AppWithRedux";
import { changeTodolistFilter, todolistsReducer } from "../todolistsSlice";
import {
  createTodolist,
  deleteTodolist,
  fetchTodolist,
  updateTodolist,
} from "../todolistsThunks";

let todolistId1 = v1();
let todolistId2 = v1();
let todolistId3 = v1();
const newTitle = "newTitle";
const newTodolist: TodolistType = {
  id: todolistId3,
  title: newTitle,
  filter: "all",
};
const newFilter: FilterValuesType = "completed"

const startState: Array<TodolistType> = [
  {
    id: todolistId1,
    title: "What to learn",
    filter: "all",
  },
  {
    id: todolistId2,
    title: "What to buy",
    filter: "all",
  },
];

describe("todolists reducer", () => {
  it('correct filter should be changed', () => {
    const action = changeTodolistFilter({filter: newFilter, id: todolistId2 });

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
  }),

  it('the entire list of todulists should be received', () => {
    const action = {
      type: fetchTodolist.fulfilled.type,
      payload: startState,
    };

    const endState = todolistsReducer(startState, action);

    expect(endState.length).toBe(2);
    expect(endState[0].id).toBe(todolistId1);
    expect(endState[1].id).toBe(todolistId2);
  }),

  it("correct todolist should be created", () => {
    const action = {
      type: createTodolist.fulfilled.type,
      payload: newTodolist,
    };

    const endState = todolistsReducer(startState, action);

    expect(endState.length).toBe(3);
    expect(endState[0].id).toBe(todolistId3);
    expect(endState[0].title).toBe(newTitle);
    expect(endState[0].filter).toBe("all");
  }),

  it("correct todolist should be removed", () => {
    const action = {
      type: deleteTodolist.fulfilled.type,
      payload: todolistId1,
    };

    const endState = todolistsReducer(startState, action);

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
  }),
  
  it("correct todolist should be updated", () => {
    const action = {
      type: updateTodolist.fulfilled.type,
      payload: { id: todolistId2, title: newTitle },
    };

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTitle);
    expect(endState.length).toBe(2)
  });
});

