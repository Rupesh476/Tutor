import express from 'express'
import "dotenv/config"
import cors from 'cors'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import tutorRouter from './routes/tutorRoute.js'
import userRouter from './routes/userRoute.js'

const app = express()
const port = process.env.PORT || 4000

connectDB()
connectCloudinary()

//middleware 
app.use(express.json())
app.use(cors())

//Api routes
app.use('/api/user',userRouter)
app.use('/api/admin', adminRouter)
app.use('/api/tutor', tutorRouter)

app.get('/', (req,res)=>{
    res.send('API connected ')
})

app.listen(port, () =>console.log(`server is running on ${port}`))