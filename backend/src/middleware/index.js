const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const { default: mongoose } = require("mongoose");

async function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  const jwtToken = token.split(" ")[1];
  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.username = decoded.username;
    next();
  } catch (err) {
    return res.status(403).json({
      message: "You are not authenticated",
    });
  }
}

module.exports = {
  authMiddleware,
};
