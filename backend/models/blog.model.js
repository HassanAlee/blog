const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    authorRef: {
      type: String,
      required: "true",
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    authorImage: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;
