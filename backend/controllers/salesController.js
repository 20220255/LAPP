const asyncHandler = require("express-async-handler");
const Sales = require("../models/salesModel");

const inputSales = asyncHandler(async (req, res) => {
  try {
    // input sales
    const { userId, totalSales } = req.body;

    if (!userId) {
      throw new Error('"You must be logged in first');
    }

    if (totalSales <= 0) {
      throw new Error("Sales cannot be 0");
    }

    const sales = await Sales.create(req.body);
    if (sales) {
      res.status(201).json(sales);
    }
  } catch (error) {
    console.log("error - ", error.message);
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  inputSales,
};
