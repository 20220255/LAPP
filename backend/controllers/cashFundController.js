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
    });

    res.status(200).json(cashFund);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

/** Get the last 20 transactions */
const getLast20CF = asyncHandler(async (req, res) => {
  try {
    const last20DocCF = await CashFund.find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .select("amount amountAdded amountDeducted expenseName dateEntered comment")
      .populate("userId", "firstName");
    res.status(200).json(last20DocCF);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  addCashFund,
  getLastCF,
  deductCashFund,
  getLast20CF,
};
