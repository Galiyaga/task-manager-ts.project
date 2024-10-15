import { ChangeEvent, useState } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemFrom";
import { EditableSpan } from "./EditableSpan";
import { Button, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, todolistId: string) => void;
  changeTodolistTitle: (newTitle: string, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  filter: FilterValuesType;
  removeTodolist: (todolistId: string) => void;
  changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void;
};

export function Todolist(props: PropsType) {
  const onAllClickHandler = () => props.changeFilter("all", props.id);

  const onActiveClickHandler = () => props.changeFilter("active", props.id);

  const onCompletedClickHandler = () =>
    props.changeFilter("completed", props.id);

  const handleRemove = () => props.removeTodolist(props.id);

  const changeTodolistTitle = (newTitle: string) => {
    props.changeTodolistTitle(newTitle, props.id);
  };
  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  return (
    <div>
      <h3>
        <EditableSpan title={props.title} onChange={changeTodolistTitle} />
        <IconButton onClick={handleRemove}>
          <Delete />
        </IconButton>
      </h3>
      <div>
        <AddItemForm addItem={addTask} />
        <ul>
          {props.tasks.map((task) => {
            const onClickHandler = () => props.removeTask(task.id, props.id);
            const onChangeStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              props.changeStatus(task.id, e.currentTarget.checked, props.id);
            };
            const onChangeTitleHandler = (newValue: string) => {
              props.changeTaskTitle(task.id, newValue, props.id);
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
}
