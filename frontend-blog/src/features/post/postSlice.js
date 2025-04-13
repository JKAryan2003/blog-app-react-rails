import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  posts: [],
  error: ""
}

export const fetchPosts = createAsyncThunk('post/fetchPosts', async () => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts`)
  return response.data.posts;
})

export const createPosts = createAsyncThunk('post/createPosts', async (input) => {
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/posts`, input)
  return response.data;
})

export const updatePosts = createAsyncThunk('post/updatePosts', async (obj) => {
  console.log(obj.type)
  const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/posts/${obj.postId}`, {}, {
    headers: {
      'Like-Dislike': obj.type
    }
  })
  return response.data
})

export const showPost = createAsyncThunk('post/showPost', async (id) => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`)
  return response.data
})


const postSlice = createSlice({
  name: 'post',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload
    }),
    builder.addCase(createPosts.fulfilled, (state, action) => {
      state.createPost = action.payload
    }),
    builder.addCase(updatePosts.fulfilled, (state, action) => {
      console.log(action.payload)
    }),
    builder.addCase(showPost.fulfilled, (state, action) => {
      console.log(action.payload)
    })
  }
})

export default postSlice.reducer