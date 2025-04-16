const UserModel = require("../models/user.model");

const userService = require("../services/user.servies");
const {validationResult} = require("express-validator");
const BlacklistToken = require("../models/blacklistToken.model");

module.exports.resgisterUser = async(req,res,next)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {fullname,lastname,email,password} = req.body;

    const hashedPassword = await UserModel.hashPassword(password);

    const user = await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword``
    });

    const token = user.generateAuthToken();

    res.status(201).json({token,user});
    
}


module.exports.loginUser = async(req,res,next)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email,password} = req.body;

    const user = await UserModel.findOne({email}).select("+password");

    if(!user){
        return res.status(401).json(({message:"Invalid email or password"}));
    }
    
    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json(({message:"Invalid email or password"}));
    }

    const token = await user.generateAuthToken();

    // console.log(token);
    res.cookie("token",token);

    res.status(200).json({token,user});
    
}


module.exports.getUserProfile = async(req,res,next)=>{

    res.status(200).json({user:req.user});

}

module.exports.logoutUser = async(req,res,next)=>{

    try {
        res.clearCookie("token");
    
        // Safe because token was already verified in auth middleware
        const token = req.cookies?.token || req.headers.authorization.split(" ")[1];
    
        await BlacklistToken.create({ token });
    
        res.status(200).json({ message: "Logout successful" });
      } catch (error) {
        next(error); // Forward to error handler
      }
}