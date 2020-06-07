import express from 'express'
import UsersController from '../controllers/UsersController'
import SignInController from '../controllers/authController/SignInController'
import SignOutController from '../controllers/authController/SignOutController'
import { checkAuth } from '../middlewares/auth'
import { isAdmin } from '../middlewares/isAdmin'

const ROUTER = express.Router()

ROUTER.post('/sign-in', SignInController.signIn)
ROUTER.post('/sign-out', checkAuth, SignOutController.signOut)
ROUTER.post('/sign-out-all', checkAuth, SignOutController.signOutAll)

ROUTER.get('/moderators', checkAuth, isAdmin, UsersController.getAllModerators)
ROUTER.post('/moderators/add', checkAuth, isAdmin, UsersController.addModerator)
ROUTER.put('/moderators/:moderatorId', checkAuth, UsersController.updateModeratorDetails)
ROUTER.delete('/moderators/:moderatorId', checkAuth, isAdmin, UsersController.deleteModerator)

export default ROUTER
