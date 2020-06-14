import Batch from '../models/Batch'
import Validations from '../Validations'

class BatchesController {
	//Add a new batch
	async addBatch(request, response) {
		const result = Validations.addBatch(request.body)
		if (result.error) {
			let error = result.error.details[0]
			response.status(422).json({
				success: false,
				error: { field: error.path[0], message: error.message },
			})
		} else {
			try {
				if (await Batch.batchExists(result.value.label)) {
					response.status(409).json({
						success: false,
						error: { field: 'batch', message: 'Batch exists already!' },
					})
				} else {
					let batch = new Batch(result.value)
					let newBatch = await batch.save()
					response.status(201).json({
						success: true,
						message: `Added a new batch ${newBatch.label}`,
						batch: newBatch,
					})
				}
			} catch (error) {
				response.status(500).json({
					sucess: false,
					error: error.message,
				})
			}
		}
	}

	// Get all batches
	async getAllBatches(request, response) {
		try {
			let allBatches = await Batch.find()
			response.status(200).json({ success: true, batches: allBatches })
		} catch (error) {
			response.status(500).json({ success: false, error: error.message })
		}
	}

	// Update batch details
	async updateBatchDetails(request, response) {
		const result = Validations.addBatch(request.body)
		if (result.error) {
			let error = result.error.details[0]
			response.status(422).json({ success: false, error: { field: error.path[0], message: error.message } })
		} else {
			let batchId = request.params.batchId
			let { label } = result.value
			try {
				let batchExists = await Batch.batchExists(label)
				if (batchExists) {
					if (batchExists._id.toString() !== batchId.toString()) {
						response.status(409).json({ success: false, error: { field: 'label', message: 'Batch exists already!' } })
						return
					}
				}
				let updatedBatch = await Batch.findOneAndUpdate({ _id: batchId }, { label }, { new: true })
				if (!updatedBatch) {
					response.status(404).json({ success: false, message: 'Batch not found!' })
				} else {
					response.status(200).json({
						success: true,
						message: `Batch details updated!`,
						batch: updatedBatch,
					})
				}
			} catch (error) {
				response.status(500).json({ success: false, error: error.message })
			}
		}
	}

	// Delete batch
	async deleteBatch(request, response) {
		try {
			let batchId = request.params.batchId
			let deletedBatch = await Batch.findOneAndDelete({ _id: batchId })
			if (!deletedBatch) {
				response.status(404).json({ success: false, message: 'Batch not found!' })
			} else {
				response.status(200).json({
					success: true,
					message: `Removed Batch ${deletedBatch.label}!`,
					batch: deletedBatch,
				})
			}
		} catch (error) {
			response.status(500).json({ success: false, error: error.message })
		}
	}

	// assign sections to batch
	async assignSectionsToBatch(request, response) {
		let { batchId } = request.body
		let sectionsToAdd = request.body.sections
		try {
			let batch = await Batch.findOneAndUpdate({ _id: batchId }, { $push: { sections: { $each: sectionsToAdd } } }, { new: true })

			if (!batch) {
				response.status(404).json({
					success: false,
					message: `Batch not found!`,
				})
			} else {
				response.status(201).json({
					success: true,
					message: `Added sections to batch ${batch.label}`,
					batch: batch,
				})
			}
		} catch (error) {
			response.status(500).json({
				success: false,
				error: error.message,
			})
		}
	}

	//Get sections by Batch
	async getSectionsByBatch(request, response) {
		try {
			let { batchId } = request.body
			let batch = await Batch.findById(batchId).populate({ path: 'sections', options: { sort: { sections: 'asc' } } })
			if (!batch) {
				response.status(404).json({ success: false, message: 'Batch not found!' })
			} else {
				response.status(200).json({ success: true, sections: batch.sections })
			}
		} catch (error) {
			response.status(500).json({ success: false, error: error.message })
		}
	}
}
const batchesController = new BatchesController()
export default batchesController
