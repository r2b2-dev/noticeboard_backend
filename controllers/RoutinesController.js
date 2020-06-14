import Routine from '../models/Routine'
const Validations = require('../Validations')

class RoutinesController {
	async addRoutine(request, response) {
		const result = Validations.addRoutine(request.body)
		if (result.error) {
			let error = result.error.details[0]
			response.status(422).json({
				success: false,
				error: { field: error.path[0], message: error.message },
			})
		} else {
			try {
				let routine = new Routine(result.value)
				let newRoutine = await routine.save()
				response.status(201).json({
					success: true,
					message: `Added a new routine`,
					routine: newRoutine,
				})
			} catch (error) {
				response.status(500).json({
					sucess: false,
					error: error.message,
				})
			}
		}
	}
	// Get all batches
	async getAllRoutines(request, response) {
		try {
			let allRoutines = await Routine.find().populate({ path: 'batchId' })
			if (!allRoutines) {
				response.status(404).json({ success: false, error: 'Routine not found!' })
			} else {
				response.status(200).json({ success: true, routines: allRoutines })
			}
		} catch (error) {
			response.status(500).json({ success: false, error: error.message })
		}
	}
	//Get a single batch
	async getSingleRoutine(request, response) {
		try {
			let routineId = request.params.routineId
			let routine = await Routine.findById(routineId)
			if (!routine) {
				response.status(404).json({ success: false, error: 'Routine not found!' })
			} else {
				response.status(200).json({ success: true, routine: routine })
			}
		} catch (error) {
			response.status(500).json({ success: false, error: error.message })
		}
	}

	async updateRoutineDetails(request, response) {
		const result = Validations.addRoutine(request.body)
		if (result.error) {
			let error = result.error.details[0]
			response.status(422).json({ success: false, error: { field: error.path[0], message: error.message } })
		} else {
			let routineId = request.params.routineId
			let { day, duration, subjectId, batchId } = result.value
			try {
				let updatedRoutine = await Routine.findOneAndUpdate({ _id: routineId }, { day, duration, subjectId, batchId }, { new: true })
				if (!updatedRoutine) {
					response.status(404).json({ success: false, message: 'Routine not found!' })
				} else {
					response.status(201).json({
						success: true,
						message: `Routine updated!`,
						routine: updatedRoutine,
					})
				}
			} catch (error) {
				response.status(500).json({ success: false, error: error.message })
			}
		}
	}

	async deleteRoutine(request, response) {
		try {
			let routineId = request.params.routineId
			let deletedRoutine = await Routine.findOneAndDelete({ _id: routineId })
			if (!deletedRoutine) {
				response.status(404).json({ success: false, error: 'Routine not found!' })
			} else {
				response.status(200).json({
					success: true,
					message: `Removed Routine!`,
					routine: deletedRoutine,
				})
			}
		} catch (error) {
			response.status(500).json({ success: false, error: error.message })
		}
	}
}
const routinesController = new RoutinesController()
export default routinesController
