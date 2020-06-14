import Subject from '../models/Subject'
import Teacher from '../models/Teacher'
const Validations = require('../Validations')

class SubjectsController {
	//add a new subject
	async addSubject(request, response) {
		const result = Validations.addSubject(request.body)
		if (result.error) {
			let error = result.error.details[0]
			response.status(422).json({
				success: false,
				error: { field: error.path[0], message: error.message },
			})
		} else {
			try {
				if (await Subject.subjectExists(result.value.name)) {
					response.status(409).json({
						success: false,
						error: { field: 'name', message: 'Subject already added!' },
					})
				} else {
					let subject = new Subject(result.value)
					let newSubject = await subject.save()
					response.status(201).json({
						success: true,
						message: `Added a new subject ${newSubject.name}!`,
						subject: newSubject,
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

	// get all subjects
	async getAllSubjects(request, response) {
		try {
			let allSubjects = await Subject.find().populate('teachers')
			response.status(200).json({
				success: true,
				subjects: allSubjects,
			})
		} catch (error) {
			response.status(500).json({
				sucess: false,
				error: error.message,
			})
		}
	}

	// update a subject
	async updateSubject(request, response) {
		const result = Validations.addSubject(request.body)
		if (result.error) {
			let error = result.error.details[0]
			response.status(422).json({
				success: false,
				error: { field: error.path[0], message: error.message },
			})
		} else {
			let { name } = result.value
			let subjectId = request.params.subjectId

			try {
				let subjectExists = await Subject.subjectExists(result.value.name)
				if (subjectExists) {
					if (subjectExists._id.toString() !== subjectId.toString()) {
						response.status(409).json({ success: false, error: { field: 'name', message: 'Subject already added!' } })
						return
					}
				}

				let updatedSubject = await Subject.findOneAndUpdate({ _id: subjectId }, { name }, { new: true })
				if (!updatedSubject) {
					response.status(404).json({ success: false, message: 'Subject not found!' })
				} else {
					response.status(200).json({
						success: true,
						message: 'Subject details updated!',
						subject: updatedSubject,
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

	// delete subject
	async deleteSubject(request, response) {
		try {
			let deletedSubject = await Subject.findOneAndDelete({
				_id: request.params.subjectId,
			})
			if (!deletedSubject) {
				response.status(404).json({
					success: false,
					message: 'Subject not found!',
				})
			} else {
				response.status(200).json({
					success: true,
					message: `Removed subject ${deletedSubject.name}!`,
					subject: deletedSubject,
				})
			}
		} catch (error) {
			response.status(500).json({
				success: false,
				error: error.message,
			})
		}
	}

	// assign teachers to a subject
	async allocateTeachersToSubject(request, response) {
		let { subjectId } = request.body
		let teachersToAllocate = request.body.teachers
		try {
			let subject = await Subject.findOneAndUpdate(
				{ _id: subjectId },
				{ $push: { teachers: { $each: teachersToAllocate } } },
				{ new: true }
			)

			if (!subject) {
				response.status(404).json({
					success: false,
					message: `Subject not found!`,
				})
			} else {
				response.status(201).json({
					success: true,
					message: `Added teachers to subject ${subject.name}`,
					subject: subject,
				})
			}
		} catch (error) {
			response.status(500).json({
				success: false,
				error: error.message,
			})
		}
	}

	// get teachers by subject
	async getTeachersBySubject(request, response) {
		let { subjectId } = request.body
		try {
			let subject = await Subject.findOne({ _id: subjectId }).populate('teachers')
			if (!subject) {
				response.status(404).json({
					success: false,
					message: 'Subject not found!',
				})
			} else {
				response.status(200).json({
					success: true,
					teachers: subject.teachers,
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

const subjectsController = new SubjectsController()
export default subjectsController
