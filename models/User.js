import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const Schema = mongoose.Schema

const UserSchema = new Schema({
	firstName: {
		type: String,
		required: [true, 'First name is required'],
		trim: true,
	},
	lastName: {
		type: String,
		required: [true, 'Last name is required'],
		trim: true,
	},
	email: {
		type: String,
		required: [true, 'Email-address is required'],
		unique: true,
		trim: true,
	},
	type: {
		type: String,
		default: 'Moderator',
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
		trim: true,
	},
	authTokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

// mongoose "pre" hook to hash the password of every new user
UserSchema.pre('save', async function (next) {
	if (!this.isNew || !this.isModified) {
		next()
	} else {
		try {
			// hash the plain text password
			let hashedPassword = await bcrypt.hash(this.password, 10) // 10 is the salt rounds
			// set the hashed password to be the password of the new user
			this.password = hashedPassword
			// execute next code
			next()
		} catch (error) {
			next(error)
			console.log(error.message)
		}
	}
})

/*
schema.statics ===> they are to be executed on the model itself 
schema.methods ===> they are to be executed on the instance/document, like on the resulted doc of findById/findOne etc..
*/

//check if email exists already
UserSchema.statics.emailExists = async function (email) {
	let emailExists = await User.findOne({ email: email })
	return emailExists
}

// compare login password with database password
UserSchema.methods.comparePassword = async function (plainPassword) {
	let match = await bcrypt.compare(plainPassword, this.password)
	return match
}

// generate unique token after successful login
UserSchema.methods.generateAuthToken = async function () {
	const token = await jwt.sign({ id: this._id }, process.env.SECRET_KEY)
	this.authTokens = await this.authTokens.concat({ token })
	await this.save()
	return token
}

// hide some attributes of user model while sending json response
UserSchema.methods.toJSON = function () {
	let user = this.toObject()
	delete user.password
	delete user.authTokens
	delete user.createdAt
	delete user.__v
	return user
}

const User = mongoose.model('user', UserSchema)
export default User
