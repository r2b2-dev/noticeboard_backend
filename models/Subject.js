import mongoose from "mongoose";
import Teacher from "../models/Teacher";

const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
  subjectName: {
    type: String,
    required: [true, "Subject name is required!"],
    trim: true,
  },
  teacherId: [
    {
      type: mongoose.Types.ObjectId,
      ref: Teacher,
      trim: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

SubjectSchema.methods.toJSON = () => {
  let subject = this.toObject();
  delete subject.__v;
  return subject;
};

//if subject already exists
SubjectSchema.statics.subjectExists = async (subjectName, teacherId) => {
  let subjectExists = await Subject.find({
    subjectName: subjectName,
    teacherId: teacherId,
  });
  return subjectExists;
};

const Subject = mongoose.model("subject", SubjectSchema);
export default Subject;
