import React, {ChangeEvent} from "react";
import {
    ImageAndTextContainer,
    ImagesContainer,
    MobileTweetButton,
    PostCreationContainer,
    PostCreationInput
} from "./PostCreationStyles";
import {ProfileImage} from "../profileHeaders/ProfileHeaders";
import {useAppSelector} from "../../util/hooks";
import {createPost, getPostById} from "../../server/PostRequests";
import ImageUploading, {ImageListType} from "react-images-uploading";
import {PostImages} from "../postImages/PostImages";
import {uploadImage} from "../../server/S3Bucket";
import {useDispatch} from "react-redux";
import {PostData, setPosts} from "../../store/PostList";
import {PostCreationButtons} from "../postCreationButtons/PostCreationButtons";
import {useTranslation} from "react-i18next";
import {ModalCancel} from "../modalCancel/ModalCancel";
import {ModalHeaderStyles} from "../postCreationModal/PostCreationModalStyles";


export type PostCreationProps = {
    className?: string;
    onPostCreation?: () => void;
    hasLine?: boolean
    modalProps?: isModalProps;
}

export type isModalProps = {
    onCancel: () => void;
    cancelIcon: string;
}

export function PostCreation({className, onPostCreation, hasLine, modalProps}: PostCreationProps) {
    const [text, setText] = React.useState<string>("");
    const [images, setImages] = React.useState<any[]>([]);
    const posts = useAppSelector((store) => store.postList.posts)
    const dispatch = useDispatch()
    const user = useAppSelector((store) => store.activeUser)
    const [t] = useTranslation()

    function createTweet(clearTextAndImages: () => void) {
        createPost(text, images.map((image) => image.file.name)).then(response => {
            switch (response.status) {
                case 201:
                    response.json().then((data: any) => {
                        Promise.all(images.map((image: any, index: number) => {
                            return uploadImage(image, data.urls[index])
                        })).then(() => {
                            loadCreatedPost(data.post.id)
                        }).catch((error) => {
                            console.error(error)
                        })
                        clearTextAndImages()
                    })
                    break
                default:
                    console.error(response.json().then((data: any) => data))
            }
        })
    }

    function onChange(imageList: ImageListType) {
        setImages(imageList as never[]);
    }

    function loadCreatedPost(id: string) {
        setTimeout(() => {
            getPostById(id).then((response) => {
                switch (response.status) {
                    case 200:
                        response.json().then((data: any) => {
                            const newPost = new PostData(data)
                            dispatch(setPosts([newPost, ...posts]))
                        })
                        break
                    default:
                        console.error(response.json().then((data: any) => data))
                }
            })
        }, 700)
    }


    return (
        <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={4}
        >
            {({
                  onImageUpload,
                  onImageRemoveAll,
                  dragProps
              }) => {
                return (
                    <>
                        {modalProps && <ModalHeaderStyles>
                            <ModalCancel onClick={modalProps.onCancel} svgIcon={modalProps.cancelIcon}/>
                            <MobileTweetButton size={"S"} variant={"default"} disabled={text === ""}
                                               onClick={() => createTweet(() => {
                                                   setText("")
                                                   onImageRemoveAll()
                                                   if (onPostCreation) onPostCreation()
                                               })}>Tweet</MobileTweetButton>
                        </ModalHeaderStyles>}
                        <PostCreationContainer className={className} {...dragProps}>
                            <ImageAndTextContainer>
                                <ProfileImage src={user.profilePicture} alt={"profile picture"}/>
                                <PostCreationInput placeholder={t("What's happening?")} value={text}
                                                   onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}/>
                            </ImageAndTextContainer>
                            <ImagesContainer>
                                <PostImages images={images.map((image: any) => image.dataURL)}/>
                            </ImagesContainer>
                            <PostCreationButtons
                                createTweet={() => createTweet(() => {
                                    setText("")
                                    onImageRemoveAll()
                                    if (onPostCreation) onPostCreation()
                                })} onImageUpload={onImageUpload} disabled={text === ""}
                                hasLine={hasLine}
                            />
                        </PostCreationContainer>
                    </>
                )
            }}
        </ImageUploading>
    )
}