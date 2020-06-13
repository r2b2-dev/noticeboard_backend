import Section from "../models/Section";
const Validations = require("../Validations");

class SectionsController {
  //add new section
  async addSection(request, response) {
    const result = Validations.addSection(request.body);

    if (result.error) {
      let error = result.error.details[0];
      response.status(422).json({
        success: false,
        error: {
          field: error.path[0],
          message: error.message,
        },
      });
    } else if (await Section.sectionExists(result.value.section)) {
      response.status(409).json({
        success: false,
        error: { field: "section", message: "section already exists!" },
      });
    } else {
      try {
        let section = new Section(result.value.toUpperCase());
        let newSection = await section.save();
        response.status(201).json({
          success: true,
          message: `Added a new section!`,
          section: newSection,
        });
      } catch (error) {
        response.status(500).json({
          success: false,
          error: error.message,
        });
      }
    }
  }

  //get all sections
  async getAllSections(request, response) {
    try {
      let allSections = await Section.find();
      response.status(200).json({
        success: true,
        setion: allSections,
      });
    } catch (error) {
      response.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  //get single section
  async getSingleSection(request, response) {
    try {
      let sectionId = request.params.sectionId;
      let singleSection = await Section.findById(sectionId);
      if (!singleSection) {
        response.status(404).json({
          success: false,
          error: "Section not found",
        });
      } else {
        response.status(200).json({
          success: true,
          section: singleSection,
        });
      }
    } catch (error) {
      response.status(500).json({ success: false, error: error.message });
    }
  }

  //update section
  async updateSectionDetails(request, response) {
    const result = Validations.addSection(request.body);
    if (result.error) {
      let error = result.error.details[0];
      response.status(422).json({
        success: false,
        error: { field: error.path[0], message: error.message },
      });
    } else {
      let { section } = result.value;
      try {
        let updatedSection = await Section.findOneAndUpdate(
          { _id: request.params.sectionId },
          { section },
          { new: true }
        );
        if (!updatedSection) {
          response.status(200).json({
            success: false,
            message: "Section not found!",
          });
        } else {
          response.status(201).json({
            success: true,
            message: "Section updated!",
            section: updatedSection,
          });
        }
      } catch (error) {
        response.status(500).json({
          success: false,
          error: error.message,
        });
      }
    }
  }

  //delete section
  async deleteSection(request, response) {
    try {
      let deletedSection = await Section.findOneAndDelete({
        _id: request.params.sectionId,
      });
      if (!deletedSection) {
        response.status(404).json({
          success: false,
          error: "Section not found",
        });
      } else {
        response.status(200).json({
          success: true,
          message: `Removed secion ${deletedSection.section} !`,
          section: deletedSection,
        });
      }
    } catch (error) {
      response.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

const sectionsController = new SectionsController();
export default sectionsController;
