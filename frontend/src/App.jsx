import React, { useState } from "react";
import { Route, Routes } from 'react-router-dom'
import Home from "./pages/Home";
import Authors from "./pages/Authors";
import Profile from "./pages/Profile";
import Blogs from "./pages/Blogs";
import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Protected from "./components/Protected";
import NewBlog from "./pages/NewBlog";
import UpdateBlog from "./pages/UpdateBlog";
import UpdateProfile from "./pages/UpdateProfile";
import SingleAuthor from "./pages/SingleAuthor";
import OpenBlog from "./pages/OpenBlog";
const App = () => {
  const [pathName, setPathName] = useState(window.location.pathname)
  return (
    <>
      <div className={`${pathName == "/register" || pathName == "/login" || pathName == "/update-profile" ? "" : "md:px-40"}`}>
        {pathName == "/register" || pathName == "/login" || pathName == "/update-profile" ? "" : <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route element={<Protected />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/write-blog" element={<NewBlog />} />
            <Route path="/update-blog/:id" element={<UpdateBlog />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/authors/:id" element={<SingleAuthor />} />
          <Route path="/blog/:id" element={<OpenBlog />} />
        </Routes>
      </div>
    </>
  )
};

export default App;
