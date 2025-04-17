import React, {useEffect, useState} from "react";
import {Post} from "../post/Post";
import {Loading} from "../loading/Loading";
import useInfiniteScroll from "react-infinite-scroll-hook";
import {LoadingContainer, PostListContainerStyles} from "./PostListStyles";
import {PostData, setPosts} from "../../store/PostList";
import {useAppSelector} from "../../util/hooks";
import {useDispatch} from "react-redux";


export type PostListProps = {
    queryFunction: PostQueryFunction;
}

export type PostQueryFunction = (limit: number, skip?: string) => Promise<Response>

export function PostList({queryFunction}: PostListProps) {
    const posts: PostData[] = useAppSelector((state) => state.postList.posts)
    const dispatch = useDispatch()
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const [sentryRef] = useInfiniteScroll({
        loading: isLoading,
        hasNextPage: hasMore,
        onLoadMore: () => loadPosts(posts, 10, posts[posts.length - 1].id || undefined),
        disabled: false,
        rootMargin: '0px 0px 0px 0px',
    })


    useEffect(() => {
        loadPosts([], 10)
        return () => {
            dispatch(setPosts([]))
        }
    }, [queryFunction])

    function loadPosts(actualPosts: PostData[], limit: number, skip?: string) {
        setIsLoading(true)
        queryFunction(limit, skip)
            .then(response => {
                switch (response.status) {
                    case 200:
                        response.json().then((data: any) => {
                            const newData = data.map((post: any) => {
                                return new PostData(post)
                            })
                            dispatch(setPosts([...actualPosts, ...newData]))
                            setHasMore(data.length === limit)
                        })
                        break;
                    case 404:
                        setHasMore(false)
                        break;
                    default:
                        console.error("Something went wrong. Try again later.")
                }
            })
        setIsLoading(false)
    }

    return (
        <>
            {posts.length !== 0 &&
                <PostListContainerStyles>
                    {posts && posts.map((post: PostData) => {
                        return <Post key={post.id} post={post}/>
                    })}
                    {(isLoading || hasMore) && (
                        <LoadingContainer>
                            <Loading size={"S"} innerRef={sentryRef}/>
                        </LoadingContainer>
                    )}
                </PostListContainerStyles>}
        </>
    )
}