const {Schema } =require("mongoose");
const mainDB = require("../../../config/connect_mongoosedb.js");
const projectSchema = new Schema({
    projectid: {type:String,required:true},
    name:{type:String,required:true},
    userid:{type:String,required:true}   
},{
    collection:"projects",
    timestamps:true
})
module.export = mainDB.model("project",projectSchema);
