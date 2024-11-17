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
  addTodolist,
  changeTodolistFilter,
  changeTodolistTitle,
  removeTodolist,
} from "./state/todolistsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, AppRootStateType } from "./state/store";
import { useCallback } from "react";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [todolistId: string]: TaskType[];
};

function AppWithRedux() { 
  console.log('AppWithRedux is called')

  const dispatch = useDispatch<AppDispatch>()
  const todolists = useSelector<AppRootStateType, TodolistType[]>( state => state.todolists)
  

  const handleRemoveTodolist = useCallback((id: string) => {
    dispatch(removeTodolist(id))
  }, [dispatch])

  const handleChangeTodolistFilter = useCallback((filter: FilterValuesType, id: string) => {
    dispatch(changeTodolistFilter( {filter, id }));
  }, [dispatch])

  const handleAddTodolist = useCallback((title: string, id: string = v1()) => {
    dispatch(addTodolist({title, id}));
  }, [dispatch])

  const handleChangeTodolistTitle = useCallback((id: string, title: string) => {
    dispatch(changeTodolistTitle({id, title}));
  }, [dispatch])

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
          <AddItemForm addItem={handleAddTodolist} />
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
                    changeFilter={handleChangeTodolistFilter}
                    filter={tl.filter}
                    removeTodolist={handleRemoveTodolist}
                    changeTodolistTitle={handleChangeTodolistTitle}
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
