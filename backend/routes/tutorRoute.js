import express from 'express'
import {tutorsList,loginTutor,sessionTutor,sessionCancel,sessionComplete,tutorDashboard, tutorProfile,updateTutorProfile} from '../controllers/tutorController.js'
import authTutor from '../middlewares/authTutor.js'

const tutorRouter = express.Router()

tutorRouter.get('/list',tutorsList)
tutorRouter.post('/login', loginTutor)
tutorRouter.get('/sessions', authTutor, sessionTutor)
tutorRouter.post('/cancel-session', authTutor, sessionCancel)
tutorRouter.post('/complete-session', authTutor, sessionComplete)
tutorRouter.get('/dashboard', authTutor, tutorDashboard)
tutorRouter.get('/profile', authTutor, tutorProfile)
tutorRouter.post('/update-profile', authTutor, updateTutorProfile)

export default tutorRouter