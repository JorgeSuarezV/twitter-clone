import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ActiveUser} from "./ActiveUser";


const initialState: ActiveUser = {
    id: '',
    profilePicture: '',
    description: '',
    username: '',
    name: ''
}

export const activeProfileUserSlice = createSlice({
    name: 'activeProfileUser',
    initialState,
    reducers: {
        setActiveProfileUser: (state, action: PayloadAction<ActiveUser>) => {
            state.id = action.payload.id;
            state.profilePicture = action.payload.profilePicture;
            state.description = action.payload.description ?? '';
            state.username = action.payload.username;
            state.name = action.payload.name;
        },
        clearActiveProfileUser: (state) => {
            return initialState
        }
    }
})

export const {setActiveProfileUser, clearActiveProfileUser} = activeProfileUserSlice.actions;

export const selectActiveProfileUser = (state: { activeProfileUser: ActiveUser }) => state.activeProfileUser;

export default activeProfileUserSlice.reducer;