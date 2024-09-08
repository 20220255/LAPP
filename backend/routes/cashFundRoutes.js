const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { addCashFund, getLastCF } = require("../controllers/cashFundController");

router.post("/add", addCashFund);
router.get("/getLastCF", getLastCF);

module.exports = router;
