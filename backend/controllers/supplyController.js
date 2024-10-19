const asyncHandler = require("express-async-handler");
const Supply = require("../models/supplyModel");
const { addHours } = require("./utilControllers/addHours");
require("mongoose");

/** Add supplies */
const addSupplies = asyncHandler(async (req, res) => {
  try {
    const { supplyName, count, countAdded, customerName, comment, userId } = req.body;

    const addedSupplies = {
      supplyName,
      count,
      countAdded,
      customerName,
      comment,
      userId,
    };

    /** add 8 hrs */
    const datePlus8Utc = await addHours(new Date(), 8);

    const supply = await Supply.create({
      ...addedSupplies,
      dateEntered: datePlus8Utc.toLocaleDateString(),
      timeEntered: new Date().toLocaleTimeString(),
    });

    res.status(200).json(supply);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

/** Deduct supplies */
const deductSupplies = asyncHandler(async (req, res) => {
  try {
    const { supplyName, count, countDeducted, customerName, comment } =
      req.body;
    const userId = req.body.userId._id;
    // return
    /** add 8 hrs */
    const datePlus8Utc = await addHours(new Date(), 8);

    const supplies = await Supply.create({
      supplyName,
      count,
      countDeducted,
      customerName,
      comment,
      userId,
      dateEntered: datePlus8Utc.toLocaleDateString(),
      timeEntered: new Date().toLocaleTimeString(),
    });

    res.status(200).json(supplies);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

/** Get all supplies transactions */
const getAllSupplies = asyncHandler(async (req, res) => {
  try {
    const allSupplies = await Supply.find({})
      .sort({ createdAt: -1 })
      .select(
        "supplyName count countAdded countDeducted dateEntered customerName comment createdAt"
      )
      .populate("userId", "firstName");
    res.status(200).json(allSupplies);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  addSupplies,
  getAllSupplies,
  deductSupplies,
};
