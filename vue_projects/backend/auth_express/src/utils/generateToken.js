const jwt = require("jsonwebtoken");
const config = require("../../config/config");

function generateToken(id) {
  return jwt.sign({ id }, config.JWT_SECRET, { expiresIn: "7d" });
}

module.exports = generateToken;
