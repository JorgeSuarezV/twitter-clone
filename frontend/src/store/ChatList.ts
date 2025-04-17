import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type ChatListState = {
    chats: any[];
}

const initialState: ChatListState = {
    chats: []
}

export const chatListSlice = createSlice({
    name: 'ChatList',
    initialState,
    reducers: {
        setChats: (state, action: PayloadAction<ChatListState>) => {
            state.chats = action.payload.chats;
        }
    }
})

export const {setChats} = chatListSlice.actions;

export const selectPosts = (state: { chatList: ChatListState }) => state.chatList.chats;

export default chatListSlice.reducer;

