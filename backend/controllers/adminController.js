import validator from 'validator'
import bcrypt from 'bcryptjs'
import {v2 as cloudinary} from 'cloudinary'
import tutorModel from '../models/tutorModel.js'
import jwt from 'jsonwebtoken'
import sessionModel from '../models/sessionModel.js'
import userModel from '../models/userModel.js'

//Api for adding a tutor for admin panel

const addTutor = async(req,res) =>{
    try {
        const{name, email, password, qualification, subject, experience, about, fees, address} = req.body;

        const imageFile = req.file

        
        if (!name || !email || !password || !qualification || !subject || !experience || !about || !fees || !address ) {
            return res.json({success:false, message: "Missing Details"})
        }

        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Please enter a valid email address"})
        }

        if (password.length < 8) {
            return res.json({success:false, message:"Please enter strong password"})
        }
        //Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        //handling image
        let imageUrl = "";
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
            imageUrl = imageUpload.secure_url
        } else{
            //provide a default image url if no file is uploaded
            imageUrl = "https://placeholder.co/400"
        }

        const tutorData = {name, email, password:hashedPassword, image:imageUrl, qualification, subject, experience, about, fees, address:JSON.parse(address), available:true, date:Date.now(),};

        const newTutor = await tutorModel(tutorData)
        await newTutor.save()

        res.json({success:true, message:"Tutor added successFully"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//Api for Admin Login
const loginAdmin = async (req,res) =>{
    try {
        const {email,password} = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password ,process.env.JWT_SECRET)
            res.json({success:true, token})
        } else{
            res.json({success:false, message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// api to get all tutors list for the admin panel
const allTutors = async (req,res) =>{
    try {
        const tutors = await tutorModel.find({}).select("-password")
        res.json({success:true,tutors})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//api to get all sessions list for the admin panel
const sessionsAdmin = async (req,res) => {
    try {
        const sessions = await sessionModel.find({}).select('-password')
        res.json({success:true, sessions})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//api to cancel a session
const sessionCancel = async (req,res) => {
    try {
        const {sessionId} = req.body
        if (!sessionId) {
            return res.json({success:false, message:"Session ID is required"})
        }
        const sessionData = await sessionModel.findById(sessionId)
        if (!sessionData) {
            return res.json({success:false, message:"Session not found"})
        }
        if (sessionData.isCompleted) {
            return res.json({success:false, message:"Cannot cancel a completed session"})
        }
        if (sessionData.cancelled) {
            return res.json({success:false, message:"Session already cancelled"})
        }
        
        await sessionModel.findByIdAndUpdate(sessionId, {cancelled:true})
        
        //Release the tutor's availability
        const {tutId, slotDate, slotTime} = sessionData
        const tutData = await tutorModel.findById(tutId)

        let slot_booked = tutData.slot_booked || {};
        if (slot_booked[slotDate]) {
        slot_booked[slotDate] = slot_booked[slotDate].filter(e => e !== slotTime)
        }

        await tutorModel.findByIdAndUpdate(tutId, {slot_booked})
        res.json({success:true, message:"Session cancelled successfully"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//api to get dashboard data
const adminDashboard = async (req,res) => {
    try {
        const tutors = await tutorModel.find({})
        const users = await userModel.find({})
        const sessions = await sessionModel.find({})

        const dashData = {
            tutors: tutors.length,
            sessions: sessions.length,
            clients: users.length,
            latestSessions: sessions.reverse().slice(0,5)
        }
        res.json({success:true, dashData})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

export {addTutor, loginAdmin,allTutors,sessionsAdmin,sessionCancel,adminDashboard}