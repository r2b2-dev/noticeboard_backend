import mongoose from 'mongoose'
import Teacher from '../models/Teacher'

const Schema = mongoose.Schema

const SubjectSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Subject name is required!'],
		unique: true,
		trim: true,
	},
	teachers: [
		{
			type: Schema.Types.ObjectId,
			ref: Teacher,
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

SubjectSchema.methods.toJSON = function () {
	let subject = this.toObject()
	delete subject.__v
	return subject
}

//if subject already exists
SubjectSchema.statics.subjectExists = async (subjectName) => {
	let subjectExists = await Subject.findOne({ name: subjectName })
	return subjectExists
}

const Subject = mongoose.model('subject', SubjectSchema)
export default Subject
