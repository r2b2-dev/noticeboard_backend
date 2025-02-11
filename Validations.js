import Joi from '@hapi/joi'

// sign in validaiton
const signIn = (signInData) => {
	const signInSchema = Joi.object({
		email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
			'string.base': 'E-mail must be a string',
			'string.empty': 'E-mail cannot be empty',
			'string.email': 'E-mail must be a valid email',
			'any.required': 'email is a required field',
		}),
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9@_*.!%^&#$]{3,30}$')).min(8).required().messages({
			'string.base': 'Password must be a string',
			'string.empty': 'Password cannot be empty',
			'string.pattern.base': 'Password must match the pattern [a-zA-Z0-9]',
			'string.min': 'Password must be at least 8 characters long',
			'any.required': 'password is a required field',
		}),
	})
	return signInSchema.validate(signInData)
}

// add moderator validation
const addModerator = (moderatorData) => {
	const addModeratorSchema = Joi.object({
		firstName: Joi.string().min(2).max(20).required().messages({
			'string.base': 'First name must be a string',
			'string.empty': 'First name cannot be empty',
			'string.min': 'First name must be at least 2 characters long',
			'string.max': 'First name cannot be longer than 20 characters',
			'any.required': 'firstName is a required field',
		}),
		lastName: Joi.string().min(2).max(20).required().messages({
			'string.base': 'Last name must be a string',
			'string.empty': 'Last name cannot be empty',
			'string.min': 'Last name must be at least 2 characters long',
			'string.max': 'Last name cannot be longer than 20 characters',
			'any.required': 'lastName is a required field',
		}),
		email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
			'string.base': 'E-mail must be a string',
			'string.empty': 'E-mail cannot be empty',
			'string.email': 'E-mail must be a valid email',
			'any.required': 'email is a required field',
		}),
	})

	return addModeratorSchema.validate(moderatorData)
}

// update moderator validation
const updateModerator = (moderatorData) => {
	const updateModeratorSchema = Joi.object({
		firstName: Joi.string().min(2).max(20).required().messages({
			'string.base': 'First name must be a string',
			'string.empty': 'First name cannot be empty',
			'string.min': 'First name must be at least 2 characters long',
			'string.max': 'First name cannot be longer than 20 characters',
			'any.required': 'firstName is a required field',
		}),
		lastName: Joi.string().min(2).max(20).required().messages({
			'string.base': 'Last name must be a string',
			'string.empty': 'Last name cannot be empty',
			'string.min': 'Last name must be at least 2 characters long',
			'string.max': 'Last name cannot be longer than 20 characters',
			'any.required': 'lastName is a required field',
		}),
		email: Joi.string().email({ minDomainSegments: 2 }).required().messages({
			'string.base': 'E-mail must be a string',
			'string.empty': 'E-mail cannot be empty',
			'string.email': 'E-mail must be a valid email',
			'any.required': 'email is a required field',
		}),
		password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9@_*.!%^&#$]{3,30}$')).min(8).required().messages({
			'string.base': 'Password must be a string',
			'string.empty': 'Password cannot be empty',
			'string.pattern.base': 'Password must match the pattern [a-z, A-Z, 0-9]',
			'string.min': 'Password must be at least 8 characters long',
			'any.required': 'password is a required field',
		}),
	})

	return updateModeratorSchema.validate(moderatorData)
}

//add department validation
const addDepartment = (departmentData) => {
	const addDepartmentSchmea = Joi.object({
		name: Joi.string().min(2).required().messages({
			'string.base': 'Department name must be a string',
			'string.empty': 'Department name cannot be empty',
			'string.min': 'Department name must be at least 2 characters long',
			'any.required': 'name is a required field',
		}),
		location: Joi.string().min(2).required().messages({
			'string.base': 'Department location must be a string',
			'string.empty': 'Department location cannot be empty',
			'string.min': 'Department location must be at least 2 characters long',
			'any.required': 'location is a required field',
		}),
	})

	return addDepartmentSchmea.validate(departmentData)
}

// add batch validation
const addBatch = (batchData) => {
	const addBatchSchema = Joi.object({
		label: Joi.string().min(2).required().messages({
			'string.base': 'Batch label must be a string',
			'string.empty': 'Batch label cannot be empty',
			'string.min': 'Batch label must be at least 2 characters long',
			'any.required': 'label is a required field',
		}),
		sections: Joi.array().items(Joi.string().required().messages({
			"array.base": "Sections must be a array",
			"array.empty": "Sections cannot be empty",
			"any.required": "Sections is a required field",
		}))
	})

	return addBatchSchema.validate(batchData)
}

//add subject validation
const addSubject = (subjectData) => {
	const addSubjectSchema = Joi.object({
		name: Joi.string().min(2).required().messages({
			'string.base': 'Subject name must be a string',
			'string.empty': 'Subject name cannot be empty',
			'string.min': 'Subject name must be at least 2 characters long',
			'any.required': 'name is a required field',
		}),
	})
	return addSubjectSchema.validate(subjectData)
}

const addTeacher = (teacherData) => {
	const addTeacherSchema = Joi.object({
		name: Joi.string().min(2).required().messages({
			'string.base': 'Teacher name must be a string',
			'string.empty': 'Teacher name cannot be empty',
			'string.min': 'Teacher name must be at least 2 characters long',
			'any.required': 'name is a required field',
		}),
	})
	return addTeacherSchema.validate(teacherData)
}

const addSection = (sectionData) => {
	const addSectionSchema = Joi.object({
		section: Joi.string().pattern(new RegExp('[a-zA-Z]')).max(1).required().messages({
			'string.base': 'Section name must be a string',
			'string.empty': 'Section name cannot be empty',
			'string.pattern.base': 'Section name must be an alphabet',
			'string.max': 'Section name must be of 1 letter',
			'any.required': 'section is a required field',
		}),
	})
	return addSectionSchema.validate(sectionData)
}

module.exports = {
	signIn,
	addModerator,
	updateModerator,
	addDepartment,
	addBatch,
	addSubject,
	addTeacher,
	addSection,
}
