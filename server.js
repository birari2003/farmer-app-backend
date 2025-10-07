const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const farmerInfoRoutes = require("./routes/farmerInfoRoutes");

// This line is important, it loads your environment variables
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/farmers", farmerInfoRoutes);

// Simple health check route
app.get("/api", (req, res) => {
  res.send("API is running healthy! 🚀");
});

// Vercel handles the server listening part, so we only export the app
module.exports = app;