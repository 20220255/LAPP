const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  addSupplies,
//   getLast20Supplies,
  getAllSupplies,
  deductSupplies,
} = require("../controllers/supplyController");

router.post("/add", protect, addSupplies);
router.post("/deduct", protect, deductSupplies);
router.get("/getAllSupplies", protect, getAllSupplies);

module.exports = router;
