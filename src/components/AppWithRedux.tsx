import { TaskType, Todolist } from "./Todolist";
import { AddItemForm } from "../components/AddItemFrom";
import {
  Container,
  Grid,
  Grid2,
  Paper,
} from "@mui/material";
import { changeTodolistFilter } from "../state/todolistsSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, AppRootStateType } from "../state/store";
import { useCallback } from "react";
import {
  createTodolist,
  deleteTodolist,
  updateTodolist,
} from "../state/todolistsThunks";

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
  const dispatch = useDispatch<AppDispatch>();
  const todolists = useSelector<AppRootStateType, TodolistType[]>(
    (state) => state.todolists
  );

  const handleRemoveTodolist = useCallback(
    (id: string) => {
      dispatch(deleteTodolist(id));
    },
    [dispatch]
  );

  const handleChangeTodolistFilter = useCallback(
    (filter: FilterValuesType, id: string) => {
      dispatch(changeTodolistFilter({ filter, id }));
    },
    [dispatch]
  );

  const handleAddTodolist = useCallback(
    (title: string) => {
      dispatch(createTodolist(title));
    },
    [dispatch]
  );

  const handleChangeTodolistTitle = useCallback(
    (id: string, title: string) => {
      dispatch(updateTodolist({ id, title }));
    },
    [dispatch]
  );

  return (
    <div className="App">
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
