import React from "react";
import {LoadingSize, LoadingStyles} from "./LoadingStyles";

export type LoadingProps = {
    size: LoadingSize
    innerRef?: React.Ref<HTMLDivElement>;
}

export function Loading({size = "S", innerRef}: LoadingProps) {
    return (
        <LoadingStyles ref={innerRef} size={size}/>
    )
}