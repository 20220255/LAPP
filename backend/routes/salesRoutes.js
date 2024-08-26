const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  inputSales,
  getSalesList,
  updateSales,
  deleteSales,
} = require("../controllers/salesController");

router.post("/", protect, inputSales);
router.put("/update", protect, updateSales);
router.delete("/delete", protect, deleteSales);
router.get("/",protect , getSalesList);

module.exports = router;
