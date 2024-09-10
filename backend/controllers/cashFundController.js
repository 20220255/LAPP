const asyncHandler = require("express-async-handler");
const CashFund = require("../models/cashFundModel");
const { addHours } = require("./utilControllers/addHours");
require("mongoose");

/** Get the last document of the Cash Fund */
const getLastCF = asyncHandler(async (req, res) => {
  try {
    const lastDocCF = await CashFund.findOne().sort({ createdAt: -1 }).limit(1);
    res.status(200).json(lastDocCF);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Add to cash fund
const addCashFund = asyncHandler(async (req, res) => {
  try {
    const { amount, comment } = req.body;

    /** add 8 hrs */
    const datePlus8Utc = await addHours(new Date(), 8);

    const cashFund = await CashFund.create({
      ...req.body,
      dateEntered: datePlus8Utc.toLocaleDateString(),
      timeEntered: new Date().toLocaleTimeString(),
    });

    res.status(200).json(cashFund);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

/** Deduct from cash fund */
const deductCashFund = asyncHandler(async (req, res) => {
  try {
    /** add 8 hrs */
    const datePlus8Utc = await addHours(new Date(), 8);

    const cashFund = await CashFund.create({
      ...req.body,
      dateEntered: datePlus8Utc.toLocaleDateString(),
      timeEntered: new Date().toLocaleTimeString(),
    })

    res.status(200).json(cashFund);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// // Get the expense list
// const getExpenseList = asyncHandler(async (req, res) => {
//   try {
//     const expenseList = await Expense.find({}).populate("userId", "firstName");

//     if (expenseList) {
//       res.status(200).json(expenseList);
//     }
//   } catch (error) {
//     res.status(400);
//     throw new Error(error.message);
//   }
// });

module.exports = {
  addCashFund, getLastCF, deductCashFund
};
