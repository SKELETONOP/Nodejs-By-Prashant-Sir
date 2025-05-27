const http = require('http');



const server = http.createServer((req, res)=>{

    if(req.url === '/'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Home</title></head>')
        res.write('<body><h1>Welcome to Home Page</h1></body>')
        res.write('</html>');
        return res.end();
    }
    if(req.url === '/Products'){
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Products</title></head>')
        res.write('<body><h1>Welcome to Products Page</h1></body>')
        res.write('</html>');
        return res.end();
    }
})
const PORT = 3000;
server.listen(PORT, ()=>{
    console.log(`server is listing on the port: http://localhost:${PORT}`)
});