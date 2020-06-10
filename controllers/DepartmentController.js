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

  async updateDepartments(req, res) {
    const result = Validations.updateDepartment(request.body);
    if (result.error) {
      let error = result.error.details[0];
      res.status(400).json({
        success: false,
        error: { field: error.path[0], message: error.message },
      });
    } else {
      try {
        let AllDepartments = await Department.findOneAndUpdate({
          id: req.params.id,
        }).then((department) => {
          department.departmentName = req.body.departmentName;
          department.location = req.body.location;
          department.departmentType = req.body.departmentType;

          department.save();
          res.status(200).json({
            success: true,
            message: `Updated department ${
              department.departmentName +
              " " +
              department.location +
              " " +
              department.departmentType
            }!`,
            Departments: AllDepartments,
          });
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          error: error.message,
        });
      }
    }
  }

  //delete departments
  async deleteDepartments(req, res) {
    try {
      let deletedDepartment = await Department.findOneAndDelete({
        id: req.params.id,
      });
      if (!deletedDepartment) {
        res.status(400).json({
          success: false,
          error: "Department not found!",
        });
      } else {
        res.status(200).json({
          success: true,
          message: `Removed department ${deletedDepartment.departmentName}!`,
          alu: deletedDepartment,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

const departmentController = new DepartmentController();
export default departmentController;
