const http = require("http");
const url = require("url");
const fs = require("fs");
const replaceTemplate = require("./modules/renderTemplate");

const port = 4000;
const hostname = "localhost";

//import templating
const cardTemplate = fs.readFileSync(
  `${__dirname}/templates/card.html`,
  "utf-8"
);
const overviewTemplate = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const productTemplate = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  // console.log(req.url);
  // console.log(url.parse(req.url, true));

  //destructing the query and the path from the url.parse(req.url, true)
  const { query, pathname } = url.parse(req.url, true);
  const pathName = req.url;

  //Overview Page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardHTML = dataObj
      .map((el) => replaceTemplate(cardTemplate, el))
      .join("");

    const output = overviewTemplate.replace(/{%product_card%}/g, cardHTML);
    // console.log(output);
    res.end(output);

    //Product page
  } else if (pathname === "/product") {
    // console.log(query);
    const product = dataObj[query.id];
    res.writeHead(200, { "Content-type": "text/html" });
    const output = replaceTemplate(productTemplate, product);
    // console.log(output);
    res.end(output);

    //API
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    // console.log(dataObj);
    res.end(data);

    //Page not found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});
