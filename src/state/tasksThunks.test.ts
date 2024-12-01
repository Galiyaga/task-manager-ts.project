import { AxiosHeaders, AxiosResponse } from "axios";
import { todolistsAndTasksAPI } from "../api/todolists-tasks-api";
import { mockConfig } from "./todolistsThunks.test";
import { GetTasksResponseType } from "../api/todolists-tasks-api";
import { TaskType } from "../Todolist";
import { getTasks } from "./tasksThunk";

jest.mock("../api/todolists-tasks-api");

const mockedtodolistsAndTasksAPI = todolistsAndTasksAPI as jest.Mocked<
  typeof todolistsAndTasksAPI
>;

describe("getTasks thunk", () => {
  const todolistId = "test-totdolist-id";
  const mockTasksResponce: GetTasksResponseType = {
    error: null,
    totalCount: 1,
    items: [
      {
        description: "Test Task",
        title: "Task 1",
        completed: false,
        status: 0,
        priority: 1,
        startDate: "",
        deadline: "",
        id: "task-1",
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
        [{ id: "task-1", title: "Task 1", isDone: false }],
        expect.anything(),
        todolistId
      )
    );
    expect(result.payload).toEqual([
      { id: "task-1", title: "Task 1", isDone: false },
    ]);
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
