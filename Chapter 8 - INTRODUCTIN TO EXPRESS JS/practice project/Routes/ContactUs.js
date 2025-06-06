const express = require('express');
const contactUs = express.Router();
const path = require('path');
const fs = require('fs');

contactUs.get("/contact-us", (req, res, next)=>{
     console.log("handling / for GET", req.url, req.method);
       res.sendFile(path.join(__dirname,'..','Views','contactUs.html'))
})

contactUs.post("/contact-us", (req, res, next)=>{
    console.log("handling / for POST", req.url, req.method);

    res.sendFile(path.join(__dirname,'..', 'Views', 'success.html'))
    const data = `Username : ${req.body.name}\nEmail : ${req.body.email}\nMessage : ${req.body.message}`
    fs.writeFile('data.txt', data ,(err)=>{
        if(err) throw err
        else{
            console.log("data added successfully")
        }
    })
    console.log(req.body)

})

module.exports= contactUs;