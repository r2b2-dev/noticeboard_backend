import express from 'express'
import UsersController from '../controllers/UsersController'
import SignInController from '../controllers/authController/SignInController'
import SignOutController from '../controllers/authController/SignOutController'
import DepartmentsController from '../controllers/DepartmentsController'
import BatchesController from '../controllers/BatchesController'
import TeachersController from '../controllers/TeachersController'
import SubjectsController from '../controllers/SubjectsController'
import SectionsController from '../controllers/SectionsController'
import RoutinesController from '../controllers/RoutinesController'
import SemestersController from '../controllers/SemestersController'
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

ROUTER.post('/semesters/add-subjects', checkAuth, SemestersController.addSubjectsToSemester)
ROUTER.post('/semesters/get-subjects', checkAuth, SemestersController.getSubjectsBySemester)

ROUTER.post('/teachers', checkAuth, TeachersController.addTeacher)
ROUTER.get('/teachers', checkAuth, TeachersController.getAllTeachers)
ROUTER.put('/teachers/:teacherId', checkAuth, TeachersController.updateTeacher)
ROUTER.delete('/teachers/:teacherId', checkAuth, TeachersController.deleteTeacher)

ROUTER.post('/subjects', checkAuth, SubjectsController.addSubject)
ROUTER.get('/subjects', checkAuth, SubjectsController.getAllSubjects)
ROUTER.put('/subjects/:subjectId', checkAuth, SubjectsController.updateSubject)
ROUTER.delete('/subjects/:subjectId', checkAuth, SubjectsController.deleteSubject)
ROUTER.post('/subjects/allocate-teachers', checkAuth, SubjectsController.allocateTeachersToSubject)
ROUTER.post('/subjects/get-teachers', checkAuth, SubjectsController.getTeachersBySubject)

ROUTER.post('/batches', checkAuth, BatchesController.addBatch)
ROUTER.get('/batches', checkAuth, BatchesController.getAllBatches)
ROUTER.put('/batches/:batchId', checkAuth, BatchesController.updateBatchDetails)
ROUTER.delete('/batches/:batchId', checkAuth, BatchesController.deleteBatch)
ROUTER.post('/batches/assign-sections', checkAuth, BatchesController.assignSectionsToBatch)
ROUTER.post('/batches/get-sections', checkAuth, BatchesController.getSectionsByBatch)

ROUTER.post('/sections', checkAuth, SectionsController.addSection)
ROUTER.get('/sections', checkAuth, SectionsController.getAllSections)
ROUTER.get('/sections/:sectionId', checkAuth, SectionsController.getSingleSection)
ROUTER.put('/sections/:sectionId', checkAuth, SectionsController.updateSection)
ROUTER.delete('/sections/:sectionId', checkAuth, SectionsController.deleteSection)

ROUTER.post('/routines', checkAuth, RoutinesController.addRoutine)
ROUTER.get('/routines', checkAuth, RoutinesController.getAllRoutines)
ROUTER.get('/routines/:routineId', checkAuth, RoutinesController.getSingleRoutine)
ROUTER.put('/routines/:routineId', checkAuth, RoutinesController.updateRoutineDetails)
ROUTER.delete('/routines/:routineId', checkAuth, RoutinesController.deleteRoutine)

export default ROUTER
