import Section from '../models/Section'
const Validations = require('../Validations')

class SectionsController {
	//add new section
	async addSection(request, response) {
		const result = Validations.addSection(request.body)

		if (result.error) {
			let error = result.error.details[0]
			response.status(422).json({
				success: false,
				error: {
					field: error.path[0],
					message: error.message,
				},
			})
		} else {
			try {
				if (await Section.sectionExists(result.value.section.toUpperCase())) {
					response.status(409).json({
						success: false,
						error: { field: 'section', message: 'Section already added!' },
					})
				} else {
					let value = { section: result.value.section.toUpperCase() }
					let section = new Section(value)
					let newSection = await section.save()
					response.status(201).json({
						success: true,
						message: `Added a new section ${newSection.section}!`,
						section: newSection,
					})
				}
			} catch (error) {
				response.status(500).json({
					success: false,
					error: error.message,
				})
			}
		}
	}

	//get all sections
	async getAllSections(request, response) {
		try {
			let allSections = await Section.find()
			response.status(200).json({
				success: true,
				sections: allSections,
			})
		} catch (error) {
			response.status(500).json({
				success: false,
				error: error.message,
			})
		}
	}

	//get single section
	async getSingleSection(request, response) {
		try {
			let sectionId = request.params.sectionId
			let singleSection = await Section.findById(sectionId)
			if (!singleSection) {
				response.status(404).json({
					success: false,
					error: 'Section not found',
				})
			} else {
				response.status(200).json({
					success: true,
					section: singleSection,
				})
			}
		} catch (error) {
			response.status(500).json({ success: false, error: error.message })
		}
	}

	//update section
	async updateSection(request, response) {
		const result = Validations.addSection(request.body)
		if (result.error) {
			let error = result.error.details[0]
			response.status(422).json({
				success: false,
				error: { field: error.path[0], message: error.message },
			})
		} else {
			let section = result.value.section.toUpperCase()
			let sectionId = request.params.sectionId
			try {
				let sectionExists = await Section.sectionExists(section)
				if (sectionExists) {
					if (sectionExists._id.toString() !== sectionId.toString()) {
						response.status(409).json({ success: false, error: { field: 'section', message: 'Section already added!' } })
						return
					}
				}
				let updatedSection = await Section.findOneAndUpdate({ _id: sectionId }, { section }, { new: true })
				if (!updatedSection) {
					response.status(404).json({
						success: false,
						message: 'Section not found!',
					})
				} else {
					response.status(200).json({
						success: true,
						message: 'Section updated!',
						section: updatedSection,
					})
				}
			} catch (error) {
				response.status(500).json({
					success: false,
					error: error.message,
				})
			}
		}
	}

	//delete section
	async deleteSection(request, response) {
		try {
			let deletedSection = await Section.findOneAndDelete({
				_id: request.params.sectionId,
			})
			if (!deletedSection) {
				response.status(404).json({
					success: false,
					error: 'Section not found',
				})
			} else {
				response.status(200).json({
					success: true,
					message: `Removed secion ${deletedSection.section}!`,
					section: deletedSection,
				})
			}
		} catch (error) {
			response.status(500).json({
				success: false,
				error: error.message,
			})
		}
	}
}

const sectionsController = new SectionsController()
export default sectionsController
