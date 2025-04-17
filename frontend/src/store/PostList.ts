import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export class PostData {
    constructor(post: any) {
        this.id = post.id
        this.authorId = post.author.id
        this.authorName = post.author.name
        this.authorUsername = post.author.username
        this.profilePicture = post.author.profilePicture
        this.postImages = post.images
        this.postText = post.content
        this.date = new Date(post.createdAt)
    }

    id: string;
    authorId: string;
    authorName: string;
    authorUsername: string;
    profilePicture: string;
    postImages: string[];
    postText: string;
    date: Date;
}

export type PostListState = {
    posts: PostData[];
}

const initialState: PostListState = {
    posts: []
}

export const postListSlice = createSlice({
    name: 'PostList',
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<PostData[]>) => {
            state.posts = action.payload;
        }
    }
})


export const {setPosts} = postListSlice.actions;

export const selectPosts = (state: { postList: PostListState }) => state.postList.posts;

export default postListSlice.reducer;
