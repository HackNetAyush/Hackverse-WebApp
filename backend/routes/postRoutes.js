const express = require("express");
const PostsRouter = express.Router();
const {
  getAllPosts,
  getUserPosts,
  createNewPost,
  getPostWithId,
  likePost,
  unlikePost,
} = require("../controllers/postController");
// const checkAuthMiddleware = require("../middlewares/checkAuthMiddleware");

// getPostsRouter.get("/:userID", getUserPosts);
PostsRouter.get("/", getAllPosts);
PostsRouter.get("/getPostWithId/:postId", getPostWithId);
PostsRouter.post("/createNewPost", createNewPost);
PostsRouter.post("/likePost", likePost);
PostsRouter.post("/unlikePost", unlikePost);

module.exports = PostsRouter;
