const http = require("http");
const routes = require("./routes");

// create the server
const server = http.createServer(routes);

// server created must listen the incoming request
server.listen(3000);
