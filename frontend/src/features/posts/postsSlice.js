import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import postsService from "./postsService";

const initialState = {
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const createPost = createAsyncThunk(
  "posts/create",
  async (postData, thunkAPI) => {
    try {
      const user = thunkAPI.getState().auth.user;
      if (!user) return thunkAPI.rejectWithValue("Not logged in");
      return await postsService.createPost(postData, user.token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const readPosts = createAsyncThunk(
  "posts/readAll",
  async (_, thunkAPI) => {
    try {
      return await postsService.readPosts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const readPost = createAsyncThunk(
  "posts/readOne",
  async (id, thunkAPI) => {
    try {
      return await postsService.readPost(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/update",
  async (post, thunkAPI) => {
    try {
      const user = thunkAPI.getState().auth.user;
      if (!user) return thunkAPI.rejectWithValue("Not logged in");
      return await postsService.updatePost(post, user.token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/delete",
  async (id, thunkAPI) => {
    try {
      const user = thunkAPI.getState().auth.user;
      if (!user) return thunkAPI.rejectWithValue("Not logged in");
      return await postsService.deletePost(id, user.token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(readPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(readPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(readPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload.id
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(readPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(readPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        let isExist = false;
        state.posts = state.posts.map((post) => {
          if (post._id === action.payload._id) {
            isExist = true;
            return action.payload;
          } else {
            return post;
          }
        });
        if (!isExist) {
          state.posts.push(action.payload);
        }
      })
      .addCase(readPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = postsSlice.actions;
export default postsSlice.reducer;
