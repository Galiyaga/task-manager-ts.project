import { Meta } from '@storybook/react'
import AppWithRedux from "./AppWithRedux";
import { ReduxStoreProviderDecorater } from "./stories/ReduxStoreProviderDecorater";

export default {
  title: "AppWithRedux Component",
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorater],
} as Meta;

export const AppWithReduxBaseExample = () => {
  return (
    <>
      <AppWithRedux />
    </>
  );
};
