import express from "express";
const router = express.Router();

// Get all hospitals
router.get("/", (req, res) => {
  res.status(200).json({ message: "List of hospitals" });
});

// Add a new hospital
router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Hospital name is required" });
  }
  res.status(201).json({ message: `Hospital '${name}' added successfully` });
});

export default router;
