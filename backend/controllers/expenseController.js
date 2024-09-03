const asyncHandler = require("express-async-handler");
const Expense = require("../models/expenseModel");
require("mongoose");
const { getLocaleDate } = require("./utilControllers/getDateLocale");


// Input Expense
const inputExpense = asyncHandler(async (req, res) => {
    try {

      // input sales
      const { userId, amount } = req.body;
  
      if (!userId) {
        throw new Error('"You must be logged in first');
      }
  
      if (amount <= 0) {
        throw new Error("Sales cannot be 0");
      }
  
      const expense = await Expense.create({
        ...req.body,
        dateEntered: getLocaleDate(new Date()),
        timeEntered: new Date().toLocaleTimeString(),
      });
  
      if (expense) {
        res.status(201).json(expense);
      }
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });


  module.exports = {
    inputExpense,
  };