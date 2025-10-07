const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your-strong-secret-key";

// @desc Signup user
exports.signup = async (req, res) => {
  const { name, phone, password, role, selected_language } = req.body;

  if (!name || !phone || !password || !role) {
    return res.status(400).json({ message: "Name, phone, password, and role are required" });
  }

  try {
    const existingUser = await User.findByPhone(phone);
    if (existingUser) {
      return res.status(409).json({ message: "Phone already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      phone,
      password_hash: hashedPassword,
      role,
      selected_language,
    };

    const result = await User.create(newUser);
    res.status(201).json({ message: "User registered successfully", userId: result.insertId });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

// @desc Login user
exports.login = async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ message: "Phone and password are required" });
  }

  try {
    const user = await User.findByPhone(phone);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.user_id, phone: user.phone, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.user_id,
        name: user.name,
        phone: user.phone,
        role: user.role,
        selected_language: user.selected_language,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error during login" });
  }
};