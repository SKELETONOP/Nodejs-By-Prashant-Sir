const http = require("http");
// const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url.toLowerCase() === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
            <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Myntra</title>
  </head>
  <body>
    <h1>Welcome to Myntra</h1>
    <ul>
      <li><a href="/home">Home</a></li>
      <li><a href="/men">Men</a></li>
      <li><a href="/women">Women</a></li>
      <li><a href="/kids">Kids</a></li>
      <li><a href="/cart">Cart</a></li>
    </ul>
  </body>
</html>
            `);
    return res.end();
  }
  if (req.url.toLowerCase() === "/home") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Home</title></head>");
    res.write("<body><h1>Welcome To my Home</h1>");
    res.write("</body></html>");
    return res.end();
  }
  if (req.url.toLowerCase() === "/men") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Men</title></head>");
    res.write("<body><h1>Welcome To Men's Catagory</h1>");
    res.write("</body></html>");
    return res.end();
  }
  if (req.url.toLowerCase() === "/women") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Women</title></head>");
    res.write("<body><h1>Welcome To Women's Catagory</h1>");
    res.write("</body></html>");
    return res.end();
  }
  if (req.url.toLowerCase() === "/kids") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Kids</title></head>");
    res.write("<body><h1>Welcome To Kids Catagory</h1>");
    res.write("</body></html>");
    return res.end();
  }
  if (req.url.toLowerCase() === "/cart") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Cart</title></head>");
    res.write("<body><h1>Welcome To Your Cart</h1>");
    res.write("<ul><li>Shoes</li><li>Tshirt</li><li>Jeans</li></ul>");
    res.write("<h2>Total Price: 5000</h2>");
    res.write("</body></html>");
    return res.end();
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`server is listing on the port: http://localhost:${PORT}`);
});
// const http = require("http");
