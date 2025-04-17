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



module.exports ={
    registerCaptain
}