const db = require("../config/db");

// Ensure table has new columns
db.query(`
  CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    selected_language VARCHAR(10) DEFAULT 'en',
    role ENUM('farmer','admin','other') DEFAULT 'farmer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  ) DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci
`);

const User = {
  create: (userData, callback) => {
    const { name, phone, password_hash, role, selected_language } = userData;
    db.query(
      "INSERT INTO users (name, phone, password_hash, role, selected_language) VALUES (?, ?, ?, ?, ?)",
      [name, phone, password_hash, role, selected_language || "en"],
      callback
    );
  },

  findByPhone: (phone, callback) => {
    db.query("SELECT * FROM users WHERE phone = ?", [phone], callback);
  },

  findById: (id, callback) => {
    db.query("SELECT user_id, name, phone, role, selected_language FROM users WHERE user_id = ?", [id], callback);
  }
};

module.exports = User;
