import mongoose from 'mongoose'

const Schema = mongoose.Schema

const SectionSchema = new Schema({
	section: {
		type: String,
		required: [true, 'Section is required!'],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

SectionSchema.statics.sectionExists = async (section) => {
	let sectionExists = await Section.findOne({ section: section })
	return sectionExists
}

SectionSchema.methods.toJSON = function () {
	let section = this.toObject()
	delete section.__v
	return section
}

const Section = mongoose.model('section', SectionSchema)
export default Section
