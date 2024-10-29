import React, { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemFrom";
import {
  AppBar,
  Button,
  Container,
  Grid,
  Grid2,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: TaskType[];
};

function App() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const [tasksObj, setTasksObj] = useState<TasksStateType>({
    [todolistId1]: [
      {
        id: v1(),
        title: "CSS",
        isDone: true,
      },
      {
        id: v1(),
        title: "JS",
        isDone: true,
      },
      {
        id: v1(),
        title: "React",
        isDone: false,
      },
    ],
    [todolistId2]: [
      {
        id: v1(),
        title: "Book",
        isDone: true,
      },
      {
        id: v1(),
        title: "Cheese",
        isDone: false,
      },
    ],
  });
  
  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let resultTasks = tasks.filter((t) => t.id !== id);
    tasksObj[todolistId] = resultTasks;
    setTasksObj({ ...tasksObj });
  }

  function addItem(title: string, todolistId: string) {
    let newTask: TaskType = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todolistId];

    let newTasks: TaskType[] = [newTask, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasksObj({ ...tasksObj });
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId].map((t) =>
      t.id === taskId ? { ...t, isDone: isDone } : t
    );
    setTasksObj({ ...tasksObj, [todolistId]: tasks });
  }

  function changeTaskTitle(
    taskId: string,
    newTitle: string,
    todolistId: string
  ) {
    let tasks = tasksObj[todolistId].map((t) =>
      t.id === taskId ? { ...t, title: newTitle } : t
    );
    setTasksObj({ ...tasksObj, [todolistId]: tasks });
  }

  const [todolists, setTodolists] = useState<TodolistType[]>([
    {
      id: todolistId1,
      title: "What to learn",
      filter: "all",
    },
    {
      id: todolistId2,
      title: "What to buy",
      filter: "all",
    },
  ]);

  function removeTodolist(todolistId: string) {
    let filteredTodolist = todolists.filter((tl) => tl.id !== todolistId);
    setTodolists(filteredTodolist);
    delete tasksObj[todolistId];
    setTasksObj({ ...tasksObj });
  }

   // TODO: вернуть копию вместо state
  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) todolist.filter = value;
    setTodolists([...todolists]);
  }

  function addTodolistAC(title: string) {
    let todolist: TodolistType = {
      id: v1(),
      filter: "all",
      title: title,
    };
    setTodolists([todolist, ...todolists]);
    setTasksObj({ ...tasksObj, [todolist.id]: [] });
  }

  // TODO: вернуть копию вместо state
  function changeTodolistTitle(newTitle: string, todolistId: string) {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) todolist.title = newTitle;
    setTodolists([...todolists]);
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton>
            <Menu />
          </IconButton>
          <Typography variant="h6">News</Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodolistAC} />
        </Grid>
        <Grid2 container spacing={3}>
          {todolists.map((tl) => {
            let tasksForTodoList = tasksObj[tl.id];

            if (tl.filter === "completed") {
              tasksForTodoList = tasksForTodoList.filter((t) => t.isDone);
            }
            if (tl.filter === "active") {
              tasksForTodoList = tasksForTodoList.filter((t) => !t.isDone);
            }
            return (
              <Grid item key={tl.id}>
                <Paper style={{ padding: "10px" }}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addItem}
                    changeStatus={changeStatus}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                    changeTaskTitle={changeTaskTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid2>
      </Container>
    </div>
  );
}

export default App;
