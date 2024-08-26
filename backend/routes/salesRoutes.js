const express = require("express");
const router = express.Router()

const { inputSales, getSalesList, updateSales } = require("../controllers/salesController");

router.post('/', inputSales )
router.put('/update', updateSales )
router.get('/', getSalesList)

module.exports = router