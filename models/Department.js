import mongoose from 'mongoose'

const Schema = mongoose.Schema

const DepartmentSchema = new Schema({
	name: {
		type: String,
		required: [true, 'Department name is required'],
		trim: true,
	},

	location: {
		type: String,
		required: [true, 'Department location is required'],
		trim: true,
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},
})

DepartmentSchema.statics.departmentExists = async (departmentName) => {
	let departmentExists = await Department.findOne({ name: departmentName })
	return departmentExists
}

DepartmentSchema.methods.toJSON = function () {
	let department = this.toObject()
	delete department.__v
	return department
}

const Department = mongoose.model('department', DepartmentSchema)
export default Department
