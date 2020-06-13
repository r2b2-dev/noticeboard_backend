import mongoose from "mongoose";
import sectionsController from "../controllers/SectionsController";

const Schema = mongoose.Schema;

const SectionSchema = new Schema({
  section: {
    type: String,
    required: [true, "Section is required!"],
  },
});

SectionSchema.methods.toJSON = function () {
  let section = this.toObject();
  delete section.__v;
  return section;
};

SectionSchema.statics.sectionExists = async (section) => {
  let sectionExists = await Section.findOne({ section: section });
  return sectionExists;
};

const Section = mongoose.model("section", SectionSchema);
export default Section;
