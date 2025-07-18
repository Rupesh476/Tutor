import express from 'express'
import upload from '../middlewares/multer.js'
import {addTutor, loginAdmin,allTutors,sessionsAdmin, sessionCancel, adminDashboard} from '../controllers/adminController.js'
import authAdmin from '../middlewares/authAdmin.js'
import {changeAvailability} from '../controllers/tutorController.js'

const adminRouter = express.Router()

adminRouter.post('/add-tutor',authAdmin, upload.single('image'), addTutor)
adminRouter.post('/login', loginAdmin)
adminRouter.post('/all-tutors',authAdmin,allTutors)
adminRouter.post('/change-availability', authAdmin, changeAvailability)
adminRouter.get('/sessions', authAdmin, sessionsAdmin)
adminRouter.post('/cancel-session', authAdmin, sessionCancel)
adminRouter.get('/dashboard', authAdmin, adminDashboard)
export default adminRouter