import mongoose from "mongoose";
const Schema = mongoose.Schema;
const BatchSchema = new Schema({
  batch: {
    type: String,
    required: [true, "Batch name is required"],
    trim: true,
  },
});
BatchSchema.methods.toJSON = function () {
  let batch = this.toObject();
  delete batch.__v;
  return batch;
};
//check if batch exists already
BatchSchema.statics.batchExists = async function (batch) {
  let batchExists = await Batch.findOne({ batch: batch })
  return batchExists
}

const Batch = mongoose.model("batch", BatchSchema);

export default Batch;
