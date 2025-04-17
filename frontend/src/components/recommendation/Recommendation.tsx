import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {fetchRecommendations} from "../../server/UserRequests";
import {ProfileItemImage} from "../profileItem/profileItemImage/ProfileItemImage";
import {RecommendationItemButton, TextButtonDivStyles} from "./RecommendationStyles";
import {ProfileItemText} from "../profileItem/profileItemText/ProfileItemText";
import {ProfileItem} from "../profileItem/ProfileItem";
import useInfiniteScroll from "react-infinite-scroll-hook";
import {Loading} from "../loading/Loading";

export type RecommendationProps = {
    limit: number;
    enableScroll?: boolean;
}

export function Recommendation({limit, enableScroll = false}: RecommendationProps) {
    const [recommendation, setRecommendation] = useState<any[]>([])
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const [sentryRef] = useInfiniteScroll({
        loading: isLoading,
        hasNextPage: hasMore,
        onLoadMore: loadRecommendation,
        disabled: !enableScroll,
        rootMargin: '0px 0px 0px 0px',
    })

    useEffect(() => {
        loadRecommendation()
    }, [])

    function loadRecommendation() {
        setIsLoading(true)
        fetchRecommendations(limit, recommendation.length).then(response => {
            switch (response.status) {
                case 200:
                    response.json().then((data: any) => {
                        const newData = data.map((user: any) => {
                            user.isFollowing = false
                            return user
                        })
                        setRecommendation(recommendation.concat(newData))
                        setHasMore(data.length === limit)
                    })
                    break;
                default:
                    console.error("Something went wrong. Try again later.")
            }
        })
        setIsLoading(false)
    }


    function setUserFollowing(id: string, state: boolean) {
        const newRecommendation = recommendation.map((user: any) => {
            if (user.id === id) user.isFollowing = state
            return user
        })
        setRecommendation(newRecommendation)
    }


    return (
        <>
            {recommendation.map((user: any, index) => {
                return (
                    <ProfileItem key={user.id} innerRef={index === recommendation.length - 7 ? sentryRef : undefined}
                                 onClick={() => {
                                 }}>
                        <ProfileItemImage onClick={() => navigate(`/profile/${user.id}`)}
                                          profilePicture={user.profilePicture}/>
                        <TextButtonDivStyles>
                            <ProfileItemText onClick={() => navigate(`/profile/${user.id}`)} name={user.name}
                                             username={user.username}/>
                            <RecommendationItemButton id={user.id}
                                                      isFollowing={user.isFollowing}
                                                      followCallback={(id: string) => {
                                                          setUserFollowing(id, true)
                                                      }}
                                                      unfollowCallback={(id: string) => {
                                                          setUserFollowing(id, false)
                                                      }}
                                                      username={user.username}
                            />
                        </TextButtonDivStyles>
                    </ProfileItem>
                )
            })
            }
            {(isLoading || hasMore) && enableScroll && (
                <ProfileItem>
                    <Loading size={"S"}/>
                </ProfileItem>
            )}
        </>
    )
}


