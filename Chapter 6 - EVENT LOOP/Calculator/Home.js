const {sumRequestHandler} = require('./sum');

const requestHandler = (req, res) => {
  res.setHeader("Content-Type", "text/html");

  // Home Page
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

  // Calculator Page
  else if (req.url.toLowerCase() === "/calculator") {
    res.write(`
     
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Calculator Page</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 50px;
                background-color: #eef2f7;
              }
              h1 { color: #444; }
              form {
                margin-top: 30px;
              }
              input {
                padding: 10px;
                margin: 10px;
                width: 200px;
                font-size: 16px;
              }
              button {
                padding: 10px 20px;
                background-color: #17a2b8;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
              }
              button:hover {
                background-color: #117a8b;
              }
              a {
                display: inline-block;
                margin-top: 30px;
                padding: 10px 20px;
                background-color: #28a745;
                color: white;
                text-decoration: none;
                border-radius: 5px;
              }
              a:hover {
                background-color: #1e7e34;
              }
            </style>
        </head>
        <body>
            <h1>Welcome to Calculator Page</h1>
            <form action="/calculate-result" method="POST">
                <input type="text" name="firstNumber" placeholder="Enter First Number" required />
                <input type="text" name="secondNumber" placeholder="Enter Second Number" required />
                <br/>
                <button type="submit">Calculate Sum</button>
            </form>
            <a href="/">Back to Home</a>
        </body>
        </html>
      `);
    return res.end();
  } else if (
    req.url.toLowerCase() === "/calculate-result" &&
    req.method === "POST"
  ) {
    return sumRequestHandler(req, res);
  }

  // 404 Page
  res.write(`
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Error 404</title>
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
          <h1>404 - Page Not Found</h1>
          <a href="/">Go to Home</a>
      </body>
      </html>
    `);
  return res.end();
};

module.exports = requestHandler;
