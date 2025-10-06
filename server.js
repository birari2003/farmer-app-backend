const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const farmerInfoRoutes = require("./routes/farmerInfoRoutes");
const whatsappRoutes = require("./routes/whatsappRoutes");
const { initializeWhatsAppClient } = require('./whatsapp-service'); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/farmers", farmerInfoRoutes);
app.use("/api/whatsapp", whatsappRoutes); 

// Server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  initializeWhatsAppClient(); 
});