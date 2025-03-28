function logout(req, res) {
  res.clearCookie("_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });
  res.clearCookie("ref_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });
  return res.status(200).json({ msg: "Logged out successfully" });
}

module.exports = logout;
