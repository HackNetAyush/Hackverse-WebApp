const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the post
const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    // maxlength: 500,
  },
  imgUrl: {
    type: String,
    // required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      commentText: {
        type: String,
        required: true,
      },
      commentedOn: {
        type: Date,
        default: Date.now,
      },
      likes: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
  ],
  shares: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  tags: [
    {
      type: String,
    },
  ],
  //   location: {
  //     city: String,
  //     country: String,
  //     coordinates: {
  //       type: { type: String, enum: ["Point"], default: "Point" },
  //       coordinates: { type: [Number], required: false },
  //     },
  //   },
  permissions: {
    visibility: {
      type: String,
      enum: ["public", "private", "restricted"],
      default: "public",
    },
    editors: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    viewers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
});

// Indexing for location-based queries
postSchema.index({ "location.coordinates": "2dsphere" });

// Create a model based on the schema
const Post = mongoose.model("Post", postSchema);

module.exports = Post;

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// // Define the schema for the post
// const postSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },

//   imgUrl: {
//     type: String,
//     required: true,
//   },

//   author: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },

//   likes: {
//     type: Number,
//     default: 0,
//   },

//   comments: [
//     {
//       user: {
//         type: Schema.Types.ObjectId,
//         ref: "User",
//       },
//       commentText: {
//         type: String,
//         required: true,
//       },
//       commentedOn: {
//         type: Date,
//         default: Date.now,
//       },
//     },
//   ],

//   shares: {
//     type: Number,
//     default: 0,
//   },

//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },

//   tags: [
//     {
//       type: String,
//     },
//   ],

//   location: {
//     city: String,
//     country: String,
//   },

//   permissions: {
//     visibility: {
//       type: String,
//       enum: ["public", "private", "restricted"],
//       default: "public",
//     },
//     editors: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],
//     viewers: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "User",
//       },
//     ],
//   },
// });

// // Create a model based on the schema
// const Post = mongoose.model("Post", postSchema);

// module.exports = Post;
