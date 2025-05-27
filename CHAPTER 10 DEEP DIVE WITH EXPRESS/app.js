const express = require('express');
const bodyParsar = require('body-parser');
const fs = require('fs');

const app = express()


// app.use("/contact-us", (req, res, next)=>{
   
//     res.send(`<form action = "/contact-us" method = "POST">
//         <input type="text" name="username" placeholder = "Enter Your Name"> <br>
//         <input type="email" name="email" id="email" placeholder = "Enter Your Email" ><br>
//         <button type= "submit">Submit</button>
//         </form>`)
// })

app.use("", (req, res, next)=>{
   console.log(req.url, req.method)
   next();
})
app.use("", (req, res, next)=>{
   console.log(req.url, req.method)
   next();
})

app.get("/", (req, res, next)=>{
    console.log("handling / for GET", req.url, req.method);
    res.send(`<h1>Welcome to Naresh Gouttam Blogs</h1>`)
})
app.get("/contact-us", (req, res, next)=>{
    console.log("handling / for GET", req.url, req.method);
    res.send(`
        <h1>Please Give Your Details Here</h1>
        <form action = "/contact-us" method = "POST">
        <input type="text" name="username" placeholder = "Enter Your Name"> <br>
        <input type="email" name="email" id="email" placeholder = "Enter Your Email" ><br>
        <input type= "submit">
        </form>
              
        `)
})

app.post("/contact-us", (req, res, next)=>{
    console.log("First Handling ", req.url, req.method);
    next();
})

app.use(bodyParsar.urlencoded());

app.post("/contact-us", (req, res, next)=>{
    console.log("handling / for POST", req.url, req.method, req.body);
    const data = `Name : ${req.body.username},\nEmail : ${req.body.email}`
    fs.writeFile("Contact.txt", data, (err)=>{
        if(err){
            console.log("there is an error submitting the file", err)
        }else{
            console.log("data saved successfully")
            res.send("<h1>We Will Contact You Shortly</h1>")
        }
        
    })

    // res.send("<h1>We Will Contact You Shortly</h1>")

})

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`PORT is listing on : http://localhost:${PORT}`)
})