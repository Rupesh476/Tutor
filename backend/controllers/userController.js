import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import {v2 as cloudinary} from 'cloudinary'
import tutorModel from '../models/tutorModel.js'
import sessionModel from '../models/sessionModel.js'
import Stripe from 'stripe'

//STRIPE GATEWAY
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const currency = process.env.CURRENCY || 'usd'

const registerUser = async (req,res) => {
    try {
        const {name, email, password} = req.body

        if (!name ||!email || !password) {
            return res.json({success:false,message:'Missing Credentials'})
        }
        
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:'Email is not valid'})
        }

        if (password.length < 8) {
            return res.json({success:false, message:'Enter a strong password'})
        }
        
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData = {
            name, email, password:hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//api for user login
const loginUser = async(req,res) =>{
    try {
        const{email,password} = req.body

        const user = await userModel.findOne({email})
        if (!user) {
            return res.json({success:false, message:"User doesn't exist with current email"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
        return res.json({success:true,token})
        } else{
            res.json({success:false, message:"Invalid credentials"})
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//api to get user profile
const getProfile = async(req,res)=>{
    try {
        const userId = req.userId
        const userData = await userModel.findById(userId).select('-password')
        res.json({success:true, userData})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//api for update user profile
const updateProfile = async (req,res) =>{
    try {
        const userId = req.userId
        const {name, phone, address, dob, gender} = req.body
        const imageFile = req.file

        if (!name || !phone || !address || !dob || !gender) {
            return res.json({success:false, message:"Please fill all the fields"})
        }
        await userModel.findByIdAndUpdate(userId, {name, phone, address:JSON.parse(address), dob, gender})
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: 'image'})
            const imageUrl = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, {image:imageUrl})
        }
        res.json({success:true, message:"Profile updated successfully"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

const bookSession = async (req,res) => {
    try {
        const userId = req.userId
        const {tutId, slotDate, slotTime} = req.body

        const tutData = await tutorModel.findById(tutId).select('-password')
        if (!tutData.available) {
            return res.json({success:false, message:'Tutor is not available'})
        }

        let slots_booked = tutData.slots_booked 

        // Check if the slot is already booked
        if (slots_booked[slotDate]) {
        if (slots_booked[slotDate].includes(slotTime)) {
            return res.json({success:false, message:'Slot already booked'})
        } else{
            slots_booked[slotDate].push(slotTime)
        }
        } else{
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')
        
        const sessionData = {
            userId,
            tutId,
            userData,
            tutData,
            slotDate,
            slotTime,
            amount:tutData.fees,
            date:Date.now()
        }

        const newSession = new sessionModel(sessionData)
        await newSession.save()

        await tutorModel.findByIdAndUpdate(tutId, {slots_booked})
        res.json({success:true, message:"Session booked successfully"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//api to get user sessions for frontend
const listSessions = async(req,res) => {
    try {
        const userId = req.userId
        const sessions = await sessionModel.find({userId})

        res.json({success:true, sessions})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//api to cancel a session
const cancelSession = async (req,res) => {
    try {
        const userId = req.userId
        const {sessionId} = req.body
        const sessionData = await sessionModel.findById(sessionId)

        //verify session user
        if (sessionData.userId !== userId) {
            return res.json({success:false, message:'You are not authorized to cancel this session'})
        }
        await sessionModel.findByIdAndUpdate (sessionId,{cancelled:true})
        
        //release tutor slot
        const {tutId, slotDate, slotTime} = sessionData
        const tutData = await tutorModel.findById(tutId)

        let slots_booked = tutData.slots_booked
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await tutorModel.findByIdAndUpdate(tutId, {slots_booked})

        res.json({success:true, message:"Session cancelled successfully"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//api of stripe payment
const paymentStripe = async(req,res) => {
    try {
        const userId = req.userId
        const {sessionId} = req.body
        const origin = req.headers.origin

        const sessionData = await sessionModel.findById(sessionId)
        if (!sessionData || sessionData.cancelled) {
            return res.json({success:false, message:"session not found or cancelled"})
        }

        //verify session user
        if (sessionData.userId !== userId) {
            return res.json({success:false, message:'Unauthorized access'})
        }

        const amount = sessionData.amount * 100 // Convert to cents

        //create a stripe checkout session
        const stripeSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data : {
                    currency:currency,
                    product_data:{
                        name:`Session With ${sessionData.tutData.name}`,
                        description: `Subject: ${sessionData.tutData.subject}`
                    },
                    unit_amount: amount,
                },
                quantity: 1
            }],
            mode:'payment',
            success_url: `${origin}/my-sessions?success=true&sessionId=${sessionId}`,
            cancel_url: `${origin}/my-sessions?success=false`,
        })

        res.json({success:true, session_url:stripeSession.url})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//api to verify stripe payment (temporary method secure method is using webhooks)
const verifyStripe = async(req,res) => {
    try {
        const {sessionId} = req.query
        

        const session = await sessionModel.findById(sessionId)
        if (!session) {
            
            return res.json({success:false, message:'session not found'})
        }
        
        //update payment status to true
        session.payment = true
        await session.save()
        

        res.json({success:true, message:'payment verified successfully'})
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}


export {registerUser,loginUser,getProfile,updateProfile,bookSession,listSessions,cancelSession,paymentStripe,verifyStripe} 