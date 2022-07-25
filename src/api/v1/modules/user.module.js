const {Schema} = require("mongoose");
var SHA256 = require("crypto-js/sha256");
const mainDB = require("./../../../config/connect_mongoosedb");
const userShema = new Schema({
    userid:{type:Number},
    email:String,
    username:String,
    password:String,
    changepw:{type:Boolean,default:true},
    role:{type:String,default:"none"},
},{
    collection:"users",
    timestamps:true
})
userShema.pre("save",function(next){
    const userEmail = this.email.split("@")[0];
    this.username = this.username ? this.username : userEmail;
    this.password = this.password ? this.password : SHA256(userEmail).toString().slice(1,10);
    this.userid = this.userid ? this.userid : Date.now();
    next();
})
module.exports = mainDB.model("user",userShema);

