import { useCallback } from "react";
import { FilterValuesType } from "./AppWithRedux";
import { AddItemForm } from "./AddItemFrom";
import { EditableSpan } from "./EditableSpan";
import { Button, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppRootStateType } from "./state/store";
import {  } from "./state/tasksSlice";
import { Task } from "./Task";
import React from "react";
import { createTask } from "./state/tasksThunk";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  changeTodolistTitle: (newTitle: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  filter: FilterValuesType;
  removeTodolist: (todolistId: string) => void;
};

export const Todolist = React.memo((props: PropsType) => {
  console.log("Todolist is called");

  const tasksObj = useSelector<AppRootStateType, TaskType[]>(
    (state) => state.tasks[props.id]
  );
  const dispatch = useDispatch<AppDispatch>();

  const onAllClickHandler = useCallback(
    () => props.changeFilter("all", props.id),
    [props.changeFilter, props.id]
  );
  const onActiveClickHandler = useCallback(
    () => props.changeFilter("active", props.id),
    [props.changeFilter, props.id]
  );
  const onCompletedClickHandler = useCallback(
    () => props.changeFilter("completed", props.id),
    [props.changeFilter, props.id]
  );

  const handleRemove = () => props.removeTodolist(props.id);
  const changeTodolistTitle = useCallback(
    (newTitle: string) => {
      props.changeTodolistTitle(props.id, newTitle);
    },
    [props.changeTodolistTitle, props.id]
  );

  let tasksForTodoList = tasksObj;

  if (props.filter === "completed") {
    tasksForTodoList = tasksForTodoList.filter((t) => t.isDone);
  }
  if (props.filter === "active") {
    tasksForTodoList = tasksForTodoList.filter((t) => !t.isDone);
  }

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitle} />
        <IconButton onClick={handleRemove}>
          <Delete />
        </IconButton>
      </h3>
      <div>
        <AddItemForm
          addItem={useCallback(
            (title) => dispatch(createTask({title, todolistId: props.id})),
            [props.id]
          )}
        />
        <ul>
          {tasksForTodoList.map((task) => {
            return <Task task={task} todolistId={props.id} key={task.id} />;
          })}
        </ul>
        <div className="">
          <Button
            variant={props.filter === "all" ? "contained" : "text"}
            onClick={onAllClickHandler}
          >
            All
          </Button>
          <Button
            variant={props.filter === "active" ? "contained" : "text"}
            onClick={onActiveClickHandler}
            color="primary"
          >
            Active
          </Button>
          <Button
            variant={props.filter === "completed" ? "contained" : "text"}
            onClick={onCompletedClickHandler}
            color="secondary"
          >
            Completed
          </Button>
        </div>
      </div>
    </div>
  );
});
