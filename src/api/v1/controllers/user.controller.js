const userService = require("../services/user.services");
const otpService = require("../services/otp.services")
const token = require("../helpers/token.helper");
const redis = require("../helpers/redis.helper");
const password = require("../helpers/password.helper");
const register = async (req,res,next)=>{
    try{
        const {email} = req.body;
        const user = await userService.find(email);
        if(user){
            next({status:403,message:"User has already register!"})
            return
        }
        const otp = await otpService.create(email)
        res.json({status:200,element:otp})
    }catch(err){
        next(err);
    }
}
const verifyotp = async (req,res,next) => {
    try{
        const {email,otp} = req.body;
        const isOtp = await otpService.verifyotp(email,otp);
        if(!isOtp){
            next({status:404,message:"bad request"})
            return
        }
        // save user to database
        const user = await userService.create(email)
        // generate access token and refresh token 
        // const accessToken = await token.signAccessToken(user._id.toString());
        // const refreshToken = await token.signRefreshToken(user.id.toString())
        // save refresh token to redis 
        // await redis.set(user._id.toString(),refreshToken);
        res.json({status:200,element:user});


    }catch(err){
        next(err)
    }
}
const login = async (req,res,next) =>{
    try{
        const {email,password}= req.body;
        const user = await userService.login(email,password)
        res.json({status:200,element:user});
    }catch(err){
        next(err);
    }
}
const changePassword = async (req,res,next) =>{
    try{
        const {email,old_password,new_password} = req.body;
        const user = await userService.findOne(email);
        if(!user){
            next({status:401,message:"Unauthenticated!"});
            return;
        }
        if(user.changepw){
            if(user.password !== old_password ){
                next({status:401,message:"Unauthenticated!"});
                return;
            }
        }else if(! await password.compare(old_password,user.password) ){
            next({status:401,message:"Unauthenticated!"});
            return;
        }

        
        if(user._id.toString() !== req.payload.id){
            next({status:401,message:"Unauthenticated!"});
            return;
        }
        const filter = {email};
        const update ={
            password: await password.hash(new_password),
            changepw:false
        };
        const updateUser = await userService.changePassword(filter,update,{ new: true});
        // generate access token and refresh token 
        const accessToken = await token.signAccessToken(user._id.toString());
        const refreshToken = await token.signRefreshToken(user.id.toString())
        // save refresh token to redis 
        await redis.set(user._id.toString(),refreshToken);
        res.json({status:200,element:{user:updateUser,accessToken,refreshToken}});

    }catch(err){
        next(err);
    }
}
module.exports = {register,verifyotp,login,changePassword}