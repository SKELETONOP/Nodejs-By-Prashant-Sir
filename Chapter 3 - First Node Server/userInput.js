const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Home</title></head>");
    res.write("<body><h1>Enter Your Details</h1>");
    res.write("<form action='/user' method='POST'>");
    res.write(
      '<input type="text" name="username" placeholder="Enter your name"> <br> '
    );
    res.write(
      '<input type="email" name="email" placeholder="Enter your email">'
    );
    res.write("<br>");
    res.write('<label for="male">Male</label>');
    res.write('<input type="radio" id="male" name="gender" value="male"/>');
    res.write('<label for="female">Female</label>');
    res.write('<input type="radio" id="female" name="gender" value="female"/>');
    res.write("<br>");
    res.write('<input type="submit" value="Submit">');
    res.write("</form>");

    res.write("</body>");
    res.write("</html>");
    return res.end();
  } else if (req.url === "/Products") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Products</title></head>");
    res.write("<body><h1>Welcome to Products Page</h1></body>");
    res.write("</html>");
    return res.end();
  } else if (req.url.toLowerCase() === "/user" && req.method === "POST") {
    fs.writeFileSync("userInput.txt", "User Input:\n");
    res.statusCode = 302; // Redirect status code

    res.setHeader("Location", "/");
    return res.end();
  }
});
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`server is listing on the port: http://localhost:${PORT}`);
});
