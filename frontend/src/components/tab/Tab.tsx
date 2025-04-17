import React from "react";
import {TabActiveProps, TabStyles} from "./TabStyles";


export type TabProps = {
    isActive: TabActiveProps;
    name: string;
    onClick: () => void;
}

export function Tab({isActive, name, onClick}: TabProps) {
    return (
        <>
            <TabStyles isActive={isActive} onClick={onClick}>
                {name}
            </TabStyles>
            {/*{isActive === "true" && <div>{name}</div>}*/}
        </>
    )
}