import mongoose from "mongoose";
import bcrypt from "bcrypt";

const SCHEMA = mongoose.Schema;

const USERSCHEMA = new SCHEMA({
  firstName: {
    type: String,
    required: [true, "Please, fill out the first name"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please, fill out the last name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please, fill out the email"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please, fill out the password"],
  },
  userType: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//email valation
USERSCHEMA.statics.emailExists = async (email) => {
  let emailExists = await USER.findOne({
    email: email,
  });
  return emailExists;
};

// //check if passwor fom registration matches passwor for login
// USERSCHEMA.methods.comparePassword = async (plainPassword) => {
//   let passwordmatch = await bcrypt.compare(plainPassword, this.password);
//   return passwordmatch;
// };

//hie some user attributes when sening the response
USERSCHEMA.methods.toJSON = () => {
  let user = this.toObject();
  delete user.password;
  return user;
};

const USER = mongoose.model("user", USERSCHEMA);
module.exports = USER;
