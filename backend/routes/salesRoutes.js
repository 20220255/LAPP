const express = require("express");
const router = express.Router()

const { inputSales } = require("../controllers/salesController");

router.post('/', inputSales )

module.exports = router