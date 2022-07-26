const {registerSchema,verifyotpSchema,loginSchema,changePasswordSchema,refreshTokenSchema,updateProfileSchema} = require("./schema/user.shema");
const createError = require("http-errors")

const register = async(req,res,next) =>{
    try{
        await registerSchema.validateAsync(req.body);
        next();
    }catch(err){
        next(createError.BadRequest(err.details[0].message));
    }
}
const verifyotp = async(req,res,next) =>{
    try{
        await verifyotpSchema.validateAsync(req.body);
        next();
    }catch(err){
        next(createError.BadRequest(err.details[0].message));
    }
}
const login = async(req,res,next) =>{
    try{
        await loginSchema.validateAsync(req.body);
        next();
    }catch(err){
        next(createError.BadRequest(err.details[0].message));
    }
}
const changePassword = async(req,res,next) =>{
    try{
        await changePasswordSchema.validateAsync(req.body);
        next();
    }catch(err){
        next(createError.BadRequest(err.details[0].message));
    }
}
const refreshtoken = async(req,res,next) =>{
    try{
        await refreshTokenSchema.validateAsync(req.body);
        next();
    }catch(err){
        next(createError.BadRequest(err.details[0].message));
    }
}



const updateProfile = async(req,res,next) =>{
    try{
        await updateProfileSchema.validateAsync(req.body);
        next();
    }catch(err){
        next(createError.BadRequest(err.details[0].message));
    }
}
module.exports = {register,verifyotp,login,changePassword,refreshtoken,updateProfile}