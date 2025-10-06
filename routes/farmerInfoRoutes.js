const express = require("express");
const router = express.Router();
const farmerInfoController = require("../controllers/farmerInfoController");

router.post("/add_farmer_info", farmerInfoController.addFarmerInfo);   // Add farmer info
router.get("/fetch_farmer_info", farmerInfoController.fetchFarmerInfo); // Fetch all farmers
router.put("/update_status/:farmer_id", farmerInfoController.updateFarmerStatus); // Update status

module.exports = router; 
    