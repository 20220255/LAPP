const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name of expense is required"],
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dateEntered: {
      type: String,
      required: true,
    },
    timeEntered: {
      required: true,
      type: String,
    },
    comment: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Expense", expenseSchema);
