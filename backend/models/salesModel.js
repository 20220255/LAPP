const mongoose = require("mongoose")

const salesSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: String,
    w1: {
        type: Boolean,
        require
    },
    w2: {
        type: Boolean,
        require
    },
    w3: {
        type: Boolean,
        require
    },
    w4: {
        type: Boolean,
        require
    },
    w5: {
        type: Boolean,
        require
    },
    d1: {
        type: Boolean,
        require
    },
    d2: {
        type: Boolean,
        require
    },
    d3: {
        type: Boolean,
        require
    },
    d4: {
        type: Boolean,
        require
    },
    d5: Boolean,
    detergent: {
        name: String,
        count: Number
    },
    fabCon: {
        name: String,
        count: Number,
    },
    extraDry: Number,
    folds: Number,
    spinDry: Number,
    totalSales: Number,
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
},{
    timestamps: true
})

module.exports = mongoose.model('Sales', salesSchema)