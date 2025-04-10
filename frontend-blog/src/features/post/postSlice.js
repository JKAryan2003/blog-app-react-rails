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


const postSlice = createSlice({
  name: 'post',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload
    })
  }
})

export default postSlice.reducer