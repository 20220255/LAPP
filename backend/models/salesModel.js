const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: String,
    w1: {
      type: Boolean,
      required: true,
    },
    w2: {
      type: Boolean,
      required: true,
    },
    w3: {
      type: Boolean,
      required: true,
    },
    w4: {
      type: Boolean,
      required: true,
    },
    w5: {
      type: Boolean,
      required: true,
    },
    d1: {
      type: Boolean,
      required: true,
    },
    d2: {
      type: Boolean,
      required: true,
    },
    d3: {
      type: Boolean,
      required: true,
    },
    d4: {
      type: Boolean,
      required: true,
    },
    d5: Boolean,
    detergent: {
      name: String,
      count: Number,
    },
    fabCon: {
      name: String,
      count: Number,
    },
    extraDry: Number,
    folds: Number,
    foldsShare: Number,
    spinDry: Number,
    totalSales: Number,
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

module.exports = mongoose.model("Sales", salesSchema);
