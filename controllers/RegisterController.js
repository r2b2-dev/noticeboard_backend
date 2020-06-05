import User from "../models/User";

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashPass) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    let user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashPass,
      userType: req.body.userType,
    });
    if (User.emailExists(user.email)) {
      res.json("Email already exist");
    } else {
      user
        .save()
        .then((user) => {
          res.json({
            message: "User registered successfully!",
          });
        })
        .catch((error) => {
          res.status(400).json({
            message: "An error occured" + error,
          });
        });
    }
  });
};

module.exports = { register };
