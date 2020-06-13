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
		} else if (await Batch.batchExists(result.value.label)) {
			response.status(409).json({
				success: false,
				error: { field: 'batch', message: 'Batch already added!' },
			})
		} else {
			try {
				let batch = new Batch(result.value)
				let newBatch = await batch.save()
				response.status(201).json({
					success: true,
					message: `Added a new batch ${newBatch.label}`,
					batch: newBatch,
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
	async getAllBatches(request, response) {
		try {
			let allBatches = await Batch.find()
			response.status(200).json({ success: true, batches: allBatches })
		} catch (error) {
			response.status(500).json({ success: false, error: error.message })
		}
	}

	//Get a single batch
	async getSingleBatch(request, response) {
		try {
			let batchId = request.params.batchId
			let batch = await Batch.findById(batchId)
			if (!batch) {
				response.status(404).json({ success: false, error: 'Record not found!' })
			} else {
				response.status(200).json({ success: true, batch: batch })
			}
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
				let updatedBatch = await Batch.findOneAndUpdate({ _id: batchId }, { label }, { new: true })
				if (!updatedBatch) {
					response.status(404).json({ success: false, message: 'Record not found!' })
				} else {
					response.status(201).json({
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
				response.status(404).json({ success: false, error: 'Record not found!' })
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
}
const batchesController = new BatchesController()
export default batchesController
