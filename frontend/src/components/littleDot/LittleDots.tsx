import React, {useState} from "react";
import {DotsContainer, LittleDotStyle, OptionsContainer} from "./LittleDotsStyles";

export type LittleDotsProps = {
    color?: string;
    children?: React.ReactNode;
    disappearDots: boolean;
}


export function LittleDots({color, children, disappearDots}: LittleDotsProps) {
    const [openOptions, setOpenOptions] = useState<boolean>(false)

    return (
        <div>
            <DotsContainer onClick={() => setOpenOptions(!openOptions)} displayDots={!openOptions || !disappearDots}>
                <LittleDotStyle color={color}/>
                <LittleDotStyle color={color}/>
                <LittleDotStyle color={color}/>
            </DotsContainer>
            {openOptions && children && <OptionsContainer>
                {children}
            </OptionsContainer>}
        </div>
    )
}
