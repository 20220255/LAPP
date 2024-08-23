const asyncHandler = require("express-async-handler");
const Sales = require("../models/salesModel");

const inputSales = asyncHandler(async (req, res) => {
  try {
    // input sales
    const sales = await Sales.create(req.body);

    if (sales.totalSales <= 0) {
        throw new Error("Sales cannot be 0")
    }

    if (sales) {
      res.status(201).json(sales);
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }

  // input sales
  //   const sales = await Sales.create(req.body);

  //   if (sales) {
  //     res.status(201).json(sales);
  //   } else {
  //     res.status(400);
  //     throw new Error();
  //   }
});

module.exports = {
  inputSales,
};
