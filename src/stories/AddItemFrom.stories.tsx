import { AddItemForm } from "../components/AddItemFrom";
import {  action  } from "@storybook/addon-actions";

export default {
    title: "AddItemForm Component",
    component: AddItemForm
}

const callback = action('Кнопка "добавить" была нажата')

export const AddItemFormBaseExample = () => {
    return <AddItemForm addItem={callback} />
}