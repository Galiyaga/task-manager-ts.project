import { Provider } from "react-redux";
import { Task, TaskPropsType } from "./Task";
import { mockStore } from "./mockStoreForStorybook/mockStore";
import { todolistId1 } from "./mockStoreForStorybook/mock-todolists-reducer";

export default {
  title: "Task Component",
  component: Task,
};

export const TaskBaseExample = (props: TaskPropsType) => {
  return (
    <>
      <Provider store={mockStore}>
        <Task
          task={{ id: "1", title: "CSS", isDone: true }}
          todolistId={todolistId1}
        />
        <Task
          task={{ id: "2", title: "JS", isDone: false }}
          todolistId={todolistId1}
        />
      </Provider>
    </>
  );
};
