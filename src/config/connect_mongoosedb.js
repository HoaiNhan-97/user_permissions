const mongoose = require("mongoose");

const newConnecttion = (uri) =>{
    const connect = mongoose.createConnection(uri)
    connect.on("connected",function(){
        console.log("Mongodb connected ::: ",this.name);
    })
    connect.on("disconnected",function() {
        console.log("Mongodb disconnected :::", this.name);
    })
    connect.on("err",function(){
        console.log("Mongodb connect err :::", this.name);
    })
    return connect;

}
const mainDatabase = newConnecttion(process.env.MAINDB);
module.exports = mainDatabase;