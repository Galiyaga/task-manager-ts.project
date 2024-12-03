import { useEffect, useState } from "react";
import { todolistsAndTasksAPI, UpdateTaskModelType } from "../api/todolists-tasks-api";

export default {
  title: "API",
};

const settings = {
  withCredentials: true,
  headers: {
    "API-KEY": "b983fdd2-6d82-4150-88ca-bd6a10af1e07",
  },
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>({ name: "Galiya" });

  useEffect(() => {
    todolistsAndTasksAPI.getTodolists().then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>({ name: "Galiya" });

  useEffect(() => {
    todolistsAndTasksAPI.createTodolist("New todolist").then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>({ name: "Galiya" });

  useEffect(() => {
    const id = "84c8237b-1e29-4788-a3f2-796bbbaf9bb0";
    todolistsAndTasksAPI.deleteTodolist(id).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolist = () => {
  const [state, setState] = useState<any>({ name: "Galiya" });

  useEffect(() => {
    const id = "089ba0df-d19-49b9-bd87-3fc1d7121d9d";
    todolistsAndTasksAPI.updateTodolist(id, "Update title").then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const GetTasks = () => {
  const [state, setState] = useState<any>({ name: "Galiya" });

  useEffect(() => {
    const todolistId = "d3f01eb4-b594-4ff2-b7a1-a00fe717c996";
    todolistsAndTasksAPI.getTasks(todolistId).then((res) => {
      setState(res.data.items);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTask = () => {
  const [state, setState] = useState<any>({ name: "Galiya" });

  useEffect(() => {
    const todolistId = "d3f01eb4-b594-4ff2-b7a1-a00fe717c996";
    todolistsAndTasksAPI.createTask(todolistId, "New Task").then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTask = () => {
  const [state, setState] = useState<any>({ name: "Galiya" });

  useEffect(() => {
    const todolistId = "84c8237b-1e29-4788-a3f2-796bbbaf9bb0";
    const taskId = "";
    todolistsAndTasksAPI.deleteTask(todolistId, taskId).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTask = () => {
  const [state, setState] = useState<any>({ name: "Galiya" });

  useEffect(() => {
    const model: UpdateTaskModelType = {
      title: 'Update',
      description: '',
      status: 0,
      priority: 1,
      startDate: '',
      deadline: '',
    }
    const todolistId = "d3f01eb4-b594-4ff2-b7a1-a00fe717c996";
    const taskId = "910e709e-cd64-4330-9c20-a71936cbbbb9";
    todolistsAndTasksAPI.updateTask(todolistId, taskId, model).then((res) => {
      setState(res.data);
    });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
