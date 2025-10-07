const FarmerInfo = require("../models/FarmerInfo");

// @desc Add farmer info
exports.addFarmerInfo = async (req, res) => {
  const farmerData = req.body;

  if (!farmerData.user_id || !farmerData.farmer_name || !farmerData.contact_number || !farmerData.aadhar_number) {
    return res.status(400).json({ message: "user_id, farmer_name, contact_number, and aadhar_number are required" });
  }

  try {
    const result = await FarmerInfo.create(farmerData);
    res.status(201).json({
      message: "Farmer info added successfully",
      farmerId: result.insertId,
    });
  } catch (error) {
    console.error("Error inserting farmer info:", error);
    res.status(500).json({ message: "Error saving farmer info" });
  }
};

// @desc Fetch all farmer info
exports.fetchFarmerInfo = async (req, res) => {
  try {
    const results = await FarmerInfo.findAll();
    res.json(results);
  } catch (error) {
    console.error("Error fetching farmer info:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
};

// @desc Update farmer status
exports.updateFarmerStatus = async (req, res) => {
  const { farmer_id } = req.params;
  const { status } = req.body;

  if (!["approved", "rejected", "pending"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const result = await FarmerInfo.updateStatus(farmer_id, status);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Farmer not found" });
    }
    res.json({ message: `Farmer status updated to ${status}` });
  } catch (error) {
    console.error("Error updating farmer status:", error);
    res.status(500).json({ message: "Error updating farmer status" });
  }
};