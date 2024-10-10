import React, { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active";
type Todolist = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {

  let todolistId1 = v1();
  let todolistId2 = v1();

  const [tasksObj, setTasksObj] = useState({
    [todolistId1]: [
      {
        id: v1(),
        title: "CSS",
        isDone: true,
      },
      {
        id: v1(),
        title: "JS",
        isDone: true,
      },
      {
        id: v1(),
        title: "React",
        isDone: false,
      },
    ],
    [todolistId2]: [
      {
        id: v1(),
        title: "Book",
        isDone: true,
      },
      {
        id: v1(),
        title: "Cheese",
        isDone: false,
      },
    ],
  });

  const [todolists, setTtodolists] = useState<Todolist[]>([
    {
      id: todolistId1,
      title: "What to learn",
      filter: "active",
    },
    {
      id: todolistId2,
      title: "What to buy",
      filter: "completed",
    },
  ]);

  function removeTodolist (todolistId: string) {
    let filteredTodolist = todolists.filter(t => t.id !== todolistId)
    setTtodolists(filteredTodolist)
    delete tasksObj[todolistId]
    setTasksObj({...tasksObj})
  }

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId]
    let resultTasks = tasks.filter((t) => t.id !== id);
    tasksObj[todolistId] = resultTasks
    setTasksObj({...tasksObj});
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find((tl) => tl.id === todolistId);
    if (todolist) todolist.filter = value;
    setTtodolists([...todolists]);
  }

  function addTask(title: string, todolistId: string) {
    let newTask: TaskType = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todolistId]

    let newTasks: TaskType[] = [newTask, ...tasks];
    tasksObj[todolistId] = newTasks
    setTasksObj({...tasksObj});
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let task = tasksObj[todolistId].find((t) => t.id === taskId);
    if (task) task.isDone = isDone;
    setTasksObj({...tasksObj});
  }

  return (
    <div className="App">
      {todolists.map((tl) => {
        let tasksForTodoList = tasksObj[tl.id];

        if (tl.filter === "completed") {
          tasksForTodoList = tasksForTodoList.filter((t) => t.isDone);
        }
        if (tl.filter === "active") {
          tasksForTodoList = tasksForTodoList.filter((t) => !t.isDone);
        }
        return (
          <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
            filter={tl.filter}
            removeTodolist={removeTodolist}
          />
        );
      })}
    </div>
  );
}

export default App;
