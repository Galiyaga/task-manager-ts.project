import { useState } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
};

export function Todolist(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyUp={(e) => {
            
          }}
        />
        <button
          onClick={() => {
            props.addTask(newTaskTitle);
            setNewTaskTitle("");
          }}
        >
          +
        </button>
        <ul>
          {props.tasks.map((task) => (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} />
              <span>{task.title}</span>
              <button onClick={() => props.removeTask(task.id)}>X</button>
            </li>
          ))}
        </ul>
        <div className="">
          <button onClick={() => props.changeFilter("all")}>All</button>
          <button onClick={() => props.changeFilter("active")}>Active</button>
          <button onClick={() => props.changeFilter("completed")}>
            Completed
          </button>
        </div>
      </div>
    </div>
  );
}
