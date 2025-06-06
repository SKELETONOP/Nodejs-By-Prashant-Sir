// external module
const express = require("express");
//core module
const path = require('path');
// local router
const userRouter = require("./Routes/userRouter");
const hostRouter = require("./Routes/hostRouter");
const rootDir = require('./Utils/pathUtil')

const app = express();

app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});

app.use(express.urlencoded());

app.use(userRouter);

app.use(hostRouter);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir,'Views', '404.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is running on the port http://localhost:${PORT}`);
});
