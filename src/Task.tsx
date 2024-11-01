import { useDispatch } from "react-redux";
import { TaskType } from "./Todolist";
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks-reducer";
import { ChangeEvent, useCallback } from "react";
import { Delete } from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";
import { EditableSpan } from "./EditableSpan";
import React from "react";

type TaskPropsType = {
    task: TaskType,
    todolistId: string
  }

export const Task = React.memo((props: TaskPropsType) => {
const dispatch = useDispatch()
const onClickHandler = () => dispatch(removeTaskAC(props.task.id, props.todolistId));
const onChangeStatusHandler = (
    e: ChangeEvent<HTMLInputElement>
) => {
    dispatch(changeTaskStatusAC(props.task.id, props.todolistId, e.currentTarget.checked));
};
const onChangeTitleHandler = useCallback((newTitle: string) => {
    dispatch(changeTaskTitleAC(props.task.id, props.todolistId, newTitle ))
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
