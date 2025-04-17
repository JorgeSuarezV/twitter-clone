import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type ActiveUser = {
    id: string;
    profilePicture: string;
    description: string;
    username: string;
    name: string;
}

const initialState: ActiveUser = {
    id: '',
    profilePicture: '',
    description: '',
    username: '',
    name: ''
}

export const activeUserSlice = createSlice({
    name: 'activeUser',
    initialState,
    reducers: {
        setActiveUser: (state, action: PayloadAction<ActiveUser>) => {
            console.log("set active user", action.payload)
            state.id = action.payload.id;
            state.profilePicture = action.payload.profilePicture;
            state.description = action.payload.description ?? '';
            state.username = action.payload.username;
            state.name = action.payload.name;
        },
        clearActiveUser: (state) => {
            console.log("cleared")
            state = initialState;
        }
    }
})

export const {setActiveUser, clearActiveUser} = activeUserSlice.actions;

export const selectActiveUser = (state: { activeUser: ActiveUser }) => state.activeUser;

export default activeUserSlice.reducer;