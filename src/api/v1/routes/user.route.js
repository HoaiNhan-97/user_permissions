const express = require("express");
const route = express.Router();
const userValidation = require("../validations/user.validation");
const userController = require("../controllers/user.controller");
const {verifyAccessToken} = require("../helpers/token.helper")

const _Project = require("../modules/project.module");

route.post("/register",userValidation.register,userController.register)
route.post("/veryfiotp",userValidation.verifyotp,userController.verifyotp)
route.post("/login",userValidation.login,userController.login)

// route require access token and verifu it 
route.use(verifyAccessToken);
route.post("/changepassword",userValidation.changePassword,userController.changePassword)
module.exports = route;