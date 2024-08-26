const express = require("express");
const { createServer } = require("http");
const path = require("path");
const setupSocket = require("./sockets");
const PORT = process.env.PORT || 10000;

const app = express();
const httpServer = createServer(app);

console.log(`Node environment: ${process.env.NODE_ENV}`);
console.log(`Current directory: ${__dirname}`);

if (process.env.NODE_ENV === "production") {
  const staticPath = path.join(__dirname, "../client/out");
  console.log(`Serving static files from: ${staticPath}`);
  app.use(express.static(staticPath));

  app.get("*", (req, res) => {
    const indexPath = path.join(__dirname, "../client/out/index.html");
    console.log(`Serving index.html from: ${indexPath}`);
    res.sendFile(indexPath);
  });
} else {
  console.log("Running in development mode");
  app.get("/", (req, res) => {
    res.send("Server is running in development mode");
  });
}

setupSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Full server URL: http://localhost:${PORT}`);
});

httpServer.on("error", (error) => {
  console.error("Server failed to start:", error);
});
