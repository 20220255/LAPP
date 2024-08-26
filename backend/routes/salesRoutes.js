const express = require("express");
const router = express.Router()

const { inputSales, getSalesList, updateSales, deleteSales } = require("../controllers/salesController");

router.post('/', inputSales )
router.put('/update', updateSales )
router.delete('/delete', deleteSales )
router.get('/', getSalesList)

module.exports = router