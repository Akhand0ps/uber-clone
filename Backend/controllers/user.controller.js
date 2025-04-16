const UserModel = require("../models/user.model");

const userService = require("../services/user.servies");
const {validationResult} = require("express-validator");

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