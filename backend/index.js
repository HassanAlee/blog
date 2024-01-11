const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes.js");
const blogRoutes = require("./routes/blog.routes.js");
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(cookieParser());
// connecting to the db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => console.log(`Server is listening on ${port}...`));
  })
  .catch((err) => console.log(err));
// routes
// const __dirname = path.resolve();
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);
app.get("/", (req, res) =>
  res
    .status(200)
    .json({ success: true, message: "Server is listening for requests" })
);
// app.use(express.static(path.join(__dirname, "/client/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// });
// error handler middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ success: false, message, statusCode });
});
