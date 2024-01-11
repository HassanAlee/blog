const {
  registerUser,
  loginUser,
  updateProfile,
  getAllAuthors,
  deleteUser,
} = require("../controllers/user.controller.js");
const { verifyToken } = require("../utils/verifyToken.js");
const router = require("express").Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.patch("/update-profile", verifyToken, updateProfile);
router.get("/all-authors", getAllAuthors);
router.get("/verifyToken", verifyToken);
router.delete("/delete-account/:id", verifyToken, deleteUser);
module.exports = router;
