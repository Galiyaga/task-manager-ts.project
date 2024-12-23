import { baseInstance } from "./baseInstance";

// request
export const todolistsAndTasksAPI = {
  getTodolists() {
    return baseInstance.get<APITodolistType[]>("todo-lists");
  },
  createTodolist(title: string) {
    return baseInstance.post<ResponseTodolistsAndTasksType<ItemDataType>>(
      "todo-lists",
      { title: title }
    );
  },
  deleteTodolist(id: string) {
    return baseInstance.delete<ResponseTodolistsAndTasksType>(
      `todo-lists/${id}`
    );
  },
  updateTodolist(id: string, title: string) {
    return baseInstance.put<ResponseTodolistsAndTasksType>(`todo-lists/${id}`, {
      title: title,
    });
  },
  getTasks(todolistId: string) {
    return baseInstance.get<GetTasksResponseType>(
      `todo-lists/${todolistId}/tasks`
    );
  },
  createTask(todolistId: string, title: string) {
    return baseInstance.post<
      ResponseTodolistsAndTasksType<CreateTaskResponseDataType>
    >(`/todo-lists/${todolistId}/tasks`, { title: title });
  },
  deleteTask(todolistId: string, taskId: string) {
    return baseInstance.delete<ResponseTodolistsAndTasksType>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    );
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return baseInstance.put<
      ResponseTodolistsAndTasksType<CreateTaskResponseDataType>
    >(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },
};

export const authAPI = {
  login(data: loginPropertiesType) {
    return baseInstance.post<ResponseTodolistsAndTasksType<loginResponseType>>(
      `auth/login`,
      data
    );
  },
  logout() {
    return baseInstance.delete<ResponseTodolistsAndTasksType>(`auth/login`);
  },
};

// type
export type APITodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type ResponseTodolistsAndTasksType<D = {}> = {
  resultCode: number;
  messages: string[];
  data: D;
};

export type ItemDataType = {
  item: APITodolistType;
};

export type CreateTaskResponseDataType = {
  item: TaskResponseType;
};

export type TaskResponseType = {
  description: string;
  title: string;
  completed: boolean;
  status: Statuses;
  priority: number;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export enum Statuses {
  New,
  Completed,
}

export type PartialUpdateTaskModelType = Partial<UpdateTaskModelType>;

export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: Statuses;
  priority: number;
  startDate: string;
  deadline: string;
};

export type GetTasksResponseType = {
  error: string | null;
  totalCount: number;
  items: TaskResponseType[];
};

export type loginPropertiesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: boolean;
};

export type loginResponseType = {
  userId: number;
  token: string;
};

export type authResponseType = {
  id: number;
  email: string;
  login: string;
};
