import { AxiosHeaders, AxiosResponse } from "axios";
import {
  CreateTaskResponseDataType,
  ResponseTodolistsAndTasksType,
  TaskResponseType,
  todolistsAndTasksAPI,
  UpdateTaskModelType,
} from "../api/todolists-tasks-api";
import { mockConfig } from "./todolistsThunks.test";
import { GetTasksResponseType } from "../api/todolists-tasks-api";
import { TaskType } from "../Todolist";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTasksTitle,
} from "./tasksThunk";

jest.mock("../api/todolists-tasks-api");

const mockedtodolistsAndTasksAPI = todolistsAndTasksAPI as jest.Mocked<
  typeof todolistsAndTasksAPI
>;

const todolistId = "test-totdolist-id";
const taskTitle = "Task 1 Title";
const updateTaskTitle = "Update Task 1 Title";
const taskId = "task-1";
const mockTask = {
  todolistId: todolistId,
  title: taskTitle,
};
const mockForDeleteTask = {
  todolistId: todolistId,
  taskId: taskId,
};

describe("getTasks thunk", () => {
  const mockTasksResponce: GetTasksResponseType = {
    error: null,
    totalCount: 1,
    items: [
      {
        description: "Test Task",
        title: taskTitle,
        status: 0,
        priority: 1,
        startDate: "",
        deadline: "",
        id: taskId,
        todoListId: todolistId,
        order: 0,
        addedDate: "",
      },
    ],
  };

  const mockResponse: AxiosResponse<typeof mockTasksResponce> = {
    data: mockTasksResponce,
    status: 200,
    statusText: "OK",
    headers: new AxiosHeaders(),
    config: mockConfig,
  };
  it("dispatches fulfiiled action with formatted tasks on seccess", async () => {
    mockedtodolistsAndTasksAPI.getTasks.mockResolvedValue(mockResponse);

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await getTasks(todolistId)(dispatch, getState, undefined);
    expect(dispatch).toHaveBeenCalledWith(
      getTasks.pending(expect.anything(), todolistId)
    );
    expect(dispatch).toHaveBeenCalledWith(
      getTasks.fulfilled(
        {
          tasksArr: [{ id: "task-1", title: "Task 1 Title", isDone: false }],
          todolistId: "test-totdolist-id",
        },
        expect.anything(),
        todolistId
      )
    );
    expect(result.payload).toEqual({
      tasksArr: [{ id: "task-1", title: "Task 1 Title", isDone: false }],
      todolistId: "test-totdolist-id",
    });
  });

  it("dispatches rejected action with error message on failure in the getTasksThunk", async () => {
    mockedtodolistsAndTasksAPI.getTasks.mockRejectedValue(
      new Error("Failed to get tasks")
    );

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await getTasks(todolistId)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      getTasks.pending(expect.anything(), todolistId)
    );
    expect(result.payload).toEqual("Failed to get tasks");
  });
});

describe("createTask thunk", () => {
  it("dispatches fulfiiled action with new tasks on seccess", async () => {
    const mockTaskResponce: ResponseTodolistsAndTasksType<CreateTaskResponseDataType> =
      {
        resultCode: 0,
        messages: [],
        data: {
          item: {
            description: "Test Task",
            title: taskTitle,
            status: 0,
            priority: 1,
            startDate: "",
            deadline: "",
            id: taskId,
            todoListId: todolistId,
            order: 0,
            addedDate: "",
          },
        },
      };

    const mockResponse: AxiosResponse<typeof mockTaskResponce> = {
      data: mockTaskResponce,
      status: 200,
      statusText: "OK",
      headers: new AxiosHeaders(),
      config: mockConfig,
    };

    mockedtodolistsAndTasksAPI.createTask.mockResolvedValue(mockResponse);

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await createTask(mockTask)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      createTask.pending(expect.anything(), mockTask)
    );

    expect(dispatch).toHaveBeenCalledWith(
      createTask.fulfilled(
        {
          task: { id: "task-1", title: "Task 1 Title", isDone: false },
          todolistId: "test-totdolist-id",
        },
        expect.anything(),
        mockTask
      )
    );

    expect(result.payload).toEqual({
      task: { id: "task-1", title: "Task 1 Title", isDone: false },
      todolistId: "test-totdolist-id",
    });
  });

  it("dispatches rejected action with error message on failure in the createTaskThunk", async () => {
    mockedtodolistsAndTasksAPI.createTask.mockRejectedValue(
      new Error("Failed to create task")
    );

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await createTask(mockTask)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      createTask.pending(expect.anything(), mockTask)
    );
    expect(result.payload).toEqual("Failed to create task");
  });
});

describe("deleteTask thunk", () => {
  it("dispatches fulfiiled action with from the task ID to be deleted on seccess", async () => {
    const mockTaskResponce: ResponseTodolistsAndTasksType = {
      resultCode: 0,
      messages: [],
      data: {},
    };

    const mockResponse: AxiosResponse<typeof mockTaskResponce> = {
      data: mockTaskResponce,
      status: 200,
      statusText: "OK",
      headers: new AxiosHeaders(),
      config: mockConfig,
    };

    mockedtodolistsAndTasksAPI.deleteTask.mockResolvedValue(mockResponse);

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await deleteTask(mockForDeleteTask)(
      dispatch,
      getState,
      undefined
    );
    expect(dispatch).toHaveBeenCalledWith(
      deleteTask.pending(expect.anything(), mockForDeleteTask)
    );
    expect(dispatch).toHaveBeenCalledWith(
      deleteTask.fulfilled(
        { todolistId: "test-totdolist-id", taskId: "task-1" },
        expect.anything(),
        mockForDeleteTask
      )
    );
    expect(result.payload).toEqual({
      todolistId: "test-totdolist-id",
      taskId: "task-1",
    });
  });

  it("dispatches rejected action with error message on failure in the deleteTaskThunk", async () => {
    mockedtodolistsAndTasksAPI.deleteTask.mockRejectedValue(
      new Error("Failed to delete task")
    );

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await deleteTask(mockForDeleteTask)(
      dispatch,
      getState,
      undefined
    );

    expect(dispatch).toHaveBeenCalledWith(
      deleteTask.pending(expect.anything(), mockForDeleteTask)
    );
    expect(result.payload).toEqual("Failed to delete task");
  });
});

describe("updateTasksTitle thunk", () => {
  const mockUpdateTaskModel: UpdateTaskModelType = {
    title: updateTaskTitle,
    description: "",
    status: 0,
    priority: 1,
    startDate: "",
    deadline: "",
  };

  const mockArgs = {
    todolistId: todolistId,
    taskId: taskId,
    model: mockUpdateTaskModel,
  };

  it("dispatches fulfiiled action with update task`s title on seccess", async () => {
    const mockTaskResponce: ResponseTodolistsAndTasksType<CreateTaskResponseDataType> = {
      resultCode: 0,
      messages: [],
      data: {
        item: {
          description: "Test Task",
          title: updateTaskTitle,
          status: 0,
          priority: 1,
          startDate: "",
          deadline: "",
          id: taskId,
          todoListId: todolistId,
          order: 0,
          addedDate: "",
        },
      },
    };

    const mockResponse: AxiosResponse<typeof mockTaskResponce> = {
      data: mockTaskResponce,
      status: 200,
      statusText: "OK",
      headers: new AxiosHeaders(),
      config: mockConfig,
    };

    mockedtodolistsAndTasksAPI.updateTask.mockResolvedValue(mockResponse);

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await updateTasksTitle(mockArgs)(
      dispatch,
      getState,
      undefined
    );

    expect(dispatch).toHaveBeenCalledWith(
      updateTasksTitle.pending(expect.anything(), mockArgs)
    );

    expect(dispatch).toHaveBeenCalledWith(
      updateTasksTitle.fulfilled(
        {
          todolistId: "test-totdolist-id",
          taskId: "task-1",
          title: "Update Task 1 Title",
        },
        expect.anything(),
        mockArgs
      )
    );

    expect(result.payload).toEqual({
      todolistId: "test-totdolist-id",
      taskId: "task-1",
      title: "Update Task 1 Title",
    });
  });

  it("dispatches rejected action with error message on failure in the updateTasksTitleThunk", async () => {
    mockedtodolistsAndTasksAPI.updateTask.mockRejectedValue(
      new Error("Failed to update task`s title")
    );

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await updateTasksTitle(mockArgs)(
      dispatch,
      getState,
      undefined
    );

    expect(dispatch).toHaveBeenCalledWith(
      updateTasksTitle.pending(expect.anything(), mockArgs)
    );
    expect(result.payload).toEqual("Failed to update task`s title");
  });
});
