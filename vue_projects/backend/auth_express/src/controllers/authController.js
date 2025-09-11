const AuthService = require("../services/authService");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { user, token } = await AuthService.signup({ name, email, password });
    res.json({ id: user.id, name: user.name, email: user.email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await AuthService.login({ email, password });
    res.json({ id: user.id, name: user.name, email: user.email, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
