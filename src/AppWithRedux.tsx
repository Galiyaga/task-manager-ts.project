import React, { useReducer, useState } from "react";
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
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./state/tasks-reducer";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "./state/todolists-reducer";

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: TaskType[];
};

function AppWithRedux() {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const [todolists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
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

  const [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
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
    dispatchToTasksReducer(removeTaskAC(id, todolistId));
  }

  function addItem(title: string, todolistId: string) {
    dispatchToTasksReducer(addTaskAC(title, todolistId));
  }

  function changeStatus(taskId: string, todolistId: string, isDone: boolean) {
    dispatchToTasksReducer(changeTaskStatusAC(taskId, todolistId, isDone));
  }

  function changeTaskTitle(
    taskId: string,
    todolistId: string,
    newTitle: string
  ) {
    dispatchToTasksReducer(changeTaskTitleAC(taskId, newTitle, todolistId));
  }

  function removeTodolist(todolistId: string) {
    const dispatch = removeTodolistAC(todolistId);
    dispatchToTodolistsReducer(dispatch);
    dispatchToTasksReducer(dispatch);
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    dispatchToTodolistsReducer(changeTodolistFilterAC(todolistId, value));
  }

  function addTodolist(title: string) {
    const dispatch = addTodolistAC(title);
    dispatchToTodolistsReducer(dispatch);
    dispatchToTasksReducer(dispatch);
  }

  function changeTodolistTitle(newTitle: string, todolistId: string) {
    dispatchToTodolistsReducer(changeTodolistTitleAC(newTitle, todolistId));
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
          <AddItemForm addItem={addTodolist} />
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

export default AppWithRedux;
