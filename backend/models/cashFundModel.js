const mongoose = require("mongoose");

const cashFundSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    amountAdded: {
      type: Number,
    },
    amountDeducted: {
      type: Number,
    },
    expenseName: {
      type: String
    },
    dateEntered: {
      type: String,
      required: true,
    },
    timeEntered: {
      required: true,
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CashFund", cashFundSchema);
