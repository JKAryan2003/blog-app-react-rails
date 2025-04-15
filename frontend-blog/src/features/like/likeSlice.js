import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  likes: []
}

export const addLike = createAsyncThunk('like/addLike', async (id) => {
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/posts/${id}/likes`)
  console.log(response)
  return response.data;
})

export const deleteLike = createAsyncThunk('post/deleteLike', async (id) => {
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/posts/${id}/delete_like`)
  console.log(response)
})

const likeSlice = createSlice({
  name: 'like',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addLike.fulfilled, (state, action) => {
      console.log(action.payload)
      state.comments = action.payload
    }),
    builder.addCase(deleteLike.fulfilled, (state, action) => {
      console.log(action.payload)
    })
  }
})

export default likeSlice.reducer