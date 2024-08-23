const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: [true, "First name is required"],
  },
  lastName: {
    type: String,
    // required: [true, "Last Name is required"],
  },
  email: {
    type: String,
    require: [true, "Email is required"],
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
    require: [true, "Password is required"],
  },
  isAdmin: {
    type: Boolean,
    require: true,
    default: false,
  },
},{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema)
