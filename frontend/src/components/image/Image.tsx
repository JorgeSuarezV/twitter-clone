import React, {useState} from "react";
import {ImageSize, ImageStyles} from "./ImageStyles";
import {Loading} from "../loading/Loading";


export type ImageProps = {
    id?: string;
    src: string;
    alt: string;
    size?: ImageSize;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
}

export function Image({id, src, alt, size = "S", className, onClick}: ImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            {isLoading && <Loading size={size}/>}
            <ImageStyles isLoading={isLoading} id={id} size={size}
                         src={src} alt={alt} className={className} onClick={onClick}
                         onLoad={() => setIsLoading(false)} hasOnClick={onClick !== undefined}></ImageStyles>
        </>
    )
}
