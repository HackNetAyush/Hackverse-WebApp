require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

function login(req, res) {
  const device_info = req.deviceInfo;
  const userInfo = req.userInfo;
  console.log(userInfo);

  let jwt_token = jwt.sign(userInfo, process.env.JWT_SECRET, {
    // expiresIn: "15s",
  });

  let refresh_token = jwt.sign(userInfo, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "12d",
  });

  console.log(jwt_token);
  console.log(refresh_token);

  res.cookie("_token", jwt_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.cookie("ref_token", jwt_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000 * 12, // 12 days
  });

  res.send({ msg: "Login Success", user: userInfo });

  const referer = req.get("referer") || req.get("referrer");
  console.log(`Request Referer: ${referer}`);
}

async function createNewUser(req, res) {
  const data = req.body;
  const device_info = req.deviceInfo;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(data.password, salt, async function (err, hash) {
      console.log("Password: " + data.password + " Hash: " + hash);

      try {
        const result = await User.create({
          username: data.username,
          email: data.email,
          password: hash,
        });

        const user_info = {
          ...device_info,
          username: data.username,
          email: data.email,
        };

        console.log(user_info);

        const jwt_token = jwt.sign(user_info, process.env.JWT_SECRET);
        console.log(jwt_token);

        res.cookie("_token", jwt_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production" ? true : false,
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          path: "/",
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        console.log("User created successfully:", result);
        return res.status(201).json({ msg: "success", user: result });
      } catch (err) {
        console.error("Error creating user:", e);
        return res.status(400).json({ msg: e.message });
      }
    });
  });
}

module.exports = { login, createNewUser };
