const express = require('express');
const hostRouter = express.Router();
const path = require('path');

const rootDir = require('../Utils/pathUtil');


hostRouter.get("/host/add-home",(req, res, next)=>{
    
    res.sendFile(path.join(rootDir, 'Views','addhome.html') );
    
})
hostRouter.post("/host/add-home" ,(req, res, next)=>{
    console.log(req.body)
    res.sendFile(path.join(rootDir,'Views','homeResSucc.html'))
    
})


module.exports= hostRouter;