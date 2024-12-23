import { applyMiddleware, configureStore, Tuple } from '@reduxjs/toolkit'
import { tasksReducer } from "./tasksSlice";
import { todolistsReducer } from "./todolistsSlice";
import { errorMiddleware, successLoginMiddleware } from './middleware';
import { authReducer } from './authSlice';
import { errorReducer } from './errorSlice';

const rootReducer = {
    todolists: todolistsReducer,
    tasks: tasksReducer,
    auth: authReducer,
    error: errorReducer
}


export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware()
    .concat(successLoginMiddleware.middleware)
    .concat(errorMiddleware.middleware)
})

// @ts-ignore
window.store = store
 