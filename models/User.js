const db = require("../config/db");

const User = {
  create: async (userData) => {
    const { name, phone, password_hash, role, selected_language } = userData;
    const sql = "INSERT INTO users (name, phone, password_hash, role, selected_language) VALUES (?, ?, ?, ?, ?)";
    const [result] = await db.query(sql, [name, phone, password_hash, role, selected_language || "en"]);
    return result;
  },

  findByPhone: async (phone) => {
    const sql = "SELECT * FROM users WHERE phone = ?";
    const [rows] = await db.query(sql, [phone]);
    return rows[0]; // Returns the user object or undefined
  },

  findById: async (id) => {
    const sql = "SELECT user_id, name, phone, role, selected_language FROM users WHERE user_id = ?";
    const [rows] = await db.query(sql, [id]);
    return rows[0];
  }
};

module.exports = User;