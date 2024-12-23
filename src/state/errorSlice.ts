import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ErrorStateType = {  
  message: string | undefined;  
}

const initialState: ErrorStateType = {
    message: undefined as string | undefined
}

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError(state, action: PayloadAction<string | undefined>) {
            state.message = action.payload
        }
    }
})

export const {setError} = errorSlice.actions
export const errorReducer = errorSlice.reducer