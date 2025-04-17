import {Action, combineReducers, configureStore, ThunkAction} from '@reduxjs/toolkit';
import ActiveUser from "../ActiveUser";
import ActiveProfileUser from "../ActiveProfileUser";
import {persistReducer} from "redux-persist";
import localStorage from "redux-persist/lib/storage";
import PostList from "../PostList";
import ChatList from "../ChatList";

const persistConfig = {
    key: "root",
    version: 1,
    storage: localStorage
}

const reducer = combineReducers({
    activeUser: ActiveUser,
    activeProfileUser: ActiveProfileUser,
    postList: PostList,
    chatList: ChatList
})

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
