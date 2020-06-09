import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DepartmentsSchema = new Schema({
  departmentName: {
    type: String,
    required: [true, "department name is required"],
    trim: true,
  },

  departmentType: {
    type: String,
    required: [true, "department type is needed"],
    trim: true,
  },

  location: {
    type: String,
    required: [true, "department location is needed"],
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Department = mongoose.model("department", DepartmentsSchema);
export default Department;
