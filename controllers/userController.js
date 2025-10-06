const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// @desc Signup user
exports.signup = (req, res) => {
  const { name, phone, password, role, selected_language } = req.body;

  if (!name || !phone || !password || !role) {
    return res.status(400).json({ message: "Name, phone, password, and role are required" });
  }

  User.findByPhone(phone, (err, results) => {
    if (err) return res.status(500).json({ message: "Error checking user" });
    if (results.length > 0) {
      return res.status(400).json({ message: "Phone already registered" });
    }

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return res.status(500).json({ message: "Error hashing password" });

      User.create(
        { name, phone, password_hash: hash, role, selected_language },
        (err, result) => {
          if (err) return res.status(500).json({ message: "Error creating user" });
          res.status(201).json({ message: "User registered successfully", userId: result.insertId });
        }
      );
    });
  });
};

// @desc Login user
exports.login = (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ message: "Phone and password are required" });
  }

  User.findByPhone(phone, (err, results) => {
    if (err) return res.status(500).json({ message: "Error finding user" });
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];

    bcrypt.compare(password, user.password_hash, (err, isMatch) => {
      if (err) return res.status(500).json({ message: "Error comparing password" });
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.user_id, phone: user.phone, role: user.role },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Include role & language in response
      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.user_id,
          name: user.name,
          phone: user.phone,
          role: user.role,
          selected_language: user.selected_language
        }
      });
    });
  });
};
