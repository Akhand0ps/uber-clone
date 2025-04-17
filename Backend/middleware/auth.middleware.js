const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const blacklistToken = require("../models/blacklistToken.model");

const jwt = require("jsonwebtoken");

module.exports.authUser = async(req,res,next)=>{

    // console.log(req);

    const token = req.cookies?.token ||(req.headers.authorization?.startsWith("Bearer ") && req.headers.authorization.split(" ")[1]);


    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }

    const isBlacklisted = await blacklistToken.findOne({token});

    if(isBlacklisted){
        return res.status(401).json({message:"Unauthorized"});
    }

    try{

        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if(!user){
            return res.status(401).json({message:"Unauthorized"});
        }
        
        req.user = user;
        return next();

    }catch(err){
        return res.status(401).json({message:"Unauthorized"});
    }

}