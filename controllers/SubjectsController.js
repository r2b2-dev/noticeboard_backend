import Subject from "../models/Subject";
import { request } from "express";
const validations = require("../Validations");

class SubjectsController {
  //add a new subject
  async addSubject(req, res) {
    const result = validations.addSubject(request.body);
    if (result.error) {
      let error = result.error.details[0];
      res.status(400).json({
        success: false,
        error: { field: error.path[0], message: error.message },
      });
    } else {
      try {
        let subject = new subject(result.value);
        let newSubject = await subject.save();
        res.status(200).json({
          success: true,
          message: `Added a new subject ${newSubject.subjectName}!`,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          error: error.message,
        });
      }
    }
  }
  async getAllSubjects(req, res) {
    try {
      let allSubjects = await Subject.find();
      res.status(200).json({
        success: true,
        subjects: allSubjects,
      });
    } catch {
      error;
    }
    {
      res.status(400).json({
        sucess: false,
        error: error.message,
      });
    }
  }

  async getSingleSubject(req, res) {
    try {
      let subjectId = req.params._id;
      let subject = await Subject.findById(subjectId);
      if (!subject) {
        res.status(400).json({
          success: false,
          message: "Subject not found!",
        });
      } else {
        res.status(200).json({
          success: true,
          subject: subject,
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
  async updateSubject(req, res) {
    const result = validations.addSubject(request.body);
    if (result.error) {
      let error = result.error.details[0];
      res.status(400).json({
        success: false,
        error: { field: error.path[0], message: error.message },
      });
    } else {
      let { subjectName } = res.value;
      try {
        let updatedSubject = await Subject.findOneAndUpdate(
          { _id: req.params.subjectId },
          { subjectName },
          { new: true }
        );
        if (!updatedSubject) {
          res
            .status(400)
            .json({ success: false, message: "Subject not found!" });
        } else {
          res.status(200).json({
            success: true,
            message: "subject updated!",
            subject: updatedSubject,
          });
        }
      } catch (error) {
        res.status(400).json({
          success: false,
          error: error.message,
        });
      }
    }
  }
  async deleteSubject(req, res) {
    try {
      let deletedSubject = await Subject.findOneAndDelete({
        _id: req.params.subjectId,
      });
      if (!deletedSubject) {
        res.status(400).json({
          success: false,
          error: "Subject not found!",
        });
      } else {
        res.status(200).json({
          success: true,
          message: `Removed subject ${deletedSubject.subjectName}!`,
          subject: deletedSubject,
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
}

const subjectsController = new SubjectsController();
export default subjectsController;
