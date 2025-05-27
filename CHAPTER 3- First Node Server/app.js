const http = require('http');



const server = http.createServer((req, res)=>{
    console.log(req);
    process.exit();
    
})
const PORT = 3000;
server.listen(PORT, ()=>{
    console.log(`server is listing on the port: http://localhost:${PORT}`)
});