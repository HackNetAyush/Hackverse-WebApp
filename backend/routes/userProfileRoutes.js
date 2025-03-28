const express = require("express");
const getUserDetailsRoute = express.Router();
const getPostsRouter = require("./postRoutes");
const {
  getAllPosts,
  getUserPosts,
  createNewPost,
  getPostWithId,
} = require("../controllers/postController");

// const {
//   getAllPosts,
//   getUserPosts,
//   createNewPost,
//   getPostWithId,
// } = require("../controllers/postController");
// const checkAuthMiddleware = require("../middlewares/checkAuthMiddleware");

const { getUserDetails } = require("../controllers/userProfileController");

// getPostsRouter.get("/:userID", getUserPosts);

getPostsRouter.get("/:uid", getAllPosts);

// getPostsRouter.get("/getPostWithId/:postId", getPostWithId);
// getPostsRouter.post("/createNewPost", createNewPost);

module.exports = getUserDetailsRoute;
