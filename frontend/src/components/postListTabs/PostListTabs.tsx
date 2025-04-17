import React from "react";
import Tabs from "../tabs/Tabs";
import {PostList, PostQueryFunction} from "../postList/PostList";


export type PostListTabsProps = {
    queryMap: Map<string, PostQueryFunction>;
    children?: React.ReactNode;
}

export function PostListTabs({queryMap, children}: PostListTabsProps) {
    const tabs = new Map(Array.from(queryMap.keys()).map((key) =>
        [key, <PostList queryFunction={queryMap.get(key)!}/>]));


    return (
        <Tabs tabs={tabs}>
            {children}
        </Tabs>
    )
}