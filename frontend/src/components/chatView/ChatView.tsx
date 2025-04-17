import React from "react";
import {ChatSearchBar} from "../chatSearchBar/ChatSearchBar";
import {ChatList} from "../chatList/ChatList";


export function ChatView() {

    return (
        <>
            <ChatSearchBar/>
            <ChatList/>
        </>
    )
}