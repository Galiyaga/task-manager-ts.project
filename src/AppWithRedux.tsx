import "./App.css";
import { TaskType, Todolist } from "./Todolist";
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
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from "./state/todolists-reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";

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

  const dispatch = useDispatch()
  const todolists = useSelector<AppRootStateType, TodolistType[]>( state => state.todolists)
  

  function removeTodolist(todolistId: string) {
    dispatch(removeTodolistAC(todolistId))
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    dispatch(changeTodolistFilterAC(todolistId, value));
  }

  function addTodolist(title: string) {
    dispatch(addTodolistAC(title));
  }

  function changeTodolistTitle(newTitle: string, todolistId: string) {
    dispatch(changeTodolistTitleAC(newTitle, todolistId));
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
            return (
              <Grid item key={tl.id}>
                <Paper style={{ padding: "10px" }}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    changeFilter={changeFilter}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
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
