const userModel = require("../../models/userModel");

function isAllLowerCase(str) {
  return /^[a-z]*$/.test(str);
}

async function verifyNewUser(req, res, next) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    console.log("All fields are required");
    return res.status(400).json({ msg: "All fields are required!" });
  }

  if (!isAllLowerCase(username)) {
    return res.status(400).json({ msg: "Invalid username format." });
  }

  var ifusername = await userModel.findOne({ username: username });
  var ifemail = await userModel.findOne({ email: email });

  if (ifusername !== null) {
    return res.status(400).json({ msg: "Username already in use" });
  } else if (ifemail !== null) {
    return res.status(400).json({ msg: "Email already in use" });
  } else {
    next();
  }
}

module.exports = verifyNewUser;
