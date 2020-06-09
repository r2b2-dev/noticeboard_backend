import Department from "../models/Departments";
import { request } from "express";
const Validations = require("../Validations");

class DepartmentController {
  async addDepartment(req, res) {
    const result = Validations.addDepartment(req.body);

    if (result.error) {
      let error = result.error.details[0];
      res.status(422).json({
        success: false,
        error: { field: error.path[0], message: error.message },
      });
    } else {
      try {
        let department = new Department(result.value);
        let newDepartment = await department.save();
        res.status(201).json({
          success: true,
          message: `Added a new department ${newDepartment.departmentName}! `,
          department: newDepartment,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          error: error.message,
        });
      }
    }
  }

  async getAllDepartments(req, res) {
    try {
      let AllDepartments = await Department.find();
      res.status(200).json({
        success: true,
        department: AllDepartments,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
}

const departmentController = new DepartmentController();
export default departmentController;
