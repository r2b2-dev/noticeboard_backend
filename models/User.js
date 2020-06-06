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

USERSCHEMA.pre("save", async function (next) {
  if (!this.isNew || !this.isModified) {
    next();
  } else {
    try {
      // hash the plain text password
      let hashedPassword = await bcrypt.hash(this.password, 10); // 10 is the salt rounds
      // set the hashed password to be the password of the new user
      this.password = hashedPassword;
      // execute next code
      next();
    } catch (error) {
      next(error);
      console.log(error.message);
    }
  }
});

//email valation
USERSCHEMA.statics.emailExists = async (email) => {
  let emailExists = await USER.findOne({
    email: email,
  });
  return emailExists;
};

// compare login password with the actual password
USERSCHEMA.methods.comparePassword = async function (plainPassword) {
  let matched = await bcrypt.compare(plainPassword, this.password);
  return matched;
};

//hie some user attributes when sening the response
USERSCHEMA.methods.toJSON = () => {
  let user = this.toObject();
  delete user.password;
  return user;
};

const USER = mongoose.model("user", USERSCHEMA);
export default USER;
