import { useDispatch, useSelector } from "react-redux";
import { TaskType } from "./Todolist";
import { ChangeEvent, useCallback } from "react";
import { Delete } from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import { EditableSpan } from "./EditableSpan";
import React from "react";
import {
  deleteTask,
  updateTasksStatus,
  updateTasksTitle,
} from "../state/tasksThunk";
import { AppDispatch, AppRootStateType } from "../state/store";
import { Statuses, UpdateTaskModelType } from "../api/api";

export type TaskPropsType = {
  todolistId: string;
  task: TaskType;
};

export const Task = React.memo((props: TaskPropsType) => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector(
    (state: AppRootStateType) => state.tasks
  );

  const onClickHandler = () =>
    dispatch(
      deleteTask({ todolistId: props.todolistId, taskId: props.task.id })
    );

  const onChangeStatusHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newIsDoneValue = e.currentTarget.checked 
      const title = props.task.title
      const status: Statuses = newIsDoneValue ? 1 : 0;
      console.log("status", status);
      dispatch(
        updateTasksStatus({
          taskId: props.task.id,
          todolistId: props.todolistId,
          model: { status, title } as UpdateTaskModelType,
        })
      );
    },
    [props.task.id, props.todolistId]
  );
  const onChangeTitleHandler = useCallback(
    (newTitle: string) => {
      dispatch(
        updateTasksTitle({
          taskId: props.task.id,
          todolistId: props.todolistId,
          model: { title: newTitle } as UpdateTaskModelType,
        })
      );
    },
    [props.task.id, props.todolistId]
  );

  return (
    <div className={props.task.isDone ? "is-done" : ""}>
      <Checkbox checked={props.task.isDone } onChange={onChangeStatusHandler} />
      <EditableSpan title={props.task.title} onChange={onChangeTitleHandler} />
      <IconButton onClick={onClickHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
