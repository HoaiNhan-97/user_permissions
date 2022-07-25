require("dotenv").config();
const jwt = require("jsonwebtoken");


const signAccessToken = (id) => {
    return new Promise ((resolve,reject) =>{
        const payload = {
            id
        }
        const options = {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRE
        }
        jwt.sign(payload,process.env.SECERT_ACCESS_TOKEN,options,(err,token)=>{
            if(err) return reject(err);
            resolve(token)
        })
    })
    

}
const verifyAccessToken = async (req,res,next) =>{
    try{
        const token = req.headers?.["x-access-token"];
        if(!token){
            
            next({status:404,message:"unauthenticated"})
            return;
        }
        const decoded = jwt.verify(token,process.env.SECERT_ACCESS_TOKEN);
        req.payload = decoded;
        next()
        

    }catch(err){
        
        if(err.name === "TokenExpiredError"){
            next({status:401,message:err.message})
        }else{
            next(err);
        }

    }
}
const signRefreshToken = (id) => {
    return new Promise ((resolve,reject) =>{
        const payload = {
            id
        }
        const options = {
            expiresIn : process.env.REFRESH_TOKEN_EXPRIE
        }
        jwt.sign(payload,process.env.SECERT_REFRESH_TOKEN,options,(err,token)=>{
            if(err) return reject(err);
            resolve(token)
        })
    })
    

}

const verifyRefreshToken = async (req,res,next) =>{
    try{
        const token = req.headers?.["x-refresh-token"];
        if(!token){
            next({status:404,message:"unauthenticated"})
            return;
        }
        const decoded = jwt.verify(token,process.env.SECERT_REFRESH_TOKEN);
        req.payload = decoded
        next()

    }catch(err){
        if(err.name === "TokenExpiredError"){
            next({status:401,message:err.message,href:"/login"})
        }else{
            next(err);
        }

    }
}
module.exports = {signAccessToken,signRefreshToken,verifyAccessToken,verifyRefreshToken}