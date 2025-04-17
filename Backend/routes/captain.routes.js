const express = require("express");
const router = express.Router();
const {body} = require("express-validator");

const captainController = require("../controllers/captain.controller");

router.post("/register",[
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min:6}).withMessage('password must be a least 6 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('vehicle color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('vehicle plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({min:1}).withMessage("Capacity must be a positive integer and at least 1 person"),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage("Invalid vehicle type"),
],
captainController.registerCaptain)




module.exports = router;