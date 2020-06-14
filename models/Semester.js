import mongoose from 'mongoose'
import Subject from './Subject'

const Schema = mongoose.Schema

const SemesterSchema = new Schema({
	level: {
		type: String,
		required: [true, 'Semester level is required!'],
	},
	subjects: [
		{
			type: Schema.Types.ObjectId,
			ref: Subject,
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

SemesterSchema.methods.toJSON = function () {
	let semester = this.toObject()
	delete semester.__v
	return semester
}

const Semester = mongoose.model('semester', SemesterSchema)
export default Semester
