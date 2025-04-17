import React from "react";
import {ImageContainer, ImageModalBackgroundStyles, ModalImage} from "./ImageModalStyles";

export type ModalProps = {
    active: boolean;
    image: string;
    onBlur?: () => void
}

export function ImageModal({active, image, onBlur}: ModalProps) {


    return (
        <>
            {active &&
                <ImageModalBackgroundStyles onClick={onBlur}>
                    <ImageContainer>
                        <ModalImage src={image} alt={""} size={"default"}/>
                    </ImageContainer>
                </ImageModalBackgroundStyles>}
        </>
    )
}
