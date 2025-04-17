import React from "react";
import {Recommendation} from "../../../components/recommendation/Recommendation";
import {RecommendationContainer} from "./RecommendationsStyles";
import {NoRightSideLayout} from "../components/layout/noRightSide/NoRightSideLayout";
import {useTranslation} from "react-i18next";


export function Recommendations() {
    const [t] = useTranslation()


    return (
        <NoRightSideLayout title={t("Connect")} isScrollable={true}>
            <RecommendationContainer>
                <Recommendation limit={10} enableScroll={true}/>
            </RecommendationContainer>
        </NoRightSideLayout>
    )
}