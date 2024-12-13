// import { TasksStateType } from "../App";
import { TasksStateType } from "../AppWithRedux";
import { tasksReducer, updateTasksStatus } from "../tasksSlice";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTasksTitle,
} from "../tasksThunk";
import {} from "../todolistsSlice";

describe("tasks reducer", () => {
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

  it("correct tasks array should be get in correct todolist", () => {
    const action = {
      type: getTasks.fulfilled.type,
      payload: {
        tasksArr: startState["todolistId1"],
        todolistId: "todolistId1",
      },
    };

    const endState = tasksReducer(startState, action);

    expect(endState["todolistId1"]).toEqual([
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
    ]);
  });

  it("сorrect task should be added from correct array", () => {
    const action = {
      type: createTask.fulfilled.type,
      payload: {
        task: { id: "4", title: "C++", isDone: true },
        todolistId: "todolistId1",
      },
    };

    const endState = tasksReducer(startState, action);

    expect(endState["todolistId2"].length).toBe(3);
    expect(endState["todolistId1"].length).toBe(4);
    expect(endState["todolistId1"][0].id).toBeDefined();
    expect(endState["todolistId1"][0].title).toBe("C++");
    expect(endState["todolistId1"][0].isDone).toBe(true);
  });

  it("correct task should be deleted from correct array", () => {
    const action = {
      type: deleteTask.fulfilled.type,
      payload: { taskId: "2", todolistId: "todolistId2" },
    };

    const endState = tasksReducer(startState, action);

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every((t) => t.id !== "2")).toBeTruthy();
  });

  it("status of specified task should be change", () => {
    const action = updateTasksStatus({
      todolistId: "todolistId2",
      taskId: "2",
      isDone: false,
    });

    const endState = tasksReducer(startState, action);

    expect(endState["todolistId2"][1].isDone).toBeFalsy;
    expect(endState["todolistId1"][1].isDone).toBeTruthy;
  });

  it("title of specified task should be change", () => {
    const action = {
      type: updateTasksTitle.fulfilled.type,
      payload: {
        todolistId: "todolistId2",
        taskId: "2",
        title: "beer",
      },
    };

    const endState = tasksReducer(startState, action);

    expect(endState["todolistId2"][1].title).toBe("beer");
    expect(endState["todolistId1"][1].title).toBe("JS");
  });
});
