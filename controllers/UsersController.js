import User from '../models/User'
const Validations = require('../Validations')
import bcrypt from 'bcrypt'

class UsersController {
	// Add New moderator to database
	async addModerator(request, response) {
		const result = Validations.addModerator(request.body)

		if (result.error) {
			let error = result.error.details[0]
			response.status(422).json({
				success: false,
				error: { field: error.path[0], message: error.message },
			})
		} else {
			try {
				if (await User.emailExists(result.value.email)) {
					response.status(409).json({
						success: false,
						error: { field: 'email', message: 'Email already taken!' },
					})
				} else {
					// create a password for the moderator
					let splitted = result.value.email.split('@')
					let password = splitted[0] + '_12345@noticeboard'
					// assign the password to the moderator and finally save in the db
					let moderator = new User(result.value)
					moderator.password = password
					let newModerator = await moderator.save()
					response.status(201).json({
						success: true,
						message: `Added a new moderator ${newModerator.firstName + ' ' + newModerator.lastName}!`,
						moderator: newModerator,
					})
				}
			} catch (error) {
				response.status(500).json({ success: false, error: error.message })
			}
		}
	}

	// Get all moderators
	async getAllModerators(request, response) {
		try {
			let allModerators = await User.find({ type: 'Moderator' })
			let moderators = await allModerators.map((moderator) => ({
				_id: moderator._id,
				firstName: moderator.firstName,
				lastName: moderator.lastName,
				email: moderator.email,
				createdAt: moderator.createdAt,
			}))
			response.status(200).json({ success: true, moderators: moderators })
		} catch (error) {
			response.status(500).json({ success: false, error: error.message })
		}
	}

	// Update Moderator Details
	async updateModeratorDetails(request, response) {
		const result = Validations.updateModerator(request.body)
		if (result.error) {
			let error = result.error.details[0]
			response.status(422).json({ success: false, error: { field: error.path[0], message: error.message } })
		} else {
			let moderatorId = request.params.moderatorId
			let { firstName, lastName, email, password } = result.value
			/*
			check if the user who wants to update the record is an admin 
			or the owner of the record
			*/
			if (request.authUser._id.toString() === moderatorId || request.authUser.type === 'Admin') {
				try {
					let userExists = await User.emailExists(email)

					if (userExists) {
						if (userExists._id.toString() !== moderatorId.toString()) {
							response.status(409).json({ success: false, error: { field: 'email', message: 'Email already taken!' } })
							return
						}
					}

					let moderator = await User.findOneAndUpdate(
						{ _id: moderatorId },
						{ firstName, lastName, email, password: await bcrypt.hash(password, 10) },
						{ new: true }
					)
					if (!moderator) {
						response.status(404).json({ success: false, message: 'Moderator not found!' })
					} else {
						response.status(200).json({
							success: true,
							message: `Moderator details updated!`,
							moderator: moderator,
						})
					}
				} catch (error) {
					response.status(500).json({ success: false, error: error.message })
				}
			} else {
				response.status(401).json({ success: false, message: 'You cannot update this record!' })
			}
		}
	}

	// Delete Moderator
	async deleteModerator(request, response) {
		try {
			let deletedModerator = await User.findOneAndDelete({ _id: request.params.moderatorId })
			if (!deletedModerator) {
				response.status(404).json({ success: false, message: 'Moderator not found!' })
			} else {
				response.status(200).json({
					success: true,
					message: `Removed moderator ${deletedModerator.firstName + ' ' + deletedModerator.lastName}!`,
					moderator: deletedModerator,
				})
			}
		} catch (error) {
			response.status(500).json({ success: false, error: error.message })
		}
	}
}

const usersController = new UsersController()
export default usersController
