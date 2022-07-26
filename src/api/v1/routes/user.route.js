const express = require("express");
const route = express.Router();
const userValidation = require("../validations/user.validation");
const userController = require("../controllers/user.controller");
const {verifyAccessToken,verifyRefreshToken} = require("../helpers/token.helper")

const _Project = require("../modules/project.module");

route.post("/register",userValidation.register,userController.register)
route.post("/verifyotp",userValidation.verifyotp,userController.verifyotp)
route.post("/login",userValidation.login,userController.login)
route.post("/refreshtoken",userValidation.refreshtoken,verifyRefreshToken,userController.refreshToken)
// route require access token and verifu it 
route.use(verifyAccessToken);
route.post("/changepassword",userValidation.changePassword,userController.changePassword)
route.get("/profile/:id",userController.getProfile)
route.post("/profile/:id",userValidation.updateProfile,userController.updateProfile)
module.exports = route;