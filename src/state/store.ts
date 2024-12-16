import { applyMiddleware, configureStore, Tuple } from '@reduxjs/toolkit'
import { tasksReducer } from "./tasksSlice";
import { todolistsReducer } from "./todolistsSlice";
import { successLoginMiddleware } from './middleware';
import { authReducer } from './authSlice';

const rootReducer = {
    todolists: todolistsReducer,
    tasks: tasksReducer,
    auth: authReducer
}


export type AppRootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(successLoginMiddleware.middleware) 
})

// @ts-ignore
window.store = store
 