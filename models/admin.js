const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

//create schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    custom: "admin"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// encrypt before saving the password
userSchema.pre("save", async function(next) {
  try {
    console.log("password");
    const salt = await bcrypt.genSalt(10);

    const passwordHash = await bcrypt.hash(this.password, salt);

    this.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

//model create
const Usermodel = mongoose.model("admin", userSchema);

//export model
module.exports = Usermodel;
