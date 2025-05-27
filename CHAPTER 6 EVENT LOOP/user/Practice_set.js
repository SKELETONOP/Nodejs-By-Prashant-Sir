const fs = require('fs');
console.log("1. start of the node js")
const fileHandler = (req, res)=>{
    console.log(req.url)
    res.setHeader("Content-Type", "text/html");
    if (req.url.toLowerCase() === "/") {
        res.write(`
        
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Home Page</title>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 50px;
                    background-color: #f9f9f9;
                  }
                  h1 { color: #333; }
                  h2 { color: #555; }
                  a {
                    display: inline-block;
                    margin-top: 20px;
                    padding: 10px 20px;
                    background-color: #007BFF;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                  }
                  a:hover {
                    background-color: #0056b3;
                  }
                </style>
            </head>
            <body>
                <h1>Welcome to Home</h1>
                <h2>Click below to go to Calculator</h2>
                <a href="/calculator">Go to Calculator</a>
            </body>
            </html>
          `);
        return res.end();
      }

}
console.log("2. reading file sunchronously")
const dataSync = fs.readFileSync('user-details.txt', 'utf8');
console.log("3. synchronous complete");

// async code running (non blocking )
console.log("4. reading the file async")
fs.readFile("user-details.txt", 'utf8', (err, dataSync)=> {
    if(err) throw errror;
    console.log("5. async code complete")
});
console.log("6. end of the script")


module.exports = fileHandler;