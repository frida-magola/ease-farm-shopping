const fs = require("fs");
const requestHandlers = (req, res) => {
  if (req.url === "/") {
    res.write("<html>");
    res.write("<head><title>Form</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (req.url === "/message" && req.method === "POST") {
    //   create event for incoming data
    const body = [];
    req.on("data", (chunk) => {
      //   console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      //   console.log(parsedBody);
      const message = parsedBody.split("=")[1];
      //fs.writeFileSync("message.txt", message);//block execution of your
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Node js</title></head>");
  res.write("<body>Welcome to nodejs</body>");
  res.write("</html>");
  res.end();
};

module.exports = requestHandlers;
