// config/db.js

const mysql = require("mysql2/promise");
require("dotenv").config();

// Create a connection pool from the DATABASE_URL.
// The pool is more efficient and resilient for serverless environments.
const pool = mysql.createPool(process.env.DATABASE_URL);

// Test the connection
pool.getConnection()
  .then(connection => {
    console.log("Connected to TiDB Cloud (MySQL compatible) Database ✅");
    connection.release(); // release the connection back to the pool
  })
  .catch(err => {
    console.error("Database connection failed:", err);
  });

// Export the pool so it can be used in your models
module.exports = pool;