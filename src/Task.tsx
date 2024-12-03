import { useDispatch } from "react-redux";
import { TaskType } from "./Todolist";
import { ChangeEvent, useCallback } from "react";
import { Delete } from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import { EditableSpan } from "./EditableSpan";
import React from "react";
import { deleteTask, updateTasksTitle } from "./state/tasksThunk";
import { AppDispatch } from "./state/store";
import { updateTasksStatus } from "./state/tasksSlice";
import { UpdateTaskModelType } from "./api/todolists-tasks-api";

export type TaskPropsType = {
  todolistId: string;
  task: TaskType;
};

export const Task = React.memo((props: TaskPropsType) => {
  const dispatch = useDispatch<AppDispatch>();
  const onClickHandler = () =>
    dispatch(
      deleteTask({ todolistId: props.todolistId, taskId: props.task.id })
    );
  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      updateTasksStatus({
        taskId: props.task.id,
        todolistId: props.todolistId,
        isDone: e.currentTarget.checked,
      })
    );
  };
  const onChangeTitleHandler = useCallback(
    (newTitle: string) => {
      dispatch(
        updateTasksTitle({
          taskId: props.task.id,
          todolistId: props.todolistId,
          model: {title: newTitle} as UpdateTaskModelType ,
        })
      );
    },
    [props.task.id, props.todolistId]
  );

  return (
    <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
      <Checkbox checked={props.task.isDone} onChange={onChangeStatusHandler} />
      <EditableSpan title={props.task.title} onChange={onChangeTitleHandler} />
      <IconButton onClick={onClickHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});
