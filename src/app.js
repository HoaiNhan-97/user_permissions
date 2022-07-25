const express = require("express");
const app = express();
const apiv1 = require("./api/v1/routes");
app.use(express.urlencoded({extended:true}));
app.use(express.json())


app.use("/api/v1/",apiv1);


app.use((req,res,next)=>{
    next({status:400,message:`${req.method} ${req.url} not found`});
})
app.use((err,req,res,next)=>{
    let {status,message,...rest} = err
     status = err.status || 500;
     message = err.message || "Server something wrong";
    res.json({status,message,...rest});
})

module.exports = app;
