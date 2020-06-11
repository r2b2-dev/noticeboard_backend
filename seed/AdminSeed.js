require("dotenv").config();
import mongoose from "mongoose";
import User from "../models/User";

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

let admin = new User({
  firstName: "Admin",
  lastName: "Admin",
  email: "admin@noticeboard.com",
  type: "Admin",
  password: "password",
});

admin
  .save()
  .then((admin) => console.log("Admin seeded..."))
  .catch((error) => console.error("Error seeding admin...", error.message));
