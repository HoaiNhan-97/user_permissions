
"use strict";
require("dotenv").config();
const myError = require("../helpers/error.helper");
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt');
const redis = require("../helpers/redis.helper");
const create = async (email)=>{
    try{
        const otp = otpGenerator.generate(6,{
            digits: true,
            lowerCaseAlphabets:false, 
            upperCaseAlphabets:false, 
            specialChars:false
        })
        const salt = bcrypt.genSaltSync(+process.env.BCRYPT_SALT)
        const otpHash = await bcrypt.hash(otp,salt);
        await redis.set(email,otpHash,{"EX":+process.env.OTP_TLL})
        console.log(otp)
        return otp? 1 : 0
    }catch(err){
        throw err
    }
}
const verifyotp = async (email,otp) =>{
    try{
        const otpHash = await redis.get(email);
        if(!otpHash){
            throw new myError({status:404,message:"bad request"})
        }
        const isOtp = await bcrypt.compare(otp,otpHash);
        return isOtp;
    }catch(err){
        throw err
    }
}
module.exports = {create,verifyotp};