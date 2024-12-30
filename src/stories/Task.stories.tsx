import { Task } from "../components/Task";
import { ReduxStoreProviderDecorater } from "./ReduxStoreProviderDecorater";
import { Meta } from "@storybook/react/*";

export default {
  title: "Task Component",
  component: Task,
  decorators: [ReduxStoreProviderDecorater],
} as Meta;

export const TaskBaseExample = () => {
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
