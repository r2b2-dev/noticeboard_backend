import mongoose from 'mongoose'

const Schema = mongoose.Schema

const BatchSchema = new Schema({
	label: {
		type: String,
		required: [true, 'Batch label is required'],
		trim: true,
	},
})

BatchSchema.methods.toJSON = function () {
	let batch = this.toObject()
	delete batch.__v
	return batch
}
//check if batch exists already
BatchSchema.statics.batchExists = async function (label) {
	let batchExists = await Batch.findOne({ label: label })
	return batchExists
}

const Batch = mongoose.model('batch', BatchSchema)

export default Batch
