import React from "react";
import MainLayout from "../components/layout/mainLayout/MainLayout";
import {PostListTabs} from "../../../components/postListTabs/PostListTabs";
import {getFeed, getFollowedPosts} from "../../../server/PostRequests";
import {PostQueryFunction} from "../../../components/postList/PostList";
import {HomePostCreation} from "./HomeStyles";
import {useTranslation} from "react-i18next";

export default function Home() {
    const [t] = useTranslation()

    const tabs: Map<string, PostQueryFunction> = new Map([
        ["For you", getFeed],
        ["Following", getFollowedPosts],
    ]);

    return (
        <MainLayout title={t("Home")} isScrollable={true}>
            <PostListTabs queryMap={tabs}>
                <HomePostCreation/>
            </PostListTabs>
        </MainLayout>
    );
}
