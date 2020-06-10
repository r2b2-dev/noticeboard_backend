
import express from 'express'
import UsersController from '../controllers/UsersController'
import SignInController from '../controllers/authController/SignInController'
import SignOutController from '../controllers/authController/SignOutController'
import BatchController from '../controllers/BatchController'
import DepartmentController from "../controllers/DepartmentController";
import { checkAuth } from '../middlewares/auth'
import { isAdmin } from '../middlewares/isAdmin'
import batchController from '../controllers/BatchController'
import Department from "../models/Departments";


const ROUTER = express.Router();

ROUTER.post("/sign-in", SignInController.signIn);
ROUTER.post("/sign-out", checkAuth, SignOutController.signOut);
ROUTER.post("/sign-out-all", checkAuth, SignOutController.signOutAll);

ROUTER.get("/moderators", checkAuth, isAdmin, UsersController.getAllModerators);
ROUTER.post(
    "/moderators/add",
    checkAuth,
    isAdmin,
    UsersController.addModerator
);
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

ROUTER.post('/batch', checkAuth, batchController.addBatch)
ROUTER.get('/batch', checkAuth, batchController.getAllBatch)
ROUTER.get('/batch/:batchId', checkAuth, batchController.getSingleBatch)
ROUTER.put('/batch/:batchId', checkAuth, batchController.updateBatchDetails)
ROUTER.delete('/batch/:batchId', checkAuth, batchController.deleteBatch)


ROUTER.post("/departments", checkAuth, DepartmentController.addDepartment);
ROUTER.get(
    "/alldepartments",
    checkAuth,
    DepartmentController.getAllDepartments
);
ROUTER.put(
    "/departments/:departmentId",
    checkAuth,
    DepartmentController.updateDepartments
);

ROUTER.delete(
    "/departments/:departmentId",
    checkAuth,
    DepartmentController.deleteDepartments
);

export default ROUTER;
