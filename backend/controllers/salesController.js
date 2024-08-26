const asyncHandler = require("express-async-handler");
const Sales = require("../models/salesModel");

// Input Sales
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
    res.status(400);
    throw new Error(error.message);
  }
});

// Update sales transaction
const updateSales = asyncHandler(async (req, res) => {
  try {
    const {
      detergent,
      fabCon,
      _id,
      firstName,
      lastName,
      w1,
      w2,
      w3,
      w4,
      w5,
      d1,
      d2,
      d3,
      d4,
      d5,
      extraDry,
      folds,
      spinDry,
      totalSales,
    } = req.body;

    const updatedSales = await Sales.findOneAndUpdate(
      { _id },
      {
        $set: {
          detergent: { name: detergent.name, count: detergent.count },
          fabCon: { name: fabCon.name, count: fabCon.count },
        },
        firstName,
        lastName,
        w1,
        w2,
        w3,
        w4,
        w5,
        d1,
        d2,
        d3,
        d4,
        d5,
        extraDry,
        folds,
        spinDry,
        totalSales,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedSales);
  } catch (error) {
    throw new Error(error.message);
  }
});

// Get the transaction sales list
const getSalesList = asyncHandler(async (req, res) => {
  try {
    const salesList = await Sales.find({});

    if (salesList) {
      res.status(200).json(salesList);
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  inputSales,
  getSalesList,
  updateSales,
};
