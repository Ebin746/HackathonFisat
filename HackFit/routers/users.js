const router = require("express").Router();
const userModel = require("../models/user");

router.post("/signup", async (req, res) => {
  try {
    const { name, password, phoneNumber } = req.body;
    if (!name || !phoneNumber || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    console.log(name, phoneNumber, password);
    
    const user = new userModel({
      name,
      phoneNumber,
      password,
    });
    await user.save();
    
    return res.status(201).json({ 
      message: "User created successfully", 
      user: { id: user._id, name: user.name, phoneNumber: user.phoneNumber } 
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    let { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    let user = await userModel.findOne({ phoneNumber });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid phone number or password" });
    }

    return res.json({ 
      message: "success", 
      user: { id: user._id, name: user.name, phoneNumber: user.phoneNumber } 
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
