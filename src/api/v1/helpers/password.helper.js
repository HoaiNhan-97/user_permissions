"use strict";
require("dotenv").config();
const bcrypt = require('bcrypt');
const hash = async(myPlaintextPassword, saltRounds = +process.env.BCRYPT_SALT) =>{
    try{
        const salt = bcrypt.genSaltSync(saltRounds)
        const hash = await bcrypt.hash(myPlaintextPassword,salt);
        return hash;
    }catch(err){
        throw err;
    }
    
    
}
const compare = async(myPlaintextPassword, hash) => {
    try{
        const result = await bcrypt.compare(myPlaintextPassword,hash)
        return result;
    }catch(err){
        throw err;
    }
}
module.exports = {hash,compare}