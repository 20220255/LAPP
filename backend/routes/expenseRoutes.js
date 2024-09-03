const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  inputExpense,
} = require("../controllers/expenseController");

router.post("/", protect, inputExpense);
// router.put("/update", protect, updateSales);
// router.delete("/delete", protect, deleteSales);
// router.get("/", protect , getSalesList);

module.exports = router;