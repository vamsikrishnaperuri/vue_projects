const bcrypt = require("bcrypt");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

class AuthService {
  static async signup({ name, email, password }) {
    console.log('started user Signed up')
    const existing = await User.findOne({ where: { email } });
    if (existing) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    console.log('user Signed up')
    return { user, token: generateToken(user.id) };
  }

  static async login({ email, password }) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Invalid credentials");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid credentials");

    return { user, token: generateToken(user.id) };
  }
}

module.exports = AuthService;
