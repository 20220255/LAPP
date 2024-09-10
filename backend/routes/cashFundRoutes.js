const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { addCashFund, getLastCF, deductCashFund } = require("../controllers/cashFundController");

router.post("/add", protect, addCashFund);
router.post("/deduct", protect, deductCashFund);
router.get("/getLastCF", protect, getLastCF);

module.exports = router;
