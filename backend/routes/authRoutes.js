const express = require("express");
const authRouter = express.Router();
const { login, createNewUser } = require("../controllers/authController");
const reqInfo = require("../middlewares/reqInfo");
const verifyData = require("../middlewares/login/verifyData");
const checkAuth = require("../controllers/checkAuth");
const verifyNewUser = require("../middlewares/signup/verifyNewUser");
const logout = require("../controllers/logout");

authRouter.post("/login", reqInfo, verifyData, login);
authRouter.post("/createNewUser", reqInfo, verifyNewUser, createNewUser);
authRouter.post("/checkAuth", checkAuth);
authRouter.post("/logout", logout);

module.exports = authRouter;
