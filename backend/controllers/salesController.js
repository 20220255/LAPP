const asyncHandler = require("express-async-handler");
const Sales = require("../models/salesModel");
const { now } = require("mongoose");

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

    /** Added locale date and time entered to input sales */
    const d = new Date()
    /** add 1 to get the correct month number */ 
    const date = d.getMonth() + 1
    const sales = await Sales.create({
      ...req.body,
      dateEntered: d.getFullYear() + '-' + date + '-' + d.getDate(),
      timeEntered: new Date().toLocaleTimeString(),
    });

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
    res.status(400);
    throw new Error(error.message);
  }
});

const deleteSales = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.body;
    console.log("delete controller", req.body);
    const resp = await Sales.findByIdAndDelete(_id);
    console.log("resp - ", resp);
    res.status(200).json(resp);
  } catch (error) {
    res.status(400);
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
  deleteSales,
};
