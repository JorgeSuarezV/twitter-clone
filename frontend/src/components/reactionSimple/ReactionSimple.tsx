import React, {useEffect} from "react";
import {Reaction} from "../reaction/Reaction";
import {postReactionRequest, queryReactionRequest, ReactionType} from "../../server/ReactionsRequests";

export type ReactionSimpleProps = {
    postId: string;
    reactionType: ReactionType;
    icon: string;
    fill: string;
}

export function ReactionSimple({postId, reactionType, icon, fill}: ReactionSimpleProps) {
    const [isActivated, setIsActivated] = React.useState(false);
    const [count, setCount] = React.useState<number>(0);

    useEffect(() => {
        queryLikes();
    }, [isActivated]);

    function queryLikes() {
        queryReactionRequest(reactionType, postId)
            .then(response => {
                switch (response.status) {
                    case 200:
                        response.json().then((data: any) => {
                            setIsActivated(data.isReacted)
                            setCount(data.count)
                        })
                        break;
                    default:
                        console.error("Something went wrong. Try again later.")
                }
            })
    }

    function handleClick() {
        postReactionRequest(reactionType, postId, isActivated ? "DELETE" : "POST")
            .then(response => {
                switch (response.status) {
                    case 200:
                    case 201:
                        setIsActivated(!isActivated)
                        break;
                    default:
                        console.error("Something went wrong. Try again later.")
                }
            })
        setIsActivated(!isActivated)
    }


    return (
        <Reaction icon={icon}
                  fill={isActivated ? fill : undefined}
                  count={count}
                  onClick={() => {
                      handleClick()
                  }}/>
    )
}