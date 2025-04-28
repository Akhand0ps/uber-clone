const blacklistTokenModel = require("../models/blacklistToken.model");
const captainModel = require("../models/captain.model");
const captainservice = require("../services/captain.service");
const {validationResult} = require("express-validator");




const registerCaptain = async(req,res)=>{

    

    const errors = validationResult(req);
    

    if(!errors.isEmpty()){

        return res.status(400).json({errors:errors.array()});
    }

    const {fullname,email,password,vehicle} = req.body;

    const isCaptainAlreadyExist = await captainModel.findOne({email});


    if(isCaptainAlreadyExist){
        return res.status(400).json({message:"Captain already exist"});
    }
    console.log(password);
    const hashedPassword = await captainModel.hashPassword(password);
    // console.log(hashedPassword);

    const captain = await captainservice.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    });


    const token = await captain.generateAuthToken();

    res.status(201).json({token,captain});
}

const loginCaptain = async(req,res)=>{

    console.log(req.body);
    const errors = validationResult(req);
    console.log(errors);


    if(!errors.isEmpty()){

        return res.status(400).json({errors:errors.array()});
    }

    const {email,password} = req.body;

    const captain = await captainModel.findOne({email}).select("+password");

    if(!captain){
        return res.status(401).json(({message:"Invalid email or password"}));
    }
    
    const isMatch = await captain.comparePassword(password);

    if(!isMatch){

        return res.status(401).json(({message:"Invalid email or password"}));
    }

    const token = await captain.generateAuthToken();

    res.cookie('token',token);

    res.status(200).json({token,captain});
}

const getCaptainProfile = async(req,res)=>{

    res.status(200).json({captain:req.captain});
}


const logoutCaptain = async(req,res)=>{
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    await blacklistTokenModel.create({token});

    res.clearCookie("token");

    res.status(200).json({message:"Logout successful"});
}


module.exports ={

    registerCaptain,
    loginCaptain,
    getCaptainProfile,
    logoutCaptain
}