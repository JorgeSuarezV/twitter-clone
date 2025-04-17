import React from "react";
import {
    RecommendationDivStyles,
    RecommendationFooterStyles,
    RecommendationFooterTextStyles,
    RecommendationTitleDivStyles,
    RecommendationTitleStyles
} from "../../../../components/recommendation/RecommendationStyles";
import {Recommendation} from "../../../../components/recommendation/Recommendation";
import {useNavigate} from "react-router-dom";
import {RecommendationContainer} from "./MainRecommendationStyles";
import {useTranslation} from "react-i18next";


export function MainRecommendation() {
    const {t} = useTranslation()
    const navigate = useNavigate()

    return (
        <RecommendationDivStyles>
            <RecommendationTitleDivStyles>
                <RecommendationTitleStyles variant={"6"}>{t("Who to follow")}</RecommendationTitleStyles>
            </RecommendationTitleDivStyles>
            <RecommendationContainer>
                <Recommendation limit={5}/>
            </RecommendationContainer>
            <RecommendationFooterStyles>
                <RecommendationFooterTextStyles onClick={() => navigate("/recommendations")} variant={"1"}>
                    {t("Show more")}</RecommendationFooterTextStyles>
            </RecommendationFooterStyles>
        </RecommendationDivStyles>
    )
}