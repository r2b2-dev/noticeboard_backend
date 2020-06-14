import Teacher from '../models/Teacher'
const Validations = require('../Validations')

class TeachersController {
	//add a new teacher
	async addTeacher(request, response) {
		const result = Validations.addTeacher(request.body)
		if (result.error) {
			let error = result.error.details[0]
			response.status(422).json({
				success: false,
				error: { field: error.path[0], message: error.message },
			})
		} else if (await Teacher.teacherExists(result.value.name)) {
			response.status(409).json({
				success: false,
				error: { field: 'name', message: 'Teacher already added!' },
			})
		} else {
			try {
				let teacher = new Teacher(result.value)
				let newTeacher = await teacher.save()
				response.status(201).json({
					success: true,
					message: `Added a new teacher ${newTeacher.name}!`,
					teacher: newTeacher,
				})
			} catch (error) {
				response.status(500).json({
					success: false,
					error: error.message,
				})
			}
		}
	}

	// get all Teachers
	async getAllTeachers(request, response) {
		try {
			let allTeachers = await Teacher.find()
			response.status(200).json({
				success: true,
				teachers: allTeachers,
			})
		} catch (error) {
			response.status(500).json({
				success: false,
				error: error.message,
			})
		}
	}

	// update teacher deatils
	async updateTeacher(request, response) {
		const result = Validations.addTeacher(request.body)
		if (result.error) {
			let error = result.error.details[0]
			response.status(422).json({
				success: false,
				error: { field: error.path[0], message: error.message },
			})
		} else {
			let { name } = result.value
			let teacherId = request.params.teacherId
			try {
				let teacherExists = await Teacher.teacherExists(name)
				if (teacherExists) {
					if (teacherExists._id.toString() !== teacherId.toString()) {
						response.status(409).json({ success: false, error: { field: 'name', message: 'Teacher already added!' } })
						return
					}
				}

				let updatedTeacher = await Teacher.findOneAndUpdate({ _id: teacherId }, { name }, { new: true })
				if (!updatedTeacher) {
					response.status(404).json({ success: false, message: 'Record does not exist!' })
				} else {
					response.status(200).json({
						success: true,
						message: 'Teacher details updated!',
						teacher: updatedTeacher,
					})
				}
			} catch (error) {
				response.status(500).json({
					success: false,
					error: error.message,
				})
			}
		}
	}

	// remove teacher details
	async deleteTeacher(request, response) {
		try {
			let deletedTeacher = await Teacher.findOneAndDelete({
				_id: request.params.teacherId,
			})
			if (!deletedTeacher) {
				response.status(404).json({
					success: false,
					error: 'Record does not exist!',
				})
			} else {
				response.status(200).json({
					success: true,
					message: `Removed teacher ${deletedTeacher.name}!`,
					teacher: deletedTeacher,
				})
			}
		} catch (error) {
			response.status(500).json({
				success: false,
				error: error.message,
			})
		}
	}
}

const teachersController = new TeachersController()
export default teachersController
