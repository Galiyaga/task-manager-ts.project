import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { TaskType } from "../Todolist";
import { todolistsAndTasksAPI } from "../api/todolists-tasks-api";

export const getTasks = createAsyncThunk<TaskType[],
string, { rejectValue: string }
>("tasks/getTasks", async (todolistId, { rejectWithValue }) => {
    try {
        const res = await todolistsAndTasksAPI.getTasks(todolistId)

        const formattedTasks: TaskType[] = res.data.items.map(apiTask => ({
            id: apiTask.id,
            title: apiTask.title,
            isDone: apiTask.completed
        }))

        return formattedTasks
    } catch (error: any) {
        return rejectWithValue(error.message)
    }
})