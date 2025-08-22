import { AxiosHeaders, AxiosResponse } from "axios";
import {
  authAPI,
  loginPropertiesType,
  loginResponseType,
  ResponseTodolistsAndTasksType,
} from "../../api/api";
import { mockConfig } from "../tests/todolistsThunks.test";
import { loginThunk, logoutThunk } from "../authThunk";

jest.mock("../../api/api");

const mockedAuthAPI = authAPI as jest.Mocked<typeof authAPI>;

describe("login thunk", () => {
  const mockLoginResponse = {
    resultCode: 0,
    messages: ["1"],
    data: { userId: 1 },
  };

  const mockResponse = {
    data: mockLoginResponse,
    status: 200,
    statusText: "OK",
    headers: new AxiosHeaders(),
    config: mockConfig,
  };

  const loginData = {
    email: "free@mail.ru",
    password: "free",
    rememberMe: true,
    captcha: true,
  };

  it("dispatches fulfiiled action for authorization", async () => {
    mockedAuthAPI.login.mockResolvedValue(mockResponse);
    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await loginThunk(loginData)(dispatch, getState, undefined);
    
    expect(dispatch).toHaveBeenNthCalledWith(1,
      loginThunk.pending(expect.anything(), loginData),
    );
    expect(dispatch).toHaveBeenNthCalledWith(2,
      loginThunk.fulfilled(
        { userId: "1" },
        expect.anything(),
        loginData,
      ),
    );
    expect(result.payload).toEqual({ userId: "1" });
  });

  it("dispatches rejected action with error authorization message", async () => {
    mockedAuthAPI.login.mockRejectedValue(new Error("Failed to authorization"));
    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await loginThunk(loginData)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenNthCalledWith(1,
      loginThunk.pending(expect.anything(), loginData),
    );
    expect(dispatch).toHaveBeenNthCalledWith(2,
      expect.objectContaining({
        type: 'auth/loginThunk/rejected',
        payload: "Failed to authorization"
      })
    );
    expect(result.payload).toEqual("Failed to authorization");
  });
});

describe("logout thunk", () => {
  const mockLogoutResponse = {
    resultCode: 0,
    messages: ["1"],
    data: {},
  };

  const mockResponse = {
    data: mockLogoutResponse,
    status: 200,
    statusText: "OK",
    headers: new AxiosHeaders(),
    config: mockConfig,
  };

  it("dispatches fulfiiled action for logout", async () => {
    mockedAuthAPI.logout.mockResolvedValue(mockResponse);
    const dispatch = jest.fn();
    const getState = jest.fn();

    await logoutThunk()(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenNthCalledWith(1,
      logoutThunk.pending(expect.anything(), undefined),
    );
    expect(dispatch).toHaveBeenNthCalledWith(2,
      logoutThunk.fulfilled(undefined, expect.anything(), undefined),
    );
  });

  it("dispatches rejected action with error logout message", async () => {
    mockedAuthAPI.logout.mockRejectedValue(new Error("Failed to logout"));
    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await logoutThunk()(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenNthCalledWith(1,
      logoutThunk.pending(expect.anything(), undefined),
    );
    expect(dispatch).toHaveBeenNthCalledWith(2,
      expect.objectContaining({
        type: 'auth/logoutThunk/rejected',
        payload: "Failed to logout"
      })
    );
    expect(result.payload).toEqual("Failed to logout");
  });
});