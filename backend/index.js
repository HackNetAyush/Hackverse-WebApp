const express = require("express");
const app = express();
const authRoutes = require("./routes/authRoutes");
const postsRoutes = require("./routes/postRoutes");
const userProfileRoutes = require("./routes/userProfileRoutes");
const connectToDB = require("./config/db_connection");
const cookieParser = require("cookie-parser");
app.use(express.json());
const cors = require("cors");
const checkAuthMiddleware = require("./middlewares/checkAuthMiddleware");
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // Allow credentials (cookies) to be sent and received
  })
);

app.set("trust proxy", 1);
// Routes
app.use("/api/auth", authRoutes); // /login, /createNewUser
app.use("/api/posts", checkAuthMiddleware, postsRoutes); // /:userID
app.use("/api/user", checkAuthMiddleware, userProfileRoutes);

// Sever Configuration
const PORT = 3000;
const start = async () => {
  try {
    await connectToDB();
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
