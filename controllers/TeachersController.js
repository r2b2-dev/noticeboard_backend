import Teacher from "../models/Teacher";
const validations = require("../Validations");

class TeachersController {
  //add a new teacher
  async addTeacher(req, res) {
    const result = validations.addTeacher(request.body);
    if (result.error) {
      let error = result.error.details[0];
      res.status(400).json({
        success: false,
        error: { field: error.path[0], message: error.message },
      });
    } else {
      try {
        let teacher = new teacher(result.value);
        let newTeacher = await teacher.save();
        res.status(200).json({
          success: true,
          message: `Added a new teacher ${newTeacher.teacherName}!`,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          error: error.message,
        });
      }
    }
  }
  async getAllTeacher(req, res) {
    try {
      let AllTeachers = await Teacher.find();
      res.status(200).json({
        success: true,
        teachers: AllTeachers,
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

  async getSingleTeacher(req, res) {
    try {
      let teacherId = req.params._id;
      let teacher = await Teacher.findById(teacherId);
      if (!teacher) {
        res.status(400).json({
          success: false,
          message: "Teacher not found!",
        });
      } else {
        res.status(200).json({
          success: true,
          teacher: teacher,
        });
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }
  async updateTeacher(req, res) {
    const result = validations.addTeacher(request.body);
    if (result.error) {
      let error = result.error.details[0];
      res.status(400).json({
        success: false,
        error: { field: error.path[0], message: error.message },
      });
    } else {
      let { teacherName } = res.value;
      try {
        let updatedTeacher = await Teacher.findOneAndUpdate(
          { _id: req.params.teacherId },
          { teacherName },
          { new: true }
        );
        if (!updatedTeacher) {
          res
            .status(400)
            .json({ success: false, message: "Teacher not found!" });
        } else {
          res.status(200).json({
            success: true,
            message: "Teacher updated!",
            teacher: updatedTeacher,
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
  async deleteTeacher(req, res) {
    try {
      let deletedTeacher = await Teacher.findOneAndDelete({
        _id: req.params.teacherId,
      });
      if (!deletedTeacher) {
        res.status(400).json({
          success: false,
          error: "Teacher not found!",
        });
      } else {
        res.status(200).json({
          success: true,
          message: `Removed teacher ${deletedTeacher.teacherName}!`,
          teacher: deletedTeacher,
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

const teachersController = new TeachersController();
export default teachersController;
