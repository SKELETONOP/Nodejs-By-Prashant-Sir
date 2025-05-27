const express = require('express');
const userRouter = express.Router();
const path = require('path');
const rootDir = require('../Utils/pathUtil');

userRouter.get("/",(req, res, next)=>{
    
    res.sendFile(path.join(rootDir,'Views','index.html') )
    
})


module.exports= userRouter;