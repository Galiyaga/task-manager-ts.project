import { TasksStateType, TodolistType } from "../AppWithRedux";
import { tasksReducer } from "../tasksSlice";
import { todolistsReducer } from "../todolistsSlice";
import { createTodolist, deleteTodolist } from "../todolistsThunks";

describe("todolists-tasks reducer", () => {
  it("ids should be equals", () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: TodolistType[] = [];

    const action = {
      type: createTodolist.fulfilled.type,
      payload: {
        id: "newTodolistId",
        title: "New Todolist Title",
        filter: "all",
      },
    };

    const endTasksState = tasksReducer(startTasksState, action);
    const endTodolistsState = todolistsReducer(startTodolistsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.id);
    expect(idFromTodolists).toBe(action.payload.id);
  });
  it('tasks of deleted todolist shoulbe removed', () => {
    const startTasksState: TasksStateType = {
      todolistId1: [
        {
          id: "1",
          title: "CSS",
          isDone: false,
        }
      ],
      todolistId2: [
        {
          id: "1",
          title: "bread",
          isDone: false,
        }
      ]
    };
    const startTodolistsState: TodolistType[] = [
      {
        id: 'todolistId1',
        title: "Todolist Title 1",
        filter: 'all'
      },
      {
        id: 'todolistId2',
        title: "Todolist Title 2",
        filter: 'all'
      }
    ];

    const action = {
      type: deleteTodolist.fulfilled.type,
      payload: 'todolistId1'
    };

    const endTasksState = tasksReducer(startTasksState, action);
    const endTodolistsState = todolistsReducer(startTodolistsState, action);

    
    expect(endTasksState['todolistId1']).toBeUndefined()
    expect(endTasksState['todolistId2'].length).toBe(1)
    expect(endTasksState['todolistId2'][0].title).toBe('bread')
    expect(endTodolistsState[0].id).toBe('todolistId2')
    expect(endTodolistsState.length).toBe(1)
  })
});
