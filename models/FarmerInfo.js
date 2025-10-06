const db = require("../config/db");

const FarmerInfo = {
  create: (data, callback) => {
    const sql = `
      INSERT INTO farmer_info (
        user_id, farmer_name, age, gender, contact_number, aadhar_number, dob, address, email,
        passport_photo, land_area, soil_type, irrigation_sources, crops, cultivation_type,
        crop_description, occupation, family_info, work_type, cattle, poultry_info,
        training_type, feedback, language_code, city, district, state, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
      data.user_id, data.farmer_name, data.age, data.gender, data.contact_number, data.aadhar_number,
      data.dob, data.address, data.email, data.passport_photo || null,
      data.land_area, data.soil_type, JSON.stringify(data.irrigation_sources || []),
      JSON.stringify(data.crops || []), data.cultivation_type, data.crop_description,
      data.occupation, data.family_info, data.work_type,
      JSON.stringify(data.cattle || []), data.poultry_info,
      data.training_type, data.feedback, data.language_code || "en",
      data.city || null, data.district || null, data.state || null,
      data.status || "pending"   // default pending
    ], callback);
  },

  findAll: (callback) => {
    db.query(
      `SELECT f.*, u.name AS user_name, u.phone, u.role
       FROM farmer_info f
       JOIN users u ON f.user_id = u.user_id`,
      callback
    );
  },

  updateStatus: (farmer_id, status, callback) => {
    db.query(
      "UPDATE farmer_info SET status = ? WHERE farmer_id = ?",
      [status, farmer_id],
      callback
    );
  }
};

module.exports = FarmerInfo;
