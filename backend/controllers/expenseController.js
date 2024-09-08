const asyncHandler = require("express-async-handler");
const Expense = require("../models/expenseModel");
require("mongoose");

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

    function addHours(date, hours) {
        const hoursToAdd = hours * 60 * 60 * 1000;
        date.setTime(date.getTime() + hoursToAdd);
        return date;
      }
      /** add 8 hrs */
      const datePlus8Utc = await addHours(new Date(), 8);


    const expense = await Expense.create({
      ...req.body,
      dateEntered: datePlus8Utc.toLocaleDateString(),
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

// Update expense transaction
const updateExpense = asyncHandler(async (req, res) => {
  try {
    const { _id, name, amount, type, comment } = req.body;

    const updatedExpense = await Expense.findOneAndUpdate(
      { _id },
      { name, amount, type, comment },
      { new: true }
    );
    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const deleteExpense = asyncHandler(async (req, res) => {
    try {
      const { _id } = req.body;
      const resp = await Expense.findByIdAndDelete(_id);
      res.status(200).json(resp);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });


// Get the expense list
const getExpenseList = asyncHandler(async (req, res) => {
    try {
      const expenseList = await Expense.find({}).populate('userId', 'firstName');
  
      if (expenseList) {
        res.status(200).json(expenseList);
      }
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });

module.exports = {
  inputExpense,
  updateExpense,
  deleteExpense,
  getExpenseList,
};
