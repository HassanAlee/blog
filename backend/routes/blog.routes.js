const {
  addBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog.controller.js");
const { verifyToken } = require("../utils/verifyToken.js");
const router = require("express").Router();
router.post("/add-blog", verifyToken, addBlog);
router.get("/get-blogs", getAllBlogs);
router.patch("/update-blog/:id", verifyToken, updateBlog);
router.delete("/delete-blog/:id", verifyToken, deleteBlog);
module.exports = router;
