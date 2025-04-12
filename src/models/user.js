const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
      trim: true,
      maxLength: 50,
      minLength: 3,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: (value) => {
        if(!validator.isEmail(value))
          throw new Error("Email is not valid!!");
      }
    },
    password: {
      type: String,
      required: true,
      min: 8,
      validate: (value) => {
        if(!validator.isStrongPassword(value))
          throw new Error("Enter a strong password!!!");
      }
    },
    age: {
      type: Number,
      min: 18,
      max: 110,
    },
    gender: {
      type: String,
      trim: true,
      validate: (value) => {
        if(!["male", "female", "others"].includes(value))
          throw new Error("gender is not valid!");
      }
    },
    skills: {
      type: [String],
    //   maxLength: 20, ??? not working why
    },
    about: {
      type: String,
      maxLength: 150,
      trim: true,
    },
    photoUrl: {
      type: String,
      default: "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
      validate: (value) => {
        if(!validator.isURL(value))
          throw new Error("Invalid photo url address!!");
      }
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({_id: user._id}, "DEV@tinder$242", {expiresIn: "7d"});
  return token;
}

userSchema.methods.validatePassword = async function (inputPassword) {
  const user = this;
  const isPasswordMatch = await bcrypt.compare(inputPassword, user.password);
  return isPasswordMatch;
}

module.exports = mongoose.model("User", userSchema);
