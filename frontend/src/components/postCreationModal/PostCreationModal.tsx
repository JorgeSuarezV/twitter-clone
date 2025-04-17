import React from "react";
import {PostCreationModalStyles, PostCreationStyles} from "./PostCreationModalStyles";

export type PostCreationModalProps = {
    active: boolean;
    onCancel: () => void;
    onPostCreation: () => void;
    cancelIcon: string;
    className?: string;
}

export function PostCreationModal({active, onCancel, onPostCreation, cancelIcon, className}: PostCreationModalProps) {

    return (
        <PostCreationModalStyles className={className} active={active}>
            <PostCreationStyles onPostCreation={onPostCreation} hasLine={true} modalProps={{onCancel, cancelIcon}}/>
        </PostCreationModalStyles>
    )
}