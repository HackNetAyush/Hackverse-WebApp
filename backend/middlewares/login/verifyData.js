const userModel = require("../../models/userModel");
const bcrypt = require("bcrypt");

async function verifyData(req, res, next) {
  const { usernameOrEmail, password } = req.body;

  if (!usernameOrEmail || !password) {
    return res.status(401).send({ msg: "Invalid username or password" });
  }

  let user;

  if (usernameOrEmail.includes("@")) {
    user = await userModel.findOne({ email: usernameOrEmail });
  } else {
    user = await userModel.findOne({ username: usernameOrEmail });
  }

  console.log(user);

  if (user !== null) {
    let passMatch = await bcrypt.compare(password, user.password);
    console.log(passMatch);
    if (passMatch) {
      let userInfo = {
        uid: user._id,
        ...req.deviceInfo,
        email: user.email,
        username: user.username,
      };

      req.userInfo = userInfo;
      return next();
    } else {
      return res.status(401).send({ msg: "Invalid password" });
    }
  } else {
    return res.status(401).send({ msg: "User not found" });
  }
}

module.exports = verifyData;
