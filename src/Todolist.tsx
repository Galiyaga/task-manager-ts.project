import { useState } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemFrom";

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
  addTask: (title: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  filter: FilterValuesType;
  removeTodolist: (todolistId: string) => void;
};

export function Todolist(props: PropsType) {

  const onAllClickHandler = () => props.changeFilter("all", props.id);

  const onActiveClickHandler = () => props.changeFilter("active", props.id);

  const onCompletedClickHandler = () => props.changeFilter("completed", props.id);

  const handleRemove = () => props.removeTodolist(props.id)

  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <button onClick={handleRemove}>X</button>
      <div>
        <AddItemForm addItem={addTask} />
        <ul>
          {props.tasks.map((task) => (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
              <input
                type="checkbox"
                checked={task.isDone}
                onChange={(e) => {
                  props.changeStatus(
                    task.id,
                    e.currentTarget.checked,
                    props.id
                  );
                  console.log(e.currentTarget.checked);
                }}
              />
              <span>{task.title}</span>
              <button onClick={() => props.removeTask(task.id, props.id)}>
                X
              </button>
            </li>
          ))}
        </ul>
        <div className="">
          <button
            className={props.filter === "all" ? "active-filter" : ""}
            onClick={onAllClickHandler}
          >
            All
          </button>
          <button
            className={props.filter === "active" ? "active-filter" : ""}
            onClick={onActiveClickHandler}
          >
            Active
          </button>
          <button
            className={props.filter === "completed" ? "active-filter" : ""}
            onClick={onCompletedClickHandler}
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  );
}


