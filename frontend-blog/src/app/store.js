import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/post/postSlice"
import commentReducer from "../features/comment/commentSlice"
import likeReducer from "../features/like/likeSlice"

const store = configureStore({
  reducer: {
    post: postReducer,
    comment: commentReducer,
    like: likeReducer
  }
})

export default store