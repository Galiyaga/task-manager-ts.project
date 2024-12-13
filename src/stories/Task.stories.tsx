import { Task, TaskPropsType } from "./Task";
import { ReduxStoreProviderDecorater } from "./stories/ReduxStoreProviderDecorater";
import { Meta } from "@storybook/react/*";

export default {
  title: "Task Component",
  component: Task,
  decorators: [ReduxStoreProviderDecorater],
} as Meta;

export const TaskBaseExample = (props: TaskPropsType) => {
  return (
    <>
        <Task
          task={{ id: "1", title: "CSS", isDone: true }}
          todolistId={'todolistId1'}
        />
        <Task
          task={{ id: "2", title: "JS", isDone: false }}
          todolistId={'todolistId1'}
        />
    </>
  );
};
