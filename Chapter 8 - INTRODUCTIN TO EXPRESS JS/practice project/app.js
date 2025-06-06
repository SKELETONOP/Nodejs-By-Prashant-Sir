const express = require('express');
const app = express();
const userRouter = require('./Routes/userRoute');
const contactUs = require('./Routes/ContactUs');
const path = require('path');

app.use(express.urlencoded());


app.use(userRouter);


app.use(contactUs);

app.use((req, res, next)=>{
    res.status(404).sendFile(path.join(__dirname, "Views", "404.html"))
})

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`PORT is listing on : http://localhost:${PORT}`)
})