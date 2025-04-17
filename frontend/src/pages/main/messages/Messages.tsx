import React from "react";
import {MessagesLayout} from "../components/layout/messagesLayout/MessagesLayout";
import {ChatView} from "../../../components/chatView/ChatView";

export function Messages() {


    return (
        <MessagesLayout MainContentChildren={
            <ChatView/>
        } RightSide={<div>right side</div>}/>
    )
}