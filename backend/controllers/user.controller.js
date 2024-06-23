const bcryptjs = require("bcryptjs");
const User = require("../models/user.model.js");
const Blog = require("../models/blog.model.js");
const { errorHandler } = require("../utils/error.js");
const jwt = require("jsonwebtoken");
// register user controller
const registerUser = async (req, res, next) => {
  try {
    const hashedPassword = await bcryptjs.hashSync(req.body.password, 10);
    const user = new User({ ...req.body, password: hashedPassword });
    await user.save();
    res.status(200).json("User Created Successfully");
  } catch (error) {
    next(error);
  }
};
// login user handler
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong login credentials"));
    }
    const { password: pass, ...rest } = validUser._doc;
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
// update user profile
const updateProfile = async (req, res, next) => {
  const { id } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    const { password: pass, ...rest } = updatedUser._doc;
    return res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
// get all authors
const getAllAuthors = async (req, res, next) => {
  try {
    let authors = await User.find({});
    authors = authors.map((author) => {
      const { password: pass, ...rest } = author._doc;
      return rest;
    });
    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
};
// delete user controller
const deleteUser = async (req, res) => {
  const { id } = req.params;
  let blog = await Blog.findOneAndDelete({ authorRef: id });
  let user = await User.findOneAndDelete({ _id: id });
  res.status(200).json(user);
};
module.exports = {
  registerUser,
  loginUser,
  updateProfile,
  getAllAuthors,
  deleteUser,
};
