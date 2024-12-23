import { Provider } from "react-redux";
import { AppRootStateType, store } from "../state/store";
import { todolistsReducer } from "../state/todolistsSlice";
import { tasksReducer } from "../state/tasksSlice";
import { combineReducers, createStore } from "redux";
import { v1 } from "uuid";
import { TasksStateType, TodolistType } from "../components/AppWithRedux";
import { authReducer } from "../state/authSlice";
import { errorReducer } from "../state/errorSlice";

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer
});

type globalStateType = {
  todolists: TodolistType[];
  tasks: TasksStateType;
};

const initialGlobalState: globalStateType = {
  todolists: [
    {
      id: "todolistId1",
      title: "What to learn",
      filter: "all",
    },
    {
      id: "todolistId2",
      title: "What to buy",
      filter: "all",
    },
  ],
  tasks: {
    ["todolistId1"]: [
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
    ["todolistId2"]: [
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
  },
};

// @ts-ignore
export const storyBookStore = createStore(
  rootReducer,
  initialGlobalState as unknown as AppRootStateType
);

export const ReduxStoreProviderDecorater = (storyFn: any) => {
  return <Provider store={storyBookStore}> {storyFn()} </Provider>;
};
