import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LoadingType = {  
  isLoading: boolean;  
}

const initialState: LoadingType = {
    isLoading: false
}

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload
        }
    }
})

export const {setLoading} = loadingSlice.actions
export const loadingReducer = loadingSlice.reducer