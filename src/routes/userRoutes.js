// File: backend/routes/userRoutes.js
const express = require("express");
const { setCustomClaims } = require("../Firebase-admin/admin");
const router = express.Router();

/**
 * Set role for a user (admin only)
 */
router.post("/set-role", async (req, res) => {
  const { uid, role } = req.body;

  if (!uid || !role) {
    return res.status(400).json({ success: false, message: "Please provide both uid and role." });
  }

  try {
    await setCustomClaims(uid, role);
    res.status(200).json({ success: true, message: `Role ${role} set for user ${uid}` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
