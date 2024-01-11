import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState = {
  error: "",
  loading: false,
  blogs: [],
};
// add new blog
export const addBlog = createAsyncThunk("addBlog/blogsSlice", async (data) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const raw = JSON.stringify(data);
  const requestOptions = {
    method: "POST",
    headers,
    body: raw,
  };
  let res = await fetch(
    "https://blog-beta-backend.vercel.app/api/v1/blog/add-blog",
    requestOptions
  );
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
    let res = await fetch(
      "https://blog-beta-backend.vercel.app/api/v1/blog/get-Blogs",
      requestOptions
    );
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
    };
    let res = await fetch(
      `https://blog-beta-backend.vercel.app/api/v1/blog/update-blog/${data._id}`,
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
    };
    let res = await fetch(
      `https://blog-beta-backend.vercel.app/api/v1/blog/delete-blog/${id}`,
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
  extraReducers: {
    [addBlog.pending]: (state) => {
      state.loading = true;
    },
    [addBlog.fulfilled]: (state, action) => {
      state.loading = false;
      state.blogs = [...state.blogs, action.payload];
    },
    [addBlog.rejected]: (state) => {
      state.loading = false;
    },
    [getAllBlogs.pending]: (state) => {
      state.loading = true;
    },
    [getAllBlogs.fulfilled]: (state, action) => {
      state.loading = false;
      state.blogs = action.payload;
    },
    [getAllBlogs.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateABlog.pending]: (state) => {
      state.loading = true;
    },
    [updateABlog.fulfilled]: (state, action) => {
      state.loading = false;
      state.blogs = state.blogs.map((blog) =>
        blog._id == action.payload._id ? action.payload : blog
      );
    },
    [updateABlog.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [deleteBlog.pending]: (state, action) => {
      state.loading = false;
    },
    [deleteBlog.fulfilled]: (state, action) => {
      state.loading = false;
      state.blogs = state.blogs.filter((blog) => blog._id != action.payload);
    },
    [deleteBlog.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const { deleteUserBlogs } = blogsSlice.actions;
export default blogsSlice.reducer;
