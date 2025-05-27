const sumRequestHandler = (req, res) =>{
    console.log("in sum req handler" ,req.url)
    
    const body = [];
    req.on('data', chunk =>{
        body.push (chunk)
    });
    req.on('end', ()=>{
        const bodyStr = Buffer.concat(body).toString();
        const params = new URLSearchParams(bodyStr);
        const bodyObj = Object.fromEntries(params);
        const result = Number(bodyObj.firstNumber) + Number(bodyObj.secondNumber);
        console.log(result)
        res.setHeader("Content-Type", "text/html");
    res.write(`
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>404 Page Not Found</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 50px;
                background-color: #fff0f0;
              }
              h1 { color: #cc0000; }
              a {
                display: inline-block;
                margin-top: 20px;
                padding: 10px 20px;
                background-color: #dc3545;
                color: white;
                text-decoration: none;
                border-radius: 5px;
              }
              a:hover {
                background-color: #a71d2a;
              }
            </style>
        </head>
        <body>
            <h1>SUM is ${result}</h1>
            <a href="/calculator">Count More</a>
        </body>
        </html>
      `);
    return res.end();
    });
    
  };
  



module.exports = {sumRequestHandler};