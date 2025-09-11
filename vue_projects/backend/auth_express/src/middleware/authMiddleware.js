const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const User = require("../models/User");

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    //console.log("Auth Header:", req.headers.authorization)
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await User.findByPk(decoded.id, { attributes: ["id", "name", "email"] });
    if (!user) return res.status(404).json({ error: "User not found" });

    req.user = user; // attach to request
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = authMiddleware;
