import Joi from "@hapi/joi";

const options = {
  language: {
    key: "{{label}} ",
  },
};

// sign up validation
const addUser = (addUserData) => {
  const addUserSchema = Joi.object().keys({
    firstName: Joi.string().label("First name"),
    lastName: Joi.string().label("Last name"),
    userType: Joi.string().label("User Type"),
    email: Joi.string().label("Email"),
    password: Joi.string().label("Password"),
  });

  return Joi.validate(addUserData, addUserSchema, options);
};
// sign in validaiton
const signIn = (signInData) => {
  const signInSchema = Joi.object().keys({
    email: Joi.string().label("Email"),
    password: Joi.string().label("Password"),
  });

  return Joi.validate(signInData, signInSchema, options);
};
const updateUserDetails = (userDetails) => {
  const updateUserSchema = Joi.object().keys({
    firstName: Joi.string().label("First name"),
    lastName: Joi.string().label("Last name"),
    email: Joi.string().label("Email"),
    userType: Joi.string().label("User Type"),
  });

  return Joi.validate(userDetails, updateUserSchema, options);
};

module.exports = {
  addUser,
  signIn,
  updateUserDetails,
};
