import Joi from '@hapi/joi'

const options = {
	language: {
		key: '{{label}} ',
	},
}

// sign in validaiton
const signIn = (signInData) => {
	const signInSchema = Joi.object().keys({
		email: Joi.string().label('Email'),
		password: Joi.string().label('Password'),
	})

	return Joi.validate(signInData, signInSchema, options)
}

// add moderator validation
const addModerator = (addModeratorData) => {
	const addModeratorSchema = Joi.object().keys({
		firstName: Joi.string().label('First name'),
		lastName: Joi.string().label('Last name'),
		email: Joi.string().label('Email'),
	})

	return Joi.validate(addModeratorData, addModeratorSchema, options)
}

const updateModerator = (moderatorDetails) => {
	const updateModeratorSchema = Joi.object().keys({
		firstName: Joi.string().label('First name'),
		lastName: Joi.string().label('Last name'),
		email: Joi.string().label('Email'),
		password: Joi.string().label('Password'),
	})

	return Joi.validate(moderatorDetails, updateModeratorSchema, options)
}

module.exports = {
	addModerator,
	signIn,
	updateModerator,
}
