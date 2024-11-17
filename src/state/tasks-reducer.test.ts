// import { TasksStateType } from "../App";
import { TasksStateType } from "../AppWithRedux";
import {
  removeTask,
  addTask,
  changeTaskStatus,
  changeTaskTitle,
  tasksReducer,
} from "./tasksSlice";
import { addTodolist, removeTodolist } from "./todolistsSlice";

test("correct task should be deleted from correct array", () => {
  const startState: TasksStateType = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        isDone: false,
      },
      {
        id: "2",
        title: "JS",
        isDone: true,
      },
      {
        id: "3",
        title: "React",
        isDone: false,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "икуфв",
        isDone: false,
      },
      {
        id: "2",
        title: "milk",
        isDone: true,
      },
      {
        id: "3",
        title: "tea",
        isDone: false,
      },
    ],
  };

  const action = removeTask({ taskId: "2", todolistId: "todolistId2" });
  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(2);
  expect(endState["todolistId2"].every((t) => t.id !== "2")).toBeTruthy();
});

test("correct task should be added from correct array", () => {
  const startState: TasksStateType = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        isDone: false,
      },
      {
        id: "2",
        title: "JS",
        isDone: true,
      },
      {
        id: "3",
        title: "React",
        isDone: false,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        isDone: false,
      },
      {
        id: "2",
        title: "milk",
        isDone: true,
      },
      {
        id: "3",
        title: "tea",
        isDone: false,
      },
    ],
  };

  const action = addTask({ title: "C++", todolistId: "todolistId1" });
  const endState = tasksReducer(startState, action);

  expect(endState["todolistId2"].length).toBe(3);
  expect(endState["todolistId1"].length).toBe(4);
  expect(endState["todolistId1"][0].id).toBeDefined();
  expect(endState["todolistId1"][0].title).toBe("C++");
  expect(endState["todolistId1"][0].isDone).toBe(false);
});

test("status of specified task should be change", () => {
  const startState: TasksStateType = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        isDone: false,
      },
      {
        id: "2",
        title: "JS",
        isDone: true,
      },
      {
        id: "3",
        title: "React",
        isDone: false,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "икуфв",
        isDone: false,
      },
      {
        id: "2",
        title: "milk",
        isDone: true,
      },
      {
        id: "3",
        title: "tea",
        isDone: false,
      },
    ],
  };

  const action = changeTaskStatus({
    taskId: "2",
    todolistId: "todolistId2",
    isDone: false,
  });
  const endState = tasksReducer(startState, action);

  expect(endState["todolistId2"][1].isDone).toBeFalsy;
  expect(endState["todolistId1"][1].isDone).toBeTruthy;
});

test("title of specified task should be change", () => {
  const startState: TasksStateType = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        isDone: false,
      },
      {
        id: "2",
        title: "JS",
        isDone: true,
      },
      {
        id: "3",
        title: "React",
        isDone: false,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "икуфв",
        isDone: false,
      },
      {
        id: "2",
        title: "milk",
        isDone: true,
      },
      {
        id: "3",
        title: "tea",
        isDone: false,
      },
    ],
  };

  const action = changeTaskTitle({
    taskId: "3",
    todolistId: "todolistId1",
    title: "Java",
  });
  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"][2].title).toBe("Java");
  expect(endState["todolistId2"][2].title).toBe("tea");
});

test("new property with new array should be added when new todolist is added", () => {
  const startState: TasksStateType = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        isDone: false,
      },
      {
        id: "2",
        title: "JS",
        isDone: true,
      },
      {
        id: "3",
        title: "React",
        isDone: false,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        isDone: false,
      },
      {
        id: "2",
        title: "milk",
        isDone: true,
      },
      {
        id: "3",
        title: "tea",
        isDone: false,
      },
    ],
  };

  const action = addTodolist({title: "new todolist", id: "todolistId3"});
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k !== "todolistId1" && k !== "todolistId2");
  if (!newKey) throw Error("new key should be added");

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toStrictEqual([]);
});

test(" property with todolistId should be deleted", () => {
  const startState: TasksStateType = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        isDone: false,
      },
      {
        id: "2",
        title: "JS",
        isDone: true,
      },
      {
        id: "3",
        title: "React",
        isDone: false,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        isDone: false,
      },
      {
        id: "2",
        title: "milk",
        isDone: true,
      },
      {
        id: "3",
        title: "tea",
        isDone: false,
      },
    ],
  };

  const action = removeTodolist("todolistId2");
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).toBeUndefined();
});

