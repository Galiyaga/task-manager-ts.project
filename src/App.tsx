import React, { useState } from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist'
import {v1} from 'uuid'

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {

  const [tasks, setTasks] = useState<TaskType[]>([
    {
      id: v1(),
      title: "CSS",
      isDone: true
    },
    {
      id: v1(),
      title: "JS",
      isDone: true
    },
    {
      id: v1(),
      title: "React",
      isDone: false
    },
  ])

  const [filter, setFilter] = useState<FilterValuesType>('all')

  let tasksForTodoList = tasks
  if (filter === 'completed') {
    tasksForTodoList = tasks.filter(t => t.isDone)
  }
  if (filter === 'active') {
    tasksForTodoList = tasks.filter(t => !t.isDone)
  }
  
  function removeTask(id: string) {
    let resultTasks = tasks.filter(t => t.id !== id)
    setTasks(resultTasks)
  }

  function changeFilter(value: FilterValuesType) {
   setFilter(value)
  }

  function addTask(title: string) {
    let newTask: TaskType = {id: v1(), title: title, isDone: false}
    let newTasks: TaskType[] = [newTask, ...tasks]
    setTasks(newTasks)
  }

  return (
    <div className="App">
      <Todolist title="What to learn" tasks={tasksForTodoList} removeTask={removeTask} changeFilter={changeFilter} addTask={addTask}/>
    </div>
  );
}

export default App;
