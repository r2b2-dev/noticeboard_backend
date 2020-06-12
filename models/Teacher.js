import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
  teacherName: {
    type: String,
    required: [true, "Teacher name is required!"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

TeacherSchema.methods.toJSON = () => {
  let teacher = this.toObject();
  delete teacher.__V;
  return teacher;
};

//if teacher already exists
TeacherSchema.statics.teacherExists = async (teacherName) => {
  let teacherExists = await Teacher.findOne({ teacherName: teacherName });
  return teacherExists;
};

const Teacher = mongoose.model("teacher", TeacherSchema);
export default Teacher;
