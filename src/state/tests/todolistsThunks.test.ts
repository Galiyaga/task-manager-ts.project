import { AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import {
  APITodolistType,
  ItemDataType,
  ResponseTodolistsAndTasksType,
  todolistsAndTasksAPI,
} from "../../api/api";
import {
  createTodolist,
  deleteTodolist,
  fetchTodolist,
  updateTodolist,
} from "../todolistsThunks";

jest.mock("../../api/api");

const mockedtodolistsAndTasksAPI = todolistsAndTasksAPI as jest.Mocked<
  typeof todolistsAndTasksAPI
>;

export const mockConfig: InternalAxiosRequestConfig = {
  headers: new AxiosHeaders(),
  method: "get",
  url: "/todolists",
  params: undefined,
  data: undefined,
  timeout: 0,
  transformRequest: undefined,
  transformResponse: undefined,
  validateStatus: undefined,
  xsrfCookieName: "",
  xsrfHeaderName: "",
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
  transitional: undefined,
  signal: undefined,
};

const mockTitle = "newTitle";
const mockId = "newId";

describe("fetchTodolist thunk", () => {
  it("dispatches fulfiiled action with formatted todolists on seccess", async () => {
    const mockTodolists: APITodolistType[] = [
      {
        id: "todolistId1",
        title: "What to learn",
        addedDate: "2019-07-30T12:24:15.063",
        order: 0,
      },
      {
        id: "todolistId2",
        title: "What to buy",
        addedDate: "2019-07-30T12:24:15.064",
        order: 1,
      },
    ];

    const mockResponse: AxiosResponse<typeof mockTodolists> = {
      data: mockTodolists,
      status: 200,
      statusText: "OK",
      headers: new AxiosHeaders(),
      config: mockConfig,
    };

    mockedtodolistsAndTasksAPI.getTodolists.mockResolvedValue(mockResponse);

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await fetchTodolist()(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      fetchTodolist.pending(expect.anything(), undefined)
    );
    expect(dispatch).toHaveBeenCalledWith(
      fetchTodolist.fulfilled(
        [
          {
            id: "todolistId1",
            title: "What to learn",
            filter: "all",
          },
          {
            id: "todolistId2",
            title: "What to buy",
            filter: "all",
          },
        ],
        expect.anything()
      )
    );
    expect(result.payload).toEqual([
      {
        id: "todolistId1",
        title: "What to learn",
        filter: "all",
      },
      {
        id: "todolistId2",
        title: "What to buy",
        filter: "all",
      },
    ]);
  });
  it("dispatches rejected action with error message on failure in the fetchThunk", async () => {
    mockedtodolistsAndTasksAPI.getTodolists.mockRejectedValue(
      new Error("Failed to fetch")
    );

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await fetchTodolist()(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      fetchTodolist.pending(expect.anything(), undefined)
    );
    expect(result.payload).toEqual("Failed to fetch");
  });
});

describe("createTodolist thunk", () => {
  it("dispatches fulfiiled action with new todolist on seccess", async () => {
    const mockResponse: AxiosResponse<
      ResponseTodolistsAndTasksType<ItemDataType>
    > = {
      data: {
        resultCode: 0,
        messages: ["1"],
        data: {
          item: {
            id: "newTodolistId",
            title: mockTitle,
            addedDate: "2019-07-30T12:23:49.677",
            order: 0,
          },
        },
      },
      status: 200,
      statusText: "OK",
      headers: new AxiosHeaders(),
      config: mockConfig,
    };

    mockedtodolistsAndTasksAPI.createTodolist.mockResolvedValue(mockResponse);

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await createTodolist(mockTitle)(
      dispatch,
      getState,
      undefined
    );

    expect(dispatch).toHaveBeenCalledWith(
      createTodolist.pending(expect.anything(), mockTitle)
    );
    expect(dispatch).toHaveBeenCalledWith(
      createTodolist.fulfilled(
        {
          id: "newTodolistId",
          title: mockTitle,
          filter: "all",
        },
        expect.anything(),
        mockTitle
      )
    );
    expect(result.payload).toEqual({
      id: "newTodolistId",
      title: mockTitle,
      filter: "all",
    });
  });

  it("dispatches rejected action with error message on failure in the createThunk", async () => {
    mockedtodolistsAndTasksAPI.createTodolist.mockRejectedValue(
      new Error("Failed to create")
    );

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await createTodolist(mockTitle)(
      dispatch,
      getState,
      undefined
    );

    expect(dispatch).toHaveBeenCalledWith(
      createTodolist.pending(expect.anything(), mockTitle)
    );
    expect(result.payload).toEqual("Failed to create");
  });
});

describe("deleteTodolist thunk", () => {
  it("dispatches fulfiiled action with correct id on seccess", async () => {
    const mockResponse: AxiosResponse<ResponseTodolistsAndTasksType> = {
      data: {
        resultCode: 0,
        messages: ["1"],
        data: {},
      },
      status: 200,
      statusText: "OK",
      headers: new AxiosHeaders(),
      config: mockConfig,
    };

    mockedtodolistsAndTasksAPI.deleteTodolist.mockResolvedValue(mockResponse);

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await deleteTodolist(mockId)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      deleteTodolist.pending(expect.anything(), mockId)
    );
    expect(dispatch).toHaveBeenCalledWith(
      deleteTodolist.fulfilled(mockId, expect.anything(), mockId)
    );
    expect(result.payload).toEqual(mockId);
  });

  it("dispatches rejected action with error message on failure in the deleteThunk", async () => {
    mockedtodolistsAndTasksAPI.deleteTodolist.mockRejectedValue(
      new Error("Failed to delete")
    );

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await deleteTodolist(mockId)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      deleteTodolist.pending(expect.anything(), mockId)
    );
    expect(result.payload).toEqual("Failed to delete");
  });
});

describe("updateTodolist thunk", () => {
  const mockTodolist = {
    id: mockId,
    title: mockTitle,
  };

  it("dispatches fulfiiled action with correct id and title on seccess", async () => {
    const mockResponse: AxiosResponse<ResponseTodolistsAndTasksType> = {
      data: {
        resultCode: 0,
        messages: ["1"],
        data: {},
      },
      status: 200,
      statusText: "OK",
      headers: new AxiosHeaders(),
      config: mockConfig,
    };

    mockedtodolistsAndTasksAPI.updateTodolist.mockResolvedValue(mockResponse);

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await updateTodolist(mockTodolist)(
      dispatch,
      getState,
      undefined
    );

    expect(dispatch).toHaveBeenCalledWith(
      updateTodolist.pending(expect.anything(), mockTodolist)
    );
    expect(dispatch).toHaveBeenCalledWith(
      updateTodolist.fulfilled(mockTodolist, expect.anything(), mockTodolist)
    );
    expect(result.payload).toEqual({
      id: mockTodolist.id,
      title: mockTodolist.title,
    });
  });

  it("dispatches rejected action with error message on failure on server in the updateThunk", async () => {
    const mockErrorResponse: AxiosResponse<ResponseTodolistsAndTasksType> = {
      data: {
        resultCode: 1,
        messages: ["Failed to update todolist"],
        data: {},
      },
      status: 400,
      statusText: "",
      headers: new AxiosHeaders(),
      config: mockConfig,
    };

    mockedtodolistsAndTasksAPI.updateTodolist.mockResolvedValue(
      mockErrorResponse
    );

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await updateTodolist(mockTodolist)(
      dispatch,
      getState,
      undefined
    );

    expect(dispatch).toHaveBeenCalledWith(
      updateTodolist.pending(expect.anything(), mockTodolist)
    );

    expect(result.payload).toEqual("Failed to update todolist");
  });

  it("dispatches rejected action with error message on failure on network", async () => {
    mockedtodolistsAndTasksAPI.updateTodolist.mockRejectedValue(
      new Error("Network Error")
    );

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await updateTodolist(mockTodolist)(
      dispatch,
      getState,
      undefined
    );

    expect(dispatch).toHaveBeenCalledWith(
      updateTodolist.pending(expect.anything(), mockTodolist)
    );
    expect(result.payload).toEqual("Network Error");
  });
});
