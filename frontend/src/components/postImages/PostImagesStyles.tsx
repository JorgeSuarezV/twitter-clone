import styled from "styled-components";
import {Image} from "../image/Image"


export const ImagesContainer = styled.div`
  display: flex;
  gap: 8px;
    flex-direction: column;
`

export const ImageContainer = styled.div`
  max-height: 150px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
`

export const PostImage = styled(Image)`
  width: 100%; /* Make the image fill the container width */
  height: 100%; /* Automatically adjust the height */
  object-fit: cover; /* Crop the image to cover the container */
  object-position: top left; /* Position the image at the top left corner */
  border-radius: 10px;
`

