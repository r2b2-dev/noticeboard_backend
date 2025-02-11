import Department from '../models/Department'
const Validations = require('../Validations')

class DepartmentsController {
	// add a new department
	async addDepartment(request, response) {
		const result = Validations.addDepartment(request.body)

		if (result.error) {
			let error = result.error.details[0]
			response.status(422).json({
				success: false,
				error: { field: error.path[0], message: error.message },
			})
		} else {
			try {
				if (await Department.departmentExists(result.value.name)) {
					response.status(409).json({
						success: false,
						error: { field: 'name', message: 'Department exists already!' },
					})
				} else {
					let department = new Department(result.value)
					let newDepartment = await department.save()
					response.status(201).json({
						success: true,
						message: `Added a new department ${newDepartment.name}! `,
						department: newDepartment,
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

	// get all departments
	async getAllDepartments(request, response) {
		try {
			let allDepartments = await Department.find()
			response.status(200).json({
				success: true,
				departments: allDepartments,
			})
		} catch (error) {
			response.status(500).json({
				success: false,
				error: error.message,
			})
		}
	}

	// update department
	async updateDepartment(request, response) {
		const result = Validations.addDepartment(request.body)
		if (result.error) {
			let error = result.error.details[0]
			response.status(422).json({
				success: false,
				error: { field: error.path[0], message: error.message },
			})
		} else {
			let { name, type, location } = result.value
			let departmentId = request.params.departmentId
			try {
				let departmentExists = await Department.departmentExists(name)
				if (departmentExists) {
					if (departmentExists._id.toString() !== departmentId.toString()) {
						response.status(409).json({ success: false, error: { field: 'name', message: 'Department exists already!' } })
						return
					}
				}
				let updatedDepartment = await Department.findOneAndUpdate({ _id: departmentId }, { name, type, location }, { new: true })
				if (updatedDepartment) {
					response.status(200).json({
						success: true,
						message: `Department details updated!`,
						department: updatedDepartment,
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

	//delete department
	async deleteDepartment(request, response) {
		try {
			let deletedDepartment = await Department.findOneAndDelete({
				_id: request.params.departmentId,
			})
			if (!deletedDepartment) {
				response.status(404).json({
					success: false,
					error: 'Record does not exist!',
				})
			} else {
				response.status(200).json({
					success: true,
					message: `Removed department ${deletedDepartment.name}!`,
					department: deletedDepartment,
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

const departmentsController = new DepartmentsController()
export default departmentsController
