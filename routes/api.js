import express from "express";
import UsersController from "../controllers/UsersController";
import SignInController from "../controllers/authController/SignInController";
import SignOutController from "../controllers/authController/SignOutController";
import DepartmentsController from "../controllers/DepartmentsController";
import BatchesController from "../controllers/BatchesController";
import SectionsController from "../controllers/SectionsController";
import { checkAuth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";
import sectionsController from "../controllers/SectionsController";

const ROUTER = express.Router();

ROUTER.post("/sign-in", SignInController.signIn);
ROUTER.post("/sign-out", checkAuth, SignOutController.signOut);
ROUTER.post("/sign-out-all", checkAuth, SignOutController.signOutAll);

ROUTER.post("/moderators", checkAuth, isAdmin, UsersController.addModerator);
ROUTER.get("/moderators", checkAuth, isAdmin, UsersController.getAllModerators);
ROUTER.put(
  "/moderators/:moderatorId",
  checkAuth,
  UsersController.updateModeratorDetails
);
ROUTER.delete(
  "/moderators/:moderatorId",
  checkAuth,
  isAdmin,
  UsersController.deleteModerator
);

ROUTER.post("/departments", checkAuth, DepartmentsController.addDepartment);
ROUTER.get("/departments", checkAuth, DepartmentsController.getAllDepartments);
ROUTER.put(
  "/departments/:departmentId",
  checkAuth,
  DepartmentsController.updateDepartment
);
ROUTER.delete(
  "/departments/:departmentId",
  checkAuth,
  DepartmentsController.deleteDepartment
);

ROUTER.post("/batches", checkAuth, BatchesController.addBatch);
ROUTER.get("/batches", checkAuth, BatchesController.getAllBatches);
ROUTER.get("/batches/:batchId", checkAuth, BatchesController.getSingleBatch);
ROUTER.put(
  "/batches/:batchId",
  checkAuth,
  BatchesController.updateBatchDetails
);
ROUTER.delete("/batches/:batchId", checkAuth, BatchesController.deleteBatch);

ROUTER.post("/sections", checkAuth, SectionsController.addSection);
ROUTER.get("/sections", checkAuth, SectionsController.getAllSections);
ROUTER.get(
  "/sections/:sectionId",
  checkAuth,
  SectionsController.getSingleSection
);
ROUTER.put(
  "/sections/:sectionId",
  checkAuth,
  SectionsController.updateSectionDetails
);
ROUTER.delete(
  "/sections/:sectionId",
  checkAuth,
  SectionsController.deleteSection
);

export default ROUTER;
