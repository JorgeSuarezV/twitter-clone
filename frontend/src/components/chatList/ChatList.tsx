import React from "react";
import {useAppSelector} from "../../util/hooks";
import {ProfileItem} from "../profileItem/ProfileItem";

export function ChatList() {
    const chatList = useAppSelector(state => state.chatList.chats)


    return (
        <>
            {
                chatList.map(chat => {
                        return (
                            <ProfileItem key={""}>
                                ""
                            </ProfileItem>
                        )
                    }
                )
            }
        </>
    )
}