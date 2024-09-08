const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { addCashFund } = require("../controllers/cashFundController");

router.post("/add", addCashFund);

module.exports = router;
