import { Meta } from '@storybook/react'
import AppWithRedux from "../components/AppWithRedux";
import { ReduxStoreProviderDecorater } from "./ReduxStoreProviderDecorater";

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
