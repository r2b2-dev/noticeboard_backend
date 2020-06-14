import mongoose from 'mongoose'
import Section from '../models/Section'

const Schema = mongoose.Schema

const BatchSchema = new Schema({
	label: {
		type: String,
		required: [true, 'Batch label is required'],
		trim: true,
	},
	sections: [
		{
			type: Schema.Types.ObjectId,
			required: [true, 'Sections is required'],
			ref: Section,
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

//check if batch exists already
BatchSchema.statics.batchExists = async function (label) {
	let batchExists = await Batch.findOne({ label: label })
	return batchExists
}

BatchSchema.methods.toJSON = function () {
	let batch = this.toObject()
	delete batch.__v
	return batch
}

const Batch = mongoose.model('batch', BatchSchema)

export default Batch
