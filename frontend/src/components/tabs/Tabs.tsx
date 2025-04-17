import React, {ReactNode} from "react";
import {Tab} from "../tab/Tab";
import {ContentContainer, TabsContainer} from "./TabsStyles";
import {useTranslation} from "react-i18next";

export type TabsProps = {
    tabs: Map<string, ReactNode>;
    children?: React.ReactNode;
};

export default function Tabs({tabs, children}: TabsProps) {
    const [activeTab, setActiveTab] = React.useState<string>(tabs.keys().next().value);
    const [t] = useTranslation()


    return (
        <>
            <TabsContainer>
                {Array.from(tabs.keys()).map((tab, index) => (
                    <Tab
                        key={index}
                        isActive={activeTab === tab ? "true" : "false"}
                        name={t(tab)}
                        onClick={() => setActiveTab(tab)}
                    />
                ))}
            </TabsContainer>
            <ContentContainer>
                {children}
                {tabs.get(activeTab)}
            </ContentContainer>
        </>
    );
}
