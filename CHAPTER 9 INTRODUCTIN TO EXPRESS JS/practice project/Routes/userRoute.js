const express = require('express');
const userRouter = express.Router();
const path = require('path');

userRouter.get("/", (req, res, next)=>{
    console.log("handling / for GET", req.url, req.method);
    res.sendFile(path.join(__dirname,'..','Views','index.html'))
})

module.exports= userRouter;