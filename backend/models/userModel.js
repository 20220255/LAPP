const { timeStamp } = require("console");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    // required: [true, "Last Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  //   address: {
  //     type: String,
  //     required: [true, "Address is required"],
  //   },
  //   mobileNumber: {
  //     type: String,
  //     required: [true, "Mobile Number is required"],
  //   },
  //   officeNumber: {
  //     type: String,
  //   },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
},{
    timeStamp: true
});

module.exports = mongoose.model('User', userSchema)
