const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { addCashFund, getLastCF, deductCashFund, getLast20CF } = require("../controllers/cashFundController");

router.post("/add", protect, addCashFund);
router.post("/deduct", protect, deductCashFund);
router.get("/getLastCF", protect, getLastCF);
router.get("/getLast20CF", getLast20CF);

module.exports = router;
