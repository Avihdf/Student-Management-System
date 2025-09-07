const jwt=require('jsonwebtoken');
const User=require('../Models/user');

const authMiddleware=async(req,res,next)=>{
    try {
        const token=req.cookies.student;
        if(!token) return res.status(401).json({message:'Unauthorized'});
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await User.findById(decoded.id);
        next();
    } catch (error) {
        console.error('Auth middleware error:',error);
        res.status(401).json({message:'Unauthorized'});
    }
};

module.exports=authMiddleware;
