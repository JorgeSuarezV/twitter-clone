import React from "react";
import {ImageContainer, ImagesContainer, PostImage} from "./PostImagesStyles";
import {ImageModal} from "../modal/imageModal/ImageModal";


export type PostImagesProps = {
    images: string[];
}

type ImageModalProps = {
    isOpen: boolean;
    image: string;
}

export function PostImages({images}: PostImagesProps) {
    const [openModal, setOpenModal] = React.useState<ImageModalProps>({isOpen: false, image: ""});

    return (
        <> {openModal.image &&
            <ImageModal active={openModal.isOpen} image={openModal.image}
                        onBlur={() => setOpenModal({image: "", isOpen: false})}/>}
            {images &&
                <ImagesContainer>
                    {images.map((image, index) => {
                        return (
                            <ImageContainer key={index}>
                                <PostImage alt={""} size={"default"} src={image} onClick={() => {
                                    setOpenModal({isOpen: true, image: image})
                                }}/>
                            </ImageContainer>
                        )
                    })}
                </ImagesContainer>
            }
        </>
    )
}