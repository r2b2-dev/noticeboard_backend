import express from "express";
import UsersController from "../controllers/UsersController";
import SignInController from "../controllers/authController/SignInController";
import SignOutController from "../controllers/authController/SignOutController";
import DepartmentsController from "../controllers/DepartmentsController";
import BatchesController from "../controllers/BatchesController";
import TeachersController from "../controllers/TeachersController";
import SubjectsController from "../controllers/SubjectsController";
import { checkAuth } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";

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

ROUTER.post("/subject", checkAuth, SubjectsController.addSubject);
ROUTER.get("/subject", checkAuth, SubjectsController.getAllSubjects);
ROUTER.get(
  "/subject/:subjectId",
  checkAuth,
  SubjectsController.getSingleSubject
);
ROUTER.put("/subject/:subjectId", checkAuth, SubjectsController.updateSubject);
ROUTER.delete(
  "/subject/:subjectId",
  checkAuth,
  SubjectsController.deleteSubject
);

ROUTER.post("/teacher", checkAuth, TeachersController.addTeacher);
ROUTER.get("/teacher", checkAuth, TeachersController.getAllTeacher);
// ROUTER.get(
//   "/teacher/:teacherId",
//   checkAuth,
//   TeachersController.getSingleTeacher
// );
ROUTER.put("/teacher/:teacherId", checkAuth, TeachersController.updateTeacher);
ROUTER.delete(
  "/subject/:teacherId",
  checkAuth,
  TeachersController.deleteTeacher
);

export default ROUTER;
