import { AddItemForm } from "./AddItemFrom";
import {  action  } from "@storybook/addon-actions";
import { EditableSpan } from "./EditableSpan";

export default {
    title: "EditableSpan Component",
    component: EditableSpan
}

const ChangeCallback = action('Title is changed')

export const EditableSpanBaseExample = () => {
    return <EditableSpan title={'Start title'} onChange={ChangeCallback} />
}