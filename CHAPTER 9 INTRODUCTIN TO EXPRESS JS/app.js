//external module
const express = require ('express')


const app = express();

app.use("/",(req, res, next) => {
    console.log("come in first middleware", req.url)
    
    next();
});
app.use("/submit-details",(req, res, next) => {
    console.log("come in second middleware", req.url);
    res.send('<h1>This is submit details page</h1>')
    
});


const PORT= 3000;
app.listen(PORT, ()=>{
    console.log(`server is listing on the port: http://localhost:${PORT}`)
})