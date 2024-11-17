import { useDispatch } from "react-redux";
import { TaskType } from "./Todolist";
import { changeTaskStatus, changeTaskTitle, removeTask } from "./state/tasksSlice";
import { ChangeEvent, useCallback } from "react";
import { Delete } from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import { EditableSpan } from "./EditableSpan";
import React from "react";

export type TaskPropsType = {
    todolistId: string,
    task: TaskType
  }

export const Task = React.memo((props: TaskPropsType) => {
const dispatch = useDispatch()
const onClickHandler = () => dispatch(removeTask({taskId: props.task.id, todolistId: props.todolistId}));
const onChangeStatusHandler = (
    e: ChangeEvent<HTMLInputElement>
) => {
    dispatch(changeTaskStatus({taskId: props.task.id, todolistId: props.todolistId, isDone: e.currentTarget.checked}));
};
const onChangeTitleHandler = useCallback((newTitle: string) => {
    dispatch(changeTaskTitle({ taskId: props.task.id, todolistId: props.todolistId, title: newTitle} ))
}, [props.task.id, props.todolistId]);

return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
<Checkbox
    checked={props.task.isDone}
    onChange={onChangeStatusHandler}
/>
<EditableSpan
    title={props.task.title}
    onChange={onChangeTitleHandler}
/>
<IconButton onClick={onClickHandler}>
    <Delete />
</IconButton>
</div>
})
