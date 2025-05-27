const http = require('http');



const server = http.createServer((req, res)=>{
    console.log(req.url, req.method, req.headers);
    
    
})
const PORT = 3000;
server.listen(PORT, ()=>{
    console.log(`server is listing on the port: http://localhost:${PORT}`)
});