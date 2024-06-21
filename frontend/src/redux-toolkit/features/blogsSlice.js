import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState = {
  error: "",
  loading: false,
  blogs: [],
};
const API_URL = "https://blog-beta-backend.vercel.app";
// add new blog
export const addBlog = createAsyncThunk("addBlog/blogsSlice", async (data) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const raw = JSON.stringify(data);
  const requestOptions = {
    method: "POST",
    headers,
    body: raw,
    credentials: "include",
  };
  let res = await fetch(API_URL + "/api/v1/blog/add-blog", requestOptions);
  if (!res.ok) {
    res = await res.json();
    toast.error(res.message, {
      duration: 6000,
    });
    return thunkAPI.rejectWithValue(res.message);
  } else {
    res = await res.json();
    toast.success("Added new blog successfully");
    return res;
  }
});
// get all blogs
export const getAllBlogs = createAsyncThunk(
  "getAllBlogs/blogsSLice",
  async (thunkAPI) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const requestOptions = {
      method: "GET",
      headers,
    };
    let res = await fetch(API_URL + "/api/v1/blog/get-Blogs", requestOptions);
    if (!res.ok) {
      res = await res.json();
      thunkAPI.rejectWithValue(res.message);
    } else {
      res = await res.json();
      return res;
    }
  }
);
// update a blog
export const updateABlog = createAsyncThunk(
  "updateBlog/blogsSlice",
  async (data) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const raw = JSON.stringify(data);
    const requestOptions = {
      method: "PATCH",
      headers,
      body: raw,
      credentials: "include",
    };
    let res = await fetch(
      API_URL + `/api/v1/blog/update-blog/${data._id}`,
      requestOptions
    );
    if (!res.ok) {
      res = await res.json();
      toast.error(res.message, {
        duration: 5000,
      });
      return thunkAPI.rejectWithValue(res.message);
    }
    res = await res.json();
    toast.success("Blog updated successfully", {
      duration: 2000,
    });
    return res;
  }
);
export const deleteBlog = createAsyncThunk(
  "deleteBlog/blogsSlice",
  async (id, thunkAPI) => {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    let requestOptions = {
      method: "DELETE",
      headers,
      credentials: "include",
    };
    let res = await fetch(
      API_URL + `/api/v1/blog/delete-blog/${id}`,
      requestOptions
    );
    if (!res.ok) {
      toast.error(res.message, {
        duration: 5000,
      });
      thunkAPI.rejectWithValue(res.message);
    }
    res = await res.json();
    toast.success("Blog deleted successfully", {
      duration: 2000,
      position: "top-right",
    });
    return res._id;
  }
);
// filter blogs of deleted user
const blogsSlice = createSlice({
  name: "blogsSlice",
  initialState,
  reducers: {
    deleteUserBlogs: (state, action) => {
      state.blogs = state.blogs.filter(
        (blog) => blog.authorRef != action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBlog.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = [...state.blogs, action.payload];
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getAllBlogs.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(getAllBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateABlog.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateABlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.map((blog) =>
          blog._id == action.payload._id ? action.payload : blog
        );
      })
      .addCase(updateABlog.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteBlog.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter((blog) => blog._id != action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export const { deleteUserBlogs } = blogsSlice.actions;
export default blogsSlice.reducer;
