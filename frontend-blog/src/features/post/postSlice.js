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
  console.log("first")
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/posts`, input)
  console.log(response)
  return response.data;
})


const postSlice = createSlice({
  name: 'post',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload
    }),
    builder.addCase(createPosts.fulfilled, (state, action) => {
      state.posts = action.payload
    })
  }
})

export default postSlice.reducer