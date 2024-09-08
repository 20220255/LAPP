const asyncHandler = require("express-async-handler");
const CashFund = require("../models/cashFundModel");
const { addHours } = require("./utilControllers/addHours");
require("mongoose");

// // Deduct Cashfund
// const deductCashFund = asyncHandler(async (req, res) => {
//   try {
//     // input cash fund
//     const { userId, amount } = req.body;

//     if (!userId) {
//       throw new Error('"You must be logged in first');
//     }

//     if (amount < 0) {
//       throw new Error("Unable to continue. Cash fund will be below 0.");
//     }

//     const datePlus8Utc = await addHours(new Date(), 8);

//     const expense = await Expense.create({
//       ...req.body,
//       dateEntered: datePlus8Utc.toLocaleDateString(),
//       timeEntered: new Date().toLocaleTimeString(),
//     });

//     if (expense) {
//       res.status(201).json(expense);
//     }
//   } catch (error) {
//     res.status(400);
//     throw new Error(error.message);
//   }
// });

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

// const deleteExpense = asyncHandler(async (req, res) => {
//   try {
//     const { _id } = req.body;
//     const resp = await Expense.findByIdAndDelete(_id);
//     res.status(200).json(resp);
//   } catch (error) {
//     res.status(400);
//     throw new Error(error.message);
//   }
// });

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
  addCashFund, getLastCF
};
