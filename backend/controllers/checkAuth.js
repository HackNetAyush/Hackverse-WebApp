require("dotenv").config();
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

async function checkAuth(req, res) {
  const token = req.cookies._token;
  // console.log(token);
  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const userInfoFromDatabase = await UserModel.findOne({
      email: decoded.email,
      username: decoded.username,
    });

    const customData = { ...decoded, uid: userInfoFromDatabase._id };
    console.log("checkAuth.js --> " + userInfoFromDatabase);

    return res.status(200).json({ msg: "User verified", user: customData });
  } catch (err) {
    console.error("Error verifying token or invalid token");
    return res.status(401).json({ msg: "Invalid token" });
  }
}

module.exports = checkAuth;
