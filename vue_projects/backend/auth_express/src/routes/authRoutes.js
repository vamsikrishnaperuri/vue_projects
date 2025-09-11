const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
// Get current user
router.get("/users/me", authMiddleware, (req, res) => {
  res.json(req.user);
});

// Update user details
router.put("/users/me", authMiddleware, async(req,res) => {
  const {name, email} = req.body;

  try{
    req.user.name = name;
    req.user.email = email;
    await req.user.save();
    res.json({ id: req.user.id, name: req.user.name, email: req.user.email });
  }catch(err){
    res.status(500).json({ error: "Failed to update profile" });
  }
})

//Delete account
router.delete("/users/me", authMiddleware, async (req, res) =>{

  try{
    await req.user.destroy();
    res.json({ message: "Account deleted successfully" });
  }catch(err){
    res.status(500).json({ error: "Failed to delete account" });
  }
})

module.exports = router;
