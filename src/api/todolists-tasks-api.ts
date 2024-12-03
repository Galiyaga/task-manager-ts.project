import axios from "axios";

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "b983fdd2-6d82-4150-88ca-bd6a10af1e07",
  },
};

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  ...settings,
});

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

export type TaskResponseType = {
  description: string;
  title: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type PartialUpdateTaskModelType = Partial<UpdateTaskModelType>;

export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
};

export type GetTasksResponseType = {
  error: string | null;
  totalCount: number;
  items: TaskResponseType[];
};

export const todolistsAndTasksAPI = {
  getTodolists() {
    return instance.get<APITodolistType[]>("todo-lists");
  },
  createTodolist(title: string) {
    return instance.post<ResponseTodolistsAndTasksType<ItemDataType>>(
      "todo-lists",
      { title: title }
    );
  },
  deleteTodolist(id: string) {
    return instance.delete<ResponseTodolistsAndTasksType>(`todo-lists/${id}`);
  },
  updateTodolist(id: string, title: string) {
    return instance.put<ResponseTodolistsAndTasksType>(`todo-lists/${id}`, {
      title: title,
    });
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(todolistId: string, title: string) {
    return instance.post<ResponseTodolistsAndTasksType<TaskResponseType>>(
      `/todo-lists/${todolistId}/tasks`,
      { title: title }
    );
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseTodolistsAndTasksType>(
      `todo-lists/${todolistId}/tasks/+ ${taskId}`
    );
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseTodolistsAndTasksType<TaskResponseType>>(
      `todo-lists/${todolistId}/tasks/+ ${taskId}`
    );
  },
};
