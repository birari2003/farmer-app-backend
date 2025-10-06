const FarmerInfo = require("../models/FarmerInfo");

// @desc Add farmer info
exports.addFarmerInfo = (req, res) => {
  const farmerData = req.body;

  // ✅ mandatory fields
  if (!farmerData.user_id || !farmerData.farmer_name || !farmerData.contact_number || !farmerData.aadhar_number) {
    return res.status(400).json({ message: "user_id, farmer_name, contact_number, and aadhar_number are required" });
  }

  FarmerInfo.create(farmerData, (err, result) => {
    if (err) {
      console.error("Error inserting farmer info:", err);
      return res.status(500).json({ message: "Error saving farmer info" });
    }
    res.status(201).json({ 
      message: "Farmer info added successfully", 
      farmerId: result.insertId 
    });
  });
};

// @desc Fetch all farmer info
exports.fetchFarmerInfo = (req, res) => {
  FarmerInfo.findAll((err, results) => {
    if (err) {
      console.error("Error fetching farmer info:", err);
      return res.status(500).json({ message: "Error fetching data" });
    }
    res.json(results);
  });
};

// @desc Update farmer status
exports.updateFarmerStatus = (req, res) => {
  const { farmer_id } = req.params;
  const { status } = req.body;

  if (!["approved", "rejected", "pending"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  FarmerInfo.updateStatus(farmer_id, status, (err, result) => {
    if (err) {
      console.error("Error updating farmer status:", err);
      return res.status(500).json({ message: "Error updating farmer status" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Farmer not found" });
    }
    res.json({ message: `Farmer status updated to ${status}` });
  });
};
