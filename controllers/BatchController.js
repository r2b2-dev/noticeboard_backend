import Batch from "../models/Batch";
import Validations from "../Validations";

class BatchController {
  //Add Batches
  async addBatch(request, response) {
    const result = Validations.addBatch(request.body);
    if (result.error) {
      let error = result.error.details[0];
      response.status(422).json({
        success: false, error: { field: error.path[0], message: error.message },
      });
    }
    else if (await Batch.batchExists(result.value.batch)) {
      response.status(409).json({
        success: false,
        error: { field: 'batch', message: 'Batch already taken!' },
      })
    } else {
      try {
        let batch = new Batch(result.value);
        let newBatch = await batch.save();
        response.status(201).json({
          success: true,
          message: `Added new Batch ${newBatch.batch}`,
          batch: newBatch,
        });
      } catch (error) {
        response.status(500).json({
          sucess: false,
          error: "error.message",
        });
      }
    }
  }
  // Get All Batch
  async getAllBatch(request, response) {
    try {
      let allBatch = await Batch.find()
      response.status(200).json({ success: true, batches: allBatch })
    } catch (error) {
      response.status(500).json({ success: false, error: error.message })
    }
  }
  //Get SingleBatch
  async getSingleBatch(request, response) {
    try {
      let batchId = request.params.batchId
      let allBatch = await Batch.findById(batchId)
      if (!allBatch) {
        response.status(404).json({ success: false, error: 'Batch not found!' })
      } else {
        response.status(200).json({ success: true, batches: allBatch })
      }

    } catch (error) {
      response.status(500).json({ success: false, error: error.message })
    }
  }
  // Update Batch Details
  async updateBatchDetails(request, response) {
    const result = Validations.addBatch(request.body)
    if (result.error) {
      let error = result.error.details[0]
      response.status(422).json({ success: false, error: { field: error.path[0], message: error.message } })
    } else {
      let batchId = request.params.batchId
      let { batch } = result.value
      try {
        let updatebatch = await Batch.findOneAndUpdate(
          { _id: batchId },
          { batch },
          { new: true }
        )
        if (!updatebatch) {
          response.status(404).json({ success: false, message: 'batch does not exist!' })
        } else {
          response.status(201).json({
            success: true,
            message: `Updated batch ${updatebatch.batch}!`,
            batch: batch,
          })
        }
      } catch (error) {
        response.status(500).json({ success: false, error: error.message })
      }

    }
  }
  // Delete a  Moderator
  async deleteBatch(request, response) {
    try {
      let batchId = request.params.batchId
      let deletedBatch = await Batch.findOneAndDelete({ _id: batchId })
      if (!deletedBatch) {
        response.status(404).json({ success: false, error: 'Batch not found!' })
      } else {
        response.status(200).json({
          success: true,
          message: `Removed Batch ${deletedBatch.batch}!`,
          batch: deletedBatch,
        })
      }
    } catch (error) {
      response.status(500).json({ success: false, error: error.message })
    }
  }
}
const batchController = new BatchController();
export default batchController;
