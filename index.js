// const Logger=require('./logger')

// const logger=new Logger()

// logger.on("message",data=>console.log(`Called Listner`,data));
// logger.log('Hello World');
const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  //   if (req.url === "/") {
  //     fs.readFile(path.join(__dirname, "public", "home.html"), (err, content) => {
  //       if (err) throw err;
  //       res.writeHead(200, { "Content-Type": "text/html" });
  //       res.end(content);
  //     });
  //   }

  //   if (req.url === "/about") {
  //     fs.readFile(path.join(__dirname, "public", "about.html"), (err, content) => {
  //       if (err) throw err;
  //       res.writeHead(200, { "Content-Type": "text/html" });
  //       res.end(content);
  //     });
  //   }

  //   if (req.url === "/api/users"){
  //     const users=[
  //         {name:"hammad zahid",age:24},
  //         {name:"jawad zahid",age:21}
  //     ]
  //     res.writeHead(200, { "Content-Type": "application/json" });
  //       res.end(JSON.stringify(users));
  //   }

  const filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "home.html" : req.url
  );

  //Extension of file
  let extname = path.extname(filePath);

  //initial content type
  let contentType = "text/html";

  //Check ext and set content Type

  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
  }

  //read File

  fs.readFile(filePath,(err,content)=>{
    if(err){ 
        if(err.code=='ENOENT'){
            fs.readFile(path.join(__dirname,'public','404.html'),(err,content)=>{
                res.writeHead(200,{'Content-Type':"text/html"})
               res.end(content)
            })
        }
        else{
            res.writeHead(500);
            res.end(`Server Error:${err.code}`)
        }
    }
    else{
        res.writeHead(200,{'Content-Type':contentType})
        res.end(content,'utf8')
    }
  })
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
