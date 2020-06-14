import Semester from '../models/Semester'

class SemestersController {
	// add subjects to a semester
	async addSubjectsToSemester(request, response) {
		let { semesterId } = request.body
		let subjectsToAdd = request.body.subjects
		try {
			let semester = await Semester.findOneAndUpdate({ _id: semesterId }, { $push: { subjects: { $each: subjectsToAdd } } }, { new: true })

			if (!semester) {
				response.status(404).json({
					success: false,
					message: `Semester not found!`,
				})
			} else {
				response.status(201).json({
					success: true,
					message: `Added subjects to Semester ${semester.level}`,
					semester: semester,
				})
			}
		} catch (error) {
			response.status(500).json({
				success: false,
				error: error.message,
			})
		}
	}

	// get subjects by semester
	async getSubjectsBySemester(request, response) {
		let semesterId = request.body.semesterId
		try {
			let semester = await Semester.findOne({ _id: semesterId }).populate('subjects')
			if (!semester) {
				response.status(404).json({
					success: false,
					message: 'Semester not found!',
				})
			} else {
				response.status(200).json({
					success: true,
					subjects: semester.subjects,
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

const semestersController = new SemestersController()
export default semestersController
