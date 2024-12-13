import { AxiosHeaders, AxiosResponse } from "axios";
import {
  authAPI,
  loginPropertiesType,
  loginResponseType,
  ResponseTodolistsAndTasksType,
} from "../api/api";
import { mockConfig } from "./todolistsThunks.test";

jest.mock("../api/todolists-tasks-api");

const mockedAuthAPI = authAPI as jest.Mocked<typeof authAPI>;

describe("login thunk", () => {
  const mockLoginResponse: ResponseTodolistsAndTasksType<loginResponseType> = {
    resultCode: 0,
    messages: ["1"],
    data: {
      userId: 1,
    },
  };

  const mockResponse: AxiosResponse<typeof mockLoginResponse> = {
    data: mockLoginResponse,
    status: 200,
    statusText: "OK",
    headers: new AxiosHeaders(),
    config: mockConfig,
  };

  const loginData: loginPropertiesType = {
    email: "free@mail.ru",
    password: "free",
    rememberMe: true,
    captcha: true,
  };
  it("dispatches fulfiiled action with formatted tasks on seccess", async () => {
    mockedAuthAPI.login.mockResolvedValue(mockResponse);

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await loginThunk(loginData)(dispatch, getState, undefined);
    expect(dispatch).toHaveBeenCalledWith(
      loginThunk.pending(expect.anything(), loginData)
    );
    expect(dispatch).toHaveBeenCalledWith(
      loginThunk.fulfilled(
        {
          userId,
          email,
          password,
        },
        expect.anything(),
        loginData
      )
    );
    expect(result.payload).toEqual({
      userId,
      email,
      password,
    });
  });
  it("dispatches rejected action with error message on failure in the fetchThunk", async () => {
    mockedAuthAPI.login.mockRejectedValue(
      new Error("Failed to authorization")
    );

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await loginThunk(loginData)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(
      loginThunk.pending(expect.anything(), undefined)
    );
    expect(result.payload).toEqual("Failed to authorization");
  });
});

describe("logout thunk", () => {
  const mockLogoutResponse: ResponseTodolistsAndTasksType = {
    resultCode: 0,
    messages: ["1"],
    data: {
    },
  };

  const mockResponse: AxiosResponse<typeof mockLogoutResponse> = {
    data: mockLogoutResponse,
    status: 200,
    statusText: "OK",
    headers: new AxiosHeaders(),
    config: mockConfig,
  };

  it("dispatches fulfiiled action with formatted tasks on seccess", async () => {
    mockedAuthAPI.logout.mockResolvedValue(mockResponse);

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await logoutThunk()(dispatch, getState, undefined);
    expect(dispatch).toHaveBeenCalledWith(
      logoutThunk.pending.match()
    );
    expect(dispatch).toHaveBeenCalledWith(
      logoutThunk.fulfilled.match()
      )
    ), 

    it("dispatches rejected action with error message on failure in the fetchThunk", async () => {
      mockedAuthAPI.logoutThunk.mockRejectedValue(
        new Error("Failed to logout")
      );
  
      const dispatch = jest.fn();
      const getState = jest.fn();
  
      const result = await logoutThunk()(dispatch, getState, undefined);
  
      expect(dispatch).toHaveBeenCalledWith(
        logoutThunk.pending.match()
      );
      expect(result.payload).toEqual("Failed to logout");
    });
});


