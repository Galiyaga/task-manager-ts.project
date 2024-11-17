import { configureStore } from '@reduxjs/toolkit'
import { tasksReducer } from "./tasksSlice";
import { todolistsReducer } from "./todolistsSlice";

const rootReducer = {
    todolists: todolistsReducer,
    tasks: tasksReducer
}

export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
    reducer: rootReducer,
})

// @ts-ignore
window.store = store
 