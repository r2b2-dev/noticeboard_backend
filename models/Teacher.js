import mongoose from 'mongoose'
const Schema = mongoose.Schema

const TeacherSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Teacher name is required!'],
		trim: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

//if teacher already exists
TeacherSchema.statics.teacherExists = async (teacherName) => {
	let teacherExists = await Teacher.findOne({ name: teacherName })
	return teacherExists
}

TeacherSchema.methods.toJSON = function () {
	let teacher = this.toObject()
	delete teacher.__v
	return teacher
}

const Teacher = mongoose.model('teacher', TeacherSchema)
export default Teacher
