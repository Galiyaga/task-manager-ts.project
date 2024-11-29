import { AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import {
  APITodolistType,
  ItemDataType,
  ResponseTodolistsType,
  todolistsAPI,
} from "../api/todolists-tasks-api";
import { createTodolist, fetchTodolist } from "./todolistsThunks";

jest.mock("../api/todolists-tasks-api");

const mockedTodolistsAPI = todolistsAPI as jest.Mocked<typeof todolistsAPI>;

const mockConfig: InternalAxiosRequestConfig = {
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

    mockedTodolistsAPI.getTodolists.mockResolvedValue(mockResponse);

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
    mockedTodolistsAPI.getTodolists.mockRejectedValue(
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
    const mockResponse: AxiosResponse<ResponseTodolistsType<ItemDataType>> = {
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

    mockedTodolistsAPI.createTodolist.mockResolvedValue(mockResponse);

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
      createTodolist.fulfilled({
        id: "newTodolistId",
        title: mockTitle,
        filter: "all"
      },
      expect.anything(),
      mockTitle),
    );
    expect(result.payload).toEqual(
      {
        id: "newTodolistId",
        title: mockTitle,
        filter: "all"
      }
    )
  })

  it('dispatches rejected action with error message on failure in the createThunk', async () => {
    mockedTodolistsAPI.createTodolist.mockRejectedValue(
      new Error("Failed to create")
    );

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await createTodolist(mockTitle)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      createTodolist.pending(expect.anything(), mockTitle)
    );
    expect(result.payload).toEqual("Failed to create");
  });
});
