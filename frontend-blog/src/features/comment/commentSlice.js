import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  comments: [],
  comment: "",
}

export const fetchComments = createAsyncThunk('comment/fetchComments', async () => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/comments`)
  return response.data;
})

export const addComment = createAsyncThunk('comment/addComment', async (input) => {
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/comments`, input)
  return response.data;
})

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload.comments
    }),
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.comment = action.payload
    })
  }
})

export default commentSlice.reducer