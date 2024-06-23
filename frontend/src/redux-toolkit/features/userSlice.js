import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
const initialState = {
  loading: false,
  error: "",
  currentUser: "",
  authors: [],
};
const API_URL = "https://blog-beta-backend.vercel.app";
// const API_URL = "http://localhost:3000";
// register user
export const registerUser = createAsyncThunk(
  "userSlice/register",
  async (data, thunkAPI) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const raw = JSON.stringify(data);
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: raw,
    };
    let res = await fetch(API_URL + "/api/v1/user/register", requestOptions);
    if (!res.ok) {
      res = await res.json();
      toast.error(res.message, {
        duration: 6000,
      });
      return thunkAPI.rejectWithValue(res.message);
    } else {
      toast.success("User created successfully");
      return true;
    }
  }
);
// login user
export const loginUSer = createAsyncThunk(
  "userSlice/login",
  async (data, thunkAPI) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const raw = JSON.stringify(data);
    const requestOptions = {
      method: "POST",
      headers,
      body: raw,
      credentials: "include",
    };
    let res = await fetch(API_URL + "/api/v1/user/login", requestOptions);
    if (!res.ok) {
      res = await res.json();
      toast.error(res.message, {
        duration: 6000,
      });
      return thunkAPI.rejectWithValue(res.message);
    }
    res = await res.json();
    toast.success(`${res.name} welcome to the socialBlog`);
    return res;
  }
);
// validate user
export const validateUser = createAsyncThunk(
  "userSlice/validateUser",
  async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const requestOptions = {
      method: "Get",
      headers,
      credentials: "include",
    };
    let res = await fetch(API_URL + "/api/v1/user/verifyToken", requestOptions);
    if (res.status == 401) {
      thunkAPI.rejectWithValue("not found");
    }
  }
);
// update user
export const updateUser = createAsyncThunk(
  "userSlice/updateUser",
  async (data, thunkAPI) => {
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
      API_URL + "/api/v1/user/update-profile",
      requestOptions
    );
    if (!res.ok) {
      res = await res.json();
      toast.error(res.message, {
        duration: 6000,
      });
      return thunkAPI.rejectWithValue(res.message);
    }
    res = await res.json();
    toast.success("Profile updated successfully");
    return res;
  }
);
// get all authors
export const getAllAuthors = createAsyncThunk(
  "userSlice/getAllAuthors",
  async (thunkAPI) => {
    let res = await fetch(API_URL + "/api/v1/user/all-authors");
    if (!res.ok) {
      res = await res.json();
      thunkAPI.rejectWithValue(res.message);
    }
    res = await res.json();
    return res;
    // console.log(res);
  }
);
// delete user account
export const deleteUser = createAsyncThunk(
  "userSlice/deleteUser",
  async (id) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const requestOptions = {
      method: "DELETE",
      headers,
      credentials: "include",
    };
    let res = await fetch(
      API_URL + `/api/v1/user/delete-account/${id}`,
      requestOptions
    );
    if (!res.ok) {
      toast.error("Something went wrong");
    }
    res = await res.json();
    return res;
  }
);
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(loginUSer.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginUSer.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(loginUSer.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getAllAuthors.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllAuthors.fulfilled, (state, action) => {
        state.loading = false;
        state.authors = action.payload;
      })
      .addCase(getAllAuthors.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      .addCase(validateUser.rejected, (state, action) => {
        state.loading = false;
        state.currentUser = "";
        state.authors = null;
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.authors = state.authors.filter(
          (author) => author._id != action.payload._id
        );
        state.currentUser = "";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { logout } = userSlice.actions;
export default userSlice.reducer;
