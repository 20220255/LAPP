const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  inputExpense,
  updateExpense,
  getExpenseList,
  deleteExpense
} = require("../controllers/expenseController");

router.post("/", protect, inputExpense);
router.put("/update", protect, updateExpense);
router.delete("/delete", protect, deleteExpense);
router.get("/", protect, getExpenseList);

module.exports = router;