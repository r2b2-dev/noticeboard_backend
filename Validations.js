import Joi from "@hapi/joi";

// sign in validaiton
const signIn = (signInData) => {
  const signInSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
      "string.base": "E-mail must be a string",
      "string.empty": "E-mail is required",
      "string.email": "E-mail must be a valid email",
    }),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .min(8)
      .required()
      .messages({
        "string.base": "Password must be a string",
        "string.empty": "Password is required",
        "string.pattern.base": "Password must match the pattern [a-zA-Z0-9]",
        "string.min": "Password must be at least 8 characters long",
      }),
  });

  return signInSchema.validate(signInData);
};

// add moderator validation
const addModerator = (addModeratorData) => {
  const addModeratorSchema = Joi.object({
    firstName: Joi.string().min(2).max(20).required().messages({
      "string.base": "First name must be a string",
      "string.empty": "First name is required",
      "string.min": "First name must be at least 2 characters long",
      "string.max": "First name cannot be longer than 20 characters",
    }),
    lastName: Joi.string().min(2).max(20).required().messages({
      "string.base": "Last name must be a string",
      "string.empty": "Last name is required",
      "string.min": "Last name must be at least 2 characters long",
      "string.max": "Last name cannot be longer than 20 characters",
    }),
    email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
      "string.base": "E-mail must be a string",
      "string.empty": "E-mail is required",
      "string.email": "E-mail must be a valid email",
    }),
  });

  return addModeratorSchema.validate(addModeratorData);
};

const updateModerator = (updateModeratorData) => {
  const updateModeratorSchema = Joi.object({
    firstName: Joi.string().min(2).max(20).required().messages({
      "string.base": "First name must be a string",
      "string.empty": "First name is required",
      "string.min": "First name must be at least 2 characters long",
      "string.max": "First name cannot be longer than 20 characters",
    }),
    lastName: Joi.string().min(2).max(20).required().messages({
      "string.base": "Last name must be a string",
      "string.empty": "Last name is required",
      "string.min": "Last name must be at least 2 characters long",
      "string.max": "Last name cannot be longer than 20 characters",
    }),
    email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
      "string.base": "E-mail must be a string",
      "string.empty": "E-mail is required",
      "string.email": "E-mail must be a valid email",
    }),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .min(8)
      .required()
      .messages({
        "string.base": "Password must be a string",
        "string.empty": "Password is required",
        "string.pattern.base":
          "Password must match the pattern [a-z, A-Z, 0-9]",
        "string.min": "Password must be at least 8 characters long",
        "any.required": "Password is required",
      }),
  });

  return updateModeratorSchema.validate(updateModeratorData);
};

//add department validation
const addDepartment = (addDepartmentData) => {
  const addDepartmentDataSchmea = Joi.object({
    departmentName: Joi.string().required().messages({
      "string.base": "Department name must be a string",
      "string.empty": "Field cannot be empty",
    }),
    location: Joi.string().required().messages({
      "string.base": "Department location must be a string",
      "string.empty": "Field cannot be empty",
    }),
    departmentType: Joi.string().required().messages({
      "string.base": "Department type is must be a string",
      "string.empty": "Field cannot be empty",
    }),
  });

  return addDepartmentDataSchmea.validate(addDepartmentData);
};

//update department validation
const updateDepartment = (updateDepartmentData) => {
  const updateDepartmentSchema = Joi.object({
    departmentName: Joi.string().required().messages({
      "string.base": "Department name must be a string",
      "string.empty": "Field cannot be empty",
    }),
    location: Joi.string().required().messages({
      "string.base": "Department location must be a string",
      "string.empty": "Field cannot be empty",
    }),
    departmentType: Joi.string().required().messages({
      "string.base": "Department type is must be a string",
      "string.empty": "Field cannot be empty",
    }),
  });
  return updateDepartmentSchema.validate(updateDepartmentData);
};

module.exports = {
  signIn,
  addModerator,
  updateModerator,
  addDepartment,
  updateDepartment,
};
