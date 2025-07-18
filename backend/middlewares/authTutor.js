import jwt from 'jsonwebtoken'

//tutor authentication middleware

const authTutor = async (req,res,next) => {
    try {
        const {ttoken} = req.headers
        if (!ttoken) {
            return res.json({success:false, message:'Tutor Not Authorized please login again'})
        }
        const token_decode = jwt.verify(ttoken, process.env.JWT_SECRET)

        req.tutId = token_decode.id
        next()
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

export default authTutor