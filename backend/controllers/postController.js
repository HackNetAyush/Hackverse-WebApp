const User = require("../models/userModel");
const PostModel = require("../models/postModel");
const { JSONCookie } = require("cookie-parser");
const mongoose = require("mongoose");

async function getAllPosts(req, res) {
  // console.log(req.body.user);

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const recencyWeight = 0.5;
    const popularityWeight = 0.5;

    // Fetch paginated posts from the database and populate author's username
    const posts = await PostModel.aggregate([
      {
        $lookup: {
          from: "users", // Collection name in the database
          localField: "author", // Field in the posts collection
          foreignField: "_id", // Field in the users collection
          as: "authorInfo", // Alias for the joined user document
        },
      },
      {
        $addFields: {
          authorUsername: { $arrayElemAt: ["$authorInfo.username", 0] }, // Extract username from joined user document
          ageInHours: {
            $divide: [{ $subtract: [new Date(), "$createdAt"] }, 3600000],
          },
          popularityScore: {
            $add: [
              { $size: "$likes" },
              { $size: "$comments" },
              { $size: "$shares" },
            ],
          },
          score: {
            $add: [
              {
                $multiply: [
                  recencyWeight,
                  {
                    $divide: [
                      1,
                      {
                        $divide: [
                          { $subtract: [new Date(), "$createdAt"] },
                          3600000,
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                $multiply: [
                  popularityWeight,
                  {
                    $add: [
                      { $size: "$likes" },
                      { $size: "$comments" },
                      { $size: "$shares" },
                    ],
                  },
                ],
              },
            ],
          },
        },
      },
      { $project: { authorInfo: 0 } }, // Exclude the authorInfo field
      { $sort: { score: -1 } },
      { $skip: skip },
      { $limit: limit },
    ]);

    const modifiedPosts = posts.map((post) => {
      // post.isLikedByYou = post.likes.includes(req.body.user.uid);
      post.isLikedByYou = post.likes
        .map((like) => like.toString())
        .includes(req.body.user.uid);

      post.likesCount = post.likes.length;

      // post.isLikedByYou = post.likes.some((like) =>
      //   like.equals(new mongoose.Types.ObjectId(req.body.user.uid))
      // );
      console.log(
        "Post title: " +
          post.title +
          "\nPost likes: " +
          post.likes +
          "\nIsLikedByYou: " +
          post.isLikedByYou +
          " \n\n"
      );
      return post;
    });

    res.json(modifiedPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

function getUserPosts(req, res) {
  console.log("getUserPosts");
}

async function createNewPost(req, res) {
  const { title, description, imgUrl, location } = req.body;
  console.log(title, "\n", description, "\n", imgUrl);

  const user = await User.findOne({
    username: req.body.user.username,
    email: req.body.user.email,
  });

  const author = user._id;

  const post = await PostModel.create({
    title,
    description,
    author,
    imgUrl,
    location,
  });

  console.log(post);
  console.log(post.likes.length);
  res.send({ status: "OK" });
}

async function getPostWithId(req, res) {
  const postId = req.params.postId;

  // console.log(postId.length);

  if (postId.length !== 24) {
    return res.status(400).json({ message: "Invalid post id" });
  }

  try {
    const post = await PostModel.findById(postId); // Fetch the post by its ID

    if (!post) {
      console.log("No post found");
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.permissions && post.permissions.visibility === "public") {
      console.log("Post is Public");
      res.status(200).json({ post: post });
    } else if (post.permissions && post.permissions.visibility === "private") {
      console.log("Post is Private");
      res.status(200).json({ message: "Post is private" });
    } else {
      console.log("Post is not visible");
      return res.status(403).json({ message: "Post is not visible" });
    }
  } catch (error) {
    console.error("Error checking post visibility:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

async function likePost(req, res) {
  const { post_id, user } = req.body;

  try {
    const result = await PostModel.findByIdAndUpdate(
      post_id,
      { $addToSet: { likes: user.uid } }, // MongoDB ensures uniqueness here
      { new: true } // Returns the updated document
    );
    console.log("Likes updated:", result.likes);
  } catch (err) {
    console.error("Error while liking the post:", err);
  }
  // console.log(req.body);
  res.status(200).json({ message: "OK" });
}

async function unlikePost(req, res) {
  const { post_id, user } = req.body;

  try {
    const result = await PostModel.findByIdAndUpdate(
      post_id,
      { $pull: { likes: user.uid } }, // Removes the user ID from the likes array
      { new: true } // Returns the updated document
    );
    console.log("Likes updated:", result.likes);
    res.status(200).json({ message: "Post unliked successfully" });
  } catch (err) {
    console.error("Error while unliking the post:", err);
    res.status(500).json({ message: "Error while unliking the post" });
  }
}

module.exports = {
  getAllPosts,
  getUserPosts,
  createNewPost,
  getPostWithId,
  likePost,
  unlikePost,
};
