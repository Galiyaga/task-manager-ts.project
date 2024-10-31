import { ChangeEvent, useCallback } from "react";
import { FilterValuesType } from "./AppWithRedux";
import { AddItemForm } from "./AddItemFrom";
import { EditableSpan } from "./EditableSpan";
import { Button, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks-reducer";
import React from "react";

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
  console.log('Todolist is called')

  const tasksObj = useSelector<AppRootStateType, TaskType[]>( state => state.tasks[props.id])
  const dispatch = useDispatch()

  const onAllClickHandler = () => props.changeFilter("all", props.id);

  const onActiveClickHandler = () => props.changeFilter("active", props.id);

  const onCompletedClickHandler = () =>
    props.changeFilter("completed", props.id);

  const handleRemove = () => props.removeTodolist(props.id);

  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.id, newTitle);
  };

  let tasksForTodoList = tasksObj

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
        <AddItemForm addItem={useCallback((title) =>dispatch(addTaskAC(title, props.id)), [])} />
        <ul>
          {tasksForTodoList.map((task) => {
            const onClickHandler = () => dispatch(removeTaskAC(task.id, props.id));
            const onChangeStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              dispatch(changeTaskStatusAC(task.id, props.id, e.currentTarget.checked));
            };
            const onChangeTitleHandler = (newTitle: string) => {
              dispatch(changeTaskTitleAC(task.id, props.id, newTitle ))
            };

            return (
              <div key={task.id} className={task.isDone ? "is-done" : ""}>
                <Checkbox
                  checked={task.isDone}
                  onChange={onChangeStatusHandler}
                />
                <EditableSpan
                  title={task.title}
                  onChange={onChangeTitleHandler}
                />
                <IconButton onClick={onClickHandler}>
                  <Delete />
                </IconButton>
              </div>
            );
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
})
