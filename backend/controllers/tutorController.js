import tutorModel from '../models/tutorModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sessionModel from '../models/sessionModel.js'

//api for change availability
const changeAvailability = async (req,res) =>{
    try {
        const {tutId} = req.body
        const tutData = await tutorModel.findById(tutId)
        await tutorModel.findByIdAndUpdate(tutId, {available: !tutData.available})

        res.json({success:true, message:'Availability Changed'})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//api to get tutors list
const tutorsList = async(req,res) =>{
    try {
        const tutors = await tutorModel.find({}).select(['-password', '-email'])
        res.json({success:true, tutors})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//api for tutor login
const loginTutor = async (req,res) => {
    try {
        const {email, password} = req.body
        const tutor = await tutorModel.findOne({email})
        if (!tutor) {
            return res.json({success:false, message:error.message})
        }
        const isMatch = await bcrypt.compare(password, tutor.password)

        if (isMatch) {
            const token = jwt.sign({id: tutor._id}, process.env.JWT_SECRET)
            res.json({success:true, token })
        } else{
            res.json({success:false, message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//api to get tutor sessions for tutor panel
const sessionTutor = async(req,res) => {
    try {
        const tutId = req.tutId
        const sessions = await sessionModel.find({tutId})

        res.json({success:true, sessions})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
        
    }
}

//api to make session Completed for tutor panel
const sessionComplete = async (req,res) => {
    try {
        const tutId = req.tutId
        const {sessionId} = req.body
        const sessionData = await sessionModel.findById(sessionId)
        
        if (sessionData && sessionData.tutId === tutId) {
            await sessionModel.findByIdAndUpdate(sessionId, {isCompleted:true})
            return res.json({success:true, message:"Session Completed Successfully" })
        } else{
            return res.json({success:false, message:'Action Failed'})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//api to to cancel session for tutor panel
const sessionCancel = async(req,res) => {
    try {
        const tutId = req.tutId
        const {sessionId} = req.body
        const sessionData = await sessionModel.findById(sessionId)
        
        if (sessionData && sessionData.tutId === tutId) {
            await sessionModel.findByIdAndUpdate(sessionId,{cancelled:true})
            return res.json({success:true, message:"Session Cancel Successfully"})
        } else{
            return res.json({success:false, message:"Action Failed"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//api to get dashboar data foe tutor panel
const tutorDashboard = async (req,res) => {
    try {
        const tutId = req.tutId
        const sessions = await sessionModel.find({tutId})
        let earnings = 0 
        sessions.map((session) => {
            if (session.isCompleted || session.payment) {
                earnings+=session.amount
            }
        })

        let clients = []
        sessions.map((session) => {
            if (!clients.includes(session.userId)) {
                clients.push(session.userId)
            }
        })

        const dashData = {
            earnings,
            sessions:sessions.length,
            clients:clients.length,
            latestSessions:sessions.reverse().slice(0,5)
        }

        res.json({success:true,dashData})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//api to get tutor profile for tutor panel
const tutorProfile = async(req,res) => {
    try {
        const tutId = req.tutId
        const profileData = await tutorModel.findById(tutId).select('-password')

        res.json({success:true, profileData})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//api to update tutor profile for tutor panel
const updateTutorProfile = async(req,res) => {
    try {
        const tutId = req.tutId
        const {fees,address, available} = req.body
        await tutorModel.findByIdAndUpdate(tutId, {fees, address, available})

        res.json ({success:true, message:'Profile Updated Successfully'})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

export {changeAvailability,tutorsList,loginTutor,sessionTutor,sessionComplete,sessionCancel,tutorDashboard,tutorProfile, updateTutorProfile}