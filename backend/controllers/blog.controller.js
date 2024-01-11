const Blog = require("../models/blog.model.js");
const { errorHandler } = require("../utils/error.js");
// add a new blog
const addBlog = async (req, res, next) => {
  try {
    let newBlog = new Blog(req.body);
    await newBlog.save();
    return res.status(200).json(newBlog);
  } catch (error) {
    next(error);
  }
};
// get all blogs
const getAllBlogs = async (req, res, next) => {
  const { id } = req.body;
  let blogs;
  try {
    if (id) {
      blogs = await Blog.find({ authorRef: id });
      return res.status(200).json(blogs);
    }
    blogs = await Blog.find();
    return res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};
// update a blog
const updateBlog = async (req, res, next) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return next(errorHandler(404, "Blog not found"));
    }
    if (blog.authorRef != req.user.id) {
      return next(errorHandler(401, "You can only update your own blog"));
    }
    const updatedBlog = await Blog.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runVAlidators: true,
    });
    return res.status(200).json(updatedBlog);
  } catch (error) {
    next(error.message);
  }
};
// delete a blog
const deleteBlog = async (req, res, next) => {
  try {
    let blog = await Blog.findOneAndDelete({ _id: req.params.id });
    return res.status(200).json(blog);
  } catch (error) {
    next(error.message);
  }
};
module.exports = { addBlog, getAllBlogs, updateBlog, deleteBlog };
