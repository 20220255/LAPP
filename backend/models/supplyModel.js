const mongoose = require("mongoose");

const supplySchema = new mongoose.Schema(
  {
    supplyName: {
      type: String,
      required: [true, "Supply name is required"],
    },
    type: {
      type: String,
      enum: ["detergent", "fab con"],
      required: false,
    },
    count: {
      type: Number,
      required: true,
    },
    countAdded: {
      type: Number,
    },
    countDeducted: {
      type: Number,
    },
    customerName: {
      type: String,
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

module.exports = mongoose.model("Supply", supplySchema);
