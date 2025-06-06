const http = require("http");
// const requestHandler = require("./user");
const fileHandler = require('./Practice_set')

// const server = http.createServer(requestHandler);
const server = http.createServer(fileHandler);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`server is listing on the port: http://localhost:${PORT}`);
});