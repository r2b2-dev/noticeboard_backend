import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.json({
            error: err,
          });
        }
        if (result) {
          //yo part bujeko chaena email: user.email
          let token = jwt.sign({ email: user.email }, "secrectToken", {
            expiresIn: "1h",
          });
          res.json({
            message: "Login Successfull",
            token,
          });
        } else {
          res.json({
            password: "Password incorrect",
          });
        }
      });
    } else {
      res.json({
        message: "User not found",
      });
    }
  });
};

module.exports = { login };
