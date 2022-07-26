"use strict";
const {ObjectId} = require("mongoose").Types;
const myError = require("../helpers/error.helper");
const _User = require("../modules/user.module");
const otp = require("../services/otp.services")
const bcrypt = require('bcrypt');
const token = require("../helpers/token.helper");
const create = async (email) => {
    try{
        const user = await _User.create({email});
        return user
    }catch(err){
        throw err
    }
    
}
const findById = async (id) => {
    try{
        if(!ObjectId.isValid(id)) throw new myError({status:404,message:"bad request"})
        const user = await _User.findById(id,'email role username userid');
        if(!user) throw  new myError({status:404,message:"user not found"})
        return user;
    }catch(err){
        throw err
    }
    
}
const findOne = async (email) => {
    try{
        const userExist = await _User.findOne({email});
        return userExist;
    }catch(err){
        throw err
    }
    
}

const login = async (email,password)=>{
    try{
        const user = await _User.findOne({email});
        if(!user){
            throw new myError({status:403,message:"You are using  the wrong username and/or password"})
        }
        if(user.changepw){
            const accessToken = await token.signAccessToken(user._id.toString());
            throw new myError({status:403,message:"First login, You must change your passwaord",href:"/user/editprofile",accessToken})
        }
        const isMypw = await bcrypt.compare(password,user.password)
        if(!isMypw){
            throw new myError({status:403,message:"You are using  the wrong username and/or password"})
        }
        return user;
    }catch(err){
        throw err
    }
}
const changePassword = async (filter,update,potions) =>{
    try{
        let updateData = _User.findOneAndUpdate(filter,update,potions);
        return updateData;
    }catch(err){
        throw err;
    }
}
module.exports = {create,findOne,login,changePassword,findById};