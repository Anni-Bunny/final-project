import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {user} from "../../interfaces/user";

interface userSliceInterface {
    data?: user
}

const initialState: userSliceInterface = {
    data: undefined
}

export interface userLoginForm {
    email: string,
    password: string
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<user>) => {
            console.log(action.payload)
            state.data = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const {login} = userSlice.actions

export default userSlice.reducer