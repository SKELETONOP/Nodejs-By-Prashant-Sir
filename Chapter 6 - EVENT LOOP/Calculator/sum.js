const sumRequestHandler = (req, res) =>{
    console.log("1. in sum req handler" ,req.url)
    let result;
    
    const body = [];
    req.on('data', chunk =>{
        body.push (chunk)
        console.log("2. chunk came ")
    });
    req.on('end', ()=>{
        console.log("3. end event handler call ")
        const bodyStr = Buffer.concat(body).toString();
        const params = new URLSearchParams(bodyStr);
        const bodyObj = Object.fromEntries(params);
        result = Number(bodyObj.firstNumber) + Number(bodyObj.secondNumber);
        console.log(result)
    
    });
    console.log("4.sending the response")
    res.setHeader("Content-Type", "text/html");
    res.write(`
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Calculated result</title>
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
  };
  



module.exports = {sumRequestHandler};