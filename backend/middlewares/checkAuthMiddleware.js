require("dotenv").config();
const jwt = require("jsonwebtoken");

function checkAuthMiddleware(req, res, next) {
  const token = req.cookies._token;
  console.log(token);

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ msg: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    // return res.status(200).json({ msg: "User verified", user: decoded });
    req.body.user = decoded;

    next();
  } catch (err) {
    console.error("Error verifying token or invalid token");
    return res.status(401).json({ msg: "Invalid token" });
  }
}

module.exports = checkAuthMiddleware;
