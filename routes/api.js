import express from 'express'
import UsersController from '../controllers/UsersController'
import SignInController from '../controllers/authController/SignInController'
import SignOutController from '../controllers/authController/SignOutController'
import DepartmentsController from '../controllers/DepartmentsController'
import { checkAuth } from '../middlewares/auth'
import { isAdmin } from '../middlewares/isAdmin'

const ROUTER = express.Router()

ROUTER.post('/sign-in', SignInController.signIn)
ROUTER.post('/sign-out', checkAuth, SignOutController.signOut)
ROUTER.post('/sign-out-all', checkAuth, SignOutController.signOutAll)

ROUTER.post('/moderators', checkAuth, isAdmin, UsersController.addModerator)
ROUTER.get('/moderators', checkAuth, isAdmin, UsersController.getAllModerators)
ROUTER.put('/moderators/:moderatorId', checkAuth, UsersController.updateModeratorDetails)
ROUTER.delete('/moderators/:moderatorId', checkAuth, isAdmin, UsersController.deleteModerator)

ROUTER.post('/departments', checkAuth, DepartmentsController.addDepartment)
ROUTER.get('/departments', checkAuth, DepartmentsController.getAllDepartments)
ROUTER.put('/departments/:departmentId', checkAuth, DepartmentsController.updateDepartment)
ROUTER.delete('/departments/:departmentId', checkAuth, DepartmentsController.deleteDepartment)

export default ROUTER
